import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private _api: ApiService) { }

  authLogin(body) {
    return new Promise((resolve, reject) => {
      this._api.post('/login', body)
      .subscribe((response: any) => {
        localStorage.setItem('user', response.user);
        resolve(response);
      }, reject);
    });
  }
}
