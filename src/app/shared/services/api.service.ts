import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


//Merge to check
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
        this._authService.$user.subscribe((val) => {
            this.user = val;
        });
        console.log("USER NO API")
        console.log(this.user)
    }

    get(endpoint): Observable<any> {
        const url = this.url + endpoint;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'id-salao': this.user ? this.user.salao_id.toString() : '',
                'user-id': this.user ? this.user.id.toString() : '',
                'is-cliente' : this.user ? this.user.isCliente.toString() : ''
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
                'id-salao': this.user ? this.user.salao_id.toString() : '',
                'user-id': this.user ? this.user.id.toString() : '',
                'is-cliente' : this.user ? this.user.isCliente.toString() : ''
            })
        };
        console.log("post com")
        console.log(httpOptions)
        return this.http.post(url, formValue, httpOptions);
    }


}
