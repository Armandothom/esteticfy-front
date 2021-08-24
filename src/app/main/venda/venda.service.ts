import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(
    private _api: ApiService
  ) {

  }

  handleFormAddValue(formValue: any) {
    return new Promise((resolve, reject) => {
      this._api.post('/venda', formValue)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

  handleFormEditValue(id: string, formValue: any) {
    return new Promise((resolve, reject) => {
      this._api.post('/venda/' + id, formValue)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

  handleFormRemoveValue(id: string) {
    return new Promise((resolve, reject) => {
      this._api.post('/venda/delete', {id : id})
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

}
