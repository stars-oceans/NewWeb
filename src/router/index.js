import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// 导入 加载 模块
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Login from '../views/Login.vue'
// MianBox 的子路由
import home from '../views/home/Home.vue'
import New from '../views/new/New.vue'
import News from '../views/news/News.vue'
import Proudct from '../views/proudct/Proudct.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component : ()=>import('../views/MainBox.vue'),
    children : [
      { path : '/mainbox/home', name : 'home', component : home },
      { path : '/mainbox/news', name : 'news', component : News },
      { path : '/mainbox/new/:id', name : 'new', component : New },
      { path : '/mainbox/proudct', name : 'proudct', component : Proudct },
      
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next)=>{
  NProgress.start()
  next()
})

// 路由后置守卫
router.afterEach((to, from , next)=>{
  NProgress.done()
  // next()
})

if (!router.hasRoute()) {
  router.addRoute({
      path: '/mainbox',
      name: 'mainBox',
      component: () => import('@/views/MainBox.vue')
  })
}


export default router
