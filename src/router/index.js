import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/login/RegisterView.vue'
import ForgetPwdView from '../views/login/ForgetPwdView.vue'
import ProjectReqView from '@/components/SideBar.vue'
import allproductsView from '@/views/product/allproductsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    component: ProjectReqView
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
