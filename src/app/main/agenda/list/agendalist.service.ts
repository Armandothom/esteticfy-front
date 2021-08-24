import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class AgendaListService implements Resolve<any>
{
    agendas: any[];
    onAgendasChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _api: ApiService,
    ) {

        this.onAgendasChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getAgenda()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getAgenda(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/agenda')
                .subscribe((response: any) => {
                    this.agendas = response;
                    this.onAgendasChanged.next(this.agendas);
                    resolve(response);
                }, reject);
        });
    }
}