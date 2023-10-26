// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store';
// 把VueRouter原型对象的push,先保存一份 
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    }
})

// 全局守卫:前置守卫
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转到那个路由的信息
    // from:可以获取到你从那个路由来的信息
    // next:放行函数
    next();
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.loginName;
    // 用户已经登陆了
    if (token) {
        if (to.path == '/login') {
            next('/')
        } else {
            // 登录，去的不是login
            if (name) {
                next();
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效了,获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录不能去交易相关
        let topath = to.path;
        if (topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1 || topath.indexOf('/center') != -1) {
            // 把未登录时想去而没有去成的信息，存储于地址栏中
            next('/login?redirect=' + topath);
        } else {
            next();
        }
    }
})
export default router;