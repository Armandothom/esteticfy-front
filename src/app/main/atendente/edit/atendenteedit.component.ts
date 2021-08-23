import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from "@angular/material";
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AtendenteService } from '../atendente.service';
import { AtendenteEditService } from './atendenteedit.service'
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
@Component({
    selector: 'atendente-edit',
    templateUrl: './atendenteedit.component.html',
    styleUrls: ['./atendenteedit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AtendenteEditComponent implements OnInit, OnDestroy {
    pageType: string;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado : any;
    atendenteFromBack : any;
    private _unsubscribeAll: Subject<any>;

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
        
    constructor(
        private _atendenteEditService: AtendenteEditService,
        private _atendenteService: AtendenteService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {
        this.atendenteFromBack = this._atendenteEditService.atendente;
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.opcoesSaloes = this.atendenteForm.get('salao_input').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.salao_input),
                map(value => value ? this.filtrarSaloes(value) : this._atendenteEditService.saloes.slice())
            )
            this.setFromBack();
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    filtrarSaloes(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarSaloes(filterValue);
        return this._atendenteEditService.saloes
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
        this._atendenteService.handleFormEditValue(this.atendenteFromBack.id, toBack).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/atendente']).then(() => {
                loadingSpinner.close();
            })
        }).catch(err => {
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

    setFromSaloes(autoCompleteData) {
        this.salaoSelecionado = autoCompleteData.option.value
        this.atendenteForm.get('salao_input').setValue(this.salaoSelecionado.nome)
        this.atendenteForm.get('salao_id').setValue(this.salaoSelecionado.id);
    }

    setFromBack() {
        this.atendenteForm.get('nome').setValue(this.atendenteFromBack.nome)
        this.atendenteForm.get('senha').setValue(this.atendenteFromBack.senha)
        this.atendenteForm.get('cpf').setValue(this.atendenteFromBack.cpf)
        this.atendenteForm.get('endereco').setValue(this.atendenteFromBack.endereco)
        this.atendenteForm.get('cargo').setValue(this.atendenteFromBack.cargo)
        this.atendenteForm.get('data_nascimento').setValue(moment(this.atendenteFromBack.data_nascimento, "YYYY-MM-DD").format("DD/MM/YYYY"))
        this.atendenteForm.get('salao_id').setValue(this.atendenteFromBack.salao_id)
        this.atendenteForm.get('salao_input').setValue(this.atendenteFromBack.salao_nome)
    }
}
