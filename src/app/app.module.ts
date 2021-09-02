import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from './main/sample/sample.module';
import { ApiService } from './shared/services/api.service';
import { LoadingDialogComponent } from './shared/components/loading-dialog/loading-dialog.component';
import { DialogErro } from './shared/components/dialog-erro/dialog-erro.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoginModule } from './main/login/login.module';

const appRoutes: Routes = [
    {
        path      : 'cliente',
        loadChildren: './main/cliente/cliente.module#ClienteModule'
    },
    {
        path      : 'atendente',
        loadChildren: './main/atendente/atendente.module#AtendenteModule'
    },
    {
        path      : 'salao',
        loadChildren: './main/saloes/salao.module#SalaoModule'
    },
    {
        path      : 'login',
        loadChildren: './main/login/login.module#LoginModule'
    },
    {
        path      : 'servico',
        loadChildren: './main/servico/servico.module#ServicoModule'
    },
    {
        path      : 'venda',
        loadChildren: './main/venda/venda.module#VendaModule'
    },
    {
        path      : 'agenda',
        loadChildren: './main/agenda/agenda.module#AgendaModule'
    },
    {
        path      : '**',
        loadChildren: './main/sample/sample.module#AgendaModule'
    }
];
@NgModule({
    declarations: [
        AppComponent,
        LoadingDialogComponent,
        DialogErro
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        MatProgressSpinnerModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers : [
        ApiService
    ],
    entryComponents : [
        LoadingDialogComponent,
        DialogErro
    ]
})
export class AppModule
{
}
