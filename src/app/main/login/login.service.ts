import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { AuthService } from 'app/shared/services/auth.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private _api: ApiService,
              private _auth: AuthService) { }

  authLogin(body) {
    return new Promise((resolve, reject) => {
      this._api.post('/login', body)
      .subscribe((response: any) => {
        localStorage.setItem('user', response);
        console.log("NEXT NO LOGIN")
        console.log(response)
        this._auth.$user.next(response);
        resolve(response);
      }, reject);
    });
  }
}
