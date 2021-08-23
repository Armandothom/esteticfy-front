import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from "@angular/material";
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ClienteEditService } from '../edit/clienteedit.service'
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
@Component({
    selector: 'cliente-edit',
    templateUrl: './clienteedit.component.html',
    styleUrls: ['./clienteedit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClienteEditComponent implements OnInit, OnDestroy {
    pageType: string;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado : any;
    clienteFromBack : any;
    private _unsubscribeAll: Subject<any>;

    clienteForm = this._fb.group({
        nome: ['',
            Validators.required],
        senha : ['',
            Validators.required],
        cpf: ['', Validators.required],
        endereco: ['', Validators.required],
        data_nascimento: ['', Validators.required],
        salao_id : ['', Validators.required],
        salao_input : ['']
    })
        
    constructor(
        private _clienteEditService: ClienteEditService,
        private _clienteService: ClienteService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {
        this.clienteFromBack = this._clienteEditService.cliente;
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.opcoesSaloes = this.clienteForm.get('salao_input').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.salao_input),
                map(value => value ? this.filtrarSaloes(value) : this._clienteEditService.saloes.slice())
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
        return this._clienteEditService.saloes
            .filter(saloes => saloes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarSaloes(filterValue) {
        if (this.clienteForm.get('salao_id').value != '' &&
            this.salaoSelecionado.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.clienteForm.get('salao_input').setValue('')
            this.clienteForm.get('salao_id').setValue('');
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
        let toBack = this.clienteForm.value;
        toBack.data_nascimento = moment(toBack.data_nascimento, "DD/MM/YYYY").format("YYYY-MM-DD")
        this._clienteService.handleFormEditValue(this.clienteFromBack.id, toBack).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/cliente']).then(() => {
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
        this.clienteForm.get('data_nascimento').setValue(moment(valorDatePicker.value).format("DD/MM/YYYY"));
    }

    setSelectionEstado(estado) {
        this.clienteForm.get('cli_estado').setValue(estado.value);
    }

    setFromSaloes(autoCompleteData) {
        this.salaoSelecionado = autoCompleteData.option.value
        this.clienteForm.get('salao_input').setValue(this.salaoSelecionado.nome)
        this.clienteForm.get('salao_id').setValue(this.salaoSelecionado.id);
    }

    setFromBack() {
        this.clienteForm.get('nome').setValue(this.clienteFromBack.nome)
        this.clienteForm.get('senha').setValue(this.clienteFromBack.senha)
        this.clienteForm.get('cpf').setValue(this.clienteFromBack.cpf)
        this.clienteForm.get('endereco').setValue(this.clienteFromBack.endereco)
        this.clienteForm.get('data_nascimento').setValue(moment(this.clienteFromBack.data_nascimento, "YYYY-MM-DD").format("DD/MM/YYYY"))
        this.clienteForm.get('salao_id').setValue(this.clienteFromBack.salao_id)
        this.clienteForm.get('salao_input').setValue(this.clienteFromBack.salao_nome)
    }
}
