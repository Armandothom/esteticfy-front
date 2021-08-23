import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(
    private _api: ApiService
  ) {

  }

  handleFormAddValue(formValue: any) {
    formValue.cpf = formValue.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    return new Promise((resolve, reject) => {
      this._api.post('/cliente', formValue)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

  handleFormEditValue(id: string, formValue: any) {
    formValue.cpf = formValue.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    return new Promise((resolve, reject) => {
      this._api.post('/cliente/' + id, formValue)
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

  handleFormRemoveValue(id: string) {
    return new Promise((resolve, reject) => {
      this._api.post('/cliente/delete', {id : id})
        .subscribe((response: any) => {
          resolve(response)
        }, reject)
    })
  }

}
