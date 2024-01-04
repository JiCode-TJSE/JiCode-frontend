<template>
    <div class="menu-container">
      <el-menu
        :default-active="$route.path" router
        mode="horizontal"
        background-color="transparent"
        text-color="#000"
        active-text-color="#409EFF"
        @select="handleSelect"
      >
      <el-menu-item disabled>工作台</el-menu-item>
        <el-menu-item index="/workspace/homepage">首页</el-menu-item>
        <el-menu-item index="/workspace/workhour">工时</el-menu-item>
      </el-menu>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  //import { ref } from 'vue';
  
  //const activeIndex = ref('1');
  
  //const handleSelect = (key, keyPath) => {
    //console.log(key, keyPath);
  //};
  </script>
  
  <style scoped>
  .menu-container .el-menu {
    border: none;
    background-color: transparent;
  }
  
  .menu-container .el-menu-item {
    font-size: 16px;
    font-weight: 400;
  }
  
  .menu-container .el-menu-item:hover {
    background-color: transparent;
  }
  
  .menu-container .el-menu-item.is-active {
    color: #409EFF;
    border-bottom: 2px solid #409EFF;
  }
  </style>
  