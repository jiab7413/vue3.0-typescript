const commonRouter = [
    {path: '/login', name: 'login', component: () => import('@/views/login.vue')},
    {path: '/register', name: 'register', component: () => import('@/views/register.vue')},
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/main.vue'),
        hidden: true,
        redirect: '/Usermanagement',
        children: [
            {path: 'Usermanagement', name: 'Usermanagement', component: () => import('@/views/usermanagement.vue')},
        ]
    },
];
export default commonRouter;
