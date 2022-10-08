<template>
    <div class="page-container table-page" ref="contentBox">
      <div class="search-bar">
        <div class="search-item">
          角色名称：
          <el-input class="selectInput" v-model="queryName" placeholder="请输入权限/角色名称">
          </el-input>
        </div>
        <div class="search-item">
          创建时间：
          <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
          <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange" range-separator="-"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="search-item">
          <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
          <el-button class="operation-btn bgGreen" type="primary" @click="showForm('add')">新增角色</el-button>
        </div>
      </div>
      <cu-animation :type="'slideInRight'" :time=".5">
        <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
          :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange" :total="total">
          <template slot="status" slot-scope="value">
            {{ value.value.status == 1 ? '可用' : '禁用' }}
          </template>
          <template slot="operate" slot-scope="value">
            <el-button type="text" class="warning-btn" v-if="value.value.status == 1"
              @click="updateStatus(value.value.id, 0)">禁用</el-button>
            <el-button type="text" class="warning-btn" v-if="value.value.status == 0"
              @click="updateStatus(value.value.id, 1)">启用</el-button>
            <el-button type="text" @click="showForm('edit', value.value.id)">修改</el-button>
            <el-button type="text" class="warning-btn" @click="deleteRole(value.value.id, 1)">删除</el-button>
          </template>
        </cu-table>
      </cu-animation>
      <cu-dialog :title="(formType === 'add' ? '新增' : '修改') + '角色'" width="50vw" :visible="formVisible" :showClose="true"
        @handleClose="formClose">
        <!-- :destroyOnClose="true" @menuListInitData="menuListInitData"-->
        <cu-form ref="form" :formData.sync="role" :formRule="formRule" class="form" @submitForm="submitForm"
          @closeForm="closeForm">
          <template v-slot:menuId="value">
            <cu-tree :checkStrictly.sync="checkStrictly" :treeList="menuData" :propsRule="value.value.propsRule" :defaultCheckedKeys="roleMenuKeys"
              @getCheckedKeys="getCheckedMenuKeys(arguments[0], value.form)" nodeKey="id">
            </cu-tree>
          </template>
        </cu-form>
        <template #footer>
          <div></div>
        </template>
      </cu-dialog>
    </div>
  </template>
  <script>
  
  import { pageRoleList, saveRole, modifyRole, getMenuIdsByRoleId, updateRole, delRole } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
  import { getAllMenuList } from "@/api/aksApi/platformApi/loginApi.js";
  import dayjs from 'dayjs';
  import { mapState } from "vuex";
  import { roleFormRule } from "./roleFormRule";
  
  
  export default {
    data() {
      return {
        sysId: null,
        sysType: null,// 系统类型@ 1 运营平台  2  采购商  3  供应商
        queryName: '',
        date: [],
        tableHeader: [
          {
            title: "角色名称",
            key: "roleName",
          },
          {
            title: "描述",
            key: "description",
          },
  
          {
            title: "状态",
            slot: "status",
          },
          {
            title: "创建时间",
            key: "createTime",
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
        tableHeight: 0,
        role: {
          name: "",
          roleName: "",
          menuId: [],
          description: "",
        },
        formVisible: false,
        formRule: [],
        formType: '',
        menuData: [],
        roleMenuKeys: [],
        checkStrictly: false
      }
    },
    created() {
      console.log(this.vuex_user);
      let { sysId, sysType } = this.vuex_user;
      this.sysId = sysId;
      this.sysType = sysType;
      this.getRoleList();
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
        this.getRoleList();
      },
      handleSizeChange(val) {
        console.log(val);
        this.pageSize = val;
        this.getRoleList();
      },
      handleCurrentChange(val) {
        console.log(val);
        this.pageNum = val;
        this.getRoleList();
      },
      getRoleList() {
        this.tableLoading = true;
        if (this.date && this.date.length) {
          this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
          this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
        }
        let params = {
          currPageNo: this.pageNum,
          pageSize: this.pageSize,
          query: this.queryName,
          sysId: this.sysId,
          sysType: this.sysType,
          startTime: this.date[0],
          endTime: this.date[1]
  
        };
        console.log(params);
        this.tableData = [];
        pageRoleList(params).then(res => {
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.tableData = data.list;
            this.total = data.totalCount;
            this.tableLoading = false;
            console.log(this.tableData);
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      async showForm(type, roleId) {
        this.roleMenuKeys = []
        this.formRule = []
        let menuKeys = []
        let params = {
          sysType: this.sysType,
        }
        let res = await getAllMenuList(params)// 获取权限菜单
        console.log(res);
        if (res.code == 200) {
          this.menuData = res.data;
          if (type == 'edit') {
            this.checkStrictly = true;
            let haveMenusRes = await getMenuIdsByRoleId(roleId)
            console.log(haveMenusRes);
            if (haveMenusRes && haveMenusRes.code == 200 && haveMenusRes.data && haveMenusRes.data.length) {
              menuKeys = this.getMenuIdArr(haveMenusRes.data )
              console.log(menuKeys);
            }
          }else {
            this.checkStrictly = false
          }
        } else {
          console.log(error)
          this.$message.error("菜单权限获取失败")
        }
        this.formVisible = true;
        this.formType = type;
        // 模拟数据请求
        // setTimeout(() => {
        // this.$nextTick让空数据初始化后再传入，避免传入的数据直接变成初始化数据，导致无法重置（清空数据）
        this.$nextTick(() => {
          console.log('nexttick', menuKeys);
          this.roleMenuKeys = menuKeys;
          if (type == 'edit') {
            // roleFormRule[0]['disabled'] = true
            this.formRule = roleFormRule;
            let editData = this.tableData.filter(item => item.id == roleId)[0]
            this.role = {
              roleName: editData.roleName,
              menuId: menuKeys,
              description: editData.description,
              id: editData.id,
            }
            console.log(this.role);
          } else {
            roleFormRule[0]['disabled'] = false
            this.formRule = roleFormRule;
            this.role = {}
          }
        });
        // }, 500);
      },
      getMenuIdArr(menus) {
        let arr = []
        menus.map(item => {
          console.log(arr);
          arr.push(item.id)
          if (item.children && item.children.length) {
            console.log(item.children);
            let childrens =  this.getMenuIdArr(item.children);
            arr.push(...childrens)
          }else {
          }
        })
        return arr;
      },
      getCheckedMenuKeys(checkedMenuKeys, form) {
        form['menuId'] = checkedMenuKeys;
      },
      formClose() {
        this.$refs.form.$refs.cuForm.resetFields()
        this.formVisible = false
      },
      // 获取菜单权限数据
      getMenuData(roleId) {
        if (roleId) {
          return getMenuIdsByRoleId(roleId)
  
        } else {
  
          return getAllMenuList(params);
        }
  
      },
      nodeClick(data) {
        console.log(data);
      },
      async submitForm(formData, formRef) {
        let params = formData;
        params.sysId = this.sysId;
        params.sysType = this.sysType;
        if (this.formType == 'edit') {// 编辑司机
          updateRole(params).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("操作成功")
              this.getRoleList()
              this.formVisible = false;
  
            } else {
              this.$message.error(res.message)
            }
          }).catch((err) => {
            console.log(err);
          });
        } else {
          params.createBy = this.vuex_user.id + '';
          params.status = 1;
          console.log(params);
          let res = await saveRole(params)
          console.log(res);
          if (res.code == 200) {
            this.$message.success("角色新增成功")
            formRef.resetFields();
            this.getRoleList()
            this.formVisible = false;
  
          } else {
            this.$message.error(res.message)
          }
        }
  
  
      },
      closeForm(formRef) {
        formRef.resetFields();
        this.formVisible = false;
      },
      updateStatus(roleId, status) {
        this.$confirm(`确认${status === 0 ? '禁用' : '启用'}该角色? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          modifyRole({ roleId, status }).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("操作成功")
              this.getRoleList()
            }
          }).catch((err) => {
            console.log(err);
          });
  
        }).catch((err) => {
          console.log(err);
        });
  
      },
      deleteRole(id) {
        this.$confirm(`确认删除该角色 `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          console.log(id);
          delRole(id).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("角色删除成功")
              this.getRoleList()
            }
          }).catch(err => {
            console.log(err);
          });
  
        }).catch((err) => {
          console.log(err);
        });
  
      },
    },
  }
  </script>
  <style lang="scss" src="./supplierRoleManagement.scss" scoped>
  
  </style>
  