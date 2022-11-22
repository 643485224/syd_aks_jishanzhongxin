<template>
  <div class="page-container table-page" ref="contentBox">
      <div class="search-bar">
          <div class="search-item">
              账号：
              <el-input class="selectInput" v-model="username" placeholder="请输入账号">
              </el-input>
          </div>
          <div class="search-item">
              姓名：
              <el-input class="selectInput" v-model="name" placeholder="请输入姓名">
              </el-input>
          </div>
          <div class="search-item">
              创建时间：
              <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
              <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange"
                  range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
          </div>
          <div class="search-item">
              <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
              <el-button class="operation-btn bgGreen" type="primary" @click="showForm('add')">新增账号</el-button>
              <el-button class="operation-btn bgBlue" type="primary" @click="exportXls">导出</el-button>
          </div>
      </div>
      <cu-animation :type="'slideInRight'" :time=".5">
          <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
              :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
              @handleCurrentChange="handleCurrentChange" :total="total">
              <template slot="status" slot-scope="value">
                  {{  value.value.status == 1 ? '可用' : '禁用'  }}
              </template>
              <template slot="roles" slot-scope="value">
                  <!-- <span v-for="role in value.value.roles" :key="key">{{role.roleName}}</span> -->
                  <!-- <template v-if="value.value.roles.length > 1">
                      <el-select v-model="value.value.roles" multiple collapse-tags size="mini" v-default-select="[value.value.roles]">
                      <el-option v-for="role in value.value.roles" :key="role.id" :label="role.roleName" :value="role.id" :disabled="true">
                      </el-option>
                  </el-select>
                  </template> -->
                  <!-- <template v-else>  -->
                      <el-tag  v-show="value.value.roles.length>0?true:false" size="small" v-for="val in value.value.roles" :key="val.index">{{val.roleName}}</el-tag>
                     <!-- <span v-else ></span>  {{value.value.roles[0].roleName}} -->
                  <!-- </template> -->
              </template>
              <template slot="createTime" slot-scope="value">
                  {{  formatDate(value.value.createTime, "yyyy-MM-dd hh:mm:ss")  }}
              </template>
              <template slot="operate" slot-scope="value">
                  <el-button type="text" class="warning-btn" v-if="value.value.status == 1"
                      @click="updateStatus(value.value.id, 0)">禁用</el-button>
                  <el-button type="text" class="warning-btn" v-if="value.value.status == 0"
                      @click="updateStatus(value.value.id, 1)">启用</el-button>
                  <el-button type="text" @click="showForm('edit', value.value.id)">修改</el-button>
                  <el-button type="text" class="warning-btn" @click="deleteUser(value.value.id, 1)">删除</el-button>
              </template>
          </cu-table>
      </cu-animation>

      <cu-dialog :title="(formType === 'add' ? '新增' : '修改') + '账号'" width="50vw" :visible="formVisible"
          :showClose="true" @handleClose="formClose">
          <!-- :destroyOnClose="true" -->
          <cu-form ref="form" :formData.sync="account" :formRule="formRule" class="form" @submitForm="submitForm"
              @closeForm="closeForm" @rolesGetData="rolesGetData" @rolesInitData="rolesInitData"
              :disabledIgnoreValidate="true">
              <template v-if="formType == 'edit'" v-slot:password="value">
                  <el-input type="password" v-model="value.form[value.value.key]"
                      :placeholder="value.value.placeholder" :disabled="value.value.disabled"
                      autocomplete="new-password"></el-input>
                  <el-button class="form-btn" v-if="disablePass" type="primary" @click="editPass(value)">修改
                  </el-button>
              </template>
              <template v-if="formType == 'edit'" v-slot:checkPassword="value">
                  <el-input type="password" v-model="value.form[value.value.key]"
                      :placeholder="value.value.placeholder" :disabled="value.value.disabled"
                      autocomplete="new-password"></el-input>
              </template>
          </cu-form>
          <template #footer>
              <div></div>
          </template>
      </cu-dialog>
  </div>
</template>
<script>

import { userList, roleList, saveUser, updateUser, updateUserStatus, delUser } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { accountFormRule, accountFormEditRule } from "./accountManageFormRule";

import dayjs from 'dayjs';
import { mapState } from "vuex";
export default {
  data() {

      return {
          sysId: null,
          sysType: null,// 系统类型@ 1 运营平台  2  采购商  3  供应商
          username: '',
          name: '',
          date: [],
          statusType: {
              0: '禁用',
              1: '可用'
          },
          tableHeight: 0,
          tableHeader: [
              {
                  title: "账号",
                  key: "username",
              },
              {
                  title: "姓名",
                  key: "name",
              },
              {
                  title: "手机号",
                  key: "phone",
              },
              {
                  title: "角色",
                  slot: "roles",
                  width: 160,
              },
              {
                  title: "操作账号",
                  key: "createBy",
              },
              {
                  title: "状态",
                  slot: "status", //  0 禁用  1  可用
              },
              {
                  title: "创建时间",
                  slot: "createTime",
              },
              {
                  title: "操作",
                  slot: "operate",
              },
          ],
          tableData: [],
          pageNum: 1,
          pageSize: 10,
          pageCount: 1,
          total: 1,
          tableLoading: false,
          account: {
              username: "",
              name: "",
              phone: "",
              password: "",
              checkPassword: "",
              roles: null,
              description: "",
          },
          formVisible: false,
          formRule: [],
          formType: '',
          disablePass: true,// 编辑账号时，密码框默认禁用

      };
  },
  created() {
      console.log(this.vuex_user);
      let { sysId, sysType } = this.vuex_user;
      this.sysId = sysId;
      this.sysType = sysType;
      this.getUserList();
  },
  mounted() {
      // 一般渲染过慢导致无法算出高度问题，加定时器
      setTimeout(() => {
          this.handleHeight(); // 根据浏览器大小计算表格高度
      }, 800);
      window.onresize = () => {
          this.handleHeight(); // 根据浏览器大小计算表格高度
      };
  },
  computed: {
      ...mapState(['vuex_user'])
  },
  beforeDestroy() {
      //在组件生命周期结束的时候销毁。
      window.onresize = null;
  },
  methods: {
      handleHeight() {
          this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
      },
      pickDate(val) {
          console.log(val);
      },
      formatDate(time, format) {
          return time ? new Date(time).Format(format) : "";
      },
      search() {
          this.getUserList();
      },
      handleSizeChange(val) {
          console.log(val);
          this.pageSize = val;
          this.getUserList();
      },
      handleCurrentChange(val) {
          console.log(val);
          this.pageNum = val;
          this.getUserList();
      },
      getUserList() {
          this.tableLoading = true;
        //   if (this.date && this.date.length) {
        //       this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        //       this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
        //   }
          let params = {
              currPageNo: this.pageNum,
              pageSize: this.pageSize,
              username: this.username,
              name: this.name,
              sysId: this.sysId,
              sysType: this.sysType,
              startTime: this.date && this.date[0],
              endTime: this.date && this.date[1]

          };
          console.log(params);
          this.tableData = [];
          userList(params).then(res => {
              console.log(res);
              if (res.code == 200) {
                  let data = res.data;
                  this.tableData = data.list;
                  this.pageNum = data.current;
                  this.pageSize = data.size;
                  this.total = data.totalCount;
                  this.pageCount = data.pages;
                  this.tableLoading = false;
                  console.log(this.tableData);
              }
          }).catch((err) => {
              console.log(err);
          });
      },
      showForm(type, id) {
          console.log(id);
          this.formVisible = true;
          this.formType = type;
          this.disablePass = true;
          console.log(accountFormRule);
          console.log(accountFormRule);
          // 模拟数据请求
          // setTimeout(() => {
          // this.$nextTick让空数据初始化后再传入，避免传入的数据直接变成初始化数据，导致无法重置（清空数据）
          this.$nextTick(() => {
              if (type == 'edit') {
                  this.formRule = accountFormEditRule;
                  let editData = this.tableData.filter(item => item.id == id)[0]
                  console.log(editData);
                  this.account = {
                      id: editData.id,
                      username: editData.username,
                      name: editData.name,
                      phone: editData.phone,
                      password: editData.password,
                      checkPassword: editData.password,
                      roles: editData.roles.map(item => item.id),
                      description: editData.description,
                  }
                  console.log(this.account);

              } else {
                  this.formRule = accountFormRule;
                  this.account = {}
              }
          });
          // }, 500);



      },
      getRolesName(roles) {
          let nameArr = roles.map(role => role.roleName);
          return nameArr.join('  ')
      },
      rolesGetData({ flag, item }, callback) {
          console.log(item);
          if (flag) {
              let params = {
                  sysId: this.sysId,
                  sysType: this.sysType,
              }
              roleList(params).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                      callback(res.data, {
                          label: 'roleName',
                          value: 'id'
                      })
                  }
              }).catch((err) => {
                  console.log(err);
              });
          }


      },
      formClose() {
          this.$refs.form.$refs.cuForm.resetFields()
          this.formVisible = false
      },
      rolesInitData({ item }, callback) {
          let params = {
              sysId: this.sysId,
              sysType: this.sysType,
          }
          roleList(params).then(res => {
              console.log(res);
              if (res.code == 200) {
                  callback(res.data, {
                      label: 'roleName',
                      value: 'id'
                  })
              }
          }).catch((err) => {
              console.log(err);
          });
      },
      submitForm(formData, formRef) {
          let params = formData;
          delete params.checkPassword;
          params.roles = params.roles.map(item => {
              if (item.id) {
                  return item
              } else {
                  return { id: item }
              }
          })
          console.log(params, formRef);
          if (this.formType == 'edit') {// 编辑司机
              updateUser(params).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                      this.$message.success("操作成功")
                      this.getUserList()
                  }
              }).catch((err) => {
                  console.log(err);
              });
          } else {

              console.log(this.vuex_user);
              params.createBy = this.vuex_user.id + '';
              params.sysId = this.sysId;
              params.sysType = this.sysType;
              console.log(params);
              saveUser(params).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                      this.$message.success("账号新增成功")
                      formRef.resetFields();
                      this.getUserList()
                  }
              });
          }

          this.formVisible = false;
      },
      closeForm(formRef) {
          formRef.resetFields();
          this.formVisible = false;
      },
      editPass(value) {
          value.form.password = '';
          value.form.checkPassword = '';
          value.value.disabled = false;
          value.config = value.config.map(item => {
              if (item.key == 'checkPassword') {
                  item.disabled = false;
              }
              return item;
          });
          this.disablePass = false;
      },
      updateStatus(id, status) {
          this.$confirm(`确认${status == 1 ? '启用' : '禁用'}该账号? `, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
          }).then(() => {
              let params = {
                  id,
                  status,
              }
              updateUserStatus(params).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                      this.$message.success("操作成功")
                      this.getUserList()
                  }
              }).catch((err) => {
                  console.log(err);
              });

          }).catch((err) => {
              console.log(err);
          });

      },
      deleteUser(id) {
          this.$confirm(`确认删除该账号? `, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
          }).then(() => {
              console.log(id);
              delUser(id).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                      this.$message.success("账号删除成功")
                      this.getUserList()
                  }
              }).catch(err => {
                  console.log(err);
              });

          }).catch((err) => {
              console.log(err);
          });

      },
      exportXls() {
          let params = {
              currPageNo: 1,
              pageSize: 10000,

          }
          console.log(params);
          // carExportXls(params).then(res => {
          //     console.log(res, res.headers);
          //     if (res.status == 200) {
          //         this.$message.success("获取数据成功，等待导出...")
          //         // var value = new FormData()
          //         if (!res.data) {
          //             this.$message.warning("文件下载失败")
          //         }
          //         console.log(res);
          //         downloadXls(res.headers, res.data)
          //     } else {
          //         this.$message.error(res.message)
          //     }

          // }).catch(err => {
          //     console.log(err);
          // })
      },
  },
}
</script>
<style lang="scss" src="./supplierAccountManagement.scss" scoped>
</style>
