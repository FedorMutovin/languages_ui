const routes = [
  {
    name: 'account', path: '/account', component: () => import('layouts/MainLayout.vue')
  },
  { path: '/', component: () => import('layouts/AuthenticationLayout.vue'), children: [
      { path: '', redirect: '/sign_in' },
      { name: 'sign_in', path: 'sign_in', component: () => import('pages/authentication/LoginPage.vue') },
      { name: 'sign_up', path: 'sign_up', component: () => import('pages/authentication/RegistrationPage.vue') }
    ]},
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
