import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class AgendaAddService
{
    saloes : any;
    clientes : any;
    servicos : any;
    constructor(
       private _api : ApiService
    )
    {

    }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getSaloes(),
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


    getSaloes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/salao')
                .subscribe((response: any) => {
                    this.saloes = response;
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
