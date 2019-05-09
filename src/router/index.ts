import Vue from 'vue';
import Router from 'vue-router';
import route from './router';

Vue.use(Router);


const routers = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: route,
});

routers.beforeEach((to, from, next) => {
    debugger
    const loginArr = ['/login', '/register']; //  不重定向白名单
    let isLogin = sessionStorage.getItem('TOKEN'); //  => 返回testKey对应的值  // 判断是否登录，本地存储有用户数据则视为已经登录
    // 判断是否登陆
    if (isLogin) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (loginArr.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

export default routers