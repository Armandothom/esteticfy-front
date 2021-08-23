import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material";
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

import { AtendenteService } from '../atendente.service';
import { Router } from '@angular/router';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import * as moment from 'moment';
import { AtendenteAddService } from './atendenteadd.service';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'atendente-add',
    templateUrl: './atendenteadd.component.html',
    styleUrls: ['./atendenteadd.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class AtendenteAddComponent implements OnInit, OnDestroy {
    pageType: string;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado : any;
    atendenteForm = this._fb.group({
        nome: ['',
            Validators.required],
        senha : ['',
            Validators.required],
        cpf: ['', Validators.required],
        endereco: ['', Validators.required],
        data_nascimento: ['', Validators.required],
        salao_id : ['', Validators.required],
        cargo : ['', Validators.required],
        salao_input : ['']
    })
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _atendenteService: AtendenteService,
        private _atendenteAddService: AtendenteAddService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.opcoesSaloes = this.atendenteForm.get('salao_input').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.salao_input),
                map(value => value ? this.filtrarSaloes(value) : this._atendenteAddService.saloes.slice())
            )
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    filtrarSaloes(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarSaloes(filterValue);
        return this._atendenteAddService.saloes
            .filter(saloes => saloes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarSaloes(filterValue) {
        if (this.atendenteForm.get('salao_id').value != '' &&
            this.salaoSelecionado.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.atendenteForm.get('salao_input').setValue('')
            this.atendenteForm.get('salao_id').setValue('');
            return '';
        }
        return filterValue;
    }

    onSubmit() {
        let loadingSpinner = this.matDialog.open(LoadingDialogComponent,
            {
                panelClass: 'loading-dialog-container',
                backdropClass: 'loading-dialog-backdrop',
                disableClose: true
            });
        let toBack = this.atendenteForm.value;
        toBack.data_nascimento = moment(toBack.data_nascimento, "DD/MM/YYYY").format("YYYY-MM-DD")
        this._atendenteService.handleFormAddValue(toBack).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/atendente']).then(() => {
                loadingSpinner.close();
            })
        }).catch(err => {
            this.atendenteForm.get('data_nascimento').setValue(moment(this.atendenteForm.get('data_nascimento').value, "YYYY-MM-DD").format("DD/MM/YYYY"))
            this.matDialog.open(DialogErro, {data : {
                titleErro : "Erro ao inserir",
                bodyErro : "Ocorreu um erro ao inserir o formulário"
            }})
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

    openPicker(inputDate, picker) {
        inputDate.blur();
        picker.open();
    }

    setValorDatePicker(valorDatePicker) {
        this.atendenteForm.get('data_nascimento').setValue(moment(valorDatePicker.value).format("DD/MM/YYYY"));
    }

    setSelectionEstado(estado) {
        this.atendenteForm.get('cli_estado').setValue(estado.value);
    }

    setFromSaloes(autoCompleteData) {
        this.salaoSelecionado = autoCompleteData.option.value
        this.atendenteForm.get('salao_input').setValue(this.salaoSelecionado.nome)
        this.atendenteForm.get('salao_id').setValue(this.salaoSelecionado.id);
    }
    
}


