import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/login/RegisterView.vue'
import ForgetPwdView from '../views/login/ForgetPwdView.vue'
import allproductsView from '@/views/product/allproductsView.vue'
import ProjectManageView from '@/views/project/ProjectManageView.vue'
import SpecificProjectView from '@/views/project/SpecificProjectView.vue'
import AllProject from '@/components/project/AllProject.vue'
import Filter from '@/components/project/FilterComponent.vue'
import ProjectOverview from '@/components/project/ProjectOverview.vue'
import ProjectAllRequirement from '@/components/project/AllRequirement.vue'
import ProjectPublish from '@/components/project/ProjectPublish.vue'
import ProjectSprint from '@/components/project/ProjectSprint.vue'
import ProjectSetting from '@/components/project/ProjectSetting.vue'
import RequirementView from '@/views/product/RequirementView.vue'
import ProductManageView from '@/views/product/ProductManageView.vue'
import AccountSetView from '@/views/account/AccountSetView.vue'
import AccountBoard from '@/views/account/AccountBoard.vue'
import AccountInfo from '@/views/account/AccountInfo.vue'
import ClientView from '@/views/product/ClientView.vue'
import WorkSpace from '@/views/workspace/WorkSpace.vue'
import WorkHour from '@/views/workspace/WorkHour.vue'
import HomePageView from '@/views/workspace/HomePage.vue'
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
        path: '/specificProject/:id/:name',
        name: 'specificProject',
        component: SpecificProjectView,
        children: [
          {
            path: '/specificProject/:id/:name/overview',
            name: 'overview',
            component: ProjectOverview,
          },
          {
            path: '/specificProject/:id/:name/requirement',
            name: 'projectRequirement',
            component: ProjectAllRequirement,
          },
          {
            path: '/specificProject/:id/:name/publish',
            name: 'publish',
            component: ProjectPublish,
          },
          {
            path: '/specificProject/:id/:name/sprint',
            name: 'sprint',
            component: ProjectSprint,
          },
          {
            path: '/specificProject/:id/:name/setting',
            name: 'projectSetting',
            component: ProjectSetting,
          },
        ],
        props: true,
      },
      {
        path: '/allproducts',
        name: 'allproducts',
        component: allproductsView,
      },
      {
        path: '/product/:id',
        name: 'ProductManage',
        component: ProductManageView,
        props: true,
      },
      {
        path: '/account',
        name: 'accountSet',
        component: AccountBoard,
        redirect: '/account/info', // 添加重定向
        children: [
          {
            path: 'setting', // 注意去掉了 /account，因为它已经在父路由中指定
            name: 'setting',
            component: AccountSetView,
          },
          {
            path: '', // 使 /account 默认指向 AccountInfo
            name: 'info',
            component: AccountInfo,
          },
          {
            path: 'info', // 提供一个明确的路径到 AccountInfo
            component: AccountInfo,
          },
        ]
      },
      {
        path: '/workspace',
        name: 'workBench',
        redirect: '/workspace/homepage', // 添加重定向
        component: WorkSpace,
        children: [
          {
            path: '/workspace/homepage',
            name: 'homepage',
            component: HomePageView,
          },
          {
            path: 'workhour',
            component: WorkHour,
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

  {
    path: '/forgetpwd',
    name: 'forgetpwd',
    component: ForgetPwdView
  },
  {
    path: '/requirement',
    name: 'requirement',
    component: RequirementView
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router