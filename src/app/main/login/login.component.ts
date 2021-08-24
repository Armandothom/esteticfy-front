import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import { DialogErro } from 'app/shared/components/dialog-erro/dialog-erro.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;


    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _router: Router,
        private matDialog: MatDialog
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            cpf: ['', Validators.required],
            password: ['', Validators.required]
        });
        if (localStorage.getItem('user')) {
            this._router.navigate(['/agenda']);
        }
    }


    onSubmit() {
        let loadingSpinner = this.matDialog.open(LoadingDialogComponent,
            {
                panelClass: 'loading-dialog-container',
                backdropClass: 'loading-dialog-backdrop',
                disableClose: true
            });
            this.loginForm.value.cpf = this.loginForm.value.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            this._loginService.authLogin(this.loginForm.value).then((user : any) => {
                localStorage.setItem('user', JSON.stringify(user));
                this._router.navigate(['/agenda']);
            }).catch((err) => {
                this.matDialog.open(DialogErro, {
                    data : {
                        titleErro : "Credenciais inválidas",
                        bodyErro : "CPF ou senha inválidos"
                    }
                })
            }).finally(() => {
                loadingSpinner.close();
            })
    }

}
