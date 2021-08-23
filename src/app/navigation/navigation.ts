import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'clientes',
        title: 'CLIENTES',
        type: 'item',
        icon: 'person',
        url: '/cliente',
    },
    {
        id: 'atendentes',
        title: 'ATENDENTES',
        type: 'item',
        icon: 'supervisor_account',
        url: '/atendente',
    },
    {
        id: 'saloes',
        title: 'SALÕES',
        type: 'item',
        icon: 'store',
        url: '/saloes',
    },
    {
        id: 'vendas',
        title: 'VENDAS',
        type: 'item',
        icon: 'attach_money',
        url: '/vendas',
    },
];
