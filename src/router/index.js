import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Settings from '@/components/Settings'
import PagesJgdList from '@/components/pages/JgdList'
import PagesJgdAdd from '@/components/pages/JgdAdd'
import PagesJgdInfo from '@/components/pages/JgdInfo'
import PagesJgdEdit from '@/components/pages/JgdEdit'
import PagesCompanyInfo from '@/components/pages/CompanyInfo'
import PagesShdInfo from '@/components/pages/ShdInfo'
import PagesShdList from '@/components/pages/ShdList'
import PagesThdInfo from '@/components/pages/ThdInfo'
import PagesThdList from '@/components/pages/ThdList'
import PagesFeeInfo from '@/components/pages/FeeInfo'
import PagesFeeList from '@/components/pages/FeeList'

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
      path: '/Pages/JgdList',
      name: 'PagesJgdList',
      component: PagesJgdList
    },
    {
      path: '/Pages/JgdAdd',
      name: 'PagesJgdAdd',
      component: PagesJgdAdd
    },
    {
      path: '/Pages/JgdInfo',
      name: 'PagesJgdInfo',
      component: PagesJgdInfo
    },
    {
      path: '/Pages/JgdEdit',
      name: 'PagesJgdEdit',
      component: PagesJgdEdit
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/Pages/CompanyInfo',
      name: 'PagesCompanyInfo',
      component: PagesCompanyInfo
    },
    {
      path: '/Pages/ShdInfo',
      name: 'PagesShdInfo',
      component: PagesShdInfo
    },
    {
      path: '/Pages/ShdList',
      name: 'PagesShdList',
      component: PagesShdList
    },
    {
      path: '/Pages/ThdInfo',
      name: 'PagesThdInfo',
      component: PagesThdInfo
    },
    {
      path: '/Pages/ThdList',
      name: 'PagesThdList',
      component: PagesThdList
    },
    {
      path: '/Pages/FeeInfo',
      name: 'PagesFeeInfo',
      component: PagesFeeInfo
    },
    {
      path: '/Pages/FeeList',
      name: 'PagesFeeList',
      component: PagesFeeList
    }
  ]
})
