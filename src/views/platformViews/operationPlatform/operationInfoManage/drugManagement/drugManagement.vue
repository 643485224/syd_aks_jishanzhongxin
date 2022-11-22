<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        关键字：
        <el-input placeholder="医保编码/通用名/商品名" v-model="keyword">
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
        @click="editAddDrug('add')"
        >新增</el-button
      >
    </div>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :showTitle="false"
        max-height:20px
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="Total"
      >
        <template slot="basicProperty" slot-scope="value">
          {{ basicProperty[value.value.basicProperty] }}
        </template>
        <template slot="abroad" slot-scope="value">
          {{ abroadt[value.value.abroad] }}
        </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="editAddDrug('edit', value.value.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="deleteDrug(value.value.id)"
            >删除</el-button
          >
          <el-button type="text" @click="detailsDrug(value.value.id)"
            >详情</el-button
          >
        </template>
      </cu-table>
    </cu-animation>
    <!-- 添加、编辑药品管理弹窗 -->
    <cu-dialog
      :title="editAddDrugForm.id ? '编辑药品管理' : '新增药品管理'"
      width="50vw"
      :visible="editAddDrugVisible"
      :showClose="true"
      @handleClose="handleCloseDrug"
      @handleOk="editAddDrugOk"
    >
      <el-form
        class="add-form"
        :model="editAddDrugForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
      >
        <el-form-item label="分类名称:" prop="categoryId">
          <el-select v-model="editAddDrugForm.categoryId" placeholder="请选择">
            <el-option
              v-for="item in categoryId"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="药品医保编码:" prop="goodsCode">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.goodsCode"
            placeholder="请输入医保编码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="通用名:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.commonName"
            placeholder="请输入通用名"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="商品名:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.goodsName"
            placeholder="请输入商品名"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="品牌:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.brand"
            placeholder="请输入品牌"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="基药属性:">
          <el-select
            v-model="editAddDrugForm.basicProperty"
            placeholder="请选择基药属性"
          >
            <el-option label="基药" value="1"> </el-option>
            <el-option label="非基药" value="2"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="剂型:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.jx"
            placeholder="请输入剂型"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="规格:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.specification"
            placeholder="请输入规格"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="包装:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.pack"
            placeholder="请输入包装"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="国产/进口:">
          <el-select
            v-model="abroadt[editAddDrugForm.abroad]"
            placeholder="请选择国产/进口"
          >
            <el-option label="国产" value="1"> </el-option>
            <el-option label="进口" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="药品本位码:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.ypbwm"
            placeholder="请输入药品本位码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="批准文号:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.approvalNumber"
            placeholder="请输入批准文号"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="form-item" label="商城价:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.mallPrice"
            placeholder="请输入商城价"
          >
          </el-input>
        </el-form-item> -->
        <el-form-item class="form-item" label="排序号:">
          <el-input placeholder="请输入排序号" v-model="editAddDrugForm.sortNo">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
    <!-- 药品管理详情弹窗 -->
    <cu-dialog
      title="药品管理详情"
      width="50vw"
      :visible="detailsDrugVisible"
      :showClose="true"
      @handleClose="handleCloseDrug"
      @handleOk="detailsDrugDrugOk"
    >
      <el-form
        class="add-form"
        :model="editAddDrugForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
        disabled
      >
        <el-form-item label="分类名称:" prop="categoryId">
          <el-select v-model="editAddDrugForm.categoryId" placeholder="请选择">
            <el-option
              v-for="item in categoryId"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="药品医保编码:" prop="goodsCode">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.goodsCode"
            placeholder="请输入医保编码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="通用名:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.commonName"
            placeholder="请输入通用名"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="商品名:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.goodsName"
            placeholder="请输入商品名"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="品牌:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.brand"
            placeholder="请输入品牌"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="基药属性:">
          <el-select
            v-model="editAddDrugForm.basicProperty"
            placeholder="请选择基药属性"
          >
            <el-option label="基药" value="1"> </el-option>
            <el-option label="非基药" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国产/进口:">
          <el-select
            v-model="abroadt[editAddDrugForm.abroad]"
            placeholder="请选择基药属性"
          >
            <el-option label="国产" value="1"> </el-option>
            <el-option label="进口" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="剂型:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.jx"
            placeholder="请输入剂型"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="规格:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.specification"
            placeholder="请输入规格"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="包装:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.pack"
            placeholder="请输入包装"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="药品本位码:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.ypbwm"
            placeholder="请输入药品本位码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="批准文号:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.approvalNumber"
            placeholder="请输入批准文号"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="商城价:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.mallPrice"
            placeholder="请输入商城价"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="排序号:">
          <el-input placeholder="请输入排序号" v-model="editAddDrugForm.sortNo">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  getDrugManagementlist,
  addDrugManagement,
  editDrugManagement,
  deletDrugManagement,
  selectdrugClass,
  getDetailsDrugManager,
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
  data() {
    return {
      id: null,
      keyword: "",
      tableLoading: false,
      editAddDrugVisible: false,
      detailsDrugVisible: false,
      basicProperty: {
        1: "基药",
        2: "非基药",
      },
      abroadt:{
        1:'国产',
        2:'进口'
      },
      categoryId: [],
      editAddDrugForm: {
        approvalNumber: "",
        basicProperty: null,
        brand:null,
        categoryId: 0,
        abroad:'',
        commonName: "",
        createTime: "",
        deleteFlag: 0,
        forPeople: "",
        goodsCode: "",
        goodsName: "",
        grossWeight: "",
        id: 0,
        indications: "",
        itemNo: "",
        jx: "",
        lb: "",
        mallPrice: 0,
        manufacturer: "",
        orderAmount: 0,
        orderCount: 0,
        originPlace: "",
        pack: "",
        packMaterial: "",
        saleCount: 0,
        sortNo: 0,
        specification: "",
        usageMethod: "",
        ypbwm: "",
      },
      rules: {
        goodsCode: [
          { required: true, message: "请输入药品医保编码", trigger: "change" },
          {
            min: 2,
            max: 30,
            message: "分类名称不得少于2个字符",
            trigger: "blur",
          },
        ],
        categoryId: [
          { required: true, message: "请选择分类名称", trigger: "change" },
        ],
      },

      tableData: [],
      Total: 1,
      tableHeader: [
        {
          title: "id",
          slot: "id",
          width: 60,
        },
        {
          title: "分类名称",
          slot: "categoryName",
        },
        {
          title: "药品医保编码",
          slot: "goodsCode",
        },
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "商品名",
          slot: "goodsName",
        },
        {
          title:'品牌',
          key:'brand'
        },
        {
          title: "基药属性",
          slot: "basicProperty",
        },
        {
          title: "剂型",
          slot: "jx",
        },
        {
          title: "规格",
          slot: "specification",
        },
        {
          title: "包装",
          slot: "pack",
        },
        {
          title: "药品本位码",
          slot: "ypbwm",
        },
        {
          title: "国产/进口",
          slot: "abroad",
        },
        {
          title: "批准文号",
          slot: "approvalNumber",
        },
        // {
        //   title: "商城价",
        //   slot: "mallPrice",
        // },
        
        {
          fixed: 'right',
          title: "操作",
          slot: "operate",
          width: 120,
        },
      ],
    };
  },
  mounted() {
    this.getDrugManagement();
    this.selectdrugClassList();
  },
  methods: {
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    //关键字搜索
    search() {
      this.getDrugManagement();
    },
    //读取选择药械分类
    async selectdrugClassList() {
      this.tableLoading = true;
      await selectdrugClass()
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.categoryId = res.data.data;
            this.tableLoading = false;
          }
          console.log(this.categoryId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取药品管理信息列表
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDrugManagement();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDrugManagement();
    },
    async getDrugManagement() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.keyword,
      };
      this.tableData = [];
      await getDrugManagementlist(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let data=res.data.data
            console.log(data,2222);
            this.tableData = data.records;
            this.pageNum = data.current;
            this.pageSize =data.size;
            this.Total = data.total;
            this.pageCount = data.pages;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增、编辑药品管理
    editAddDrug(type, id) {
      this.editAddDrugForm = { id: 0, deleteFlag: 0 };
      if (type == "edit") {
        this.editAddDrugForm = this.tableData.filter(
          (item) => item.id == id
        )[0];
      }
      console.log(this.editAddDrugForm);
      this.editAddDrugVisible = true;
    },
    handleCloseDrug() {
      this.editAddDrugVisible = false;
      this.detailsDrugVisible = false;
      this.getDrugManagement();
    },
    editAddDrugOk() {
      this.$refs["editAddForm"].validate((valid) => {
        if (valid) {
          let params = this.editAddDrugForm;
          console.log(params);
          if (params.id) {
            // 编辑信息
            editDrugManagement(params)
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("药品管理编辑成功");
                  this.getDrugManagement();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            addDrugManagement(params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("药品管理新增成功");
                  this.getDrugManagement();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.$refs["editAddForm"].resetFields();
          this.editAddDrugVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除药品信息
    deleteDrug(id) {
      console.log(id);
      let params = { id: id };
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletDrugManagement(params)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getDrugManagement();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "info",
                message: "删除失败",
              });
              this.getDrugManagement();
            });
        })
        .catch(() => {});
    },
    //药品信息详情
    detailsDrugDrugOk() {
      this.detailsDrugVisible = false;
      this.getDrugManagement();
    },
    async detailsDrug(id) {
      this.detailsDrugVisible = true;
      let params = {
        id: id,
      };
      this.tableData = [];
      await getDetailsDrugManager(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.editAddDrugForm = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
