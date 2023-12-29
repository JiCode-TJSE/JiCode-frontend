import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ProjectManageView from '@/views/project/ProjectManageView.vue'
import SpecificProjectView from '@/views/project/SpecificProjectView.vue'
import AllProject from '@/components/project/AllProject.vue'
import Filter from '@/components/project/FilterComponent.vue'
import ProjectOverview from '@/components/project/ProjectOverview.vue'
import ProjectAllRequirement from '@/components/project/AllRequirement.vue'
import ProjectPublish from '@/components/project/ProjectPublish.vue'
import ProjectSprint from '@/components/project/ProjectSprint.vue'
import ProjectSetting from '@/components/project/ProjectSetting.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/homepage/",
    component: HomeView,

  },
  {
    path: '/homepage',
    name: "Homepage",
    component: HomeView,
    children: [  //使用嵌套路由
      {
        path: '/projectManage',
        name: 'projectManage',
        component: ProjectManageView,
        children: [
          {
            path: '/projectManage/allProject',
            name: 'allProject',
            component: AllProject,
          },
          {
            path: '/projectManage/projectFilter',
            name: 'projectFilter',
            component: Filter,
          },
        ]
      },
      {
        path: '/specificProject',
        name: 'specificProject',
        component: SpecificProjectView,
        children: [
          {
            path: '/specificProject/overview',
            name: 'overview',
            component: ProjectOverview,
          },
          {
            path: '/specificProject/requirement',
            name: 'requirement',
            component: ProjectAllRequirement,
          },
          {
            path: '/specificProject/publish',
            name: 'publish',
            component: ProjectPublish,
          },
          {
            path: '/specificProject/sprint',
            name: 'sprint',
            component: ProjectSprint,
          },
          {
            path: '/specificProject/setting',
            name: 'setting',
            component: ProjectSetting,
          },
        ]
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
