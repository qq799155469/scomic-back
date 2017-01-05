import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'
import fetch from 'isomorphic-fetch'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import comic_list from './components/comic/comic_list.vue'
import comic_form from './components/comic/comic_form.vue'
import story_list from './components/story/story_list.vue'
import story_form from './components/story/story_form.vue'
import blog_list from './components/blog/blog_list.vue'
import blog_form from './components/blog/blog_form.vue'
import echarts from './components/charts/echarts.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true//不显示在导航中
  },
  //{ path: '/main', component: Main },
  {
    path: '/comic',
    component: Home,
    name: 'comic',
    iconCls: 'el-icon-upload2',//图标样式class
    children: [
      { path: '/comic_list', component: comic_list, name: '漫画列表' },
      { path: '/comic_form', component: comic_form, name: '漫画上传' }
    ]
  },
  {
    path: '/story',
    component: Home,
    name: 'story',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/story_form', component: story_form, name: '微文上传' },
      { path: '/story_list', component: story_list, name: '微文列表' }
    ]
  },
  {
    path: '/blog',
    component: Home,
    name: 'blog',
    iconCls: 'fa fa-address-card',
    children: [
      { path: '/blog_form', component: blog_form, name: '博客上传' },
      { path: '/blog_list', component: blog_list, name: '博客列表' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')

