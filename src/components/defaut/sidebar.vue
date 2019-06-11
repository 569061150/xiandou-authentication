<template>
  <div class="sidebar">
    <div class="name"><img src="@/images/icon_car_tips.png" title="长城汽车"><span>长城汽车</span></div>
    <el-row class="tac">
      <el-col :span="24">

        <el-menu
          :default-active="$route.path"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#fff"
          router
          unique-opened
          active-text-color="#ffd04b">

          <el-submenu class="text-left"  :index='i+""' v-for="(item, i) in currentNavItems" :key="i" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}} </span>
            </template>
            <el-menu-item :index="itemSubs.path"  v-for="(itemSubs, ii) in item.subs" :key="ii">
              <span>{{itemSubs.title}} </span>
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
      },
      getData(){
        this.currentNavItems = [
          {
            'path': '#',
            'title': '鉴权管理',
            'subs':[
              {
                'path': '/jq_management/equipment',
                'title': '设备鉴权'
              },
              {
                'path': '/jq_management/account',
                'title': '账号鉴权'
              }
            ]
          },
          {
            'path': '#',
            'title': '鉴权管理',
            'subs':[
              {
                'path': '/Black_White_List/equipmentList',
                'title': '设备黑白名单'
              },
              {
                'path': '/Black_White_List/accountList',
                'title': '账号黑白名单'
              }

            ]
          },
          {
            'title': '渠道管理',
            'subs':[
              {
                'path': '/channelManagement',
                'title': '渠道管理'
              }
            ]
          }
        ]
      }
    },
    created() {
      this.getData();
      this.openeds = JSON.parse(sessionStorage.getItem('showIndex'))

      // 从sessionStorage得到menuData
     // this.currentNavItems = JSON.parse(sessionStorage.getItem('routes'))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.name{background:#000000;height: 60px;line-height: 60px;font-size:18px;}
.name img{vertical-align:middle; display: inline-block;}
.el-menu{border: 0;}
.text-left{text-align: left;}

</style>
