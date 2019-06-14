<template>
  <div class="hd">
    <div class="fl sd1" @click="leftstateFn">
      <i class="el-icon-s-fold"></i><span>{{$route.meta.title}}</span>
    </div>
    <div class="fr sd1" @click="open"><span>Daisy</span><i class="el-icon-s-unfold"></i></div>


  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created: function () {

    },
    methods: {
      leftstateFn() {
        this.$emit('leftstateFn');
      },
      open() {
        this.$confirm('是否退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem("token");
          this.$router.push('/login');
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sd1 {
    cursor: pointer;
    font-size: 18px;
  }

  .el-icon-s-unfold {
    margin-right: 3px;
  }

  .el-icon-s-unfold {
    margin-left: 3px;
  }

  .el-icon-s-fold, .el-icon-s-unfold {
    font-size: 22px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

</style>
