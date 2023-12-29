<template>
    <div class="head-card">
      <el-row class="person-head">
        个人资料
      </el-row>
    </div>
    <div>
      <el-row class="avatar-text">
        头像
      </el-row>
    </div>
    <div class="avatar-sector">
      <el-card class="profile-card">
        <div class="card-section top-section"></div>
        <div class="avatar-wrapper">
          <el-avatar class="avatar" size="large" shape="circle" :src="avatar">用户</el-avatar>
        </div>
        <div class="card-section bottom-section">
          <!-- 在这里放置其他个人信息 -->
        </div>
      </el-card>
    </div>
    <div>
      <el-row class="avatar-text">
        基本信息
      </el-row>
      <el-row class="name">
        <el-text class="mx-1">姓名:</el-text>
        <el-input v-model="name" placeholder="Please input" clearable class="custom-input1" />
      </el-row>
      <el-row class="sex">
        <el-text class="mx-1">性别:</el-text>
        <el-select class="sex-item" v-model="gender" placeholder="请选择性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-row>
      <el-row class="username">
        <el-text class="mx-1">用户名:</el-text>
        <el-input v-model="username" placeholder="Please input" clearable class="custom-input3" />
      </el-row>
      <el-row class="mb-4">
        <el-button type="success" class="custom-button" @click="saveUserData">确定</el-button>
      </el-row>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getUserInfoRequest, updateUserInfoRequest } from '@/api/request.js'
  import { ElMessage } from 'element-plus';
 // import { UserStore } from '@/stores/index';
  
//  const userStore = UserStore();
//  const userId = userStore.id;
  const account_id = ref('123');
  const name = ref('');
  const gender = ref('');
  const username = ref('');
  const avatar = ref('');
  
  //const userIdJSON = { userid: userId };
  
  onMounted(async () => {
    try {
      const response = await getUserInfoRequest(account_id);
      //console.log(JSON.stringify(userIdJSON));
      if (response.code==200) {
        const userData = response.data;
        username.value = userData.user_name;
        gender.value = userData.gender;
        name.value = userData.name;
        avatar.value = userData.avatar;
        ElMessage({
          type: 'success',
          message: 'success',
        });
      } else {
        ElMessage({
          type: 'error',
          message: response.message,
        });
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'An error occurred during user data retrieval',
      });
      console.error('Error:', error);
    }
  });
  
  async function saveUserData() {
    try {
      const updatedData = {
        gender: gender.value,
        name: name.value,
        user_name: username.value,
      };
  
      const response = await updateUserInfoRequest(updatedData);
  
      if (response.success) {
        ElMessage({
          type: 'success',
          message: 'User data updated successfully',
        });
      } else {
        ElMessage({
          type: 'error',
          message: 'Failed to update user data',
        });
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'An error occurred during user data update',
      });
      console.error('Update Error:', error);
    }
  }
  </script>
  
    
  <style scoped>
  .profile-card {
    border-radius: 10px;
    overflow: hidden;
    position: relative; /* 为了绝对定位头像的外层容器 */
    text-align: center;
    width: 300px; /* 设置卡片宽度，可根据需要调整 */
  }
  
  .card-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .top-section {
    background-color: #3498db;
    padding: 20px 0; /* 可根据需要调整 */
  }
  
  .bottom-section {
    background-color: #ffffff;
    padding: 40px 20px; /* 可根据需要调整 */
  }
  
  .avatar-wrapper {
    position: absolute;
    top: 50%; /* 将头像外层容器的顶部设置到卡片的50%高度 */
    left: 50%; /* 将头像外层容器的左侧设置到卡片的50%宽度 */
    transform: translate(-50%, -50%); /* 使用transform将头像居中对齐 */
    z-index: 2;
  }
  
  .avatar {
    border: 4px solid #ffffff; /* 头像边框颜色为白色 */
    z-index: 2;
    width: 80px; /* 设置头像的宽度 */
  height: 80px; /* 设置头像的高度 */
  }
  
  .head-card {
    border-bottom: 1px solid #e9e9eb;
    padding-bottom: 15px;
    margin-left: -20px;
    width: 120%;
  }
  
  .person-head {
    margin-left: 20px;
    font-size: 16px;
  }
  
  .avatar-sector {
    border-bottom: 1px solid #e9e9eb;
    padding-bottom: 15px;
    margin-top: 20px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  
  .avatar-text {
    margin-top: 30px;
    margin-left: 30px;
    font-size: 15px;
  }
  
  .name {
    margin-top: 50px;
    left: 120px;
  }
  
  .sex {
    margin-top: 15px;
    left: 120px;
  }
  
  .sex-item {
    margin-left: 35px;
    width: 300px;
  }
  
  .username {
    margin-top: 15px;
    left: 120px;
  }
  
  .custom-input3 {
    width: 300px; /* 设置宽度，可以根据需要进行调整 */
    margin-left: 20px;
  }
  
  .custom-input1 {
    width: 300px; /* 设置宽度，可以根据需要进行调整 */
    margin-left: 35px;
  }
  
  .mb-4 {
    margin-top: 30px;
    margin-left: 200px;
  }
  
  .custom-button {
    background-color: #409eff !important; /* 设置按钮背景颜色为蓝色 */
    color: white; /* 设置按钮文字颜色为白色 */
    border-color: #409eff !important;
    width: 90px;
    height: 35px;
  }
  </style>
  