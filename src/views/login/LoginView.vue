<template>
    <div id="login" class="background-image">
      <el-card class="login-card">
        <div class="login-text">登录</div>
        <form>
        <div v-if="chooseAccountId === false" class="input-info-1">
          <div class="label">邮箱：</div>
          <el-input v-model="loginform.email" placeholder="请输入邮箱"></el-input>
        </div>
        <div v-if="chooseAccountId === false" class="input-info-2">
          <div class="label">密码：</div>
          <el-input placeholder="请输入密码" v-model="loginform.password" show-password></el-input>
        </div>
            <el-cascader v-if="chooseAccountId === true"
                :options="options"  v-model="selectedValues"
                @change="handleChange"
                placeholder="请选择账号"
                style="margin-top: 20px; margin-left: 50px;"
            />
        </form>
        <div class="section">
          <el-checkbox v-model="checkPassword" class="rememberMe"><span class="remember-me-text">记住我</span></el-checkbox>
          <!-- <el-link :underline="false" @click="forgetPassword" class="passwordLink">忘记密码</el-link> -->
        </div>
        <el-button class="login-bt" @click="login" v-if="chooseAccountId === false">登录</el-button>
        <el-link :underline="false" @click="jumpToRegister" class="registerLink">注册账号</el-link>
      </el-card>
    </div>
  </template>
  
  <script setup>
    // import { mapActions } from 'vuex';
    import {ref} from 'vue';
    import {onMounted} from 'vue';
    import { ElMessage } from 'element-plus';
    import axios from 'axios';
    import router from '@/router';
    import store from '@/store';
    import {getAccountInfo, myLogin} from "@/api/login";

    let chooseAccountId = ref(false);

    let options = ref([
        {
            value: '1',
            label: '账号1',
        },
        {
            value: '2',
            label: '账号2',
        }
    ]);

    let selectedValues = ref([]);

    const handleChange = () => {
        localStorage.setItem("accountId", selectedValues.value[0]);
        getAccountInfo({
            accountId: selectedValues.value[0],
        })
            .then(resp => {
                localStorage.setItem("organizationId", resp.data.organizationId);
            })
            .catch(resp => {
                console.log(resp);
                ElMessage.error('获取账号信息失败，请刷新重试！');
            })
        router.push('/homepage');
    }

    let loginform = ref({
      email: "",
      password: "",
    });

    let checkPassword = ref(true);

    const jumpToRegister = () =>{
      router.push('/register');
    }


    const login = () => {
      console.log("表单信息：", loginform.value); 
      if(validateForm()){
          myLogin({
            email:loginform.value.email,
            password:loginform.value.password,
          })
              .then(resp => {
                    ElMessage.success('登录成功！');

                    chooseAccountId.value = true;

                    let accountList = resp.data.accountList;

                    for (let i = 0; i < accountList.length; i++) {
                        options.value[i].value = accountList[i].accountId;
                        options.value[i].label = accountList[i].accountId;
                    }
                })
              .then(()=>{
                  if (checkPassword.value) {
                      localStorage.setItem("email", loginform.value.email);
                      localStorage.setItem("password", loginform.value.password);
                  } else {
                      localStorage.removeItem("email");
                      localStorage.removeItem("password");
                  }
              })
              .catch(resp => {
                    console.log(resp);
                    ElMessage.error('登录失败，请刷新重试！');
                })
      } else {
        ElMessage.error('用户名或密码为空');
      }
    };

    const validateForm = () => {
      const email = loginform.value.email;
      const password = loginform.value.password;

      if (!email || !password) {
        return false; // 验证未通过
      }
      return true; // 验证通过
    };


    onMounted(() => {
      if (localStorage.getItem("email") != null) {
        loginform.value.email = localStorage.getItem("email");
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
    padding-right: 35%;
  }
  .remember-me-text{
    font-size:small;
  }
  .registerLink{
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: small;
  }
  .passwordLink{
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
  .login-card{
    position: relative;
    display: flex;
    justify-content: center;
    width:35%;
    height:38%;
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
    margin-bottom: 12%;
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
    margin-top: 5%;
    overflow: hidden;
    position: relative;
    border: 2px solid rgb(0, 0, 0)!important;
    outline: none;
    transition: background-color .2s;
    background-color:rgb(255, 255, 255,0.5)!important;
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
    transition: ease-in-out .8s; 
    transform: skew(45deg) translate3d(200px,0,0);
  }

  </style>