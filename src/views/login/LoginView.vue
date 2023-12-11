<template>
    <div id="login" class="background-image">
      <el-card class="login-card">
        <div class="login-text">登录</div>
        <form>
        <div class="input-info-1">
          <div class="label">账号：</div>
          <el-input v-model="loginform.username" placeholder="请输入账号"></el-input>
        </div>
        <div class="input-info-2">
          <div class="label">密码：</div>
          <el-input placeholder="请输入密码" v-model="loginform.password" show-password></el-input>
        </div>
        </form>
        <div class="section">
          <el-checkbox v-model="checkPassword" class="rememberMe"><span class="remember-me-text">记住我</span></el-checkbox>
          <el-link :underline="false" @click="jumpToRegister" class="registerLink">注册账号</el-link>
        </div>
        <el-button class="login-bt" @click="login">登录</el-button>
      </el-card>
    </div>
  </template>
  
  <script setup>
    import {ref} from 'vue';
    import {onMounted} from 'vue';
    import { ElMessage } from 'element-plus';
    import axios from 'axios';
    import router from '@/router';


    let loginform = ref({
      username: "",
      password: "",
    });

    let checkPassword = ref(true);

    const jumpToRegister = () =>{
      router.push('/register');
    }

    const login = () => {
      console.log("表单信息：", loginform.value); 
      console.log("formName:",loginform.value.username);
      if(validateForm()){
        axios({
          url:"/api/user/login",
          method:"post",
          headers:{
            "Content-Type":"application/json",
          },
          params:{
            uname:loginform.value.username,
            password:loginform.value.password,
          }
        }).then((response) => {
            // 处理响应
            console.log(response.data);
            if(response.data.code === "0"){
              
              localStorage.setItem("userInfo", JSON.stringify(response.data.data));
              // 跳转页面到首页
              router.push('/home');
              // 显示后端响应的成功信息
              ElMessage({
                message: response.data.msg,
                type: "success",
              });

            }else{
              ElMessage.error('登录错误');
            }
          })
          .then(()=>{
            if (checkPassword.value) {
              localStorage.setItem("username", loginform.value.username);
              localStorage.setItem("password", loginform.value.password);
            } else {
              localStorage.removeItem("username");
              localStorage.removeItem("password");
            }
          })
          .catch((error) => {
            // 处理错误
            console.error(error);
          });
      }else{
        ElMessage.error('用户名或密码为空');
      }
    };

    const validateForm = () => {
      const username = loginform.value.username;
      const password = loginform.value.password;

      if (!username || !password) {
        return false; // 验证未通过
      }
      return true; // 验证通过
    };

    onMounted(() => {
      if (localStorage.getItem("username") != null) {
        loginform.value.username = localStorage.getItem("username");
        loginform.value.password = localStorage.getItem("password");
      }
    });

  </script>

  <style scoped>
  #login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    margin: 0;
    padding: 0;
  }
  .rememberMe{
    padding-left: 10%;
  }
  .remember-me-text{
    font-size:small;
  }
  .registerLink{
    padding-left: 25%;
    padding-bottom: 3%;
    font-size: small;
  }
  .background-image{
    background-size: cover;
    background-image: url(../../assets/background.jpg);
    width: 100%;
    height: 100%; 
    margin: 0;
    padding: 0;
  }
  .section{
    padding-bottom: 2%;
  }
  .login-card{
    display: flex;
    justify-content: center;
    width:30%;
    height:33%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s, transform 0.3s;
    background-color:rgba(255, 255, 255, 0.5);
  }
  .login-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); 
    transform: scale(1.1); 
  }
  .input-info-1 {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    margin-bottom: 10%;
  }
  .input-info-2 {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
  }
  .label {
    font-size: 14px; 
    justify-self: end;
    margin-right: 10px;
  }
  .login-text{
    font-size: 24px; 
    padding-top: 1%;
    padding-bottom: 10%;
    margin-bottom: 5%;
  }
  .login-bt {
    overflow: hidden;
    position: relative;
    border: 2px solid rgb(0, 0, 0)!important;
    outline: none;
    transition: background-color .2s;
    background-color:rgb(255, 250, 204,0.5)!important;
    color:rgb(0, 0, 0)!important;
    border: none;
    border-radius: 5px;
    width:50%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)!important;
    cursor: pointer;
  }
  /* 创建一个覆盖按钮的伪元素 */
  .login-bt::before{
    content:"";
    position:absolute;
    width: 50%;
    height:100%;
    background-color: rgba(255, 255, 255, 0.5)!important;
    transform: skew(45deg) translate3d(-200px,0,0);
  }
  .login-bt:hover {
    background-color:rgba(0, 0, 0, 0.5)!important;
  }
  .login-bt:hover::before {
    transition: ease-in-out .8s; /* 设置伪元素的过渡效果 */
    transform: skew(45deg) translate3d(200px,0,0); /* 使用 3D 变换平移伪元素位置 */
  }

  </style>