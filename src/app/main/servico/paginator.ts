import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPortuguesPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    
    paginatorIntl.itemsPerPageLabel = 'Items por página:';
    paginatorIntl.nextPageLabel = 'Próxima página';
    paginatorIntl.previousPageLabel = 'Página anterior';
    return paginatorIntl;
  }