// 引入路由组件
// import Home from '@/pages/Home';
// import Search from '@/pages/Search';
// import Login from '@/pages/Login';
// import Register from '@/pages/Register';
// import Detail from '@/pages/Detail';
// import AddCartSuccess from '@/pages/AddCartSuccess';
// import ShopCart from '@/pages/ShopCart';
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
// 引入二级路由组件
// import myOrder from '@/pages/Center/myOrder';
// import groupOrder from '@/pages/Center/groupOrder';
// 路由配置信息
export default [
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        // 二级路由组件
        children: [{
            path: 'myorder',
            component: () => import('@/pages/Center/myOrder'),
        }, {
            path: 'grouporder',
            component: () => import('@/pages/Center/groupOrder'),
        }, {
            path: '/center',
            redirect: '/center/myOrder'
        }
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去支付页面，必须是从交易来
            if (from.path == '/trade') {
                next();
            } else {
                // 从其他路由来，停留在当前
                next(false);
            }
        }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车来
            if (from.path == '/shopcart') {
                next();
            } else {
                // 从其他路由来，停留在当前
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        // 加？表示params参数可传可不传
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    // 重定向，在项目跑起来的时候，访问/,立马让他定向到首页
    {
        path: '/',
        redirect: '/home'
    }
]