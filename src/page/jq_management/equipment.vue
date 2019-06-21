<template>
  <div class="container">


    <section class="choose">
      <el-form :label-position="labelPosition" :inline="true" :model="formInline" ref="formInline" label-width="100px"
               :rules="rules"
               class="demo-form-inline">
        <div class="hd">
          <div class="span">
            <el-form-item label="时间：" prop="dateVal">
              <el-date-picker
                v-model="formInline.dateVal"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00']"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
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

            <el-form-item label="渠道名称" prop="ChannelName">
              <el-select v-model="formInline.ChannelName">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

          </div>
          <div class="span">
            <el-form-item label="IP地址：" prop="IPaddress">
              <el-input v-model.number="formInline.IPaddress" placeholder="请输入IP地址"></el-input>
            </el-form-item>
          </div>

          <div class="span ">
            <el-form-item label="鉴权状态：" prop="resource">
              <el-radio-group v-model="formInline.resource">
                <el-radio label="鉴权成功">鉴权成功</el-radio>
                <el-radio label="鉴权失败">鉴权失败</el-radio>
              </el-radio-group>
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
        <el-table
          height="350"
          :data="tableData">
          <el-table-column
            prop="number"
            min-width="50"
            align="center"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            min-width="150"
            align="center"
            label="时间"
          >
          </el-table-column>

          <el-table-column
            prop="channel"
            min-width="150"
            align="center"
            label="渠道"
          >
          </el-table-column>

          <el-table-column
            prop="snNumber"
            min-width="234"
            align="center"
            label="车机SN号"
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
            prop="state"
            min-width="120"
            align="center"
            label="鉴权状态及原因"
          >

            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '鉴权失败' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.state}}</el-tag>
            </template>


          </el-table-column>

          <el-table-column
            prop="reason"
            min-width="100"
            align="center"
            label="原因">
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
      var dateValFn = (rule, value, callback) => {
        console.log("value111")
        console.log(value)
        if (value === '') {
          callback(new Error('请选择开始结束时间！'));
        } else {
          callback();
        }
      };
      return {
        currentPage3: 5,
        formInline: {
          dateVal: '',
          mark: '',
          vin: "",
          ChannelName: "",
          IPaddress: "",
          resource: "",
        },
        rules: {
          dateVal: [
            {required: true, validator: dateValFn, trigger: 'change'}
          ],
          mark: [
            {required: true, message: '请输入车机SN号、IEMI等标识', trigger: 'blur'},
          ],
          vin: [
            {required: true, message: '请输入17位Vin号', trigger: 'blur'},
          ],
          ChannelName: [
            {required: true, message: '请输入渠道名称', trigger: 'change'},
          ],
          IPaddress: [
            {required: true, message: '请输入IP地址', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择鉴权状态', trigger: 'change'}
          ],
        },
        labelPosition: 'right',
        selectDate: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近半小时',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 1800000);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一小时',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600000);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }],
          onPick: ({maxDate, minDate}) => {
            console.log("minDate==")
            console.log(minDate)
            this.selectDate = minDate.getTime();
            if (maxDate) {
              this.selectDate = ''
            }
          },
          disabledDate: (time) => {

            if (this.selectDate !== '') {
              const one = 7 * 24 * 3600 * 1000;
              const minTime = this.selectDate - one <= Date.now() ? Date.now() - 1 * 24 * 3600 * 1000 : this.selectDate - one;
              const maxTime = this.selectDate + one;
              return time.getTime() < minTime || time.getTime() > maxTime;
            } else {
              return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
            }

          }
        },
        tableData: []
      }
    },
    mounted() {

    },
    methods: {
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

        for(var i=0;i<5;i++){
          this.tableData.push({
            number: i,
            time: '2019.3.25  10:25',
            channel: '博泰车机',
            snNumber: 'QBLKVL71161810290051',
            vinNumber: 'KVL71161810290051',
            ipAddress: '175.164.139.246 ',
            state: '鉴权失败',
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
  .pdt35{padding: 35px 0;}

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


