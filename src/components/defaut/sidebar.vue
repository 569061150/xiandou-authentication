<template>
  <div class="sidebar">
    <div class="name"><img src="@/images/icon_car_tips.png" title="长城汽车"><span>长城汽车</span></div>
    <el-row class="tac">
      <el-col :span="24">

        <el-menu
          :collapse="isCollapse"
          :default-active="$route.path"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#001529"
          text-color="#fff"
          router
          unique-opened
          active-text-color="#ffd04b">

          <el-submenu background-color="red" class="text-left"  :index='i+""' v-for="(item, i) in currentNavItems" :key="i" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}} </span>
            </template>
            <el-menu-item class="itemSubs" :index="itemSubs.path"  v-for="(itemSubs, ii) in item.subs" :key="ii">
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
    props: ["isCollapse"],
    data() {
      return {
        openeds: ['1'],
        openeds1: ['2'],
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
      handleOpen(key, keyPath) {
        console.log("展开");
        console.log(key);
        console.log(keyPath);
      },
      handleClose(key, keyPath) {
        console.log("关闭");
        console.log(key);
        console.log(keyPath);
      },
      getData(){
        this.currentNavItems = [
          {
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
                'path': '/Channel/ChannelManagement',
                'title': '渠道管理'
              }
            ]
          },
          {
            'title': '报表中心',
            'subs':[
              {
                'path': '/report/Center',
                'title': '报表中心'
              }
            ]
          }
        ]
      }
    },
    created() {
      this.getData();
      // this.openeds = JSON.parse(sessionStorage.getItem('showIndex'))

      // 从sessionStorage得到menuData
     // this.currentNavItems = JSON.parse(sessionStorage.getItem('routes'))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.name{background:#00284d;height: 60px;line-height: 60px;font-size:18px;}
.name img{vertical-align:middle; display: inline-block;}
.el-menu{border: 0;}
.text-left{text-align: left;}
.itemSubs{background: #002343!important;}
.itemSubs:hover{color: #ffd04b!important;}






</style>
