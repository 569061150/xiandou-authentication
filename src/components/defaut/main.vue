<template>
  <el-container class="onlyel">
    <el-aside ref="elaside" :width="width">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <div class="hd">
          <div class="fl sd1" @click="anWidth"><span></span><span>长城鉴权系统</span></div>
          <div class="fr sd1"><span>Daisy</span><span></span></div>
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
        width:"200px"
      }
    },
    methods:{
      anWidth(){
        this.width = this.width == "200px" ? "80px" : "200px"
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

  .sd1 {
    cursor: pointer;
  }
</style>
