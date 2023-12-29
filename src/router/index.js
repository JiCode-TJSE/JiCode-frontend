import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ProjectManageView from '@/views/project/ProjectManageView.vue'
import SpecificProjectView from '@/views/project/SpecificProjectView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/homepage/",
    component: HomeView,

  },
  {
    path: '/homepage/:selected?',
    name: "Homepage",
    component: HomeView,
    children: [  //使用嵌套路由
      {
        path: '/projectManage',
        name: 'projectManage',
        component: ProjectManageView,
      },
      {
        path: '/SpecificProject',
        name: 'SpecificProject',
        component: SpecificProjectView,
      },
    ],
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

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
