<template>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="back" @click="goBack">返回</el-menu-item>
          <el-menu-item index="1">需求</el-menu-item>
          <el-menu-item index="2">客户</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <!-- 根据选择的菜单项显示不同的组件 -->
        <component :is="selectedComponent"></component>
      </el-main>
    </el-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
//   import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import RequirementView from '@/views/product/RequirementView.vue'; 
  import ClientView from './ClientView.vue';
  
  const router = useRouter();
  const activeIndex = ref('1');
  const selectedComponent = ref(RequirementView); // 默认显示需求页面组件
  

  const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
    // 根据选择的菜单项更新显示的组件
    if (key === '1') {
      selectedComponent.value = RequirementView;
    } 
    else if (key === '2') {
      selectedComponent.value = ClientView;
    }
  };
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  