import { NgModule } from '@angular/core';
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
import { ClienteAddComponent } from './add/clienteadd.component'
import { ClienteListComponent } from './list/clientelist.component';
import { ClienteListService } from './list/clientelist.service'
import { ClienteEditComponent } from './edit/clienteedit.component'
import { ClienteService } from './cliente.service'
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteEditService } from './edit/clienteedit.service';
import { ClienteAddService } from './add/clienteadd.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const routes: Routes = [
    {
        path: '',
        component: ClienteListComponent,
        resolve: {
            data: ClienteListService
        },
    },
    {
        path: 'add',
        component: ClienteAddComponent,
        resolve: {
            data: ClienteAddService
        },
    },
    {
        path: 'edit/:id',
        component: ClienteEditComponent,
        resolve: {
            data: ClienteEditService
        },
    }
];

@NgModule({
    declarations: [
        ClienteListComponent,
        ClienteAddComponent,
        ClienteEditComponent,
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
        MatAutocompleteModule
    ],
    providers: [
        ClienteListService, { provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() },
        ClienteEditService,
        ClienteAddService,
        ClienteService
    ],
})

export class ClienteModule {

}
