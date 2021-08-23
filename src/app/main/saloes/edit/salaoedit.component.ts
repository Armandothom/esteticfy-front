import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from "@angular/material";
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { SalaoService } from '../salao.service';
import { SalaoEditService } from './salaoedit.service'
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';
@Component({
    selector: 'salao-edit',
    templateUrl: './salaoedit.component.html',
    styleUrls: ['./salaoedit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SalaoEditComponent implements OnInit, OnDestroy {
    pageType: string;
    opcoesSaloes: Observable<string[]>;
    salaoSelecionado : any;
    salaoFromBack : any;
    private _unsubscribeAll: Subject<any>;

    salaoForm = this._fb.group({
        nome: ['',
            Validators.required],
        endereco: ['', Validators.required],
    })
        
    constructor(
        private _salaoEditService: SalaoEditService,
        private _salaoService: SalaoService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {
        this.salaoFromBack = this._salaoEditService.salao;
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
        this._salaoService.handleFormEditValue(this.salaoFromBack.id, this.salaoForm.value).then(() => {
            this.snackBar.open('Adicionado com sucesso', '', {
                duration: 3000,
                panelClass: ['snackbar'],
                verticalPosition: 'top'
            });
            this._router.navigate(['/salao']).then(() => {
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
        this.salaoForm.get('nome').setValue(this.salaoFromBack.nome)
        this.salaoForm.get('endereco').setValue(this.salaoFromBack.endereco)
    }
}
