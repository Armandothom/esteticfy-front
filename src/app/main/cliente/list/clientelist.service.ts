import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class ClienteListService implements Resolve<any>
{
    clientes: any[];
    onClientesChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _api: ApiService,
    ) {

        this.onClientesChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getCliente()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCliente(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/cliente')
                .subscribe((response: any) => {
                    response.map((cliente) => {
                        return cliente.data_nascimento = moment(cliente.data_nascimento, "YYYY-MM-DD").format("DD/MM/YYYY")
                    })
                    this.clientes = response;
                    this.onClientesChanged.next(this.clientes);
                    resolve(response);
                }, reject);
        });
    }
}