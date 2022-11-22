<template>
  <!-- 供应商管理 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="supplierGrouping_one mt_20">供应商分组</div>
    <div class="supplierGrouping_two">
      <el-button class="btn_ff480e" type="primary" @click="addButton()"
        >添加分组</el-button
      >
    </div>
    <div>
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :showHeight="false"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="pages.total"
      >
        <template slot="status" slot-scope="value">
          {{ statusList[value.value.status] }}
        </template>
        <template slot="operate" slot-scope="value">
          <a type="primary" @click="editButton(value.value)"> 修改分组 </a>

          <el-popconfirm
            @confirm="deleteButton(value.value)"
            title="确定删除改分组吗？"
          >
            <a
              type="primary"
              class="ml_20"
              style="color: #ff480e"
              slot="reference"
            >
              删除分组
            </a>
          </el-popconfirm>
        </template>
      </cu-table>
    </div>
    <cu-dialog
      title="添加分组"
      width="1080px"
      top="8vh"
      :showClose="true"
      :visible="addVisible"
      @handleClose="addHandleClose()"
      @handleOk="addHandleOk()"
    >
      <div
        class="add"
        v-loading="dialogLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <div class="add_one">
          <span class="add_one1">分组名称:</span>
          <el-input
            clearable
            class="el_input"
            v-model="buyerAddSupplierGroupRequest.groupName"
            placeholder="请输入分组名称"
          >
          </el-input>
        </div>
        <div class="add_one mt_20">
          <span class="add_one1">供应商:</span>
          <el-input
            class="el_input"
            @click.native="addSupplyButton"
            placeholder=""
            suffix-icon="el-icon-search"
          >
          </el-input>
        </div>
        <cu-table
          :loading="tableLoading"
          class="sale-table mt_10"
          :height="400"
          :showTitle="false"
          :tableHeader="supplierTableHeader"
          :tableData="supplierTableData"
          @handleSizeChange="supplierHandleSizeChange"
          @handleCurrentChange="supplierHandleCurrentChange"
          :total="supplierTableDataAll.length"
        >
          <template slot="status" slot-scope="value">
            {{ statusList[value.value.status] }}
          </template>
          <template slot="supplierType" slot-scope="value">
            {{ supplierTypeList[value.value.supplierType] }}
          </template>

          <template slot="operate" slot-scope="value">
            <a type="primary" @click="supplierDetailsButton(value.value)">
              详情
            </a>
            <a
              type="primary"
              class="ml_20"
              style="color: #ff480e"
              @click="supplierDetailsDelete(value.value)"
            >
              删除
            </a>
          </template>
        </cu-table>
      </div>
    </cu-dialog>

    <cu-dialog
      title="修改分组"
      width="1080px"
      top="8vh"
      :showClose="true"
      :visible="editVisible"
      @handleClose="editHandleClose()"
      @handleOk="editHandleOk()"
    >
      <div
        class="edit"
        v-loading="dialogLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <div class="edit_one">
          <span class="edit_one1">分组名称:</span>
          <el-input
            clearable
            class="el_input"
            v-model="buyerModifySupplierGroupRequest.groupName"
            placeholder="请输入分组名称"
          >
          </el-input>
        </div>
        <div class="edit_one mt_20">
          <span class="edit_one1">供应商:</span>
          <el-input
            class="el_input"
            @click.native="addSupplyButton"
            placeholder=""
            suffix-icon="el-icon-search"
          >
          </el-input>
        </div>
        <cu-table
          :loading="tableLoading"
          class="sale-table mt_10"
          :height="400"
          :showTitle="false"
          :tableHeader="supplierTableHeader"
          :tableData="supplierTableData"
          @handleSizeChange="supplierHandleSizeChange"
          @handleCurrentChange="supplierHandleCurrentChange"
          :total="supplierTableDataAll.length"
        >
          <template slot="status" slot-scope="value">
            {{ statusList[value.value.status] }}
          </template>
          <template slot="supplierType" slot-scope="value">
            {{ supplierTypeList[value.value.supplierType] }}
          </template>

          <template slot="operate" slot-scope="value">
            <a type="primary" @click="supplierDetailsButton(value.value)">
              详情
            </a>
            <a
              type="primary"
              class="ml_20"
              style="color: #ff480e"
              @click="supplierDetailsDelete(value.value)"
            >
              删除
            </a>
          </template>
        </cu-table>
      </div>
    </cu-dialog>

    <cu-dialog
      title="供应商详情"
      width="90vw"
      top="8vh"
      :showClose="true"
      :visible="supplierDetailsVisible"
      @handleClose="supplierDetailsVisibleHandleClose()"
      @handleOk="supplierDetailsVisibleHandleOk()"
    >
      <div class="enterprise-info">
        <div class="info">
          <div class="info-title">企业信息</div>
          <div class="info-content">
            <div class="info-item">
              <div class="label">单位名称:</div>
              {{ info.unitName }}
            </div>
            <div class="info-item">
              <div class="label">状态:</div>
              {{ auditTypes[info.auditStatus] }}
            </div>
            <div class="info-item">
              <div class="label">登录账号:</div>
              {{ vuex_user.name }}
            </div>
            <div class="info-item">
              <div class="label">对公账户:</div>
              {{ info.corporateAccount }}
            </div>
            <div class="info-item">
              <div class="label">供应类型:</div>
              {{ supplierTypes[info.supplierType] }}
            </div>
            <div class="info-item">
              <div class="label">企业电话:</div>
              {{ info.businessPhone }}
            </div>
            <div class="info-item">
              <div class="label">营业执照:</div>
              <div class="img-item">
                <img :src="info.businessLicenseUrl" alt="" />
                <span>营业执照图片</span>
              </div>
              <div class="img-item">
                <img :src="info.licenceUrl" alt="" />
                <span>许可证图片</span>
              </div>
            </div>
            <div class="info-item">
              <div class="label">企业logo:</div>
              <img class="info-logo" :src="info.logoUrl" alt="" />
            </div>
            <div class="info-item">
              <div class="label">法人身份证:</div>
              <div class="img-item">
                <img :src="info.legalIdFrontUrl" alt="" />
                <span>身份证正面图片</span>
              </div>
              <div class="img-item">
                <img :src="info.legalIdBackUrl" alt="" />
                <span>身份证反面图片</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="info-title">企业联系人</div>
          <div class="info-content">
            <div class="info-item">
              <div class="label">姓名:</div>
              {{ info.contactUser }}
            </div>
            <div class="info-item">
              <div class="label">手机:</div>
              {{ info.phone }}
            </div>
            <div class="info-item">
              <div class="label">职务:</div>
              {{ info.post }}
            </div>
          </div>
        </div>
        <div class="info">
          <div class="info-title">财务信息</div>
          <div class="info-content goods-desc">
            <div class="info-item">
              <div class="label">发票抬头:</div>
              {{ info.invoiceHeader }}
            </div>
            <div class="info-item">
              <div class="label">纳税人识别号:</div>
              {{ info.taxpayerIdNumber }}
            </div>
            <div class="info-item">
              <div class="label">开户名称:</div>
              {{ info.bankAccountName }}
            </div>
            <div class="info-item">
              <div class="label">银行账号:</div>
              {{ info.bankAccountNo }}
            </div>
          </div>
        </div>
        <div class="info">
          <div class="info-title">财务信息:</div>
          <div class="info-content">
            <div class="info-item">
              <div class="label">仓库号:</div>
              {{ info.ckbh }}
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </cu-dialog>

    <addSupply
      v-if="addSupplyVisible"
      :addSupplyVisible="addSupplyVisible"
      :id="tableData.length > 0 ? tableData[0].id : null"
      @supplierDetailsButton="supplierDetailsButton"
      @addSupplyHandleClose="addSupplyHandleClose"
      @addSupplyHandleOk="addSupplyHandleOk"
      @addSupplyHandleSelectionChange="addSupplyHandleSelectionChange"
    ></addSupply>
  </div>
</template>
<script>
import {
  buyerGetSupplierGroupList,
  buyerAddSupplierGroup,
  buyerGetSupplierList,
  buyerDelSupplierGroup,
  buyerModifySupplierGroup,
  buyerGetSupplierDetails,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import { mapState } from "vuex";
import addSupply from "../components/addSupply/addSupply.vue";
export default {
  components: {
    addSupply,
  },
  data() {
    return {
      // 状态
      statusList: {
        0: "禁用",
        1: "可用",
      },
      supplierTypeList: {
        1: "药品",
        2: "器械",
      },
      // 查询功能
      query: {
        supplierCode: "",
        unitName: "",
        groupName: "",
      },
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "分组名称",
          key: "groupName",
        },
        {
          title: "供应商数量",
          key: "supplierCount",
        },
        {
          title: "状态",
          slot: "status",
        },
        {
          title: "操作人",
          slot: "createBy",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "操作",
          slot: "operate",
          width: "180",
        },
      ],
      tableData: [],
      tableItemData: [],
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      tableLoading: false, //表格加载
      dialogLoading: false, //弹框加载

      supplierTableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "供应商名称",
          key: "unitName",
        },
        {
          title: "企业联系人",
          key: "contactUser",
          width: "120",
        },
        {
          title: "手机号",
          key: "phone",
          width: "120",
        },
        {
          title: "供应商类型",
          slot: "supplierType",
          width: "120",
        },

        {
          title: "操作",
          slot: "operate",
          width: "180",
        },
      ],
      supplierTableData: [],
      supplierTableDataAll: [], //所有的选中数据，做分页
      supplierPages: {
        total: 0,
        current: 1,
        size: 10,
      },
      addVisible: false, //添加分组弹框
      editVisible: false, //修改分组弹框
      deleteVisible: false, //删除分组弹框
      supplierDetailsVisible: false, //供应商详情弹框

      // 供应商管理(新增分组)-接口-传参
      buyerAddSupplierGroupRequest: {
        groupName: "", //	分组名称
        supplierIds: [], //	供应商ID
      },
      // 供应商管理(更新分组)-接口-传参
      buyerModifySupplierGroupRequest: {
        id: null, //分组id
        groupName: "", //	分组名称
        supplierIds: [], //	供应商ID
      },
      buyerGetSupplierDetailsId: null, // 获取采购商关联供货商详情-接口-传参

      // 供应商详情使用：
      supplierTypes: {
        1: "药品",
        2: "器械",
      },
      auditTypes: {
        1: "待审核",
        2: "审核通过",
        3: "不通过",
      },
      info: {},

      addSupplyVisible: false, //添加供应商弹框
    };
  },
  computed: {
    ...mapState(["vuex_user"]),
  },
  mounted() {
    this.buyerGetSupplierGroupListApi(); //获取我的采购单列表
  },

  methods: {
    //获取供应商分组列表-接口
    buyerGetSupplierGroupListApi() {
      this.tableLoading = true;
      let valueData = {
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
        groupName: this.query.groupName,
      };
      buyerGetSupplierGroupList(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.list;
            this.pages.total = res.data.totalCount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },

    // 新增供应商列表-接口
    buyerAddSupplierGroupApi() {
      this.dialogLoading = true;
      buyerAddSupplierGroup(this.buyerAddSupplierGroupRequest)
        .then((res) => {
          this.dialogLoading = false;
          if (res.code == 200) {
            this.buyerGetSupplierGroupListApi(); //获取供应商分组列表-接口
            this.$message.success(res.message);
            this.addVisible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.dialogLoading = false;
          console.log(err);
        });
    },
    // 获取供应商分组里面供应商列表-接口
    buyerGetSupplierListApi() {
      this.supplierTableData = [];
      this.supplierTableDataAll = [];
      this.buyerModifySupplierGroupRequest.supplierIds = [];
      this.tableLoading = true;
      let valueData = {
        groupId: this.tableItemData[0].id,
      };
      buyerGetSupplierList(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            if (res.data) {
              if (res.data.groupList) {
                res.data.groupList.forEach((element) => {
                  this.supplierTableData.push(
                    JSON.parse(JSON.stringify(element))
                  );
                  this.supplierTableDataAll.push(
                    JSON.parse(JSON.stringify(element))
                  );
                  this.buyerModifySupplierGroupRequest.supplierIds.push(
                    element.id
                  );
                });
              }
            }

            this.editVisible = true; //修改弹框开启
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 供应商管理(删除分组)-接口
    buyerDelSupplierGroupApi() {
      this.tableLoading = true;
      buyerDelSupplierGroup(this.tableItemData[0].id)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.buyerGetSupplierGroupListApi();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 供应商管理(更新分组)-接口
    buyerModifySupplierGroupApi() {
      this.dialogLoading = true;
      buyerModifySupplierGroup(this.buyerModifySupplierGroupRequest)
        .then((res) => {
          this.dialogLoading = false;
          if (res.code == 200) {
            this.editVisible = false;
            this.buyerGetSupplierGroupListApi();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.dialogLoading = false;
          console.log(err);
        });
    },
    // 获取采购商关联供货商详情-接口
    buyerGetSupplierDetailsApi() {
      buyerGetSupplierDetails(this.buyerGetSupplierDetailsId)
        .then((res) => {
          if (res.code == 200) {
            this.info = res.data;
            this.supplierDetailsVisible = true;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 每页条数改变回调
    handleSizeChange(value) {
      this.pages.size = value;
      this.buyerGetSupplierGroupListApi();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.buyerGetSupplierGroupListApi();
    },

    // 修改弹框-供应商每页条数改变回调
    supplierHandleSizeChange(value) {
      this.supplierTableData = [];
      this.supplierPages.size = value;
      let start = (this.supplierPages.current - 1) * this.supplierPages.size;
      let end =
        (this.supplierPages.current - 1) * this.supplierPages.size +
        this.supplierPages.size;
      this.supplierTableData = this.supplierTableDataAll.slice(start, end);
    },
    // 修改弹框-供应商页码改变回调
    supplierHandleCurrentChange(value) {
      this.supplierPages.current = value;
      let start = (this.supplierPages.current - 1) * this.supplierPages.size;
      let end =
        (this.supplierPages.current - 1) * this.supplierPages.size +
        this.supplierPages.size;
      this.supplierTableData = this.supplierTableDataAll.slice(start, end);
    },

    selectSupplierListChange(value) {
      console.log("value:", value);
      console.log("this.selectSupplierList:", this.selectSupplierList);
    },

    // 添加分组按钮
    addButton() {
      this.buyerAddSupplierGroupRequest.groupName = ""; //	分组名称
      this.buyerAddSupplierGroupRequest.supplierIds = []; //	供应商ID
      this.supplierTableData = [];
      this.supplierTableDataAll = [];
      this.addVisible = true;
    },
    // 添加分组弹框-取消按钮
    addHandleClose() {
      this.addVisible = false;
    },
    // 添加分组弹框-确定按钮
    addHandleOk() {
      if (!this.buyerAddSupplierGroupRequest.groupName) {
        this.$message.error("分组名称不能为空");
        return;
      }
      this.buyerAddSupplierGroupApi(); //新增供应商列表
    },

    // 修改分组按钮
    editButton(value) {
      this.tableItemData = [];
      this.tableItemData.push(JSON.parse(JSON.stringify(value)));
      this.buyerModifySupplierGroupRequest.groupName = value.groupName;
      this.buyerModifySupplierGroupRequest.id = value.id;
      this.buyerGetSupplierListApi();
    },
    // 修改分组弹框-取消按钮
    editHandleClose() {
      this.tableItemData = [];
      this.editVisible = false;
    },
    // 修改分组弹框-确定按钮
    editHandleOk() {
      if (!this.buyerModifySupplierGroupRequest.groupName) {
        this.$message.error("分组名称不能为空");
        return;
      }
      this.buyerModifySupplierGroupApi();
    },

    // 删除分组按钮
    deleteButton(value) {
      this.tableItemData = [];
      this.tableItemData.push(value);
      this.buyerDelSupplierGroupApi(); //删除供应商分组-接口
    },

    nameHandleOk() {},

    supplierDetailsButton(value) {
      this.buyerGetSupplierDetailsId = value.id;
      this.buyerGetSupplierDetailsApi(); // 获取采购商关联供货商详情-接口
    },
    supplierDetailsVisibleHandleClose() {
      this.supplierDetailsVisible = false;
    },
    supplierDetailsVisibleHandleOk() {
      this.supplierDetailsVisible = false;
    },

    // 添加供应商按钮
    addSupplyButton() {
      this.addSupplyVisible = true;
    },
    // 添加供应商弹框-取消按钮
    addSupplyHandleClose() {
      this.addSupplyVisible = false;
    },
    // 添加供应商弹框-确定按钮
    addSupplyHandleOk(value) {
      if (this.supplierTableDataAll.length > 0) {
        this.supplierTableDataAll.forEach((element) => {
          value.forEach((elemen, index) => {
            if (element.id == elemen.id) {
              value.splice(index, 1);
            }
          });
        });
        value.forEach((element) => {
          this.supplierTableData.push(JSON.parse(JSON.stringify(element)));
          this.supplierTableDataAll.push(JSON.parse(JSON.stringify(element)));
          this.buyerAddSupplierGroupRequest.supplierIds.push(element.id);
          this.buyerModifySupplierGroupRequest.supplierIds.push(element.id);
        });
      } else {
        value.forEach((element) => {
          this.supplierTableData.push(JSON.parse(JSON.stringify(element)));
          this.supplierTableDataAll.push(JSON.parse(JSON.stringify(element)));
          this.buyerAddSupplierGroupRequest.supplierIds.push(element.id);
          this.buyerModifySupplierGroupRequest.supplierIds.push(element.id);
        });
      }

      let start = (this.supplierPages.current - 1) * this.supplierPages.size;
      let end =
        (this.supplierPages.current - 1) * this.supplierPages.size +
        this.supplierPages.size;
      this.supplierTableData = this.supplierTableDataAll.slice(start, end);
      this.addSupplyVisible = false;
    },
    // 添加供应商弹框-获取表选择选中的数据
    addSupplyHandleSelectionChange(value) {
      console.log("父级：", value);
    },
    // 详情删除按钮
    supplierDetailsDelete(value) {
      this.supplierTableData.forEach((element, index) => {
        if (element.id == value.id) {
          this.supplierTableData.splice(index, 1);
          if (this.supplierTableData.length == 0) {
            if (this.supplierPages.current != 1) {
              this.supplierPages.current = this.supplierPages.current - 1;
              this.supplierHandleCurrentChange(this.supplierPages.current);
            }
          }
        }
      });
      this.supplierTableDataAll.forEach((element, index) => {
        if (element.id == value.id) {
          this.supplierTableDataAll.splice(index, 1);
        }
      });
      // 添加用
      this.buyerAddSupplierGroupRequest.supplierIds.forEach(
        (element, index) => {
          if (element == value.id) {
            this.buyerAddSupplierGroupRequest.supplierIds.splice(index, 1);
          }
        }
      );
      // 修改用
      this.buyerModifySupplierGroupRequest.supplierIds.forEach(
        (element, index) => {
          if (element == value.id) {
            this.buyerModifySupplierGroupRequest.supplierIds.splice(index, 1);
          }
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./supplierManagement.scss";
</style>
