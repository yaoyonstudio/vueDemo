import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from './components/Index'
import Articles from './components/IndexComponents/Articles'
import Article from './components/IndexComponents/Article'
import Shop from './components/Shop'
import MyCenter from './components/MyCenter'
import Hello from './components/Hello'

const routes = [
  {path: '/index', name: 'Index', component: Index, alias: '/'},
  {path: '/articles', name: 'Articles', component: Articles},
  {path: '/articles/:id', name: 'Article', component: Article},
  {path: '/shop', name: 'Shop', component: Shop},
  {path: '/myCenter', name: 'MyCenter', component: MyCenter},
  {path: '/hello', name: 'Hello', component: Hello}
]

export default new VueRouter({
  base: '/',
  routes
})
