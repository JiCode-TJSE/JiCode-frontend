<template>
    <el-container class="container" id="allproduct">
        <el-header class="header">
          <h1 class="title">全部产品</h1>
          <el-button class="addproduct" type="primary" icon="el-icon-plus">新建产品</el-button>
        </el-header>
    </el-container>
  </template>
  <script setup>
  console.log('hello')
  </script>
  <style scoped>
  #allproduct {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    margin: 0;
    padding: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
  }
 


  </style>