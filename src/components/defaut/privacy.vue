<template>

  <el-container class="help">
    <el-header>
      <a href="/">LOGO</a>
    </el-header>
    <el-main>
      welcome-privacy
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>

  </el-container>


</template>

<script>
  import Footer from '@/components/defaut/footer'

  export default {
    components: {
      Footer
    }
  }
</script>

<style>
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
</style>
