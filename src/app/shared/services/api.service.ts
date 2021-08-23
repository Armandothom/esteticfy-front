import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url = "http://localhost:3000"
    constructor(
        private http: HttpClient,

    ) {

    }



    get(endpoint): Observable<any> {
        const url = this.url + endpoint;
        return this.http.get(url);
    }
    
    post(endpoint, formValue): Observable<any> {
        const url = this.url + endpoint;
        return this.http.post(url, formValue);
    }


}
