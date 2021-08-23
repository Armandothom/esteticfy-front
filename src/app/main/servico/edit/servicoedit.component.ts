import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from "@angular/material";
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoService } from '../servico.service';
import { ServicoEditService } from './servicoedit.service'
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
@Component({
    selector: 'servico-edit',
    templateUrl: './servicoedit.component.html',
    styleUrls: ['./servicoedit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ServicoEditComponent implements OnInit, OnDestroy {
    pageType: string;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado : any;
    servicoFromBack : any;
    private _unsubscribeAll: Subject<any>;

    servicoForm = this._fb.group({
        nome: ['',
            Validators.required]
    })
        
    constructor(
        private _servicoEditService: ServicoEditService,
        private _servicoService: ServicoService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {
        this.servicoFromBack = this._servicoEditService.servico;
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.setFromBack();
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit() {
        let loadingSpinner = this.matDialog.open(LoadingDialogComponent,
            {
                panelClass: 'loading-dialog-container',
                backdropClass: 'loading-dialog-backdrop',
                disableClose: true
            });
        this._servicoService.handleFormEditValue(this.servicoFromBack.id, this.servicoForm.value).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/servico']).then(() => {
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
        this.servicoForm.get('nome').setValue(this.servicoFromBack.nome)
    }
}
