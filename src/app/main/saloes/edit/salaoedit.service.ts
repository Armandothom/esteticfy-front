import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class SalaoEditService implements Resolve<any>
{
    salao : any;
    
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
                this.getAtendente(params.id)
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
            this._api.get('/salao/' + id)
                .subscribe((response: any) => {
                    this.salao = response;
                    console.log(this.salao)
                    resolve(response);
                }, reject);
        });
    }


}
