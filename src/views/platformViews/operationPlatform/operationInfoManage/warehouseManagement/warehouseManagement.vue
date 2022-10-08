<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        仓库编号：
        <el-input v-model="ckbh" placeholder="请输入仓库编号"> </el-input>
      </div>
      <div class="search-item">
        状态：
        <el-select
          v-model="status"
          placeholder="请选择状态"
          class="tzhigg"
          size="small"
        >
          <el-option label="禁用" value="0"></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
      </div>
      <el-button class="operation-btn search-btn" type="primary" @click="search"
        >查询</el-button
      >
      <el-button
        class="operation-btn export-btn"
        type="primary"
        @click="showDialog('add')"
        >新增</el-button
      >
    </div>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :height="tableHeight"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="orderTotal"
      >
        <template slot="ckType" slot-scope="value">
          {{ ckTypes(value.value.ckType) }}
        </template>
        <template slot="status" slot-scope="value">
          {{ statuss(value.value.status) }}
        </template>
        <template slot="useStatus" slot-scope="value">
          {{ useStatuss(value.value.useStatus) }}
        </template>
        <template slot="createTime" slot-scope="value">
          {{ formatDate(value.value.createTime, "yyyy-MM-dd") }}
        </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="showDialog('edit', value.value.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="change(value.value.id)"
            >禁用/开启</el-button
          >
          <el-button type="text" @click="deleteWarehouse(value.value)"
            >删除</el-button
          >
          <el-button type="text" @click="showOpsition(value.value.id)"
            >仓位管理</el-button
          >
        </template>
      </cu-table>
    </cu-animation>
    <!-- 新增、编辑仓库弹窗 -->
    <cu-dialog
      :title="addEditWarehouse.id ? '编辑仓库' : '新增仓库'"
      width="50vw"
      :visible="dialogVisible"
      :showClose="true"
      @handleClose="handleClose"
      @handleOk="editWarehouseData"
    >
      <el-form
        class="add-form"
        :model="addEditWarehouse"
        ref="editForm"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item class="form-item" label="仓库编号:" prop="ckbh">
          <el-input
            class="selectInput"
            v-model="addEditWarehouse.ckbh"
            placeholder="请输入仓库编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addEditWarehouse.description"
            maxlength="50"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="仓库类型:" prop="ckType">
          <el-select
            v-model="addEditWarehouse.ckType"
            placeholder="请选择仓库类型"
          >
            <el-option label="独占仓库" value="0"></el-option>
            <el-option label="共享仓库" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="状态:">
          <el-radio-group v-model="addEditWarehouse.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-item" label="使用状态:">
          <el-radio-group v-model="addEditWarehouse.useStatus">
            <el-radio :label="0">空闲</el-radio>
            <el-radio :label="1">已入驻</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
    <!-- 仓位管理弹窗 -->
    <cu-dialog
      title="仓位管理"
      width="60vw"
      :visible="opsitionVisible"
      :showClose="true"
      @handleClose="psitionHandleClose"
      @handleOk="editopsitionOk"
    >
      <div class="search-bar">
        <el-button
          class="operation-btn export-btn"
          type="primary"
          @click="addEditOpsitionDialog('add')"
          >新增</el-button
        >
      </div>
      <cu-animation :type="'slideInRight'" :time="0.5">
        <cu-table
          class="sale-table"
          :loading="tableLoading"
          :height="tableHeight"
          :showTitle="false"
          :tableHeader="opsitionTableHeader"
          :tableData="opsitionTableData"
          @handleSizeChange="opstionHandleSizeChange"
          @handleCurrentChange="opsitionHandleCurrentChange"
          :total="orderTotal"
        >
          <template slot="status" slot-scope="value">
            {{ statuss(value.value.status) }}
          </template>
          <template slot="createTime" slot-scope="value">
            {{ formatDate(value.value.createTime, "yyyy-MM-dd") }}
          </template>
          <template slot="operate" slot-scope="value">
            <el-button
              type="text"
              @click="addEditOpsitionDialog('edit', value.value.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="changeOpsition(value.value.id)"
              >禁用/开启</el-button
            >
            <el-button type="text" @click="deleteOpsition(value.value)"
              >删除</el-button
            >
          </template>
        </cu-table>
      </cu-animation>
      <template #footer> </template>
    </cu-dialog>
    <!-- 仓位新增、编辑弹窗 -->
    <cu-dialog
      :title="editAddOpsitionForm.id ? '编辑仓位' : '新增仓位'"
      width="50vw"
      :visible="editOpsitionVisible"
      :showClose="true"
      @handleClose="handleCloseOpsition"
      @handleOk="editAddOpsitionOk"
    >
      <el-form
        class="add-form"
        :model="editAddOpsitionForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
      >
        <el-form-item class="form-item" label="仓位编号:" prop="cwbh">
          <el-input
            class="selectInput"
            v-model="editAddOpsitionForm.cwbh"
            placeholder="请输入仓位编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editAddOpsitionForm.description"
            maxlength="50"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="状态:">
          <el-radio-group v-model="editAddOpsitionForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  getWarehouseInformation,
  addWarehose,
  editWarehose,
  getOpsition,
  addOpsition,
  editOpsition,
  deletWarehose,
  deletOpsition,
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
  data() {
    return {
      value: "",
      status: "",
      useStatus: "",
      ckId: null,
      tableData: [],
      opsitionTableData: [],
      tableHeight: 0,
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      orderTotal: 1,
      orderNum: "",
      ckbh: null,
      date: [],
      logisticsNo: null,
      row: 10,
      tableLoading: false,
      dialogVisible: false,
      opsitionVisible: false,
      editOpsitionVisible: false,
      changeWarehouseForm: {
        ckid: 0,
        id: 1,
        cwbh: "",
        createBy: "",
        description: null,
        status: 1,
      },
      changeOpsitionForm: {
        ckid: 0,
        id: 1,
        cwbh: "",
        createBy: "",
        description: null,
        status: 1,
      },
      editAddOpsitionForm: {
        ckid: 0,
        id: 1,
        cwbh: "",
        createBy: "",
        description: null,
        status: 1,
      },
      addEditWarehouse: {
        id: null,
        ckbh: "",
        ckType: null,
        createBy: "",
        description: null,
        status: 1,
        useStatus: 1,
      },
      rules: {
        ckbh: [
          { required: true, message: "请输入仓库编号", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "仓库编号不得少于2个字符",
            trigger: "blur",
          },
        ],
        cwbh: [
          { required: true, message: "请输入仓位编号", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "仓位编号不得少于2个字符",
            trigger: "blur",
          },
        ],
        ckType: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      tableHeader: [
        {
          title: "id",
          slot: "id",
          width: 100,
        },
        {
          title: "仓库编号",
          slot: "ckbh",
          width: 150,
        },
        {
          title: "描述",
          slot: "description",
        },
        {
          title: "仓库类型",
          slot: "ckType",
        },
        {
          title: "状态",
          slot: "status",
          width: 150,
        },
        {
          title: "使用状态",
          slot: "useStatus",
          width: 150,
        },
        {
          title: "创建人",
          slot: "createBy",
          width: 150,
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
      opsitionTableHeader: [
        {
          title: "id",
          slot: "id",
          width: 120,
        },
        {
          title: "仓位编号",
          slot: "cwbh",
          width: 150,
        },
        {
          title: "描述",
          slot: "description",
        },
        {
          title: "状态",
          slot: "status",
          width: 130,
        },
        {
          title: "创建人",
          slot: "createBy",
          width: 130,
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
    };
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
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  created() {
    this.getWarehouseInformationList();
  },
  methods: {
    statuss(time) {
      if (time == 0) {
        return "禁用";
      } else if (time == 1) {
        return "可用";
      }
    },
    ckTypes(time) {
      if (time == 1) {
        return "独占仓库";
      } else if (time == 2) {
        return "共享仓库";
      }
    },
    useStatuss(time) {
      if (time == 0) {
        return "空闲";
      } else if (time == 1) {
        return "已入驻";
      }
    },
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    //搜索
    search() {
      this.getWarehouseInformationList();
    },
    //获取仓库数据列表
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getWarehouseInformationList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getWarehouseInformationList();
    },
    async getWarehouseInformationList() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        ckbh: this.ckbh,
        status: this.status,
      };
      this.tableData = [];
      await getWarehouseInformation(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.tableData = res.data.data.records;
            this.pageNum = res.data.data.current;
            this.pageSize = res.data.data.size;
            this.orderTotal = res.data.data.total;
            this.pageCount = res.data.data.pages;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除仓库信息
    deleteWarehouse(Information) {
      let params = Information;
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletWarehose(params)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getWarehouseInformationList();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "info",
                message: "删除失败",
              });
            });
        })
        .catch(() => {});
    },
    //删除仓位信息
    deleteOpsition(Information) {
      console.log(Information);
      let params = Information;
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletOpsition(params)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "info",
                message: "删除失败",
              });
            });
          this.showOpsition(this.ckId);
        })
        .catch(() => {});
    },
    //获取仓位信息列表
    opstionHandleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.showOpsition(this.ckId);
    },
    opsitionHandleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.showOpsition(this.ckId);
    },
    async showOpsition(id) {
      (this.ckId = id), (this.opsitionVisible = true);
      this.tableLoading = true;
      let params = {
        ckid: id,
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      console.log(params);
      this.opsitionTableData = [];
      await getOpsition(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.opsitionTableData = res.data.data.records;
            this.pageNum = res.data.current;
            this.pageSize = res.data.size;
            this.orderTotal = res.data.total;
            this.pageCount = res.data.pages;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //仓库新增
    async showDialog(type, id) {
      console.log(type, id);
      this.addEditWarehouse = { status: 1, useStatus: 0 };
      if (type == "edit") {
        this.addEditWarehouse = this.tableData.filter(
          (item) => item.id == id
        )[0];
        console.log(this.addEditWarehouse);
      }
      this.dialogVisible = true;
    },
    editWarehouseData() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          let params = {};
          (params.createBy = this.addEditWarehouse.createBy),
            (params.ckbh = this.addEditWarehouse.ckbh),
            (params.ckType = this.addEditWarehouse.ckType),
            (params.id = this.addEditWarehouse.id),
            (params.description = this.addEditWarehouse.description),
            (params.status = this.addEditWarehouse.status),
            (params.useStatus = this.addEditWarehouse.useStatus),
            console.log(params);
          if (params.id) {
            // 编辑信息
            editWarehose(params)
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("仓库编辑成功");
                  this.getWarehouseInformationList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            addWarehose(params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("仓库新增成功");
                  this.getWarehouseInformationList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.$refs["editForm"].resetFields();
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs["editForm"].resetFields();
      this.dialogVisible = false;
    },
    handleCloseOpsition() {
      this.$refs["editAddForm"].resetFields();
      this.editOpsitionVisible = false;
    },
    async change(id) {
      console.log(id);
      this.changeWarehouseForm = this.tableData.filter(
        (item) => item.id == id
      )[0];
      if (this.changeWarehouseForm.status == 1) {
        let status = 0;
        let params = {};
        (params.createBy = this.changeWarehouseForm.createBy),
          (params.ckbh = this.changeWarehouseForm.ckbh),
          (params.ckType = this.changeWarehouseForm.ckType),
          (params.id = this.changeWarehouseForm.id),
          (params.description = this.changeWarehouseForm.description),
          (params.status = status),
          (params.useStatus = this.changeWarehouseForm.useStatus),
          console.log(params);
        editWarehose(params)
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("仓库编辑成功");
              this.getWarehouseInformationList();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.changeWarehouseForm.status == 0) {
        let status = 1;
        let params = {};
        (params.createBy = this.changeWarehouseForm.createBy),
          (params.ckbh = this.changeWarehouseForm.ckbh),
          (params.ckType = this.changeWarehouseForm.ckType),
          (params.id = this.changeWarehouseForm.id),
          (params.description = this.changeWarehouseForm.description),
          (params.status = status),
          (params.useStatus = this.changeWarehouseForm.useStatus),
          console.log(params);
        editWarehose(params)
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("仓库编辑成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.getWarehouseInformationList();
      }
    },

    //仓位管理弹窗
    editopsitionOk() {
      this.getWarehouseInformationList();
      this.opsitionVisible = false;
    },
    psitionHandleClose() {
      this.getWarehouseInformationList();
      this.opsitionVisible = false;
    },
    //仓位新增、编辑
    async addEditOpsitionDialog(type, id) {
      console.log(type, id);
      this.editAddOpsitionForm = { status: 1 };
      if (type == "edit") {
        this.editAddOpsitionForm = this.opsitionTableData.filter(
          (item) => item.id == id
        )[0];
        console.log(this.editAddOpsitionForm);
      }
      this.editOpsitionVisible = true;
    },
    editAddOpsitionOk() {
      this.$refs["editAddForm"].validate((valid) => {
        if (valid) {
          let params = {};
          (params.createBy = this.editAddOpsitionForm.createBy),
            (params.cwbh = this.editAddOpsitionForm.cwbh),
            (params.ckid = this.ckId),
            (params.id = this.editAddOpsitionForm.id),
            (params.description = this.editAddOpsitionForm.description),
            (params.status = this.editAddOpsitionForm.status),
            console.log(params);
          if (params.id) {
            // 编辑仓位信息
            editOpsition(params)
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("仓位编辑成功");
                  this.showOpsition(this.ckId);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //新增仓位信息
            addOpsition(params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("仓位新增成功");
                  this.showOpsition(this.ckId);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }

          this.$refs["editAddForm"].resetFields();
          this.editOpsitionVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //仓位禁用开启功能
    async changeOpsition(id) {
      this.changeOpsitionForm = this.opsitionTableData.filter(
        (item) => item.id == id
      )[0];
      console.log(this.changeOpsitionForm);
      if (this.changeOpsitionForm.status == 1) {
        let status = 0;
        let params = {};
        (params.createBy = this.changeOpsitionForm.createBy),
          (params.cwbh = this.changeOpsitionForm.cwbh),
          (params.id = this.changeOpsitionForm.id),
          (params.ckid = this.changeOpsitionForm.ckid),
          (params.description = this.changeOpsitionForm.description),
          (params.status = status),
          console.log(params);
        editOpsition(params)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success("仓位编辑成功");
              this.showOpsition(this.ckId);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.changeOpsitionForm.status == 0) {
        let status = 1;
        let params = {};
        (params.createBy = this.changeOpsitionForm.createBy),
          (params.cwbh = this.changeOpsitionForm.cwbh),
          (params.id = this.changeOpsitionForm.id),
          (params.ckid = this.changeOpsitionForm.ckid),
          (params.description = this.changeOpsitionForm.description),
          (params.status = status),
          console.log(params);
        editOpsition(params)
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("仓位编辑成功");
              this.showOpsition(this.ckId);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 0px;
  }
}
.search-bar {
  display: flex;
  align-items: flex-end;
  margin: 20px 0 30px;
  font-size: 14px;
  .search-item {
    margin-right: 18px;

    .el-input {
      width: 230px;

      ::v-deep .el-input__inner {
        height: 31px;
      }
    }

    ::v-deep .el-range-editor.el-input__inner {
      width: 250px;
      height: 31px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 1;
    }
  }

  .operation-btn {
    height: 32px;
    border: none;
    border-radius: 4px 4px 4px 4px;
  }

  .search-btn {
    background: #ff480e;
  }
}
.add-form {
  margin: 40px auto;
  width: 60%;

  .el-form-item__content {
    flex: 1;
  }

  .el-input,
  .el-select,
  .el-input__inner {
    width: 100%;
  }
}
</style>

