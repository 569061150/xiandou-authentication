<template>
  <div class="container">


    <section class="choose">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" ref="formInline" label-width="100px"
               :rules="rules"
               class="demo-form-inline">
        <div class="hd">
          <div class="span">

            <el-form-item label="渠道名称" prop="ChannelName">
              <el-select v-model="formInline.ChannelName">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

          </div>

          <div class="span">
            <el-form-item label="设备标识：" prop="mark">
              <el-input v-model="formInline.mark" placeholder="请输入车机SN号、IEMI等标识"></el-input>
            </el-form-item>
          </div>

          <div class="span">
            <el-form-item label="vin：" prop="vin">
              <el-input v-model="formInline.vin" placeholder="请输入17位Vin号"></el-input>
            </el-form-item>
          </div>


          <div class="span">
            <el-form-item label="名单类型" prop="ListType">
              <el-select v-model="formInline.ListType">
                <el-option label="全部名单" value="shanghai"></el-option>
                <el-option label="黑名单" value="shanghai"></el-option>
                <el-option label="白名单" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </div>


          <div class="span">
            <el-form-item label="IP地址：" prop="IPaddress">
              <el-input v-model.number="formInline.IPaddress" placeholder="请输入IP地址"></el-input>
            </el-form-item>
          </div>


          <div class="span" style="float: right;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
              <el-button @click="resetForm('formInline')">重置</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </section>

    <div class="info_inner">
      <div>

        <div style="margin-bottom: 20px;text-align: left;">
          <el-button type="primary">新建</el-button>
          <el-button type="">删除</el-button>
          <el-button type="">批量互转</el-button>

          <el-button class="fr" type="">导出</el-button>
        </div>


        <el-table
          height="350"
          :data="tableData"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"

        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="number"
            min-width="50"
            align="center"
            label="序号"
          >
          </el-table-column>


          <el-table-column
            prop="channel"
            min-width="150"
            align="center"
            label="渠道类别"
          >
          </el-table-column>

          <el-table-column
            prop="snNumber"
            min-width="234"
            align="center"
            label="设备标识"
          >
          </el-table-column>

          <el-table-column
            prop="vinNumber"
            min-width="234"
            align="center"
            label="Vin码"
          >
          </el-table-column>

          <el-table-column
            prop="ipAddress"
            min-width="150"
            align="center"
            label="IP地址"
          >
          </el-table-column>

          <el-table-column
            prop="nameTypes"
            min-width="150"
            align="center"
            label="名单类型"
          >
          </el-table-column>

          <el-table-column
            prop="reason"
            min-width="100"
            align="center"
            label="操作">

            <template slot-scope="scope">
              <el-button
                @click.native.prevent="updateRow(scope.$index, tableData)"
                type="text"
                size="small">
                修改
              </el-button>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <div class="block pdt35">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>


  </div>
</template>

<script>
  // import {generaMenu} from '@/config/tools'
  import {getEquipmentDate} from '@/service/getData'

  export default {
    name: 'equipment',
    data() {
      return {
        currentPage3: 5,
        formInline: {
          ChannelName: "",
          mark: '',
          vin: "",
          ListType: "",
          IPaddress: ""
        },
        rules: {
          // ChannelName: [
          //   {required: true, message: '请选择渠道名称', trigger: 'change'},
          // ],
          // mark: [
          //   {required: true, message: '请输入车机SN号、IEMI等标识', trigger: 'blur'},
          // ],
          // vin: [
          //   {required: true, message: '请输入17位Vin号', trigger: 'blur'},
          // ],
          // ListType: [
          //   {required: true, message: '请选择名单类型', trigger: 'change'},
          // ],
          // IPaddress: [
          //   {required: true, message: '请输入IP地址', trigger: 'change'}
          // ],
          // resource: [
          //   {required: true, message: '请选择鉴权状态', trigger: 'change'}
          // ]
        },
        labelPosition: 'right',
        tableData: []
      }
    },
    mounted() {

    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          console.log(this.formInline)
          if (valid) {
            alert('submit!');
            this.getInfoFn();

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async getInfoFn(param) {

        for (var i = 0; i < 5; i++) {
          this.tableData.push({
            number: i,
            channel: '博泰车机',
            snNumber: 'QBLKVL71161810290051',
            vinNumber: 'KVL71161810290051',
            ipAddress: '175.164.139.246 ',
            nameTypes: '黑名单',
            reason: '成功'
          })
        }

        const res = await getEquipmentDate(param);
        console.log("res===")
        console.log(res)
        if (res && res.status === 200) {

        } else {

        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      updateRow(index, rows) {
        console.log(index)
        console.log(rows)

       // rows.splice(index, 1);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .span {
    display: block;
    float: left;
    overflow: hidden;
    height: 65px;
  }

  .pdt35 {
    padding: 35px 0;
  }

  .el-form--inline .el-form-item__label {
    float: left;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>


