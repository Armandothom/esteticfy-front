import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class VendaListService implements Resolve<any>
{
    vendas: any[];
    onVendasChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _api: ApiService,
    ) {

        this.onVendasChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getVenda()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getVenda(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/venda')
                .subscribe((response: any) => {
                    this.vendas = response;
                    this.onVendasChanged.next(this.vendas);
                    resolve(response);
                }, reject);
        });
    }
}