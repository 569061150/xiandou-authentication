<template>
  <div class="sidebar">
    <div  class="name">长城汽车</div>
    <el-row class="tac">
      <el-col :span="24">

        <el-menu
          :default-active="$route.path"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          router
          unique-opened
          active-text-color="#ffd04b">

          <el-submenu :index="child.subs[index].index" v-for="(child, index) in currentNavItems" :key="index">

            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{child.title}} </span>
            </template>
            <el-menu-item :index="item.index" v-for="(item,indexs) in child.subs" :key="indexs">
              {{item.title}}
            </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'v-sidebar',
    data() {
      return {
        openeds: ['1'],
        openeds1: ['2'],
        isClicked: false,
        iconData: {metas: ''},
        systems: '',
        items: '',
        value: '',
        input2: '',
        navData: '',
        currentNavItems: [],
        isHover: false
      }
    },
    methods: {
      umber(n) {
        return n.replace(/[^0-9]/ig, "")
      },
      sliderHover() {
        this.isClicked = false
      },
      handleOpen(key, keyPath) {
        console.log("展开");
        console.log(key);
        console.log(keyPath);
        sessionStorage.setItem('showIndex', JSON.stringify(keyPath));
      },
      handleClose(key, keyPath) {
        console.log("关闭");
        console.log(key);
        console.log(keyPath);
      }
    },
    created() {
      this.openeds = JSON.parse(sessionStorage.getItem('showIndex'))

      // 从sessionStorage得到menuData
      this.currentNavItems = JSON.parse(sessionStorage.getItem('routes'))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.name{background:#000000}

</style>
