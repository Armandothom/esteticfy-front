import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class ServicoEditService implements Resolve<any>
{
    servico : any;
    
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
                this.getServico(params.id)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    
    getServico (id : any)
    {
        return new Promise((resolve, reject) => {
            this._api.get('/servico/' + id)
                .subscribe((response: any) => {
                    this.servico = response;
                    resolve(response);
                }, reject);
        });
    }

}
