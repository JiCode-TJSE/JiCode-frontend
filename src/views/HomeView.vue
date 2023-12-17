
<template>
  <el-container class="src-container">
    <!--侧边导航栏-->
    <el-aside width="13%" class="sideBarContainer">
      <SideBar2 :selectedMenu="selectedMenu" @MenuSelect="handleSelect" />
    </el-aside>

    <el-container>
      <el-header class="header">
        <div>
          <el-icon color="#87CEFA" size="30">
            <SwitchFilled />
          </el-icon>
          <span>&nbsp;&nbsp;&nbsp;{{ title[selectedMenu] }}</span>
        </div>
        <!--用抽屉Drawer写帮助文档-->
        <!--还有Tooltip文字提示，可用性-->
        <el-button type="help" @click="helplog" :icon="QuestionFilled" circle />
        <!-- <img src="@/assets/backstage.png" alt=""> -->
        <!-- 放头像 -->
      </el-header>
      <el-main class="main">

        <!-- 工作台 -->
        <div v-if="selectedMenu === 'workBench'">

        </div>

        <!-- 项目管理总页 -->
        <div v-else-if="selectedMenu === 'projectManage'">
          <el-container class="projectContainer">
            <!--侧边导航栏-->
            <el-aside width=13% class="projectSideBar">
              <ProjectSideBar />
            </el-aside>
            <el-main>
              <ProjectManageView />
            </el-main>
          </el-container>
        </div>

        <!-- 产品管理总页 -->
        <div v-else-if="selectedMenu === 'productManage'">

        </div>

        <!-- 账号设置总页 -->
        <div v-else-if="selectedMenu === 'accountSet'">

        </div>
        <!--应用市场总页-->
        <div v-else-if="selectedMenu === 'appMarket'">

        </div>

      </el-main>
    </el-container>

  </el-container>
</template>

<script setup>
import {
  SwitchFilled,
  QuestionFilled,
} from '@element-plus/icons-vue'
import SideBar2 from "@/components/SideBar2.vue";
import ProjectManageView from "@/views/project/ProjectManageView.vue"

import ProjectSideBar from "@/components/project/ProjectSideBar.vue"
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由对象
// 使用路由参数
const selectedMenu = ref(route.params.selected || 'projectManage');

// 点击菜单项事件：
const handleSelect = (val) => {
  selectedMenu.value = val.item;
}
const title = ref({
  'workBench': '工作台',
  'projectManage': '项目管理',
  'productManage': '产品管理',
  'accountSet': '账号设置',
  'backstage': '管理后台',
  'appMarket': '应用市场'
})

</script>

<style scoped>
.src-container {
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
}


.projectContainer {
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;

}

.mainContainer {
  flex: 1;
  height: 100%;
  width: 100%;
  padding: 0;
}

.main {
  background-color: white;
  padding: 0;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;

}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: larger;
}
</style>