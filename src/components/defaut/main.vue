<template>
  <el-container class="onlyel">
    <el-aside :class="{'is-active' : active }">
      <sidebar :isCollapse="active"></sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <div class="hd">
          <div class="fl sd1" @click="sd1">
            <span></span><span>长城鉴权系统</span>
          </div>
          <div class="fr sd1" @click="exit"><span>Daisy</span><span></span></div>
        </div>
      </el-header>
      <el-main>
        <router-view v-cloak></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from './sidebar'
  import Navbar from './Navbar'

  export default {
    components: {Sidebar, Navbar},
    data() {
      return {
        user: '',
        active: false
      }
    },
    methods: {
      sd1() {
        this.active = !this.active
      },
      exit(){
          localStorage.removeItem("token");
          this.$router.push('/login')
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  [v-cloak] {
    display: none !important;
  }

  .el-aside {
    transition: width 0.5s;
  }

  .el-aside.is-active {
    width: 64px !important;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #001529;
    color: #fff;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .onlyel.el-container {
    position: absolute;
  }

  .el-container {
    margin-bottom: 0px;
    height: 100%;
    width: 100%;
  }

  .el-container .el-aside {

  }

  .sd1 {
    cursor: pointer;
  }
</style>
