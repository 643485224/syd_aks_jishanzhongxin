<template>
  <div ref="contentBox" class="page-container table-page">
    <div ref="search_box" class="search_box">
      <div class="search_item mr_20 mb_20">
        <span class="mr_10">采购项目名称:</span>
        <el-input
          clearable
          class="el_input"
          v-model="query.projectName"
          placeholder="请输入订单编号"
        >
        </el-input>
      </div>
      <div class="search_item mr_20 mb_20">
        <span class="mr_10">创建时间:</span>
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker
          class="el_date_picker"
          v-model="query.pickDate"
          @change="pickDateChange"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="search_item mr_20 mb_20">
        <span class="mr_10">采购类型:</span>
        <el-select
          clearable
          class="el_select"
          v-model="query.type"
          placeholder="请选择"
        >
          <el-option label="招标需求采购" :value="1"></el-option>
          <el-option label="临时需求采购" :value="2"></el-option>
        </el-select>
      </div>
      <div class="search_item mr_20 mb_20">
        <span class="mr_10">审核状态:</span>
        <el-select
          clearable
          class="el_select"
          v-model="query.auditStatus"
          placeholder="请选择"
        >
          <el-option label="待提交" :value="1"></el-option>
          <el-option label="待审核" :value="2"></el-option>
          <el-option label="审核通过" :value="3"></el-option>
          <el-option label="审核不通过" :value="4"></el-option>
        </el-select>
      </div>
      <el-button
        class="btn_00C514 mr_10 mb_20"
        type="primary"
        @click="addPurchaseButton()"
        >新增</el-button
      >

      <el-button class="btn_ff480e mb_20" type="primary" @click="queryButton()"
        >查询</el-button
      >
    </div>

    <div>
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :height="tableHeight"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="pages.total"
      >
        <template slot="type" slot-scope="value">
          {{ typeList[value.value.type] }}
        </template>
        <template slot="auditStatus" slot-scope="value">
          {{ auditStatusList[value.value.auditStatus] }}
        </template>
        <template slot="operate" slot-scope="value">
          <a
            v-if="value.value.auditStatus == 3"
            @click="generateOrderButton(value.value)"
            >一键采购</a
          >
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            content="审核状态为(审核通过)才可一键采购"
            placement="top"
          >
            <a class="aDisabled"> 一键采购 </a>
          </el-tooltip> -->

          <a
            v-if="value.value.auditStatus == 1"
            class="ml_10"
            @click="submitButton(value.value)"
            >提交</a
          >
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            content="审核状态为(待提交)才可提交"
            placement="top"
          >
            <a class="aDisabled ml_10"> 提交 </a>
          </el-tooltip> -->

          <a
            type="primary"
            class="ml_10"
            @click="disablePurchaseButton(value.value)"
          >
            禁用
          </a>

          <a v-if="true" class="ml_10" @click="editPurchaseButton(value.value)"
            >修改</a
          >
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            content="审核状态为(待提交)才可修改"
            placement="top"
          >
            <a class="aDisabled ml_10"> 修改 </a>
          </el-tooltip> -->
          <a
            v-if="true"
            class="ml_10"
            style="color: #ff480e"
            @click="deletePurchaseButton(value.value)"
            >删除</a
          >
          <!-- <el-tooltip
            v-else
            class="item"
            effect="dark"
            content="审核状态为(待提交)才可删除"
            placement="top"
          >
            <a style="color: #ff480e" class="aDisabled ml_10"> 删除 </a>
          </el-tooltip> -->
        </template>
      </cu-table>
    </div>
    <div>
      <cu-dialog
        width="90vw"
        top="8vh"
        title="新增采购项目"
        :showClose="true"
        :visible="addPurchaseVisible"
        @handleClose="addPurchaseHandleClose()"
        @handleOk="addPurchaseHandleOk()"
      >
        <div class="addPurchase">
          <div class="addPurchase_title mt_20">采购信息</div>
          <el-row :gutter="20" class="el_row">
            <el-col :span="8" class="el_col">
              <div class="title">采购项目名称:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.projectName"
                placeholder="请输入采购项目名称"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">采购预算:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.budget"
                placeholder="请输入采购预算"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el_row mt_20">
            <el-col :span="8" class="el_col">
              <div class="title">项目编号:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.projectNo"
                placeholder="请输入项目编号"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">采购需求描述:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.requirement"
                placeholder="请输入采购需求描述"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el_row mt_20">
            <el-col :span="8" class="el_col">
              <div class="title">采购类型:</div>
              <el-select
                class="el_select"
                style="width: 70%"
                v-model="addPurchaseForm.type"
                placeholder="请选择采购类型"
              >
                <el-option label="招标需求采购" :value="1"></el-option>
                <el-option label="临时需求采购" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">关联供应商:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.refSupplier"
                placeholder="请输入关联供应商"
              >
              </el-input>
            </el-col>
          </el-row>
          <div class="addPurchase_title mt_20">招采信息</div>
          <el-row :gutter="20" class="el_row mt_20">
            <el-col :span="8" class="el_col">
              <div class="title">中标供应商:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.zbSupplier"
                placeholder="请输入中标供应商"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">合同名称:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.contractName"
                placeholder="请输入合同名称"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">合同编号:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.contractNo"
                placeholder="请输入合同编号"
              >
              </el-input>
            </el-col>
          </el-row>
          <div class="addPurchase_title mt_20">采购单信息</div>
          <div class="addPurchase_button mt_20">
            <el-button
              class="btn_00C514 mr_10"
              type="primary"
              @click="importPurchaseOrderButton()"
              >导入采购单</el-button
            >
            <el-button
              class="btn_156CC2 mr_10"
              type="primary"
              @click="addItemButton()"
              >添加商品</el-button
            >
            <el-button class="btn_ff480e" type="primary" @click="deleteButton()"
              >删除</el-button
            >
          </div>
          <div class="addPurchase_table">
            <cu-table
              :selection="true"
              :showHeight="false"
              :showTitle="false"
              :showPagination="false"
              :tableHeader="addPurchasetableHeader"
              :tableData="addPurchasetableData"
              @handleSelectionChange="addPurchasehandleSelectionChange"
            >
              <template #goodsName="value">
                {{ value.value.goodsName }}
                {{ value.value.productName }}
              </template>
              <template #quantity="value">
                <el-input-number
                  v-if="elInputNumberShow"
                  :controls="true"
                  v-model="value.value.quantity"
                  :min="1"
                  :precision="0"
                  @change="
                    quantityChange(
                      value.value.squantity,
                      value.value.quantity,
                      value.index
                    )
                  "
                ></el-input-number>
              </template>
            </cu-table>
          </div>
        </div>
      </cu-dialog>

      <cu-dialog
        width="90vw"
        top="8vh"
        title="修改采购项目"
        :showClose="true"
        :visible="editPurchaseVisible"
        @handleClose="editPurchaseHandleClose()"
        @handleOk="editPurchaseHandleOk()"
      >
        <div class="addPurchase">
          <div class="addPurchase_title mt_20">采购信息</div>
          <el-row :gutter="20" class="el_row">
            <el-col :span="8" class="el_col">
              <div class="title">采购项目名称:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.projectName"
                placeholder="请输入采购项目名称"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">采购预算:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.budget"
                placeholder="请输入采购预算"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el_row mt_20">
            <el-col :span="8" class="el_col">
              <div class="title">项目编号:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.projectNo"
                placeholder="请输入项目编号"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">采购需求描述:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.requirement"
                placeholder="请输入采购需求描述"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el_row mt_20">
            <el-col :span="8" class="el_col">
              <div class="title">采购类型:</div>
              <el-select
                class="el_select"
                style="width: 70%"
                v-model="addPurchaseForm.type"
                placeholder="请选择采购类型"
              >
                <el-option label="招标需求采购" :value="1"></el-option>
                <el-option label="临时需求采购" :value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">关联供应商:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.refSupplier"
                placeholder="请输入关联供应商"
              >
              </el-input>
            </el-col>
          </el-row>
          <div class="addPurchase_title mt_20">招采信息</div>
          <el-row :gutter="20" class="el_row mt_20">
            <el-col :span="8" class="el_col">
              <div class="title">中标供应商:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.zbSupplier"
                placeholder="请输入中标供应商"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">合同名称:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.contractName"
                placeholder="请输入合同名称"
              >
              </el-input>
            </el-col>
            <el-col :span="8" class="el_col">
              <div class="title">合同编号:</div>
              <el-input
                clearable
                class="el_input"
                v-model="addPurchaseForm.contractNo"
                placeholder="请输入合同编号"
              >
              </el-input>
            </el-col>
          </el-row>
          <div class="addPurchase_title mt_20">采购单信息</div>
          <div class="addPurchase_button mt_20">
            <el-button
              class="btn_00C514 mr_10"
              type="primary"
              @click="importPurchaseOrderButton()"
              >导入采购单</el-button
            >
            <el-button
              class="btn_156CC2 mr_10"
              type="primary"
              @click="addItemButton()"
              >添加商品</el-button
            >
            <el-button class="btn_ff480e" type="primary" @click="deleteButton()"
              >删除</el-button
            >
          </div>
          <div class="addPurchase_table">
            <cu-table
              :selection="true"
              :showHeight="false"
              :showTitle="false"
              :showPagination="false"
              :tableHeader="addPurchasetableHeader"
              :tableData="addPurchasetableData"
              @handleSelectionChange="addPurchasehandleSelectionChange"
            >
              <template #goodsName="value">
                {{ value.value.goodsName }}
                {{ value.value.productName }}
              </template>
              <template #quantity="value">
                <el-input-number
                  v-if="elInputNumberShow"
                  :controls="true"
                  v-model="value.value.quantity"
                  :min="1"
                  :precision="0"
                  @change="
                    quantityChange(
                      value.value.squantity,
                      value.value.quantity,
                      value.index
                    )
                  "
                ></el-input-number>
              </template>
            </cu-table>
          </div>
        </div>
      </cu-dialog>

      <addItem
        v-if="addItemVisible"
        :ifDisabled="addItemIfDisabled"
        :typeSelcet="addItemTypeSelcet"
        :addItemVisible="addItemVisible"
        @addItemHandleClose="addItemHandleClose"
        @addItemHandleOk="addItemHandleOk"
      ></addItem>

      <cu-dialog
        width="90vw"
        top="8vh"
        title="导入采购单"
        :showClose="true"
        :visible="importPurchaseOrderVisible"
        @handleClose="importPurchaseOrderHandleClose()"
      >
        <div class="importPurchaseOrder">
          <div class="importPurchaseOrderBody flex">
            <div class="importPurchaseOrder_1 mr_20">
              <img src="./image/download.png" alt="" />
            </div>
            <div class="importPurchaseOrder_2">
              <div class="importPurchaseOrder_2_1 mb_20">填写导入数据信息</div>
              <div class="importPurchaseOrder_2_2 mb_20">
                请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除
              </div>
              <div class="importPurchaseOrder_2_3 mb_20">
                <el-popover placement="bottom" trigger="click">
                  <el-button @click="downloadButton(1)">药品</el-button>
                  <el-button @click="downloadButton(2)">器械</el-button>
                  <el-button slot="reference">下载模板</el-button>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <div class="flex">
            <el-button type="default" @click="importPurchaseOrderHandleClose"
              >取消</el-button
            >
            <el-upload
              class="avatar-uploader ml_20"
              action
              :show-file-list="false"
              :http-request="purchaseImportPurchaseApi"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
      </cu-dialog>

      <cu-dialog
        width="90vw"
        top="8vh"
        title="批量导入采购单"
        :showClose="true"
        :visible="batchImportPurchaseOrderVisible"
        @handleClose="batchImportPurchaseOrderHandleClose()"
      >
        <div class="batchImportPurchaseOrder">
          <div class="batchImportPurchaseOrderBody">
            <div class="batchImportPurchaseOrderItem_one">
              <img
                class="batchImportPurchaseOrderItem_one1"
                src="./image/success.png"
                alt=""
              />
              <div class="batchImportPurchaseOrderItem_one2">
                <div class="batchImportPurchaseOrderItem_one21">
                  正常数量条数
                </div>
                <div class="batchImportPurchaseOrderItem_one22">
                  {{ purchaseImportPurchaseObject.normal }}条
                </div>
              </div>
            </div>
            <div class="batchImportPurchaseOrderItem_one mt_40">
              <img
                class="batchImportPurchaseOrderItem_one1"
                src="./image/info.png"
                alt=""
              />
              <div class="batchImportPurchaseOrderItem_one2">
                <div class="batchImportPurchaseOrderItem_one21">
                  异常数量条数
                </div>
                <div class="batchImportPurchaseOrderItem_one22">
                  {{ purchaseImportPurchaseObject.abnormal }}条
                </div>
              </div>
            </div>
            <div
              class="batchImportPurchaseOrderItem_three mt_40"
              v-if="purchaseImportPurchaseObject.abnormal != 0"
            >
              <div
                v-for="item in purchaseImportPurchaseObject.purchaseImportVo"
                :key="item"
              >
                <div>第{{ item.line }}行：{{ item.parameter }}</div>
              </div>
            </div>
            <div class="batchImportPurchaseOrderItem_three mt_40" v-else>
              导入数据正常，无异常数据
            </div>
          </div>
        </div>
        <div slot="footer">
          <div class="flex">
            <el-upload
              class="avatar-uploader ml_20"
              action
              :show-file-list="false"
              :http-request="purchaseImportPurchaseApi"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="default">重新上传</el-button>
            </el-upload>
            <el-button
              type="primary"
              class="ml_20"
              @click="batchImportPurchaseOrderHandleOk"
              >确定上传</el-button
            >
          </div>
        </div>
      </cu-dialog>
    </div>

    <!-- 一键采购弹框组件 -->
    <oneClickPurchase
      v-if="generateOrderVisible"
      :generateOrderVisible="generateOrderVisible"
      @generateOrderHandleClose="generateOrderHandleClose"
      :listItem="listItem"
    ></oneClickPurchase>
  </div>
</template>
<script>
import {
  purchaseFindBuyerRegister,
  purchaseAddBuyerRegister,
  purchaseGetBuyerRegisterDetails,
  purchaseModifyBuyerRegister,
  purchaseDelBuyerRegister,
  purchaseDisabledBuyerRegister,
  purchaseSubmitPurchaseOrder,
  purchaseImportPurchase,
  download,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import addItem from "../components/addItem/addItem.vue";
import oneClickPurchase from "../components/oneClickPurchase/oneClickPurchase.vue";
export default {
  components: {
    addItem,
    oneClickPurchase,
  },
  data() {
    return {
      typeList: {
        1: "招标需求采购",
        2: "临时需求采购",
      }, //类型
      auditStatusList: {
        1: "待提交",
        2: "待审核",
        3: "审核通过",
        4: "审核不通过",
      },
      query: {
        type: "", //类型
        projectName: "", //采购项目名称
        auditStatus: "", //审核状态
        startTime: "", //开始时间
        endTime: "", //结束时间
        pickDate: [], //时间
      },

      tableHeight: 0, //表格高度
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },

        {
          title: "采购编号",
          key: "purchaseNo",
        },
        {
          title: "项目编号",
          key: "projectNo",
        },
        {
          title: "项目名称",
          key: "projectName",
        },
        {
          title: "采购类型",
          slot: "type",
        },
        {
          title: "采购预算",
          key: "budget",
        },
        {
          title: "关联供应商",
          key: "refSupplier",
        },
        {
          title: "中标供应商",
          key: "zbSupplier",
        },
        {
          title: "创建时间",
          slot: "createTime",
          width: "100",
        },
        {
          title: "审核时间",
          slot: "auditTime",
          width: "100",
        },

        {
          title: "审核状态",
          slot: "auditStatus",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "280",
        },
      ],
      tableData: [],
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      tableLoading: false, //表格加载
      addPurchaseVisible: false, // 新增采购项目弹框
      addPurchasetableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "商品名称",
          slot: "goodsName",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "批准文号",
          key: "approvalNumber",
        },
        {
          title: "供应商名称",
          key: "supplierName",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "采购价",
          key: "buyPrice",
        },
        {
          title: "剩余库存",
          key: "squantity",
        },
        {
          title: "数量",
          slot: "quantity", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
          width: "180",
        },
      ], // 新增采购项目弹框-表格表头
      addPurchasetableData: [], // 新增采购项目弹框-表格内容
      addPurchasehandleSelection: [], // 新增采购项目弹框-表格内容选中数据
      addPurchaseForm: {
        budget: 0, //采购预算
        contractName: "", //合同名称
        contractNo: "", //合同编号
        projectName: "", //采购商项目名称
        projectNo: "", //项目编号
        refSupplier: "", //关联供应商
        requirement: "", //采购需求描述
        type: 1, //采购类型
        zbSupplier: "", //中标供应商
      },
      addItemVisible: false, // 添加商品弹框
      addItemIfDisabled: false, //是否置会添加商品的搜索
      addItemTypeSelcet: 1, //进入添加商品直接查询 1药品 2药械

      editPurchaseVisible: false, // 修改采购项目弹框
      editid: "", //修改使用 采购商id
      importPurchaseOrderVisible: false, //导入采购单弹框
      batchImportPurchaseOrderVisible: false, //批量导入采购单弹框
      generateOrderVisible: false, //开启关闭一键采购弹框组件
      listItem: {}, //一键采购弹框组件传入数据

      elInputNumberShow: true, //重新渲染数字输入框使用
      purchaseImportPurchaseObject: [], //导入商品明细接口回参-所有
      purchaseImportPurchaseList: [], //导入商品明细接口回参-具体商品
    };
  },
  watch: {
    asyncArray: function () {
      this.$nextTick(function () {
        //方法
      });
    },
  },
  mounted() {
    // 一般渲染过慢导致无法算出高度问题，加定时器
    setTimeout(() => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    }, 800);
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };

    this.purchaseFindBuyerRegisterApi(); // 查询采购登记信息-接口
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 查询采购登记信息-接口
    purchaseFindBuyerRegisterApi() {
      this.tableLoading = true;
      let valueData = {
        auditStatus: this.query.auditStatus, //采购单审核状态（1.待提交/2待审核/ 3. 审核通过/4.审核不通过）
        projectName: this.query.projectName, //项目名称
        startTime: this.query.startTime, //开始日期
        endTime: this.query.endTime, //结束日期
        type: this.query.type, //类型  1  招标需求采购  2  临时需求采购
        currPageNo: this.pages.current, //页码
        pageSize: this.pages.size, //页大小
      };
      purchaseFindBuyerRegister(valueData)
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
    // 采购登记详情-接口
    purchaseGetBuyerRegisterDetailsApi(value) {
      this.editid = value.id;
      let valueData = {
        currPageNo: 1, //Integer	当前页码	是
        pageSize: 1000, //Integer	页数	是
        purchaseId: value.id, //Integer	采购单ID	是
        goodsType: value.goodsType, //Integer	商品类型（1.药品/2.器械）	是
      };
      purchaseGetBuyerRegisterDetails(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.addPurchaseForm = res.data.purchase;
            this.addPurchasetableData = res.data.purchaseOrderGoodsList.list;
            this.addItemTypeSelcet = value.type;
            this.addPurchasetableData.forEach((element) => {
              element.goodsType = value.type;
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新增采购登记信息-接口
    purchaseAddBuyerRegisterApi() {
      if (!this.addPurchaseForm.projectName) {
        this.$message.info("请先输入采购项目名称");
        return;
      }
      if (this.addPurchasetableData.length == 0) {
        this.$message.info("请先添加商品");
        return;
      }
      let valueData = {
        category: 0, //种类
        purchaseEnclosureList: [
          {
            enclosureUrl: "",
            id: 0,
            purchaseId: 0,
          },
        ],
        budget: this.addPurchaseForm.budget, //采购预算
        contractName: this.addPurchaseForm.contractName, //合同名称
        contractNo: this.addPurchaseForm.contractNo, //合同编号
        projectName: this.addPurchaseForm.projectName, //采购商项目名称
        projectNo: this.addPurchaseForm.projectNo, //项目编号
        purchaseGoodsList: this.addPurchasetableData, //具体商品列表
        refSupplier: this.addPurchaseForm.refSupplier, //关联供应商
        requirement: this.addPurchaseForm.requirement, //采购需求描述
        type: this.addPurchaseForm.type, //采购类型@ 1  招标需求采购  2  临时需求采购
        zbSupplier: this.addPurchaseForm.zbSupplier, //中标供应商
      };
      purchaseAddBuyerRegister(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.purchaseFindBuyerRegisterApi();
            this.addPurchaseVisible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 采购登记编辑-接口
    purchaseModifyBuyerRegisterApi() {
      if (!this.addPurchaseForm.projectName) {
        this.$message.info("请先输入采购项目名称");
        return;
      }
      if (this.addPurchasetableData.length == 0) {
        this.$message.info("请先添加商品");
        return;
      }
      let valueData = {
        id: this.editid,
        category: 0, //种类
        purchaseEnclosureList: [
          {
            enclosureUrl: "",
            id: 0,
            purchaseId: 0,
          },
        ],
        budget: this.addPurchaseForm.budget, //采购预算
        contractName: this.addPurchaseForm.contractName, //合同名称
        contractNo: this.addPurchaseForm.contractNo, //合同编号
        projectName: this.addPurchaseForm.projectName, //采购商项目名称
        projectNo: this.addPurchaseForm.projectNo, //项目编号
        purchaseGoodsList: this.addPurchasetableData, //具体商品列表
        refSupplier: this.addPurchaseForm.refSupplier, //关联供应商
        requirement: this.addPurchaseForm.requirement, //采购需求描述
        type: this.addPurchaseForm.type, //采购类型@ 1  招标需求采购  2  临时需求采购
        zbSupplier: this.addPurchaseForm.zbSupplier, //中标供应商
      };
      purchaseModifyBuyerRegister(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.purchaseFindBuyerRegisterApi();
            this.editPurchaseVisible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 采购登记（删除）-接口
    purchaseDelBuyerRegisterApi(id) {
      this.tableLoading = true;
      purchaseDelBuyerRegister(id)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.$message.success(res.message);
            this.purchaseFindBuyerRegisterApi();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 采购登记（禁用）-接口
    purchaseDisabledBuyerRegisterApi(id) {
      this.tableLoading = true;
      purchaseDisabledBuyerRegister(id)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.$message.success(res.message);
            this.purchaseFindBuyerRegisterApi();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 提交采购单-接口
    purchaseSubmitPurchaseOrderApi(value) {
      this.tableLoading = true;
      let valueData = new FormData();
      valueData.append("purchaseId", value.id);
      purchaseSubmitPurchaseOrder(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.$message.success(res.message);
            this.purchaseFindBuyerRegisterApi();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },

    // 删除按钮-接口
    deletePurchaseButton(value) {
      this.purchaseDelBuyerRegisterApi(value.id);
    },
    // 禁用按钮-接口
    disablePurchaseButton(value) {
      this.purchaseDisabledBuyerRegisterApi(value.id);
    },
    // 导入商品明细信息-接口
    purchaseImportPurchaseApi(itemData) {
      let FormDatas = new FormData(); //上传文件的需要formdata类型;所以要转
      FormDatas.append("file", itemData.file);
      // FormDatas.append("FileName", itemData.file.name);
      purchaseImportPurchase(FormDatas)
        .then((res) => {
          if (res.code == 200) {
            this.batchImportPurchaseOrderVisible = true;
            this.purchaseImportPurchaseList = [];
            this.purchaseImportPurchaseObject = [];
            res.data.purchaseImportVo.forEach(() => {
              res.data.purchaseImportVo.forEach((element, index) => {
                if (element.line == null) {
                  res.data.purchaseImportVo.splice(index, 1);
                }
              });
            });
            this.purchaseImportPurchaseObject = res.data;

            res.data.goodsList.forEach((element) => {
              if (element) {
                this.purchaseImportPurchaseList.push(element);
              }
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 文件下载-接口
    downloadApi(type) {
      let valueData = new FormData();
      valueData.append("goodsType", type);
      download(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.downloads(res.data);
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根据浏览器大小计算表格高度   表格高度=整体大容器高度-其他非表格高度
    handleHeight() {
      this.tableHeight =
        this.$refs.contentBox.offsetHeight -
        this.$refs.search_box.offsetHeight -
        40 -
        42;
    },

    // 新增采购项目按钮
    addPurchaseButton() {
      this.addPurchasetableData = [];
      this.addPurchaseForm.budget = 0; //采购预算
      this.addPurchaseForm.contractName = ""; //合同名称
      this.addPurchaseForm.contractNo = ""; //合同编号
      this.addPurchaseForm.projectName = ""; //采购商项目名称
      this.addPurchaseForm.projectNo = ""; //项目编号
      this.addPurchaseForm.refSupplier = ""; //关联供应商
      this.addPurchaseForm.requirement = ""; //采购需求描述
      this.addPurchaseForm.type = 1; //采购类型
      this.addPurchaseForm.zbSupplier = ""; //中标供应商
      this.addPurchaseVisible = true;
    },
    // 新增采购项目弹框-取消按钮
    addPurchaseHandleClose() {
      this.addPurchaseVisible = false;
    },
    // 新增采购项目弹框-确定按钮
    addPurchaseHandleOk() {
      this.purchaseAddBuyerRegisterApi();
    },

    // 修改采购项目按钮
    editPurchaseButton(value) {
      this.purchaseGetBuyerRegisterDetailsApi(value);
      this.editPurchaseVisible = true;
    },
    // 修改采购项目弹框-取消按钮
    editPurchaseHandleClose() {
      this.editPurchaseVisible = false;
    },
    // 修改采购项目弹框-确定按钮
    editPurchaseHandleOk() {
      this.purchaseModifyBuyerRegisterApi();
    },

    // 添加商品按钮
    addItemButton() {
      if (this.addPurchasetableData.length > 0) {
        this.addItemIfDisabled = true; //置灰
      } else {
        this.addItemIfDisabled = false; //不置灰
      }
      this.addItemVisible = true;
    },
    // 添加商品弹框-取消按钮
    addItemHandleClose(type) {
      this.addItemTypeSelcet = type;
      this.addItemVisible = false;
    },
    // 添加商品弹框-确定按钮
    addItemHandleOk(value, type) {
      this.addItemTypeSelcet = type;
      this.addItemVisible = false;
      if (this.addPurchasetableData.length > 0) {
        this.addPurchasetableData.forEach((element) => {
          value.forEach((elemen, index) => {
            if (element.goodsId == elemen.goodsId) {
              element.quantity =
                Number(element.quantity) + Number(elemen.quantity); //将新的赋值给旧的
              value.splice(index, 1);
            }
          });
        });
        value.forEach((element) => {
          this.addPurchasetableData.push(element);
        });
      } else {
        this.addPurchasetableData = value;
      }
    },
    // 导入采购单按钮
    importPurchaseOrderButton() {
      this.importPurchaseOrderVisible = true;
    },
    // 导入采购单弹框-取消按钮
    importPurchaseOrderHandleClose() {
      this.importPurchaseOrderVisible = false;
    },
    // 批量导入采购单弹框-取消按钮
    batchImportPurchaseOrderHandleClose() {
      this.importPurchaseOrderVisible = false;
      this.batchImportPurchaseOrderVisible = false;
    },
    // 批量导入采购单弹框-确定按钮
    batchImportPurchaseOrderHandleOk() {
      if (this.addPurchasetableData.length > 0) {
        this.addPurchasetableData.forEach((element) => {
          this.purchaseImportPurchaseList.forEach((elemen, index) => {
            if (element.goodsId == elemen.goodsId) {
              element.quantity =
                Number(element.quantity) + Number(elemen.quantity); //将新的赋值给旧的
              this.purchaseImportPurchaseList.splice(index, 1);
            }
          });
        });
        this.purchaseImportPurchaseList.forEach((element) => {
          this.addPurchasetableData.push(element);
        });
      } else {
        this.addPurchasetableData = this.purchaseImportPurchaseList;
      }
      this.importPurchaseOrderVisible = false;
      this.batchImportPurchaseOrderVisible = false;
    },

    // 每页条数改变回调
    handleSizeChange(value) {
      this.pages.current = 1;
      this.pages.size = value;
      this.purchaseFindBuyerRegisterApi();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.purchaseFindBuyerRegisterApi();
    },
    // 时间改变回调
    pickDateChange() {
      if (this.query.pickDate) {
        this.query.startTime = new Date(this.query.pickDate[0]).Format(
          "yyyy-MM-dd"
        );
        this.query.endTime = new Date(this.query.pickDate[1]).Format(
          "yyyy-MM-dd"
        );
      } else {
        this.query.startTime = "";
        this.query.endTime = "";
      }
    },
    // 查询按钮
    queryButton() {
      this.pages.current = 1;
      this.purchaseFindBuyerRegisterApi();
    },
    // 下载模板按钮
    downloadButton(type) {
      this.downloadApi(type);
    },
    downloads(url) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      function iframeLoad() {
        const win = iframe.contentWindow;
        const doc = win.document;
        if (win.location.href === url) {
          if (doc.body.childNodes.length > 0) {
          }
          iframe.parentNode.removeChild(iframe);
        }
      }
      iframe.src = "";
      document.body.appendChild(iframe);
      setTimeout(function loadUrl() {
        iframe.contentWindow.location.href = url;
      }, 50);
    },
    // 采购单信息表 选择条回调
    addPurchasehandleSelectionChange(value) {
      this.addPurchasehandleSelection = value;
    },
    // 删除按钮
    deleteButton() {
      if (this.addPurchasehandleSelection.length == 0) {
        this.$message.info("请先勾选左下方表格需删除的数据");
      }
      let arr = JSON.parse(JSON.stringify(this.addPurchasetableData));
      this.addPurchasehandleSelection.forEach((element) => {
        arr.forEach((elemen, index) => {
          if (element.goodsId == elemen.goodsId) {
            arr.splice(index, 1);
          }
        });
      });
      this.addPurchasetableData = arr;
    },

    quantityChange(squantity, quantity, index) {
      if (!squantity) {
        this.elInputNumberShow = false;
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          this.addPurchasetableData[index].quantity = 1;
        });
      } else {
        if (quantity > squantity) {
          this.elInputNumberShow = false;
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            this.elInputNumberShow = true;
            this.addPurchasetableData[index].quantity = 1;
          });
        } else {
        }
      }
      if (
        quantity == null ||
        quantity == undefined ||
        quantity == 0 ||
        quantity == ""
      ) {
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          this.addPurchasetableData[index].quantity = 1;
        });
      }
    },
    // 提交按钮
    submitButton(value) {
      this.purchaseSubmitPurchaseOrderApi(value); //提交采购单
    },

    // 一键采购按钮
    generateOrderButton(listItem) {
      this.generateOrderVisible = true;
      this.listItem = listItem;
    },
    // 一键采购弹框-取消按钮
    generateOrderHandleClose(value) {
      this.generateOrderVisible = value;
      this.purchaseFindBuyerRegisterApi(); // 查询采购登记信息-接口
    },
    handleAvatarSuccess1(res, file) {
      //资产库存列表-上传照片
      this.imageUrl1 = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpg";
      console.log(file.type);
      const isPNG = file.type === "application/vnd.ms-excel";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isPNG) {
        this.$message.error("上传采购单只能是 excel 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传采购单大小不能超过 10MB!");
      }
      return isPNG && isLt2M;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./procurementRegistration.scss";
</style>
