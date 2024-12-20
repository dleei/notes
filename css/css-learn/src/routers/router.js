const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/layout/index.vue'),
        meta: { title: '首页' },
        children: [
          {
            path: 'css',
            name: 'css',
            component: () => import('@/views/Css/index.vue'),
            meta: { title: 'css' },
          },
          {
            path: 'tool',
            name: 'tool',
            component: () => import('@/views/Tool/index.vue'),
            meta: { title: 'css' },
          },
          {
            path: 'project',
            name: 'Project',
            component: () => import('@/views/Project/index.vue'),
            meta: { title: 'project' },
          },
        ],
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/Error/index.vue'),
        meta: { title: '错误' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/index.vue'),
    meta: { title: '注册' },
  },
]

export default routes
