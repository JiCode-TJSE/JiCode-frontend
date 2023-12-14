<template>
  <div id="register" class="background-image">
    <el-card class="register-card">
      <div class="register-text">注册</div>
      <form class="form-container">
      <div class="input-info-1 text-center">
        <div class="label">&nbsp;&nbsp;&nbsp;&nbsp;邮箱：</div>
        <el-input v-model="registerform.email" placeholder="请输入邮箱" style="width: 390px;"></el-input>
      </div>
      <div class="input-info-1 text-left">
        <div class="label">验证码：</div>
        <el-input placeholder="请输入验证码" v-model="registerform.code" show-password style="width: 205px;">
          <template #append>
            <el-button class="verification-button" @click="getVerificationCode">获取验证码</el-button>
          </template>
        </el-input>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="input-info-1">
            <div class="label">用户名：</div>
            <el-input v-model="registerform.username" placeholder="请设置用户名" style="width: 150px;"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="input-info-1">
            <div class="label">密码：</div>
            <el-input v-model="registerform.password" placeholder="请设置密码" style="width: 150px;"></el-input>
          </div>
        </el-col>
      </el-row>
      </form>
      <el-button class="register-bt" @click="register">注册</el-button>
    </el-card>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import { sendEmailCode } from '@/api/emailCode';
  import { doRegister } from '@/api/login';
  import { ElMessage } from 'element-plus';
  import router from '@/router';


  let registerform = ref({
    email: "",
    code: "",
    username:"",
    password:"",
  });

  let verifiedCode = '';

  const getVerificationCode = () => {
    const email = registerform.value.email.trim();
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log('Email:', email);

    if (!email) {
      ElMessage.error('邮箱不能为空');
    } else if (!emailFormat.test(email)) {
      ElMessage.error('请输入有效的邮箱地址');
    } else {
      
      sendEmailCode(email)
        .then(res => {
          ElMessage.success(res.data.msg);
          verifiedCode = res.data.verificationCode;
        })
        .catch(error => {
          console.error('Error getting verification code:', error);
          ElMessage.error('获取验证码失败');
        });
    }
  };

  const register = () => {
    console.log('表单信息：', registerform.value);
    if (!registerform.value.code) {
      ElMessage.error('验证码不能为空');
    } else if (!registerform.value.email) {
      ElMessage.error('邮箱不能为空');
    } else if (!registerform.value.username) {
      ElMessage.error('用户名不能为空');
    } else if (!registerform.value.password) {
      ElMessage.error('密码不能为空');
    } else if (registerform.value.code === verifiedCode) {
      console.log('验证码发送成功');
      ElMessage.success('验证码发送成功');
      doRegister(registerform.value)
        .then(resp => {
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          console.log(resp);
          router.push("/login/");
        })
        .catch(resp => {
          ElMessage({
            message: '注册失败',
            type: 'warning',
          })
          console.log(resp);
        })
      
    } else {
      ElMessage.error('验证码错误');
    }
  };
  
</script>

<style scoped>
#register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  margin: 0;
  padding: 0;
}
.background-image{
  background-size: cover;
  background-image: url(../../assets/background.jpg);
  width: 100%;
  height: 100%; 
  margin: 0;
  padding: 0;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.verification-button {
  right: 20px; 
  padding: 5px 5px; 
  font-size: 12px!important;
  border: none!important;
  background-color: rgb(139, 185, 192)!important; 
  color: white!important; 
}
.verification-button:active {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
}

.register-card{
  position: relative;
  display: flex;
  justify-content: center;
  width:35%;
  height:38%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s, transform 0.3s;
  background-color:rgba(255, 255, 255, 0.5);
}
.register-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); 
  transform: scale(1.1); 
}
.input-info-1 {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  margin-bottom: 5%;
}

.label {
  font-size: 14px; 
  justify-self: end;
  margin-right: 5px;
}
.register-text{
  font-size: 24px; 
  padding-top: 1%;
  padding-bottom: 3%;
  margin-bottom: 5%;
}
.register-bt {
  overflow: hidden;
  position: relative;
  border: 2px solid rgb(0, 0, 0)!important;
  outline: none;
  transition: background-color .2s;
  background-color:rgb(255, 255, 255,0.5)!important;
  color:rgb(0, 0, 0)!important;
  border: none;
  border-radius: 5px;
  width:30%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)!important;
  cursor: pointer;
  margin-top: 3%;
  margin-bottom: 3%;
}
/* 创建一个覆盖按钮的伪元素 */
.register-bt::before{
  content:"";
  position:absolute;
  width: 50%;
  height:100%;
  background-color: rgba(255, 255, 255, 0.5)!important;
  transform: skew(45deg) translate3d(-200px,0,0);
}
.register-bt:hover {
  background-color:rgba(0, 0, 0, 0.5)!important;
}
.register-bt:hover::before {
  transition: ease-in-out .8s; 
  transform: skew(45deg) translate3d(200px,0,0);
}

</style>