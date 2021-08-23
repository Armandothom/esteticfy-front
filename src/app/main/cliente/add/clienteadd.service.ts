import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class ClienteAddService
{
    saloes : any;
    constructor(
       private _api : ApiService
    )
    {

    }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getSaloes()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    getSaloes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/salao')
                .subscribe((response: any) => {
                    console.log(response)
                    this.saloes = response;
                    resolve(response);
                }, reject);
        });
    }

}
