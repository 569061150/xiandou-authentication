<template>
  <div class="commit_loading">
    <div class="c_main fs_12">
      <div class="c_txt">
        <img src="../images/loading.png"/>
        <slot name="loadTxt1"></slot>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  @import './../style/mixin';
  .commit_loading{
    position:fixed;
    @include wh(100%,100%);
    display:table;
    top:0;
    left:0;
    z-index:999;
    .c_main{
      vertical-align: middle;
      display: table-cell;
      text-align: center;

      .c_txt{
        width: 38%;
        margin: 0 28%;
        height: 1.2rem;
        line-height: 1.2rem;
        background: rgba(74, 74, 74, 0.51);
        border-radius: 20px;
        color: #fff;
        span{color: #fff;    margin-left: 8px;}
        img{
          width:15%;
          vertical-align: middle;
          animation: 2s linear 0s normal none infinite rotate;
          -webkit-animation: 2s linear 0s normal none infinite rotate;
        }

      }

    }

  }

</style>
