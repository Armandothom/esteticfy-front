import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from "@angular/material";
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { VendaService } from '../venda.service';
import { VendaEditService } from './vendaedit.service'
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
@Component({
    selector: 'venda-edit',
    templateUrl: './vendaedit.component.html',
    styleUrls: ['./vendaedit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VendaEditComponent implements OnInit, OnDestroy {
    pageType: string;
    value = 0;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado: any;
    opcoesClientes: Observable<string[]>;
    clienteSelecionado: any;
    opcoesAtendentes: Observable<string[]>;
    atendenteSelecionada: any;
    opcoesServico: Observable<string[]>;
    servicoSelecionada: any;
    vendaFromBack : any;
    private _unsubscribeAll: Subject<any>;

    vendaForm = this._fb.group({
        cliente_id: ['',
            Validators.required],
        cliente_input: [''],
        atendente_id: ['',
            Validators.required],
        atendente_input: [''],
        servico_id: ['',
            Validators.required],
        servico_input: [''],
        valor: [0, Validators.required]
    })
        
    constructor(
        private _vendaEditService: VendaEditService,
        private _vendaService: VendaService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {
        this.vendaFromBack = this._vendaEditService.venda;
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.opcoesAtendentes = this.vendaForm.get('atendente_id').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.atendente_id),
                map(value => value ? this.filtrarAtendentes(value) : this._vendaEditService.atendentes.slice())
            )
        this.opcoesClientes = this.vendaForm.get('cliente_id').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.cliente_id),
                map(value => value ? this.filtrarClientes(value) : this._vendaEditService.clientes.slice())
            )
        this.opcoesServico = this.vendaForm.get('servico_input').valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.servico_input),
                map(value => value ? this.filtrarServicos(value) : this._vendaEditService.servicos.slice())
            )
            this.setFromBack();
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    filtrarServicos(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarServicos(filterValue);
        return this._vendaEditService.servicos
            .filter(clientes => clientes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarServicos(filterValue) {
        if (this.vendaForm.get('servico_id').value != '' &&
            this.salaoSelecionado.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.vendaForm.get('servico_input').setValue('')
            this.vendaForm.get('servico_id').setValue('');
            return '';
        }
        return filterValue;
    }

    filtrarClientes(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarClientes(filterValue);
        return this._vendaEditService.clientes
            .filter(clientes => clientes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarClientes(filterValue) {
        if (this.vendaForm.get('cliente_id').value != '' &&
            this.salaoSelecionado.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.vendaForm.get('cliente_input').setValue('')
            this.vendaForm.get('cliente_id').setValue('');
            return '';
        }
        return filterValue;
    }

    filtrarAtendentes(value: string) {
        let filterValue = value.toLowerCase();
        filterValue = this.validarAtendentes(filterValue);
        return this._vendaEditService.atendentes
            .filter(atendentes => atendentes.nome.toLowerCase().search(filterValue) !== -1)
    }

    validarAtendentes(filterValue) {
        if (this.vendaForm.get('atendente_id').value != '' &&
            this.salaoSelecionado.nome.toLowerCase() != filterValue.toLowerCase()) {
            this.vendaForm.get('atendente_input').setValue('')
            this.vendaForm.get('atendente_id').setValue('');
            return '';
        }
        return filterValue;
    }
    
    setFromCliente(autoCompleteData) {
        this.clienteSelecionado = autoCompleteData.option.value
        this.vendaForm.get('cliente_input').setValue(this.clienteSelecionado.nome)
        this.vendaForm.get('cliente_id').setValue(this.clienteSelecionado.id);
    }
    
    setFromAtendente(autoCompleteData) {
        this.atendenteSelecionada = autoCompleteData.option.value
        this.vendaForm.get('atendente_input').setValue(this.atendenteSelecionada.nome)
        this.vendaForm.get('atendente_id').setValue(this.atendenteSelecionada.id);
    }
    
    setFromServico(autoCompleteData) {
        this.servicoSelecionada = autoCompleteData.option.value
        this.vendaForm.get('servico_input').setValue(this.servicoSelecionada.nome)
        this.vendaForm.get('servico_id').setValue(this.servicoSelecionada.id);
    }

    onSubmit() {
        let loadingSpinner = this.matDialog.open(LoadingDialogComponent,
            {
                panelClass: 'loading-dialog-container',
                backdropClass: 'loading-dialog-backdrop',
                disableClose: true
            });
        this._vendaService.handleFormEditValue(this.vendaFromBack.id, this.vendaForm.value).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/venda']).then(() => {
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

    setFromBack() {
        this.vendaForm.get('valor').setValue(this.vendaFromBack.valor);
        this.value = this.vendaFromBack.valor;
        this.vendaForm.get('cliente_id').setValue(this.vendaFromBack.cliente_id)
        this.vendaForm.get('cliente_input').setValue(this.vendaFromBack.cliente_nome)
        this.vendaForm.get('atendente_id').setValue(this.vendaFromBack.atendente_id)
        this.vendaForm.get('atendente_input').setValue(this.vendaFromBack.atendente_nome)
        this.vendaForm.get('servico_id').setValue(this.vendaFromBack.servico_id)
        this.vendaForm.get('servico_input').setValue(this.vendaFromBack.servico_nome)
        console.log(this.vendaFromBack)
    }
}
