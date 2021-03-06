import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class AtendenteEditService implements Resolve<any>
{
    atendente : any;
    saloes : any;
    
    constructor(
       private _api : ApiService
    )
    {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        const params = route.params;
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getAtendente(params.id),
                this.getSaloes()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    
    getAtendente (id : any)
    {
        return new Promise((resolve, reject) => {
            this._api.get('/atendente/' + id)
                .subscribe((response: any) => {
                    this.atendente = response;
                    resolve(response);
                }, reject);
        });
    }

    getSaloes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/salao')
                .subscribe((response: any) => {
                    this.saloes = response;
                    resolve(response);
                }, reject);
        });
    }


}
