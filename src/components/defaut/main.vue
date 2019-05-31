<template>
  <el-container class="onlyel">
    <el-aside width="200px">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
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
        user: ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  [v-cloak] {
    display: none !important;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #333;
    color: #fff;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .onlyel.el-container{position: absolute;}
  .el-container {
    margin-bottom: 0px;
    height: 100%;
    width:100%;
  }

  .el-container .el-aside{

  }

  .el-container {

  }
</style>
