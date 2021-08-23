import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material";
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';
import { ServicoAddService } from './servicoadd.service';

@Component({
    selector: 'servico-add',
    templateUrl: './servicoadd.component.html',
    styleUrls: ['./servicoadd.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class ServicoAddComponent implements OnInit, OnDestroy {
    pageType: string;
    servicoForm = this._fb.group({
        nome: ['',
            Validators.required]
    })
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _servicoService: ServicoService,
        private _servicoAddService: ServicoAddService,
        private _fb: FormBuilder,
        private _router: Router,
        public matDialog: MatDialog,
        public snackBar: MatSnackBar
    ) {


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

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
        this._servicoService.handleFormAddValue(this.servicoForm.value).then(() => {
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
    
}


