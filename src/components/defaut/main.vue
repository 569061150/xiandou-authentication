<template>
  <el-container class="onlyel">
    <el-aside :class="{'is-active' : active }" style="width: 200px;">
      <sidebar :isCollapse="active"></sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <Header @leftstateFn="sd1"></Header>
      </el-header>
      <el-main>
        <router-view v-cloak></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from './sidebar'
  import Header from './header'

  export default {
    components: {Sidebar, Header},
    data() {
      return {
        active: false
      }
    },
    methods: {
      sd1() {
        this.active = !this.active
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  [v-cloak] {
    display: none !important;
  }

  .el-aside {
    transition: width 0.5s;
  }

  .el-aside.is-active {
    width: 64px !important;
    transition: width 0.5s;
  }
  .el-aside.is-active span{display: none;}

  .el-header, .el-footer {
    background-color: #fff;
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
  }

  .onlyel.el-container {
    position: absolute;
  }

  .el-container {
    margin-bottom: 0;
    height: 100%;
    width: 100%;
  }
  .el-message-box{vertical-align: top; margin-top: 10%;}

</style>
