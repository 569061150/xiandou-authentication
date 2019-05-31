<template>

  <el-container>
    <el-header>
      长城汽车
    </el-header>
    <el-main>


      <el-form :model="forgetForm" :rules="rules" ref="forgetForm" label-width="100px" class="demo-forgetForm">


        <el-form-item>
          <h1 class="title-container">修改密码</h1>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="forgetForm.username"></el-input>
        </el-form-item>

        <el-form-item label="原始密码" prop="oldPassword">
          <el-input type="password" v-model="forgetForm.oldPassword"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newsPassword">
          <el-input type="password" v-model="forgetForm.newsPassword"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="repeatPassword">
          <el-input type="password" v-model="forgetForm.repeatPassword"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submitForm('forgetForm')">修改</el-button>
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
      let validatePassold = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原始密码'));
        } else {
          callback();
        }
      };
      let validatePassnews = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };
      let validatePassrepeat = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原始密码'));
        }else if (value !== this.forgetForm.newsPassword) {
          callback(new Error("2次密码不一致，请重新输入！"));
        } else {
          callback();
        }
      };

      return {
        showAlert:false,
        forgetForm: {
          username: '',
          oldPassword: '',
          newsPassword: '',
          repeatPassword: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账户', trigger: 'blur'},
          ],
          oldPassword: [
            {required: true, validator: validatePassold, trigger: 'blur'}
          ],
          newsPassword: [
            {required: true, validator: validatePassnews, trigger: 'blur'}
          ],
          repeatPassword: [
            {required: true, validator: validatePassrepeat, trigger: 'blur'}
          ]
        }
      };
    },
    mounted() {
      console.log("this===")
    },
    methods: {
      closeTip() {
        this.showAlert = false;
      },
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$message({
              message:"恭喜您，修改成功！",
              type:"success",
              duration:1000,
              onClose:function () {
                _this.$router.push({path: '/login'});
              }
            });


            // login(this.forgetForm).then(function(res){
            //   console.log("res===");
            //   console.log(res.data);
            // });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }

  }
</script>


<style lang="scss">

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

  .demo-forgetForm {
    width: 450px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
    left: calc(50% - 50px);
    top: 42%;
  }

  .el-form-item__error {
    top: -20px;
  }

  .el-form-item {
    margin-bottom: 25px;
  }
</style>
