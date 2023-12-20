import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/login/RegisterView.vue'
import ForgetPwdView from '../views/login/ForgetPwdView.vue'
import allproductsView from '@/views/product/allproductsView.vue'
import ProjectManageView from '@/views/project/ProjectManageView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    //redirect: "/homepage/:selected?",
    component: HomeView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/forgetpwd',
    name: 'forgetpwd',
    component: ForgetPwdView
  },
  {

    path: '/project',
    name: 'project',
    component: ProjectManageView,
    //props: true,
  },
  {
    path: '/allproducts',
    name: 'allproducts',
    component: allproductsView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
