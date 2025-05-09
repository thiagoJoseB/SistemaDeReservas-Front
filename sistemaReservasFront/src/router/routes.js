const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'CadastroCliente', component: () => import('pages/CadastroCliente.vue') },
      { path: 'ListarLocacoes', component: () => import('pages/ListarLocacoes.vue') },
      { path: 'CadastroLocacoes', component: () => import('pages/CadastroLocacoes.vue') },
      { path: 'CadastroReservas', component: () => import('pages/CadastroReservas.vue') }
    ]
  },

  // Always leave this as last one,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
