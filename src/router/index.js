import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/login/RegisterView.vue'
import ProjectReqView from '@/components/SideBar.vue'

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
    path: '/project',
    name: 'project',
    component: ProjectReqView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
