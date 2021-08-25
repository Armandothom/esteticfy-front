import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material";
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

import { AgendaService } from '../agenda.service';
import { Router } from '@angular/router';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import * as moment from 'moment';
import { AgendaAddService } from './agendaadd.service';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
    selector: 'agenda-add',
    templateUrl: './agendaadd.component.html',
    styleUrls: ['./agendaadd.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class AgendaAddComponent implements OnInit, OnDestroy {
    pageType: string;
    value = 0;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado: any;
    opcoesClientes: Observable<string[]>;
    clienteSelecionado: any;
    opcoesServico: Observable<string[]>;
    servicoSelecionada: any;
    user: any;
    showClientes = false;
    agendaForm = this._fb.group({
        cliente_id: ['', Validators.required],
        cliente_input: [''],
        servico_id: ['',
            Validators.required],
        servico_input: [''],
        horario: ['', Validators.required],
    })
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _agendaService: AgendaService,
        private _agendaAddService: AgendaAddService,
        private _authService: AuthService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.user = this._authService.user;
        console.log(this.user)
        if (this.user.isCliente) {
            this.showClientes = false;
            this.agendaForm.get('cliente_id').setValue(this.user.id);
        } else {
            this.showClientes = true;
        }
        this.opcoesClientes = this.agendaForm.get('cliente_id').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.cliente_id),
                map(value => value ? this.filtrarClientes(value) : this._agendaAddService.clientes.slice())
            )
        this.opcoesServico = this.agendaForm.get('servico_input').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.servico_input),
                map(value => value ? this.filtrarServicos(value) : this._agendaAddService.servicos.slice())
            )
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    filtrarServicos(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarServicos(filterValue);
        return this._agendaAddService.servicos
            .filter(clientes => clientes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarServicos(filterValue) {
        if (this.agendaForm.get('servico_id').value != '' &&
            this.servicoSelecionada.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.agendaForm.get('servico_input').setValue('')
            this.agendaForm.get('servico_id').setValue('');
            return '';
        }
        return filterValue;
    }

    filtrarClientes(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarClientes(filterValue);
        return this._agendaAddService.clientes
            .filter(clientes => clientes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarClientes(filterValue) {
        if (this.agendaForm.get('cliente_id').value != '' &&
            this.salaoSelecionado.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.agendaForm.get('cliente_input').setValue('')
            this.agendaForm.get('cliente_id').setValue('');
            return '';
        }
        return filterValue;
    }

    setFromCliente(autoCompleteData) {
        this.clienteSelecionado = autoCompleteData.option.value
        this.agendaForm.get('cliente_input').setValue(this.clienteSelecionado.nome)
        this.agendaForm.get('cliente_id').setValue(this.clienteSelecionado.id);
    }

    setFromServico(autoCompleteData) {
        this.servicoSelecionada = autoCompleteData.option.value
        this.agendaForm.get('servico_input').setValue(this.servicoSelecionada.nome)
        this.agendaForm.get('servico_id').setValue(this.servicoSelecionada.id);
    }

    onSubmit() {
        let loadingSpinner = this.matDialog.open(LoadingDialogComponent,
            {
                panelClass: 'loading-dialog-container',
                backdropClass: 'loading-dialog-backdrop',
                disableClose: true
            });
        let toBack = this.agendaForm.value;
        toBack.horario = moment(this.agendaForm.value.horario).subtract(3, 'hour');
        this._agendaService.handleFormAddValue(toBack).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/agenda']).then(() => {
                loadingSpinner.close();
            })
        }).catch(err => {
            this.matDialog.open(DialogErro, {
                data: {
                    titleErro: "Erro ao inserir",
                    bodyErro: "Ocorreu um erro ao inserir o formulário"
                }
            })
        }).finally(() => {
            loadingSpinner.close();
        })
    }

    openDialog() {
        this.matDialog.open(DialogErro, {
            width: '250px',
            height: '200px'
        });
    }

    openPicker(picker) {
        picker.open();
    }

}


