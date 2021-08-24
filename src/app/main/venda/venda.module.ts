import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { IConfig, NgxMaskModule } from 'ngx-mask'
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { getPortuguesPaginatorIntl } from './paginator'
import { VendaAddComponent } from './add/vendaadd.component'
import { VendaListComponent } from './list/vendalist.component';
import { VendaListService } from './list/vendalist.service'
import { VendaEditComponent } from './edit/vendaedit.component'
import { VendaService } from './venda.service'
import { MatDialogModule } from '@angular/material/dialog';
import { VendaEditService } from './edit/vendaedit.service';
import { NgxCurrencyModule } from "ngx-currency";
import { VendaAddService } from './add/vendaadd.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { AuthService } from 'app/shared/services/auth.service';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const routes: Routes = [
    {
        path: '',
        component: VendaListComponent,
        canActivate: [AuthService],
        resolve: {
            data: VendaListService
        },
    },
    {
        path: 'add',
        component: VendaAddComponent,
        canActivate: [AuthService],
        resolve: {
            data: VendaAddService
        },
    },
    {
        path: 'edit/:id',
        component: VendaEditComponent,
        canActivate: [AuthService],
        resolve: {
            data: VendaEditService
        },
    }
];


registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [
        VendaListComponent,
        VendaAddComponent,
        VendaEditComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        MatMenuModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        FuseSharedModule,
        FuseWidgetModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        NgxMaskModule.forRoot(options),
        MatDatepickerModule,
        MatAutocompleteModule,
        NgxCurrencyModule,
    ],
    providers: [
        VendaListService, { provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() },
        VendaEditService,
        VendaAddService,
        VendaService,
        CurrencyPipe,
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        },
    ],
})

export class VendaModule {

}

