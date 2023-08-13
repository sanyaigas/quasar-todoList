
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Todo.vue') },
      { path: '/todo2', component: () => import('src/pages/Todo2.vue') },
      { path: '/help', component: () => import('src/pages/Help.vue') },
      { path: '/about', component: () => import('src/pages/About.vue') },
      { path: '/contacts', component: () => import('src/pages/Contacts.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
