import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import JgdList from '@/components/pages/JgdList'
import JgdAdd from '@/components/pages/JgdAdd'
import JgdInfo from '@/components/pages/JgdInfo'
import Login from '@/components/Login'
import Register from '@/components/Register'

import 'vue2-toast/lib/toast.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

import Toast from 'vue2-toast'
import VuejsDialog from 'vuejs-dialog'

Vue.use(Router)
Vue.use(Toast)
Vue.use(VuejsDialog)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/JgdList',
      name: 'JgdList',
      component: JgdList
    },
    {
      path: '/JgdAdd',
      name: 'JgdAdd',
      component: JgdAdd
    },
    {
      path: '/JgdInfo',
      name: 'JgdInfo',
      component: JgdInfo
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
