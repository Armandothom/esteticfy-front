import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url = "http://localhost:3000";
    user : any;
    constructor(
        private http: HttpClient,
        private _authService : AuthService
    ) {
        this.user = this._authService.getUser();
    }

    get(endpoint): Observable<any> {
        const url = this.url + endpoint;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Id-Salao': this.user ? this.user.salao_id.toString() : null,
            })
        };
        return this.http.get(url, httpOptions);
    }
    
    post(endpoint, formValue): Observable<any> {
        const url = this.url + endpoint;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Id-Salao': this.user ? this.user.salao_id.toString() : null,
            })
        };
        return this.http.post(url, formValue, httpOptions);
    }


}
