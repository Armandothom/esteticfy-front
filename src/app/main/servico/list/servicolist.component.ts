import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ServicoListService } from './servicolist.service';
import { takeUntil } from 'rxjs/internal/operators';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from 'app/shared/components/loading-dialog/loading-dialog.component';
import * as moment from 'moment';

@Component({
    selector: 'servico-list',
    templateUrl: './servicolist.component.html',
    styleUrls: ['./servicolist.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ServicoListComponent implements OnInit {
    dataSource: FilesDataSource | null;
    displayedColumns = ['nome', 'acoes'];
    inputSearch = '';
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    @ViewChild(MatSort, { static: true })
    sort: MatSort;

    @ViewChild('filter', { static: true })
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _servicoListService: ServicoListService,
        private _servicoService: ServicoService,
        private _router: Router,
        public matDialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject();
    }

    //Quando o usuário clica no "X" do search input, a busca limpa;
    resetInput() {
        this.inputSearch = ''
        this.refreshLista();
        this.filter.nativeElement.focus();
    }

    refreshLista() {
        this.filter.nativeElement.value = '';
        this._servicoListService.getServico();
        this.dataSource.filter = this.filter.nativeElement.value;
    }

    excluirServico(id: any) {
        let loadingComponent = this.matDialog.open(LoadingDialogComponent);
        this._servicoService.handleFormRemoveValue(id).then(() => {
            this._servicoListService.getServico();
        }).finally(() => {
            loadingComponent.close();
        })
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._servicoListService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.paginator.firstPage();
                this._servicoListService.getServico();
                this.dataSource.filter = this.filter.nativeElement.value;
            });

    }
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {ServicoListService} _servicoListService
     * @param {MatPaginator} _MatPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _servicoListService: ServicoListService,
        private _MatPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();
        this.filteredData = this._servicoListService.servicos;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._servicoListService.onServicosChanged,
            this._MatPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                    let data = this._servicoListService.servicos.slice();

                    data = this.filterData(data);

                    this.filteredData = [...data];
                    data = this.sortData(data);

                    // Grab the page's slice of data.
                    const startIndex = this._MatPaginator.pageIndex * this._MatPaginator.pageSize;
                    return data.splice(startIndex, this._MatPaginator.pageSize);
                }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._matSort.active) {
                case 'nome':
                    [propertyA, propertyB] = [a.nome.toLowerCase(), b.nome.toLowerCase()];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
