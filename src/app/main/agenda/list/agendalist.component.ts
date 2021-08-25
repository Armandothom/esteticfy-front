import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { AgendaListService } from './agendalist.service';
import { takeUntil } from 'rxjs/internal/operators';
import { AgendaService } from '../agenda.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';
import { CustomDateFormatter } from '../date-formatter';

@Component({
    selector: 'agenda-list',
    templateUrl: './agendalist.component.html',
    styleUrls: ['./agendalist.component.scss'],
    providers: [
        {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter,
        },
      ],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AgendaListComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    view: CalendarView = CalendarView.Week;

    viewDate: Date = new Date();

    colors: any = {
        red: {
          primary: '#ad2121',
          secondary: '#FAE3E3',
        }
      };

    events: CalendarEvent[] = [
        {
            start: moment().hours(10).toDate(),
            end: moment().hours(12).toDate(),
            title: 'A draggable and resizable event',
            color: this.colors.red,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
        },
        {
            start: moment().add(2, "day").toDate(),
            end: moment().add(2, "day").toDate(),
            title: 'A 3 day event',
            id : 10,
            color: this.colors.red,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: false,
        },
    ];
    constructor(
        private _agendaListService: AgendaListService,
        private _agendaService: AgendaService,
        private _router: Router,
        public matDialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject();
    }


    ngOnInit(): void {
        console.log(this.events)

    }

    eventClicked(event) {
        console.log(event)
    }
}
