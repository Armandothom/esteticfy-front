import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class AgendaEditService implements Resolve<any>
{
    agenda : any;
    clientes : any;
    servicos : any;
    
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
                this.getAgenda(params.id),
                this.getClientes(),
                this.getServicos()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
    
    getAgenda (id : any)
    {
        return new Promise((resolve, reject) => {
            this._api.get('/agenda/' + id)
                .subscribe((response: any) => {
                    this.agenda = response;
                    resolve(response);
                }, reject);
        });
    }

    getClientes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/cliente')
                .subscribe((response: any) => {
                    this.clientes = response;
                    resolve(response);
                }, reject);
        });
    }

    getServicos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/servico')
                .subscribe((response: any) => {
                    this.servicos = response;
                    resolve(response);
                }, reject);
        });
    }



}
