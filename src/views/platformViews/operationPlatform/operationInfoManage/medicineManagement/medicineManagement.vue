<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        关键字：
        <el-input placeholder="医保编码/通用名/产品名称" v-model="keyword">
        </el-input>
      </div>
      <el-button
        class="operation-btn search-btn"
        type="primary"
        @click="search()"
        >查询</el-button
      >
      <el-button
        class="operation-btn export-btn"
        type="primary"
        @click="editAddMedicina('add')"
        >新增</el-button
      >
    </div>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :showTitle="false"
        :tableData="tableData"
        :height="tableHeight"
        :tableHeader="tableHeader"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="Total"
      >
        <template slot="createTime" slot-scope="value">
          {{ formatDate(value.value.createTime, "yyyy-MM-dd") }}
        </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="editAddMedicina('edit', value.value.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="deleteMedicina(value.value.id)"
            >删除</el-button
          >
          <el-button type="text" @click="detailsMedicina(value.value.id)"
            >详情</el-button
          >
        </template>
      </cu-table>
    </cu-animation>
    <!-- 添加、编辑药品管理弹窗 -->
    <cu-dialog
      :title="editAddMedicinaForm.id ? '编辑药械管理' : '新增药械管理'"
      width="50vw"
      :visible="editAddMedicinaVisible"
      :showClose="true"
      @handleClose="handleCloseMedicina"
      @handleOk="editAddMedicinaOk"
    >
      <el-form
        class="add-form"
        :model="editAddMedicinaForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
      >
        <el-form-item label="分类名称:" prop="categoryId">
          <el-select v-model="editAddMedicinaForm.categoryId" placeholder="请选择">
            <el-option
              v-for="item in apparatus_category"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="产品名称:" prop="productName">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.productName"
            placeholder="请输入产品名称"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="form-item" label="医保编码:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.ybCode"
            placeholder="请输入医保编码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="通用名:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.commonName"
            placeholder="请输入通用名"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="耗材材质:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.material"
            placeholder="请输入耗材材质"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="规格型号:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.specification"
            placeholder="请输入规格型号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="批准文号:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.approvalNumber"
            placeholder="请输入批准文号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="产地:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.originPlace"
            placeholder="请输入产地"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="注册证编号:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.regNo"
            placeholder="请输入注册证编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="生产企业:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.manufacturer"
            placeholder="请输入生产企业"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="商城价:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.mallPrice"
            placeholder="请输入商城价"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="排序号:">
          <el-input placeholder="请输入排序号" v-model="editAddMedicinaForm.sortNo">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
        <!-- 药品管理详情弹窗 -->
        <cu-dialog
      title="药械管理详情"
      width="50vw"
      :visible="detailsMedicinaVisible"
      :showClose="true"
      @handleClose="handleClosedMedicina"
      @handleOk="detailsMedicinaOk"
    >
      <el-form
        class="add-form"
        :model="editAddMedicinaForm"
        ref="editAddForm"
        label-width="110px"
        disabled
      >
        <el-form-item label="分类名称:">
          <el-select v-model="editAddMedicinaForm.categoryId" placeholder="请选择">
            <el-option
              v-for="item in apparatus_category"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="产品名称:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.productName"
            placeholder="请输入产品名称"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="form-item" label="医保编码:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.ybCode"
            placeholder="请输入医保编码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="通用名:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.commonName"
            placeholder="请输入通用名"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="耗材材质:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.material"
            placeholder="请输入耗材材质"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="规格型号:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.specification"
            placeholder="请输入规格型号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="批准文号:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.approvalNumber"
            placeholder="请输入批准文号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="产地:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.originPlace"
            placeholder="请输入产地"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="注册证编号:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.regNo"
            placeholder="请输入注册证编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="生产企业:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.manufacturer"
            placeholder="请输入生产企业"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="商城价:">
          <el-input
            class="selectInput"
            v-model="editAddMedicinaForm.mallPrice"
            placeholder="请输入商城价"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="排序号:">
          <el-input placeholder="请输入排序号" v-model="editAddMedicinaForm.sortNo">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  getApparatus,
  selectCategoryClass,
  deletApparatus,
  addApparatusManagement,
  editApparatusManagement,
  getDetailsApparatus
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
  data() {
    return {
      keyword: "",
      Total: 1,
      tableLoading: false,
      tableHeight: 0,
      editAddMedicinaVisible: false,
      detailsMedicinaVisible:false,
      tableData: [],
      apparatus_category: [],
      tableHeader: [
        {
          title: "id",
          slot: "id",
          width: 100,
        },
        {
          title: "分类名称",
          slot: "categoryName",
        },
        {
          title: "医保编码",
          slot: "ybCode",
        },
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "产品名称",
          slot: "productName",
        },
        {
          title: "耗材材质",
          slot: "material",
        },
        {
          title: "规格型号",
          slot: "specification",
        },
        {
          title: "批准文号",
          slot: "approvalNumber",
        },
        {
          title: "产地",
          slot: "originPlace",
        },
        {
          title: "注册证编号",
          slot: "regNo",
        },
        {
          title: "生产企业",
          slot: "manufacturer",
        },
        {
          title: " 商城价",
          slot: "mallPrice",
        },
        {
          title: "操作",
          slot: "operate",
          width: 250,
        },
      ],
      editAddMedicinaForm: {
        approvalNumber: "",
        categoryId: 0,
        commonName: "",
        createTime: "",
        deleteFlag: 0,
        id: 0,
        manufacturer: "",
        material: "",
        orderAmount: 0,
        orderCount: 0,
        originPlace: "",
        productName: "",
        regNo: "",
        saleCount: 0,
        sortNo: 0,
        specification: "",
        ybCode: "",
      },
      rules: {
        productName: [
          { required: true, message: "请输入产品名称", trigger: "change" },
          {
            min: 2,
            max: 50,
            message: "分类名称不得少于2个字符",
            trigger: "blur",
          },
        ],
        categoryId: [
          { required: true, message: "请选择分类名称", trigger: "change" },
        ],
      },
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
    this.getApparatusList();
    this.selectCategoryClassList();
  },
  methods: {
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    //关键字搜索
    search() {
      this.getApparatusList();
    },
    //读取选择药械分类
    async selectCategoryClassList() {
      this.tableLoading = true;
      await selectCategoryClass()
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.apparatus_category = res.data.data;
            this.tableLoading = false;
          }
          console.log(this.apparatus_category);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取药械管理列表
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getApparatusList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getApparatusList();
    },
    async getApparatusList() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.keyword,
      };
      this.tableData = [];
      await getApparatus(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let data = res.data.data
            this.tableData = data.records;
            this.pageNum = data.current;
            this.pageSize = data.size;
            this.Total = data.total;
            this.pageCount = data.pages;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增、编辑药械管理
    editAddMedicina(type, id) {
      this.editAddMedicinaForm = { id: 0, deleteFlag: 0 };
      if (type == "edit") {
        this.editAddMedicinaForm = this.tableData.filter(
          (item) => item.id == id
        )[0];
      }
      console.log(this.editAddMedicinaForm);
      this.editAddMedicinaVisible = true;
    },
    handleCloseMedicina() {
      this.editAddMedicinaVisible = false;
      this.detailsMedicinaVisible = false;
    },
    editAddMedicinaOk() {
      this.$refs["editAddForm"].validate((valid) => {
        if (valid) {
          let params = this.editAddMedicinaForm;
          console.log(params);
          if (params.id) {
            // 编辑信息
            editApparatusManagement(params)
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("药械管理编辑成功");
                  this.getApparatusList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            addApparatusManagement(params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("药械管理新增成功");
                  this.getApparatusList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.$refs["editAddForm"].resetFields();
          this.editAddMedicinaVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除药械管理列表
    deleteMedicina(id) {
      console.log(id);
      let params = { id: id };
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletApparatus(params)
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
          this.getApparatusList();
        })
        .catch(() => {});
    },
    //药械管理详情
    handleClosedMedicina(){
      this.detailsMedicinaVisible=false;
      this.getApparatusList();
    },
    detailsMedicinaOk(){
      this.detailsMedicinaVisible=false;
      this.getApparatusList();
    },
   async detailsMedicina(id){
    this.detailsMedicinaVisible = true;
      let params = {
        id: id,
      };
      this.tableData = [];
      await getDetailsApparatus(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.editAddMedicinaForm = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
