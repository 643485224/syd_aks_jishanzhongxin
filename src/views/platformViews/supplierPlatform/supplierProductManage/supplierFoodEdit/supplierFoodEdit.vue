<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
    <div class="header">
      <h2 class="header-title">{{pageTypes[pageType]}}美食</h2>
    </div>
    <el-form v-if="pageType != 'detail'" class="goods-content" ref="goodsRef" :model="product" :rules="rules" status-icon label-width="100px"
      :inline="true">
      <!-- 基本信息 -->
      <div class="info ">
        <div class="info-title">基本信息</div>
        <div class="info-content">
          <el-form-item class="info-item" label="商品名称:" prop="mallName"  style="width:93%;">
            <el-input class="selectInput" v-model="product.mallName" placeholder="" type="textarea"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="商城分类:" prop="categoryId">
            <el-cascader class="selectInput" :value="product.categoryId" v-loading="cateLoading"
              element-loading-customClass="cascader-loading" :options="mallCateList" ref="cascaderArr"
              @change="handleChangeCate" :props="{ checkStrictly: true ,value:'id',label:'name',children:'childList'}"
              filterable></el-cascader>
          </el-form-item>
          <el-form-item class="info-item" label="商品价格:" prop="price">
            <el-input class="selectInput" v-model="product.price" placeholder=""></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="商品单位:" prop="unit">
            <el-input class="selectInput" v-model="product.unit" placeholder=""></el-input>
          </el-form-item>
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
      <!-- 商品参数 -->
      <div class="info ">
        <div class="info-title">商品参数</div>
        <div class="info-content">
          <el-form-item class="info-item" label="常见参数:">
            <el-select class="selectInput" placeholder="" v-model="selectParamater">
              <el-option v-for="(paramater,index) in paramaterList" :key="index" :label="paramater.name"
                :value="paramater.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="info-item info-item-radio">
            <el-button type="text" class="addstock-btn" @click="addParamater">+新增</el-button>
          </el-form-item>
        </div>
        <div class="info-content">
          <el-form-item class="info-table paramaters-table" label="">
            <cu-table :showTitle="false" :tableHeader="tableHeader" :tableData="paramaters" :showPagination="false"
              :showHeight="false">
              <template slot="paraValue" slot-scope="value">
                <el-form-item class="form-table-col">
                  <el-input class="selectInput" v-model="value.value.paraValue" placeholder=""></el-input>
                </el-form-item>
              </template>
              <template slot="operate" slot-scope="value">
                <el-button type="text" class="c_ff480e" @click="delParamater(value.value.paraKey)">删除</el-button>
              </template>
            </cu-table>
          </el-form-item>
        </div>
      </div>
      <!-- 图文描述 -->
      <div class="info">
        <div class="info-title">图文描述:</div>
        <div class="info-content details-info">
          <el-form-item class="info-item" label="主图:" >
            <UploadImage v-model="product.mainPictureTemp" :customRequest="true" size="small" :maxSize="1" :limit="5">
            </UploadImage>
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
    <!-- 详情显示 -->
    <el-form v-else class="goods-content" ref="goodsRef" :model="product" :rules="rules" status-icon label-width="100px"
      :inline="true">
      <!-- 基本信息 -->
      <div class="info ">
        <div class="info-title">基本信息</div>
        <div class="info-content">
          <el-form-item class="info-item" label="商品名称:" prop="mallName"  style="width:93%;">
            <el-input class="selectInput" v-model="product.mallName" placeholder="" disabled  type="textarea"></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="商城分类:" prop="categoryId">
            <el-cascader class="selectInput" :value="product.categoryId" v-loading="cateLoading"
              element-loading-customClass="cascader-loading" :options="mallCateList" ref="cascaderArr"
              @change="handleChangeCate" :props="{ checkStrictly: true ,value:'id',label:'name',children:'childList'}"
              filterable disabled></el-cascader>
          </el-form-item>
          <el-form-item class="info-item" label="商品价格:" prop="price">
            <el-input class="selectInput" v-model="product.price" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="商品单位:" prop="unit">
            <el-input class="selectInput" v-model="product.unit" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="商城索引图:" prop="mallPictureTemp">
            <template slot="label"> 商城索引图:</template>
            <UploadImage v-model="product.mallPictureTemp" :customRequest="true" size="small" :maxSize="1" :limit="1" :disabled="true">
            </UploadImage>
          </el-form-item>
        </div>
      </div>
      <!-- 运费 -->
      <div class="info ">
        <div class="info-title">运费</div>
        <div class="info-content">
          <el-form-item class="info-item" label="运费金额:" prop="freightFee">
            <el-input class="selectInput" v-model="product.freightFee" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item class="info-item" label="免邮金额:" prop="decreaseAmount">
            <el-input class="selectInput" v-model="product.decreaseAmount" placeholder="" disabled></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 商品参数 -->
      <div class="info ">
        <div class="info-title">商品参数</div>
        <div class="info-content">
          <el-form-item class="info-table paramaters-table" label="">
            <cu-table :showTitle="false" :tableHeader="tableHeader" :tableData="paramaters" :showPagination="false"
              :showHeight="false">
              <template slot="operate" slot-scope="value">
                <el-button type="text" class="c_ff480e" @click="delParamater(value.value.paraKey)">删除</el-button>
              </template>
            </cu-table>
          </el-form-item>
        </div>
      </div>
      <!-- 图文描述 -->
      <div class="info">
        <div class="info-title">图文描述:</div>
        <div class="info-content details-info">
          <el-form-item class="info-item" label="主图:" >
            <UploadImage v-model="product.mainPictureTemp" :customRequest="true" size="small" :maxSize="1" :limit="5" :disabled="true">
            </UploadImage>
          </el-form-item>
          <el-form-item class="info-item" label="商品详情:" prop="detail">
            <div v-html="product.detail"></div>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import {  getFyyFoodsMallClassificationList, addDeliciousGoods, getFoodsDetail, updateDeliciousGoods, getGoodsParamerters } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { catchAwait } from "@/utils/catchAwait.js";
import UploadImage from "../components/upload-image.vue";

export default {
  name: 'supplierProductEdit',
  components: {
    UploadImage
  },
  data() {
    return {
      pageType:'add',//  页面展示类型
      pageTypes:{
        'add':'新增',
        'edit':'编辑',
        'detail':'详情',
      },
      goodsType: 1,// 新增	商品类型@ 1 美食 2 温宿好礼 3 二手车
      details: {},
      productId: '',
      tableHeader: [
        {
          title: "参数名称",
          key: "paraKey",
        },
        {
          title: "参数值",
          slot: "paraValue",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      tableData: [
        {
          unit: '',
          quantity: '',
        }
      ],
      // units: ['箱', '盒', '包'],
      product: {},
      // 编辑回显接口返回的数据全部传回编辑接口 无法成功编辑  此处保存编辑接口需要的数据
      productEditField: {
        "mallName": "",
        "price": "",
        "detail": "",// 商品详情
        "id": 0,
        "sgId": 0,
        "mainPicture": "",// 主图（最多5张）json存储
        "categoryId": null,// 商城分类
        "list": [],// 参数列表
        "goodsType": 0,// 商品类型@ 1 美食 2 温宿好礼 3 二手车
        "mallName": '',
        "mallPicture": '',
        "freightFee": '',
        "decreaseAmount": '',
        "unit": '',
      },
      mallCateList: [],// 美食分类数据
      rules: {
        mallName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        categoryId: [
          { required: true, message: '请选择商城分类', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        unit: [
          { required: true, message: '请选择商品单位', trigger: 'blur' },
        ],
        mallPictureTemp: [
          { required: true, message: '请添加商城索引图', trigger: 'blur' },
        ],
        freightFee: [
          { required: true, message: '请输入运费金额', trigger: 'blur' },
        ],
        decreaseAmount: [
          { required: true, message: '请输入满减金额', trigger: 'blur' },
        ],
        mainPictureTemp: [
          { required: true, message: '请添加商品主图', trigger: 'blur' },
        ],

      },
      submitLoading1: false,
      submitLoading2: false,
      propertyAmount: 0,// 运费
      cateLoading: false,// 商城分类加载
      paramaterList: [],// 可选参数列表
      selectParamater: '',// 选择的参数
      paramaters: [
        { "paraKey": "品牌", "paraValue": "" },
        { "paraKey": "产地", "paraValue": "" },
        { "paraKey": "发货地", "paraValue": "" },
        { "paraKey": "包装方式", "paraValue": "" },
        { "paraKey": "生产日期", "paraValue": "" },
      ],// 已添加参数列表
      cateMap:{},// 存储分类对象 避免多次递归处理分类数据
    }
  },
  created() {
    this.productId = this.$route.params.sgId;
    let type = this.$route.params.type;
    console.log(this.productId);
    if (this.productId ) {
      if(type == 'detail'){
        this.pageType = type;
        this.tableHeader.pop()
        this.getEditEcho()
      }else {
        this.pageType = 'edit';
        this.getEditEcho()
      }
    }
    this.getMallCateList()
    this.getGoodsParamerters()
  },
  methods: {
    // 商品编辑 数据回显
    getEditEcho() {
      getFoodsDetail({ id: this.productId }).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          let product = {}
          for (const key in data) {
            if (Object.hasOwn(this.productEditField, key)) {
              product[key] = data[key]
            }
          }
          console.log(this.product);
          // 由于上传组件只接收 数组 这里做数组转换处理

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
          if(data.list&&data.list.length){
            this.paramaters = data.list;
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
    async getMallCateList() {
      this.cateLoading = true;
      getFyyFoodsMallClassificationList().then(res => {
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
    // 获取商品参数列表
    async getGoodsParamerters() {
      getGoodsParamerters().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.paramaterList = res.data;

        } else {
          this.$message.warning(res.message)
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 选择商城分类
    handleChangeCate(row) {
      console.log(row);
      if (row) {
        this.product.categoryId = row[row.length - 1];
        this.product.categoryName = this.cateMap[this.product.categoryId].name;
      }
      console.log(this.cateMap[this.product.categoryId],this.product.categoryId,this.product.categoryName);
    },
    // 新增参数
    addParamater() {
      this.paramaters ? null : this.paramaters = [];
      if(this.paramaters.filter(item => item.paraKey == this.selectParamater)[0]){
        return this.$message.info("该参数已添加")
      }
      this.paramaters.push({ "paraKey": this.selectParamater, "paraValue": "" })
      // this.paramaterList = this.paramaterList.filter(item => item.paraKey != this.selectParamater)
    },
    // 删除参数
    delParamater(paraKey) {
      console.log(paraKey);
      this.paramaters = this.paramaters.filter(item => {
        console.log(item.paraKey, paraKey);
        return item.paraKey != paraKey;
      })
      console.log(this.paramaters);
    },
    // 表单校验
    async submitForm(type) {
      console.log(this.product);
      this.$refs['goodsRef'].validate((valid, invalidObj) => {
        if (!valid) {
          this.$message.error('表单校验未通过,请检查填写内容')
        }
        if (valid) {
          this['submitLoading' + type] = true;
          this.product.list = this.paramaters;
          // 数据处理
          this.product.mallPicture = this.product.mallPictureTemp[0] ? this.product.mallPictureTemp[0].url : "";
          if (this.product.mainPictureTemp && this.product.mainPictureTemp.length) {
            this.product.mainPicture = this.product.mainPictureTemp.reduce((total, currentValue, currentIndex, arr) => {
              return !total ? currentValue.url : total + ';' + currentValue.url
            }, '')
          }
          delete this.product.mallPictureTemp;
          delete this.product.mainPictureTemp;
          this.product.type = type;
          this.product.goodsType = this.goodsType;

          console.log(this.product);
          if (this.productId) {
            this.editGoods(type)
          } else {
            this.addGoods(type)
          }
        } else {
          console.log(this.product, invalidObj);
          console.log('error submit!!');
          return false;
        }
      });
    },

    async addGoods(type) {
      let product = this.product;
      console.log(product);
      try {
        let res = await addDeliciousGoods(product);
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
      console.log(product);
      let [err, res] = await catchAwait(updateDeliciousGoods(product))
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
  },
}
</script>
<style lang="scss" src="./supplierFoodEdit.scss" scoped>

</style>
