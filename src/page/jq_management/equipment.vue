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
                format="yyyy-MM-dd HH:mm:ss"
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
                <el-radio label="鉴权成功"></el-radio>
                <el-radio label="鉴权失败"></el-radio>
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
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
          >
          </el-table-column>

          <el-table-column
            prop="time"
            label="渠道"
          >
          </el-table-column>

          <el-table-column
            prop="time"
            label="车机SN号"
          >
          </el-table-column>

          <el-table-column
            prop="time"
            label="Vin码"
          >
          </el-table-column>

          <el-table-column
            prop="time"
            label="IP地址"
          >
          </el-table-column>

          <el-table-column
            prop="time"
            label="鉴权状态及原因"
          >
          </el-table-column>

          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>


  </div>
</template>

<script>
  // import {generaMenu} from '@/config/tools'

  export default {
    name: 'login',
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
        formInline: {
          dateVal: '',
          mark: '',
          age: '',
          vin: "",
          ChannelName: "",
          IPaddress: "",
          resource: ""
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
            {required: true, message: '请输入渠道名称', trigger: 'blur'},
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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


