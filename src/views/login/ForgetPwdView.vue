  <template>
    <div id="forgetpassword" class="background-image">
      <el-card class="login-card">
        <div class="login-text">邮箱验证码登录</div>
        <form>
          <div class="input-info-1">
            <div class="label">&nbsp;&nbsp;&nbsp;&nbsp;邮箱：</div>
            <el-input v-model="emailform.email" placeholder="请输入邮箱"></el-input>
          </div>
          <div class="input-info-2">
            <div class="label">验证码：</div>
            <el-input placeholder="请输入验证码" class="input-with-button" v-model="emailform.code" show-password>
              <template #append>
                <el-button class="verification-button" @click="getVerificationCode">获取验证码</el-button>
              </template>
            </el-input>
          </div>
        </form>
        <el-button class="login-bt" @click="login">登录</el-button>
      </el-card>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { sendEmailCode } from '@/api/emailCode';
  import { ElMessage } from 'element-plus';
  import router from '@/router';

  let emailform = ref({
    email: '',
    code: '',
  });
  
  let verifiedCode = '';

  const getVerificationCode = () => {
    const email = emailform.value.email.trim();
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

  const login = () => {
    console.log('表单信息：', emailform.value);
    if (!emailform.value.code) {
      ElMessage.error('验证码不能为空');
    } else if (emailform.value.code === verifiedCode) {
      console.log('Login successful');
      ElMessage.success('登录成功');
      router.push('/home');
    } else {
      ElMessage.error('验证码错误');
    }
  };
  
  </script>


  <style scoped>
  #forgetpassword {
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
  .input-with-button {
    position: relative;
    display: inline-block; 
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
    margin-bottom: 10%;
  }
  .input-info-2 {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    margin-bottom: 8%;
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