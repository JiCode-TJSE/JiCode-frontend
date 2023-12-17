import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
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
    path: '/project',
    name: 'project',
    component: ProjectManageView,
    //props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
