<template>

  <el-container>
    <el-header>
      长城汽车
    </el-header>
    <el-main>


      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">


        <el-form-item>
          <h1 class="title-container">长城鉴权系统</h1>
        </el-form-item>

        <el-form-item label="账户" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="margin-bottom: 0;">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="login-links">
            <a class="fl" href="/#/forgetPassword">修改密码</a>
            <a class="fr" href="/#/register">注册</a>
          </div>
        </el-form-item>


        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm('loginForm')">登 录</el-button>
        </el-form-item>


      </el-form>

    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>

</template>

<script>
  import {login} from '@/service/getData'
  import {setCookie} from '@/config/tools'
  import Footer from '@/components/defaut/footer'

  export default {
    components: {
      Footer
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
        console.log(value.length)
      };

      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入账户', trigger: 'blur'},
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    mounted() {
      console.log("this===")
    },
    methods: {
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {

            login(this.loginForm).then(function (res) {
              console.log("res===");
              console.log(res.data);

              localStorage.setItem("token", "1");
              _this.$router.push({path: '/'});

            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  a.fr {
    color: #333;
  }

  .title-container {
    position: relative;
    line-height: initial;
    font-size: 26px;
    color: #000000;
    margin: 0px auto 20px auto;
    text-align: center;
    font-weight: bold;
  }

  .el-header {
    text-align: left;
    line-height: 60px;
  }

  .el-footer {
    text-align: center;
  }

  .el-header, .el-footer {
    color: #333;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .demo-loginForm {
    width: 450px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
    left: calc(50% - 50px);
    top: 42%;
  }

  .el-form-item__error {
    bottom: calc(100% + 5px) !important;
    top: auto;
  }

  .el-form-item {
    margin-bottom: 32px;
    position: relative;
  }

  .login-links a {
    color: #000000;
    text-decoration: none;
  }

  .login-links a:hover {
    color: #409EFF;
    text-decoration: underline;
  }

</style>
