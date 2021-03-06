import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'funcionario',
        title: 'FUNCIONARIO',
        translate: 'funcionario',
        clienteCanSee : false,
        type: 'group',
        children: [
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
                url: '/salao',
            },
            {
                id: 'servicos',
                title: 'SERVIÇOS',
                type: 'item',
                icon: 'post_add',
                url: '/servico',
            },
            {
                id: 'vendas',
                title: 'VENDAS',
                type: 'item',
                icon: 'attach_money',
                url: '/venda',
            },
        ]
    },
    {
        id: 'cliente',
        title: 'CLIENTE',
        translate: 'cliente',
        clienteCanSee : true,
        type: 'group',
        children: [
            {
                id: 'agenda',
                title: 'AGENDA',
                type: 'item',
                icon: 'event',
                url: '/agenda',
            },
        ]
    }

];
