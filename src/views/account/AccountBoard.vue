<template>
    <div class="settings-container">
     
    
     <div class="header">
         
       <el-row>
         <el-icon class="header-icon"><Tools /></el-icon>
         <h5 class="header-title">账号设置</h5>
       </el-row>
     </div>
     <div class="app">
         
       <el-col :span="4" class="sidebar">
         <h5 class="title">访问</h5>
         <el-menu :default-active="$route.path" router class="el-menu-vertical-demo">
           <el-menu-item index="/account/info"><el-icon><User /></el-icon>个人资料</el-menu-item>
           <el-menu-item index="/account/setting"><el-icon><Setting /></el-icon>账号设置</el-menu-item>
         </el-menu>
       </el-col>
       <div class="main-content">
         <router-view></router-view>
       </div>
     </div>
 </div>
   </template>
   
   <script setup>
   
   </script>
   
   <style scoped>
 .settings-container {
     max-height: calc(100vh); /* 视口高度减去顶部元素的高度 */
   overflow-x: hidden;
 }
   .header {
     width: 100%;
     height: 7vh;
     background-color: white;
     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
     display: flex;
     align-items: center;
   }
   .header-icon {
     color: rgb(228, 73, 104);
     margin-left: 15px;
     margin-top: 3px;
     transform: scale(1.2);
   }
   .header-title {
     font-size: 16px;
     margin-left: 10px;
   }
   .app {
     display: flex;
   }
   .sidebar {
     margin-top: 0vh;
     background-color: #fbfbfb;
     border-right: 1px solid #e9e9eb;
     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
   }
   .title {
     margin-top: 2vh;
     text-align: left;
     margin-left: 15px;
     font-size: 14px;
     font-weight: 500;
     line-height: 5vh;
     height: 5vh;
     color: gray;
   }
   .el-menu-vertical-demo {
     width: 100%;
     background-color: #fbfbfb;
     border-right: 1px solid #e9e9eb;
     height: 800px;
     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
   }
   .el-menu-item {
     display: block;
     text-align: center;
     width: 100%;
   }
   .main-content {
     flex: 1;
     padding: 20px;
   }
   .el-menu-item.is-active {
     background-color: #409eff;
     color: #fbfbfb;
   }
   </style>
   