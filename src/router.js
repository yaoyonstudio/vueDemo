import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from './components/Index'
import Shop from './components/Shop'
import MyCenter from './components/MyCenter'
import Hello from './components/Hello'

const routes = [
  {path: '/index', name: 'Index', component: Index, alias: '/'},
  {path: '/shop', name: 'Shop', component: Shop},
  {path: '/myCenter', name: 'MyCenter', component: MyCenter},
  {path: '/hello', name: 'Hello', component: Hello}
]

export default new VueRouter({
  base: '/',
  routes
})
