import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class VendaEditService implements Resolve<any>
{
    venda : any;
    atendentes : any;
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
                this.getVenda(params.id),
                this.getAtendentes(),
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
    
    getVenda (id : any)
    {
        return new Promise((resolve, reject) => {
            this._api.get('/venda/' + id)
                .subscribe((response: any) => {
                    this.venda = response;
                    resolve(response);
                }, reject);
        });
    }

    getAtendentes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._api.get('/atendente')
                .subscribe((response: any) => {
                    this.atendentes = response;
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
