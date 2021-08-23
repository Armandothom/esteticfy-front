import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';

@Injectable()
export class ServicoAddService
{
    constructor(
       private _api : ApiService
    )
    {

    }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([

            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

}
