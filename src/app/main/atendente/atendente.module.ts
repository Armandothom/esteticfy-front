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
import { AtendenteAddComponent } from './add/atendenteadd.component'
import { AtendenteListComponent } from './list/atendentelist.component';
import { AtendenteListService } from './list/atendentelist.service'
import { AtendenteEditComponent } from './edit/atendenteedit.component'
import { AtendenteService } from './atendente.service'
import { MatDialogModule } from '@angular/material/dialog';
import { AtendenteEditService } from './edit/atendenteedit.service';
import { AtendenteAddService } from './add/atendenteadd.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { AuthService } from 'app/shared/services/auth.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const routes: Routes = [
    {
        path: '',
        component: AtendenteListComponent,
        canActivate: [AuthService],
        resolve: {
            data: AtendenteListService
        },
    },
    {
        path: 'add',
        component: AtendenteAddComponent,
        canActivate: [AuthService],
        resolve: {
            data: AtendenteAddService
        },
    },
    {
        path: 'edit/:id',
        component: AtendenteEditComponent,
        canActivate: [AuthService],
        resolve: {
            data: AtendenteEditService
        },
    }
];

@NgModule({
    declarations: [
        AtendenteListComponent,
        AtendenteAddComponent,
        AtendenteEditComponent,
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
        AtendenteListService, { provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() },
        AtendenteEditService,
        AtendenteAddService,
        AtendenteService
    ],
})

export class AtendenteModule {

}
