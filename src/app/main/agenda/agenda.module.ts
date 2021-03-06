import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { IConfig, NgxMaskModule } from 'ngx-mask'
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { getPortuguesPaginatorIntl } from './paginator'
import { AgendaListComponent } from './list/agendalist.component';
import { AgendaListService } from './list/agendalist.service'
import { AgendaService } from './agenda.service'
import { MatDialogModule } from '@angular/material/dialog';
import { NgxCurrencyModule } from "ngx-currency";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { AuthService } from 'app/shared/services/auth.service';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT,
} from 'angular-calendar';
import { AgendaEditComponent } from './edit/agendaedit.component';
import { AgendaEditService } from './edit/agendaedit.service';
import { AgendaAddComponent } from './add/agendaadd.component';
import { AgendaAddService } from './add/agendaadd.service';
export function momentAdapterFactory() {
  return adapterFactory(moment);
}

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const routes: Routes = [
  {
    path: '',
    component: AgendaListComponent,
    canActivate: [AuthService],
    resolve: {
      data: AgendaListService
    },
  },
  {
    path: 'add',
    component: AgendaAddComponent,
    canActivate: [AuthService],
    resolve: {
      data: AgendaAddService
    },
  },
  {
    path: 'edit/:id',
    component: AgendaEditComponent,
    canActivate: [AuthService],
    resolve: {
      data: AgendaEditService
    },
  }
];


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AgendaListComponent,
    AgendaEditComponent,
    AgendaAddComponent
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
    CommonModule,
    MatMomentDateModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      }
    ),
  ],
  providers: [
    AgendaListService, { provide: MatPaginatorIntl, useValue: getPortuguesPaginatorIntl() },
    AgendaService,
    AgendaEditService,
    AgendaAddService,
    CurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: MOMENT,
      useValue: moment,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
  ],
})

export class AgendaModule {

}

