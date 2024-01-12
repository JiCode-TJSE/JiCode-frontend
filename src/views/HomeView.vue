
<template>
  <el-container class="src-container">
    <!-- 侧边导航栏 -->
    <el-aside width="13%" class="sideBarContainer">
      <SideBar :selectedMenu="selectedMenu" @MenuSelect="handleSelect" />
    </el-aside>

    <el-main class="main">
      <RouterView />
    </el-main>
    <!--  </el-container> -->


  </el-container>
</template>

<script setup>
/* eslint-disable */
import SideBar from "@/components/SideBar.vue";
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // 获取路由对象
const router = useRouter();
// 使用路由参数
const selectedMenu = ref(route.params.selected || 'workBench');
//默认打开页面改成工作台
router.push({ name: 'workBench' });
//点击菜单项事件：
const handleSelect = (val) => {
  selectedMenu.value = val.item;
  router.push({ name: val.item });
  // if (val.item === 'ProductManage') {
  //   router.push({ name: val.item, params: { id: '1' } });
  // } else {
  //   router.push({ name: val.item });
  // }
}

</script>

<style scoped>
.src-container {
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
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
</style>