import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class AtendenteListService implements Resolve<any>
{
    atendentes: any[];
    onAtendentesChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _api: ApiService,
    ) {

        this.onAtendentesChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getAtendente()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getAtendente(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/atendente')
                .subscribe((response: any) => {
                    response.map((atendente) => {
                        return atendente.data_nascimento = moment(atendente.data_nascimento, "YYYY-MM-DD").format("DD/MM/YYYY")
                    })
                    this.atendentes = response;
                    this.onAtendentesChanged.next(this.atendentes);
                    resolve(response);
                }, reject);
        });
    }
}