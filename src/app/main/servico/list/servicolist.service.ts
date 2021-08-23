import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class ServicoListService implements Resolve<any>
{
    servicos: any[];
    onServicosChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _api: ApiService,
    ) {

        this.onServicosChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getServico()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getServico(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/servico')
                .subscribe((response: any) => {
                    this.servicos = response;
                    this.onServicosChanged.next(this.servicos);
                    resolve(response);
                }, reject);
        });
    }
}