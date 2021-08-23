import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class SalaoListService implements Resolve<any>
{
    saloes: any[];
    onSaloesChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _api: ApiService,
    ) {

        this.onSaloesChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getSalao()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getSalao(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/salao')
                .subscribe((response: any) => {
                    this.saloes = response;
                    this.onSaloesChanged.next(this.saloes);
                    resolve(response);
                }, reject);
        });
    }
}