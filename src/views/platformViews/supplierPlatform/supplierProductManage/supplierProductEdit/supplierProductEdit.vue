<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
    <div class="header">
      <h2 class="header-title">{{productId?'编辑':'新增'}}药品</h2>
    </div>
    <el-form class="goods-content" ref="goodsRef" :model="product" :rules="rules" status-icon label-width="100px"
      :inline="true">
      <!-- 基本信息 -->
      <div class="info ">
        <div class="info-title">基本信息</div>
        <div class="info-content">
          <el-form-item class="info-item" label="药品分类:" prop="mallCategory">
            <el-select class="selectInput" placeholder="请选择药品分类" v-model="product.mallCategory" clearable>
              <el-option v-for="cate in mallCates" :key="cate.value" :label="cate.name" :value="cate.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="info-item" label="商城分类:" prop="saleCategoryId">
            <el-cascader class="selectInput" :value="product.saleCategoryId" v-loading="cateLoading"
              element-loading-customClass="cascader-loading" :options="mallCateList" ref="cascaderArr"
              @change="handleChangeCate" :props="{ checkStrictly: true ,value:'id',label:'name',children:'childList'}"
              filterable></el-cascader>
          </el-form-item>
          <el-form-item class="info-item" label="通用名:" prop="commonName">
            <template slot="label"> <span class="required">*</span> 通用名:</template>
            <el-input class="selectInput" v-model="product.commonName" @focus="selectInfo" placeholder=""
              :disabled="productId?true:false" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="药品名称:" prop="goodsName">
            <template slot="label"> <span class="required">*</span> 药品名称:</template>
            <el-input class="selectInput" v-model="product.goodsName" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="剂型:" prop="jx">
            <template slot="label"> <span class="required">*</span> 剂型:</template>
            <el-input class="selectInput" v-model="product.jx" @focus="selectInfo" placeholder=""
              :disabled="productId?true:false" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="规格:" prop="specification">
            <template slot="label"> <span class="required">*</span> 规格:</template>
            <el-input class="selectInput" v-model="product.specification" @focus="selectInfo" placeholder=""
              :disabled="productId?true:false" suffix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="包装材质:" prop="packMaterial">
            <template slot="label"> <span class="required">*</span> 包装材质:</template>
            <el-input class="selectInput" v-model="product.packMaterial" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="生产厂家:" prop="manufacturer">
            <template slot="label"> <span class="required">*</span> 生产厂家:</template>
            <el-input class="selectInput" v-model="product.manufacturer" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="品牌:" prop="brand">
            <template slot="label"> <span class="required">*</span> 品牌:</template>
            <el-input class="selectInput" v-model="product.brand" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="批准文号:" prop="approvalNumber">
            <template slot="label"> <span class="required">*</span> 批准文号:</template>
            <el-input class="selectInput" v-model="product.approvalNumber" placeholder="" disabled>
            </el-input>
          </el-form-item>
          <el-form-item class="info-item" label="药品本位码:" prop="ypbwm">
            <template slot="label"> <span class="required">*</span> 药品本位码:</template>
            <el-input class="selectInput" v-model="product.ypbwm" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="商城价:" prop="mallPrice">
            <template slot="label"> <span class="required">*</span> 商城价:</template>
            <el-input class="selectInput" v-model="product.mallPrice" placeholder="" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item class="info-item" label="品牌:" prop="mallPrice">
            <template slot="label"> <span class="required">*</span> 品牌:</template>
            <el-input class="selectInput" v-model="product.mallPrice" placeholder="" disabled></el-input>
          </el-form-item> -->
          <el-form-item class="info-item " style="width:93%;" label="商城名称:" prop="mallName">
            <template slot="label"> 商城名称:</template>
            <el-input class="selectInput" type="textarea" v-model="product.mallName" placeholder=""></el-input>
          </el-form-item>

          <!-- <el-form-item class="info-item" label="运费模板:" prop="templateId">
            <el-select class="selectInput" placeholder="请选择运费模板" v-model="product.templateId"
              @change="changePropertyTpl">
              <el-option label="包邮" value="">
              </el-option>
              <el-option v-for="tpl in propertyTpls" :key="tpl.id" :label="tpl.templateName" :value="tpl.id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="info-item" label="商城索引图:" prop="mallPictureTemp">
            <template slot="label"> 商城索引图:</template>
            <UploadImage v-model="product.mallPictureTemp" :customRequest="true" size="small" :maxSize="1" :limit="1">
            </UploadImage>
          </el-form-item>
        </div>
      </div>

      <!-- 运费 -->
      <div class="info ">
        <div class="info-title">运费</div>
        <div class="info-content">
          <el-form-item class="info-item" label="运费金额:" prop="freightFee">
            <el-input class="selectInput" v-model="product.freightFee" placeholder=""></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="免邮金额:" prop="decreaseAmount">
            <el-input class="selectInput" v-model="product.decreaseAmount" placeholder=""></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 销售属性 -->
      <div class="info ">
        <div class="info-title">销售属性</div>
        <div class="info-content" v-for="(item,index) in product.supplierStockList" :key="index">
          <el-form-item class="info-item" label="单位:" :prop="`supplierStockList.${index}.unit`">
            <!-- :prop="`supplierStockList.${index}.unit`" :rules="rules.supplierStockList.unit" -->
            <el-select class="selectInput" placeholder="" v-model="product.supplierStockList[index].unit">
              <el-option v-for="unit in units" :key="unit" :label="unit" :value="unit">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="info-item info-item-radio" label="范围:" :prop="`supplierStockList.${index}.rangGroup`">
            <el-radio-group v-model="radioVal[index]" @change="rangeChange(radioVal[index],index)">
              <el-radio :label="'全平台'">全平台</el-radio>
              <el-radio :label="radioPlaceHolder[index]" disabled>
                <!-- radioPlaceHolder  空字符串用来占位  去掉会显示id 勿删 -->
                <!-- {{getRadioActiveName()}} --> {{' '}}
              </el-radio>
            </el-radio-group>
            <el-select class="selectInput radio-select" placeholder="选择分组"
              @change="rangeChange(selectRangeVal[index],index)" v-model="selectRangeVal[index]">
              <!-- v-model="product.supplierStockList[index].rangeGroup" -->
              <el-option v-for="(item,index) in groupList" :key="index" no-data-text=" " :value="item.id"
                :label="item.groupName">
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <div class="info-content">
          <el-form-item class="info-item info-item-radio">
            <el-button type="text" class="addstock-btn" @click="addSupplierStockItem">+添加属性</el-button>
          </el-form-item>
          <el-form-item class="info-table stock-table" label="价格库存:">
            <cu-table :showTitle="false" :tableHeader="tableHeader" :tableData="product.supplierStockList"
              :showPagination="false" :showHeight="false">
              <template slot="unit" slot-scope="value">
                <el-input class="selectInput" v-model="value.value.unit" placeholder="" disabled>
                </el-input>
              </template>
              <template slot="quantity" slot-scope="value">
                <el-form-item class="form-table-col" :rules="rules.supplierStockList.quantity">
                  <el-input type="number" class="selectInput" v-model="value.value.quantity" placeholder=""></el-input>
                </el-form-item>

              </template>
              <template slot="rangeGroup" slot-scope="value">
                <!-- v-model="value.value.rangeGroup " -->
                <el-input class="selectInput"
                  :placeholder="value.value.rangeGroup == 1? '全平台':  getName(value.value.rangeGroup)" disabled>
                </el-input>
              </template>
              <template slot="buyPrice" slot-scope="value">
                <el-form-item class="form-table-col" :rules="rules.supplierStockList.buyPrice">
                  <el-input type="number" class="selectInput" v-model="value.value.buyPrice" placeholder=""></el-input>
                </el-form-item>

              </template>
            </cu-table>
          </el-form-item>
        </div>
      </div>
      <!-- 说明 -->
      <div class="info">
        <div class="info-title">说明</div>
        <div class="info-content goods-desc">
          <el-form-item class="info-item" label="用法用量:" prop="dosage">
            <el-input class="selectInput" placeholder="" v-model="product.dosage"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="功能主治:" prop="functions">
            <el-input class="selectInput" placeholder="" v-model="product.functions"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="有效期:" prop="period">
            <!-- <el-input class="selectInput" placeholder="" v-model="product.period"></el-input> -->
            <el-date-picker v-model="product.period" format="yyyy-MM-dd" type="date" placeholder="请选择有效期">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
      <!-- 附件上传 -->
      <div class="info ">
        <div class="info-title">资质信息:</div>
        <div class="info-content ">
          <el-form-item class="info-item" label="药品标准:">
            <!-- accept=".doc,.docx,.xls,.xlsx,.pdf" -->
            <cu-upload-file type="file" ref="uploadStandrand" :files.sync="standrandFileList" text="添加附件" tip=""
              @submit="submitFile(arguments,'drugStandardsUrl')" :limit="1" width="200px"
              @remove="removeFile(arguments,'drugStandardsUrl')">
            </cu-upload-file>
          </el-form-item>
          <el-form-item class="info-item" label="注册附件:">
            <cu-upload-file type="file" ref="uploadStandrand" :files.sync="registerFileList" text="添加附件" tip=""
              @submit="submitFile(arguments,'regEnclosureUrl')" :limit="1" accept="" width="200px"
              @remove="removeFile(arguments,'drugStandardsUrl')">
            </cu-upload-file>
          </el-form-item>
          <el-form-item class="info-item" label="说明书扫描件:">
            <cu-upload-file type="file" ref="uploadStandrand" :files.sync="descFileList" text="添加附件" tip=""
              @submit="submitFile(arguments,'instructionBookUrl')" :limit="1" accept="" width="200px"
              @remove="removeFile(arguments,'drugStandardsUrl')">
            </cu-upload-file>
          </el-form-item>
        </div>
      </div>
      <!-- 图文描述 -->
      <div class="info">
        <div class="info-title">图文描述:</div>
        <div class="info-content details-info">
          <el-form-item class="info-item" label="主图:">
            <UploadImage v-model="product.mainPictureTemp" :customRequest="true" size="small" :maxSize="1" :limit="5">
            </UploadImage>
            <!-- <cu-upload-image :files.sync="images" class="image-upload" text="添加主图" tip="" :limit="5" :maxSize="1"
              @submit="submitFile(arguments,'mainPicture')" @remove="removeFile(arguments,'mainPicture')"
              :multiple="true" accept=".png,.jpg,.jpeg">
            </cu-upload-image> -->
            <div class="tip">1. 请上传至少1张主图，主图应包含商品正反面外包装图；若涉及活动，请在图片上清晰显示活动时间和活动方式。 </div>
            <div class="tip">2. 图片支持png、jpg、jpeg格式；建议图片尺寸为600*600px，或更大的尺寸；图片大小请小于1M。</div>

          </el-form-item>
          <el-form-item class="info-item" label="商品详情:" prop="detail">
            <cu-editor v-model="product.detail"></cu-editor>
          </el-form-item>
        </div>
      </div>
      <div class="form-footer">
        <el-button class="footer-btn" type="primary" @click="submitForm(1)" :loading="submitLoading1">保存
        </el-button>
        <el-button class="footer-btn" type="primary" @click="submitForm(2)" :loading="submitLoading2"
          v-if="!product.auditStatus || product.auditStatus <= 2">
          提交审核
        </el-button>

      </div>



    </el-form>
    <cu-dialog title="药品通用信息" width="70vw" :visible="dialogVisible" :showClose="true" @handleClose="handleClose"
      :destroy-on-close="true">
      <div class="dialog-details">
        <div class="search-bar">
          <div class="search-item">
            <div class="label">通用名:</div>
            <el-input class="selectInput" v-model="searchObj.commonName" placeholder="请输入通用名搜索">
            </el-input>
          </div>
          <div class="search-item">
            <div class="label">剂型:</div>
            <el-input class="selectInput" v-model="searchObj.jx" placeholder="请输入剂型搜索">
            </el-input>
          </div>
          <div class="search-item">
            <div class="label">规格:</div>
            <el-input class="selectInput" v-model="searchObj.specification" placeholder="请输入规格搜索">
            </el-input>
          </div>
          <div class="search-item operations">
            <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <!-- :height="tableHeight" -->
        <cu-table class="sale-table" :loading="tableLoading" :showTitle="false" :tableHeader="selectTableHeader"
          :tableData="selectTableData" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
          :total="total">
          <template slot="auditStatus" slot-scope="value">
            {{ auditStatusType[value.value.auditStatus] }}
          </template>
          <template slot="uploadTime" slot-scope="value">
            {{ formatDate(value.value.uploadTime, "yyyy-MM-dd") }}
          </template>

          <template slot="operate" slot-scope="value">
            <el-button type="text" @click="selectProduct(value.value)">选择</el-button>
          </template>
        </cu-table>
      </div>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>


  </div>
</template>
<script>
import { getBuyerGroupList, getAddDrugList, getDrugMallClassificationList, addSupplierGoods, editEcho, edit, getSupplierFreightTemplate } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { catchAwait } from "@/utils/catchAwait.js";
import { upload, uploadImage } from "@/api/aksApi/platformApi/commonApi.js";
import UploadImage from "../components/upload-image.vue";

export default {
  name: 'supplierProductEdit',
  components: {
    UploadImage
  },
  data() {
    return {
      ypqxType: 1,// 新增商品类型  1 药品  2 药械
      cate: '',
      details: {},
      orderNo: '',
      productId: '',
      tableHeight: 130,
      tableHeader: [
        {
          title: "单位",
          slot: "unit",
        },
        {
          title: "库存",
          slot: "quantity",
        },
        {
          title: "范围",
          slot: "rangeGroup",
        },
        {
          title: "采购价",
          slot: "buyPrice",
        },
      ],
      tableData: [
        {
          unit: '',
          quantity: '',
          rangeGroup: '',
          buyPrice: ''
        }
      ],
      // mallCates: ['抗新冠药物','抗新冠器械','药品','器械'],// 1 抗新冠药物目录 2 抗新冠器械目录 3 药品目录 4 器械目录
      mallCates: [{ name: '抗新冠药物', value: 1 }, { name: '药品', value: 3 }],
      units: ['箱', '盒', '包'],
      auditStatusType: {
        1: '待审核',
        2: '审核通过',
        3: '审核不通过',
      },
      // 1: '全平台',
      selectRangeVal: [''],
      radioVal: ["全平台"],
      rangeTypeObj: { 2: '大客户采购组', 3: "小批发采购组", 4: "其他" },
      rangeTypes: [{ value: 2, label: "大客户采购组" }, { value: 3, label: "小批发采购组" }, { value: 4, label: "其他" }],
      radioPlaceHolder: [2],// 默认全平台
      payType: {
        1: '在线支付',
        2: '货到付款'
      },
      consigType: {
        1: '阿克苏集散中心物流',
        2: '普通快递'
      },
      product: {
        // "articleNo": "",
        // "auditBy": "",// 审核人
        // "auditRemark": "",// 审核说明
        // "auditStatus": 0,// 审核状态@ 1 待审核 2 审核通过 3 审核不通过
        // "auditTime": "",// 审核时间
        // "buyPrice": 0,// 平台采购价
        // "buyUnit": "",// 平台采购价单位
        // "createTime": "",// 创建时间
        // "declareTime": "",// 申报时间
        // "deleteFlag": 0,// 删除标记
        // "detail": "",// 商品详情
        // "dosage": "",// 用法用量
        // "downloadTime": "",// 下架时间
        // "drugStandardsUrl": "",// 药品标准
        // "functions": "",// 功能主治
        // "goodsId": 0,
        // "id": 0,
        // "instructionBookUrl": "",// 说明书扫描件
        // "mainPicture": "",// 主图（最多5张）json存储
        // "mallCategory": null,// 药品分类@ 1 抗新冠药物目录 2 抗新冠器械目录 3 药品目录 4 器械目录
        // "saleCategoryId": null,// 商城分类
        // "period": "",// 有效期
        // "regEnclosureUrl": "",// 注册附件
        // "supplierId": 0,// 	供应商id
        "supplierStockList": [// 库存列表
          {
            "buyPrice": 0,// 采购价
            // "goodsId": 0,// goodsId
            // "id": 0,
            "quantity": 0,// 库存
            "rangeGroup": 1,// 范围@ 1 全平台 2 大客户采购组 3 小批发采购组 4 其他
            "unit": "箱",// 单位
            // "warnQuantity": 0
          }
        ],
        // "templateId": 0,// 运费模板id
        // "upload": 0,// 是否上架
        // "uploadTime": "",// 上架时间
        // "ypqxType": 0// 药品器械分类@ 1 药品 2 器械
      },
      // 编辑回显接口返回的数据全部传回编辑接口 无法成功编辑  此处保存编辑接口需要的数据
      productEditField: {
        "commonName": "",
        "goodsName": "",
        "jx": "",
        "specification": "",
        "packMaterial": "",
        "manufacturer": "",
        "approvalNumber": "",
        "ypbwm": null,
        "mallPrice": "",
        "articleNo": "",
        "detail": "",// 商品详情
        "dosage": "",// 用法用量
        "drugStandardsUrl": "",// 药品标准
        "functions": "",// 功能主治
        "goodsId": 0,
        "id": 0,
        "sgId": 0,
        "instructionBookUrl": "",// 说明书扫描件
        "mainPicture": "",// 主图（最多5张）json存储
        "mallCategory": null,// 药品分类@ 1 抗新冠药物目录 2 抗新冠器械目录 3 药品目录 4 器械目录
        "saleCategoryId": null,// 商城分类
        "period": "",// 有效期
        "regEnclosureUrl": "",// 注册附件
        "supplierStockList": [// 库存列表
          {
            "buyPrice": 0,// 采购价
            // "goodsId": 0,// goodsId
            // "id": 0,
            "quantity": 0,// 库存
            "rangeGroup": 1,// 范围@ 1 全平台 2 大客户采购组 3 小批发采购组 4 其他
            "unit": "箱",// 单位
            "buyerGroupId": null,
            // "warnQuantity": 0
          }
        ],
        "ypqxType": 0,// 药品器械分类@ 1 药品 2 器械
        "mallName": '',
        "mallPicture": '',
        "templateId": undefined,
        "freightFee": '',
        "decreaseAmount": '',
        "brand":undefined
      },
      // 货品基本信息传入编辑接口 无法成功编辑  此处保存货品基本信息字段 作为 编辑传参判断
      noEdit: {
        commonName: true,
        goodsName: true,
        jx: true,
        specification: true,
        packMaterial: true,
        manufacturer: true,
        approvalNumber: true,
        ypbwm: true,
        mallPrice: true,
        brand:true
      },
      mallCateList: [],
      dialogVisible: false,
      searchObj: {
        commonName: '',
        jx: '',
        specification: '',
        currPageNo: 1,
        pageSize: 10,

      },
      selectTableData: [],
      selectTableHeader: [
        {
          title: "货号",
          key: "itemNo",
        },
        {
          title: "通用名",
          key: "commonName",
          width: 120,
        },
        {
          title: "商品名称",
          key: "goodsName",
          width: 120,
        },

        {
          title: "剂型",
          key: "jx",
        },
        {
          title: "规格",
          key: "specification",
          width: 160,

        },
        {
          title: "药理分类",
          key: "lb",
        },
        {
          title: "货号",
          slot: "itemNo",
        },
        {
          title: "药品本位码",
          slot: "ypbwm",
          width: 120,
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "品牌",
          key: "brand",
        },
        {
          title: "选择",
          slot: "operate",
          // width: 140,
          fixed: 'right'
        },
      ],
      pageCount: 1,
      total: 0,
      tableLoading: false,
      standrandFileList: [],// 药品标准上传附件
      registerFileList: [],// 注册上传附件
      descFileList: [],// 说明书上传附件
      rules: {
        mallCategory: [
          { required: true, message: '请选择药品分类', trigger: 'blur' },
        ],
        saleCategoryId: [
          { required: true, message: '请选择商城分类', trigger: 'blur' },
        ],
        // commonName: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'change' },
        // ],
        // goodsName: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // jx: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // specification: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // packMaterial: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // manufacturer: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // approvalNumber: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // ypbwm: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        // mallPrice: [
        //     { required: true, message: '请补全药品基本信息', trigger: 'blur' },
        // ],
        mallName: [
          { required: true, message: '请添加商城名称', trigger: 'blur' },
        ],
        mallPictureTemp: [
          { required: true, message: '请添加商城索引图', trigger: 'blur' },
        ],
        // templateId: [
        //   { required: true, message: '请选择运费模板', trigger: 'blur' },
        // ],
        freightFee: [
          { required: true, message: '请输入运费金额', trigger: 'blur' },
        ],
        decreaseAmount: [
          { required: true, message: '请输入满减金额', trigger: 'blur' },
        ],
        supplierStockList: {
          type: 'array',
          min: 1,
          required: true,
          message: '请填写库存列表',
          defaultField: [
            {
              type: 'object',
              required: true,
              message: '请补全库存项',
              fields: {
                unit: {
                  type: 'string',
                  required: true,
                  message: '请选择库存单位',
                },
                rangeGroup: {
                  type: 'number',
                  required: true,
                  message: '请选择库存销售范围',
                },
                // quantity: [
                //     { required: true, message: '请输入库存量', trigger: 'blur' },
                // ],
                // buyPrice: [
                //     { required: true, message: '请输入库存单位采购价', trigger: 'blur' },
                // ],
              }
            }
          ]
        },
        dosage: [
          { required: true, message: '请补全药品必填信息', trigger: 'blur' },
        ],
        functions: [
          { required: true, message: '请补全药品必填信息', trigger: 'blur' },
        ],
        period: [
          { required: true, message: '请补全药品必填信息', trigger: 'blur' },
        ],
      },
      submitLoading1: false,
      submitLoading2: false,
      groupList: [],
      propertyTpls: [],// 运费模板数据
      propertyAmount: 0,// 运费
      cateLoading: false,// 商城分类加载
      cateMap:{},// 存储分类对象 避免多次递归处理分类数据
    }
  },
  created() {
    this.productId = this.$route.params.sgId;
    console.log(this.productId);
    if (this.productId) {
      this.getEditEcho()
    }
    this.getMallCateList()
    this.getGroupList()
    // this.getPropertyTpl()

  },
  methods: {
    getName(id) {
      let index = this.groupList.findIndex(item => item.id == id);
      return index != -1 ? this.groupList[index].groupName : ''
    },
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    getGroupList() {
      getBuyerGroupList().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.groupList = res.data;
        }

      }).catch(err => {
        console.log(err);
      })
    },
    // 获取运费模板数据
    getPropertyTpl() {
      getSupplierFreightTemplate().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.propertyTpls = res.data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 修改选中运费模板
    changePropertyTpl(id) {
      console.log(id);
      let tpl = this.propertyTpls.filter(item => item.id == id)[0];
      console.log(tpl);
      this.propertyAmount = tpl ? tpl.amount : 0;
    },
    // 商品编辑 数据回显
    getEditEcho() {
      editEcho({ sgId: this.productId }).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          let product = {}
          for (const key in data) {
            if (Object.hasOwn(this.productEditField, key)) {
              product[key] = data[key]
            }
            // if(this.productEditField[key]){
            //     console.log(key);
            //     this.product[key] = data[key]
            // }
          }

          console.log(this.product);
          // 由于上传组件只接收 数组 这里做数组转换处理
          if (data.drugStandardsUrl) {
            this.standrandFileList = [{ name: decodeURI(data.drugStandardsName), url: data.drugStandardsUrl }]
          }
          if (data.regEnclosureUrl) {
            this.registerFileList = [{ name: decodeURI(data.regEnclosureName), url: data.regEnclosureUrl }]
          }
          if (data.instructionBookUrl) {
            this.descFileList = [{ name: decodeURI(data.regEnclosureName), url: data.instructionBookUrl }]
          }
          if (data.mainPicture) {
            let images = data.mainPicture.split(';')
            product.mainPictureTemp = images.map((image, index) => { return { name: decodeURI(data.mainPictureMame), url: image } })
          } else {
            product.mainPictureTemp = []
          }
          // 商城索引图数据处理
          if (data.mallPicture) {
            product.mallPictureTemp = [{ name: '', url: data.mallPicture }]
          } else {
            product.mallPictureTemp = []
          }
          console.log(this.product);
          this.product = product
        } else {
          this.$message.warning("商品信息获取失败")

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取商城分类
    getMallCateList() {
      this.cateLoading = true;
      getDrugMallClassificationList().then(res => {
        console.log(res);
        if (res.code == 200) {
          let list = res.data;
          this.cateMap = {}
          const deep = (data) => {
            return data.map(item => {
              let temp = JSON.parse(JSON.stringify(item))
              this.cateMap[item.id]=temp;
              if (item.childList && item.childList.length) {
                return deep(item.childList)
              } else {
                item.childList = undefined
                return item;
              }
            })
          }
          this.mallCateList = deep(list);
          this.cateLoading = false;

        } else {
          this.$message.warning(res.message)

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    handleChangeCate(row) {
      console.log(row);
      if (row) {
        this.product.saleCategoryId = row[row.length - 1]
        // this.product.categoryName = this.cateMap[this.product.saleCategoryId].name;
      }
      console.log(this.product.saleCategoryId);
    },

    selectInfo() {
      console.log('ddd');
      this.dialogVisible = true;
    },
    search() {
      this.tableLoading = true;
      getAddDrugList(this.searchObj).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.selectTableData = res.data.records;
          this.total = res.data.total;
          this.tableLoading = false;
        } else {
          this.$message.warning(res.message)

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.searchObj.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.searchObj.currPageNo = val;
      this.search();
    },
    // 选择商品
    selectProduct(info) {
      this.product.commonName = info.commonName;
      this.product.goodsName = info.goodsName;
      this.product.jx = info.jx;
      this.product.specification = info.specification;
      this.product.packMaterial = info.packMaterial;
      this.product.manufacturer = info.manufacturer;
      this.product.brand = info.brand;
      this.product.approvalNumber = info.approvalNumber;
      this.product.ypbwm = info.ypbwm;
      this.product.mallPrice = info.mallPrice;
      this.product.goodsId = info.id;
      this.$refs.goodsRef.validateField(['commonName', 'jx', 'specification'])
      // this.product = Object.assign(this.product, info)
      console.log(this.product);
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;

    },
    addSupplierStockItem() {
      this.product.supplierStockList.push({ rangeGroup: 1, unit: '箱', buyPrice: 0, quantity: 0, })
      this.radioVal.push("全平台")
      this.radioPlaceHolder.push(2)
      console.log();
    },

    // getRadioActiveName(index) {
    //     return this.rangeTypeObj[this.radioPlaceHolder[index]];
    // },
    // 选择范围下拉框 触发
    rangeChange(event, index) {
      console.log(event);
      if (event == "全平台") {
        this.product.supplierStockList[index].buyerGroupId = undefined;
        this.product.supplierStockList[index].rangeGroup = 1;
        return;
      }
      this.product.supplierStockList[index].rangeGroup = 2;
      this.product.supplierStockList[index].buyerGroupId = event;
      this.radioPlaceHolder[index] = event;
      this.radioVal[index] = event
    },
    // 表单校验
    async submitForm(type) {
      console.log(this.standrandFileList);
      console.log(this.registerFileList);
      console.log(this.descFileList);
      console.log(this.product);
      this.$refs['goodsRef'].validate((valid, invalidObj) => {
        if (!valid) {
          this.$message.error('表单校验未通过,请检查填写内容')
        }
        // 弹窗修改表单值  表单外修改校验不通过，此处再做判断
        let validOut = this.formOutValid()

        if (valid && validOut) {
          this['submitLoading' + type] = true;
          // 图片数据处理
          this.product.mallPicture = this.product.mallPictureTemp[0] ? this.product.mallPictureTemp[0].url : "";
          if (this.product.mainPictureTemp && this.product.mainPictureTemp.length) {
            this.product.mainPicture = this.product.mainPictureTemp.reduce((total, currentValue, currentIndex, arr) => {
              return !total ? currentValue.url : total + ';' + currentValue.url
            }, '')
          }
          delete this.product.mallPictureTemp;
          delete this.product.mainPictureTemp;
          console.log(this.product);
          if (this.productId) {
            this.editGoods(type)
          } else {
            this.addGoods(type)
          }
        } else {
          console.log(this.product, invalidObj);
          // for (let key in invalidObj) {
          //     let mess = invalidObj[key];
          //     this.$message.error(mess[0].message)
          // }
          console.log('error submit!!');
          return false;
        }
      });


    },

    formOutValid() {
      let { commonName, jx, specification } = this.product;
      let rangs = this.product.supplierStockList.filter(item => item.rangeGroup == 1);
      if (!rangs.length) {
        this.$message.warning("库存列表的库存范围必须包含全平台范围")
        return false;
      }
      if (this.productId) {
        return true;
      } else {
        let flag = commonName && commonName.length && jx && jx.length && specification && specification.length;
        if (!flag) {
          this.$message.warning("库存列表的库存范围必须包含全平台范围")
        }
        return flag
      }
    },
    async addGoods(type) {
      let product = this.product;
      console.log(product);
      for (const key in product) {
        if (this.noEdit[key]) {
          delete product[key]
        }
      }
      product.type = type;
      product.ypqxType = this.ypqxType;
      delete product.brand;
      // product.drugStandardsUrl = this.standrandFileList[0];
      // product.regEnclosureUrl = this.registerFileList[0];
      // product.instructionBookUrl = this.descFileList[0];
      try {
        let res = await addSupplierGoods(product);
        if (res.code == 200) {
          this.$message.success(type == 1 ? "商品新增成功" : "已提交审核")
          this.product = {};
          this.back()

        } else {
          console.log(res);
          this.$message.warning(res.message)
        }

      } catch (error) {
        console.log(error);
        this['submitLoading' + type] = false;

      }


    },
    // 商品数据处理 调用编辑商品接口
    async editGoods(type) {
      let product = this.product;
      for (const key in product) {
        if (this.noEdit[key]) {
          delete product[key]
        }
      }
      console.log(product);
      let [err, res] = await catchAwait(edit(product))
      console.log(err, res);
      if (err) {
        return this['submitLoading' + type] = false;

      }
      if (res.code == 200) {
        this.$message.success(type == 1 ? "商品修改成功" : "已提交审核")
        this.product = {};
        this.back()
      } else {
        console.log(res);
        this.$message.warning(res.message)
      }
      this['submitLoading' + type] = false;
    },
    back() {
      this.$router.go(-1)
    },
    // 上传组件返回数据处理
    submitFile(args, type) {
      let res = args[0];
      console.log(res, type);
      if (res.code == 200) {
        let url = res.data;
        if (type == 'mainPicture') {
          // this.product[type]? this.product[type] += ';' + url:this.product[type] = url;
          this.$message.success('上传图片成功！')
        } else {
          this.product[type] = url;
          this.$message.success('上传成功！')
        }

      } else {
        this.$message.success('上传附件失败，请重试！')
      }
    },
    // 移除上传组件
    removeFile(args, type) {
      console.log(args[0], args[1], type);
      let fileList = args[1];
      let removeFile = args[0];
      if (!fileList.length) {
        this.product[type] = '';
      } else {
        if (type == 'mainPicture') {
          this.product[type] = this.product[type].split(';').filter(item => item != removeFile.url);
          this.product[type] = this.product[type].reduce((total, currentValue, currentIndex, arr) => {
            return total == '' ? currentValue : total + ';' + currentValue
          }, '')
          console.log(this.product[type]);
        }
      }


    },
  },
}
</script>
<style lang="scss" src="./supplierProductEdit.scss" scoped>

</style>
