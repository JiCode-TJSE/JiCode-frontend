<template>
    <div>
        <div class="head-card">
      <el-row class="person-head">
        账号设置
      </el-row>
    </div>
    <div class="avatar-sector">
      <el-row class="avatar-text">
        账号信息
      </el-row>
      <el-row class="row-2-1">
        <el-text class="mx-1">
          邮箱
          <label class="custom-input"> <span>{{ email_now }}</span> </label>
        </el-text>
      </el-row>
      <el-row>
        <el-input v-model="email" placeholder="输入新的邮箱" clearable class="block-input" />
      </el-row>
      <el-row class="row-3-1">
        <el-text class="mx-1">
          手机号
          <label class="custom-input"> <span>{{ phone_now }}</span> </label>
        </el-text>
      </el-row>
      <el-row>
        <el-input v-model="phone" placeholder="输入新的手机号" clearable class="block-input" />
      </el-row>
    </div>
    <div>
      <el-row class="avatar-text">
        修改密码
      </el-row>
      <el-row class="row-1">
        <el-text class="mx-1">旧密码</el-text>
        <el-input v-model="old_password" placeholder="输入旧密码" clearable class="custom-input" />
      </el-row>
      <el-row class="row-2">
        <el-text class="mx-1">新密码</el-text>
        <el-input v-model="new_password" placeholder="输入新密码" clearable class="custom-input" show-password/>
      </el-row>
      <el-row class="row-3">
        <el-text class="mx-1">确认新密码</el-text>
        <el-input v-model="check_password" placeholder="再次输入新密码" clearable class="custom-input" show-password/>
      </el-row>
    </div>
    <div class="avatar-sector3">
      <el-row class="mb-4">
        <el-button type="success" class="custom-button" @click="saveUserData">确定</el-button>
        <el-button type="success" class="custom-button1" @click="deleteAccountData">注销</el-button>
      </el-row>
    </div>
    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAccountInfoRequest, updateAccountInfoRequest, deleteAccountRequest } from '@/api/request.js'
  import { ElMessage } from 'element-plus';
  //import { UserStore } from '@/stores/index';
  
 // const userStore = UserStore();
  //const userId = userStore.id;
  const now_password = ref('1234')
  
  const email_now = ref('')
  const phone_now = ref('')
  const email = ref('')
  const phone = ref('')
  
  const check_password = ref('')
  const new_password = ref('')
  const account_id = ref('123')
  const old_password = ref('')
  
  onMounted(async () => {
    try {
      const response = await getAccountInfoRequest(account_id)
      if (response.code == 200) {
        const userData = response.data;
        email_now.value = userData.email
        phone_now.value = userData.phone_number
      } else {
        ElMessage({
          type: 'error',
          message: response.msg,
        });
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: 'An error occurred during user data get',
      });
      console.error('Error:', error)
    }
  })
  
  async function saveUserData() {
    try {
      const updatedData = {
        account_id: account_id.value,
        password: new_password.value,
        email: email.value,
        phone_Number: phone.value
      };
  
      if (now_password.value !== old_password.value) {
        ElMessage.error('旧密码输入错误');
        return;
      }
  
      if (check_password.value !== new_password.value) {
        ElMessage.error('新密码和确认新密码输入不一致');
        return;
      }
      
      const response1 = await updateAccountInfoRequest(updatedData);
  
      if (response1.data) {
        now_password.value = new_password.value
        ElMessage({
          type: 'success',
          message: response1.msg,
        });
      } else {
        ElMessage({
          type: 'error',
          message: response1.msg,
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

  async function deleteAccountData() {
    try {
        const response = await deleteAccountRequest(account_id)
      if (response.data) {
        ElMessage({
          type: 'success',
          message: response.msg,
        });
      } else {
        ElMessage({
          type: 'error',
          message: response.msg,
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
  
.settings-container {
    max-height: calc(100vh - 100px); /* 视口高度减去顶部元素的高度 */
  overflow-y: auto;
  overflow-x: hidden;
}



    .block-input {
      margin-left: 180px;
      width: 500px;
      height: 37px;
    }
  
    .mx-1 {
      margin-left: 0;
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
      padding-bottom: 50px;
    }
  
    .avatar-text {
      margin-top: 30px;
      margin-left: 30px;
      font-size: 15px;
    }
  
    .avatar-sector3 {
      border-top: 1px solid #e9e9eb;
      padding-bottom: 15px;
      margin-top: 50px;
    }
  
    .row-1 {
      margin-top: 50px;
      left: 120px;
      margin-bottom: 20px;
    }
  
    .row-2 {
      margin-top: 15px;
      left: 120px;
      margin-bottom: 20px;
    }
  
    .row-2-1 {
      margin-top: 50px;
      left: 130px;
      margin-bottom: 20px;
    }
  
    .row-3 {
      margin-top: 15px;
      left: 92px;
      margin-bottom: 20px;
    }
  
    .row-3-1 {
      margin-top: 20px;
      left: 115px;
      margin-bottom: 20px;
    }
  
    .row-3-2 {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  
    .custom-input {
      width: 500px; /* 设置宽度，可以根据需要进行调整 */
      margin-left: 20px;
      height: 37px;
    }
  
    .mb-4 {
      margin-top: 30px;
      margin-left: 180px;
    }
  
    .custom-button {
      background-color: #409eff !important; /* 设置按钮背景颜色为蓝色 */
      color: white; /* 设置按钮文字颜色为白色 */
      border-color: #409eff !important;
      width: 90px;
      height: 37px;
    }
    .custom-button1 {
      background-color: rgb(204, 60, 60) !important; /* 设置按钮背景颜色为蓝色 */
      color: white; /* 设置按钮文字颜色为白色 */
      border-color: rgb(204, 60, 60)  !important;
      width: 90px;
      height: 37px;
      margin-left: 40px;
    }
  
  </style>
  
    