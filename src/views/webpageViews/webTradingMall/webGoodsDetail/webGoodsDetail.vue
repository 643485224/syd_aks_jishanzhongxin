<template>
  <div>
    <div
      v-if="!generateOrderVisible && !relationGoodsVisible && !addToCartVisible"
      class="content-container"
      ref="container"
    >

      <div class="content-body"   v-if="
                !user || !user.sysType || user.sysType == 2 || user.sysType == 5
              ">
        <div class="content-heare">
      <div class="heare-left">
        {{goods.supplierName}}
      </div>
      <div class="heare-right" v-if=" !user || !user.sysType || user.sysType == 5">
        <!--  active已关注-->
        <div v-if="$store.state.vuex_token.token!=undefined" :class="shopFollow==1?'active':'heare-but' " @click="getaddShop($route.query.supplierId,shopFollow)" >
         <img src="../image/Slice74.png" alt="">&nbsp;{{shopFollow==1?'已关注':'关注店铺'}}
        </div>
        <div  v-else-if="$store.state.vuex_token.token==undefined" class="heare-but " @click="getaddShop($route.query.supplierId,shopFollow)" >
         <img src="../image/Slice74.png" alt="">&nbsp;关注店铺
        </div>
      </div>
    </div>
        <div class="section goods-main">
          <div class="goods-images">
            <el-carousel
              height="400px"
              v-if="goods.images && goods.images.length"
            >
              <el-carousel-item v-for="item in goods.images" :key="item">
                <div class="carouse-item">
                  <el-image :src="item">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-carousel-item>
            </el-carousel>
            <template v-else>
              <el-empty description="暂无图片"></el-empty>
            </template>
          </div>
          <div class="goods-info">
            <div class="info-title">{{ goods.mallName }}</div>
            <div class="info-content">
              <div class="info-item">
                <div class="info-label">价格:</div>
                <div class="info-price">￥{{ goods.buyPrice }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">规格:</div>
                <div class="info-size">
                  {{ goods.specification }}
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">快递费：</div>
                <div class="info-property">
                  {{ goods.transportFee }}元
                  <!-- <div class="property-price">免邮金额{{goods.amount}} 元</div> -->
                </div>
              </div>
              <!-- <div class="info-item">
              <div class="info-label">物流:</div>
              <div class="info-property">
                {{goods.sendAreaName}}
                <div class="property-price">快递费：{{goods.amount}} 元</div>
              </div>
            </div> -->
              <div class="info-item">
                <div class="info-label">采购类型:</div>
                <div class="info-type">
                  <el-radio
                    v-model="type"
                    size="small"
                    :label="item"
                    border
                    v-for="(item, index) in goods.buyerList"
                    :key="index"
                    >{{ item }}</el-radio
                  >
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">数量:</div>
                <div class="info-count">
                  <el-input-number
                    size="small"
                    :value="count"
                    :controls="true"
                    :min="1"
                    :max="goods.squantity || 0"
                    :precision="0"
                    @change="
                      quantityChange(arguments[0], goods, goods.squantity)
                    "
                  >
                  </el-input-number>
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">剩余库存:</div>
                <div class="info-count">
                  {{ goods.squantity }}
                </div>
              </div>
            </div>
            <div
              class="info-operate"
              v-if="
                !user || !user.sysType || user.sysType == 2 || user.sysType == 5
              "
            >
              <el-button class="buy-btn" @click="buy">立即购买</el-button>
              <el-button class="tocar-btn" @click="addCart()"
                ><img src="../image/car.png" /> 加入购物车</el-button
              >

              <el-button class="relation-btn" @click="showRelationDialog"
                ><img src="../image/relation.png" />添加关联药品
              </el-button>
            </div>
          </div>
        </div>
        <div class="section goods-paramater">
          <div class="section-title">产品参数</div>
          <el-row :gutter="20">
            <el-col :span="6" class="paramater-item">
              <div class="paramater-label">品牌：</div>
              <div class="paramater-content">{{ goods.abroad }}</div>
            </el-col>
          </el-row>
          <template v-if="goodsType == 'drug'">
            <el-row :gutter="20">
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">商品名称：</div>
                <div class="paramater-content">{{ goods.goodsName }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">商品编号：</div>
                <div class="paramater-content">{{ goods.goodsCode }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">商品毛重：</div>
                <div class="paramater-content">{{ goods.grossWeight }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">商品产地：</div>
                <div class="paramater-content">{{ goods.originPlace }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">货号：</div>
                <div class="paramater-content">{{ goods.itemNo }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">适用人群：</div>
                <div class="paramater-content">{{ goods.forPeople }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">适用症状：</div>
                <div class="paramater-content">{{ goods.indications }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">类别：</div>
                <div class="paramater-content">{{ goods.lb }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">药品剂型：</div>
                <div class="paramater-content">{{ goods.jx }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">使用方法：</div>
                <div class="paramater-content">{{ goods.usageMethod }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">国产/进口：</div>
                <div class="paramater-content">
                  {{ goods.abroad == 1 ? "国产" : "进口" }}
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-if="goodsType == 'apparatus'">
            <el-row :gutter="20">
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">药械名称：</div>
                <div class="paramater-content">{{ goods.productName }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">医保编码：</div>
                <div class="paramater-content">{{ goods.ybCode }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">耗材材质：</div>
                <div class="paramater-content">{{ goods.material }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">规格型号：</div>
                <div class="paramater-content">{{ goods.specification }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">批准文号：</div>
                <div class="paramater-content">{{ goods.approvalNumber }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">产地：</div>
                <div class="paramater-content">{{ goods.originPlace }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">类别：</div>
                <div class="paramater-content">{{ goods.lb }}</div>
              </el-col>
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">生产企业：</div>
                <div class="paramater-content">{{ goods.manufacturer }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" class="paramater-item">
                <div class="paramater-label">国产/进口：</div>
                <div class="paramater-content">
                  {{ goods.abroad == 1 ? "国产" : "进口" }}
                </div>
              </el-col>
            </el-row>
          </template>
        </div>
        <div class="section goods-details">
          <div class="detail-content" v-html="goods.detail"></div>
        </div>
      </div>
      <!-- 生成采购弹框组件 -->
      <!-- <div v-if="generateOrderVisible" class="content-body">
        <generateGoodsOrder
          :generateOrderVisible="generateOrderVisible"
          @generateOrderHandleClose="generateOrderHandleClose"
          :orderParams="orderParams"
        ></generateGoodsOrder>
      </div> -->

      <webMainFooter></webMainFooter>
    </div>

    <!-- 支付页面 -->
    <goodsBuyNowVue
      v-if="generateOrderVisible"
      :generateOrderVisible="generateOrderVisible"
      @generateOrderHandleClose="generateOrderHandleClose"
      :orderParams="orderParams"
    ></goodsBuyNowVue>
    <!-- 添加关联商品组件-零购用户使用 -->
    <goodsAddRelationVue
      v-if="relationGoodsVisible"
      :goodsType="goodsType"
      :userType="userType"
      @addRelationGoodsHandleClose="addRelationGoodsHandleClose"
    ></goodsAddRelationVue>

    <goodsAddToCartVue v-if="addToCartVisible"></goodsAddToCartVue>
  </div>
</template>
<script>
import { cartAddCartInfo } from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import {
  getDrugDetail,
  getApparatusDetail,
  changeGoodsQuantity,
  getaddShop,
  getCancelShop
} from "@/api/aksApi/platformApi/centerMallApi.js";
import { customerCartAddRetailCart } from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import generateGoodsOrder from "../components/generateGoodsOrder/generateGoodsOrder.vue";
import addRelationGoods from "../components/addRelationGoods/addRelationGoods.vue";
import goodsBuyNowVue from "./goodsBuyNow/goodsBuyNow.vue";
import goodsAddRelationVue from "./goodsAddRelation/goodsAddRelation.vue";
import goodsAddToCartVue from "./goodsAddToCart/goodsAddToCart.vue";
import { log } from 'console';
export default {
  components: {
    generateGoodsOrder,
    addRelationGoods,
    goodsBuyNowVue,
    goodsAddRelationVue,
    goodsAddToCartVue,
  },
  data() {
    return {
      goodsType: "", // 商品类型 区分页面显示内容
      goods: {},
      type: 1,
      count: 1,
      user: null,
      generateOrderVisible: false, //开启关闭生成订单弹框组件
      orderParams: {},
      relationGoodsVisible: false, // 添加关联商品弹框
      addToCartVisible: false, //添加购物车组件
      userType: undefined, // 登录用户类型
      shopFollow:null,
    };
  },
  created() {
    let id =this.$route.query.id;
    let type = this.$route.query.type;
    let supplierId= this.$route.query.supplierId
    this.goodsType = type;
    console.log(this.$store.state.vuex_token.token,8844);
    this.user = this.$store.state.vuex_user;
    this.getGoodsDetal(type, id,supplierId);
  },
  mounted() {},
  computed: {},
  methods: {
    async getGoodsDetal(type, id,supplierId) {
      console.log(id);
      let fetchGoodsDetail = null;
      switch (type) {
        case "drug":
          fetchGoodsDetail = getDrugDetail;
          break;
        case "apparatus":
          fetchGoodsDetail = getApparatusDetail;
          break;

        default:
          break;
      }
      let params = {
        id,
        supplierId,
        sysType:this.$store.state.vuex_user.sysType
      };
      if (this.$store.state.vuex_user.sysType == 5) {
        params.username = this.user && '';
       
      } else if(this.$store.state.vuex_user.sysType == 2) {
        params.username = this.user && this.user.username;
      }else{
        params.username = ''
        params.sysType = 1
      }
      console.log(params);
      let res = await fetchGoodsDetail(params);
      if (res.code != 200) {
        return this.$message.error(res.message);
      }
      let data = res.data;
      data.images = (data.mainPicture && data.mainPicture.split(";")) || [];
      this.type = data.buyerList[0];
      this.goods = res.data;
      console.log(res);
      this.shopFollow= res.data.shopFollow

    },
    //关注店铺
   async getaddShop(val,flag){
    if (this.$store.state.vuex_user.sysType == 5) {
      } else {
        if (!this.user || !this.user.sysType) {
          this.$message.info("请先登录");
          this.$store.commit("switchPlatform", "RetailPurchase");
          this.$router.push("/login");
          return;
        }
      }
      
      console.log(flag);
      if(flag==1){ //取消关注
        console.log(11);
         getCancelShop(val).then(res =>{
          console.log(res);
          if(res.code ==200){
            console.log(res);
          this.$message.success(res.message);
          this.getGoodsDetal(this.$route.query.type,this.$route.query.id,this.$route.query.supplierId)
          }else{
            this.$message.error(res.message);
          }
        })
      }else{ //关注
        getaddShop(val).then(res => {
          if(res.code ==200){
          this.$message.success(res.message);
          this.getGoodsDetal(this.$route.query.type,this.$route.query.id,this.$route.query.supplierId)
          }else{
            this.$message.error(res.message);
          }
    })
      }
    
   
   },
    // 改变商品数量
    quantityChange(val, goods, squantity) {
      if (!squantity) {
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.count = 1;
          this.cartChangeCartQuantityApi(goods);
        });
      } else {
        if (val > squantity) {
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            this.count = squantity;
            this.cartChangeCartQuantityApi(goods);
          });
        } else if (val == squantity) {
          this.count = squantity;
          this.cartChangeCartQuantityApi(goods);
        } else {
          this.count = val;
          this.cartChangeCartQuantityApi(goods);
        }
      }
      if (val == null || val == undefined || val == 0 || val == "") {
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.count = 1;
        });
      }
    },
    // 改变购物车商品数量-接口
    cartChangeCartQuantityApi(item) {
      let valueData = new FormData();
      valueData.append("goodsId", item.goodsId);
      valueData.append("quantity", this.count);
      changeGoodsQuantity(valueData)
        .then((res) => {
          if (res.code == 200) {
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },

    // 加入购物车按钮
    addCart() {
      if (!this.user || !this.user.sysType) {
        return this.$message.info("请先登录");
      }
      if (!this.goods.squantity) {
        return this.$message.info("库存不足");
      }
      if (this.$store.state.vuex_user.sysType == 5) {
        // 零购用户
        this.customerCartAddRetailCartApi(); // 加入购物车（零售）-接口
      } else if (this.$store.state.vuex_user.sysType == 2) {
        // 采购商
        this.cartAddCartInfoApi(this.goods);
      }
    },
    // 加入购物车（零售）-接口
    customerCartAddRetailCartApi() {
      let valueData = {
        goodsId: this.goods.goodsId, //商品id
        goodsType: 1, //商品类型 1医药 2非医药
        quantity: this.count, //数量
        supplierId: this.goods.supplierId, //供应商id
        supplierName: this.goods.supplierName, //供应商名称
      };
      customerCartAddRetailCart(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {});
    },
    // 采购商-新增购物车信息-接口
    cartAddCartInfoApi(itemData) {
      let valueData = [
        {
          amount: itemData.buyPrice,
          goodsCategoryCount: 1,
          goodsCount: this.count,
          goodsId: itemData.goodsId,
          goodsType:
            this.goodsType == "drug"
              ? 1
              : this.goodsType == "apparatus"
              ? 2
              : 3, //商品类型（1药品 2药械 3美食）
          quantity: this.count,
          supplierId: itemData.supplierId,
          supplierName: itemData.supplierName,
          unit: itemData.buyerList[0],
          sfyyType: 1, //是否医药@ 1 医药  2  非医药
        },
      ];
      cartAddCartInfo(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {});
    },
    // 立即购买
    buy() {
      if (this.$store.state.vuex_user.sysType == 5) {
      } else {
        if (!this.user || !this.user.sysType) {
          this.$message.info("请先登录");
          this.$store.commit("switchPlatform", "RetailPurchase");
          this.$router.push("/login");
          return;
        }
      }

      if (!this.goods.squantity) {
        return this.$message.info("库存不足");
      }
      // 医药类型（商品类型 为 1时（1 药品 2 药械 3美食））
      let drugType = {
        drug: 1,
        apparatus: 2,
        foods: 3,
      };
      this.orderParams = {
        goodsType: 1, // 商品类型（1 药品药械 2 非药品药械）
        goodsId: this.goods.goodsId, // 商品id
        drugType: drugType[this.goodsType], // 医药类型（商品类型 为 1时（1 药品 2 药械））
        type: this.type, // 采购类型
        count: this.count, // 数量
      };
      this.generateOrderVisible = true;
    },
    // 立即购买-取消按钮
    generateOrderHandleClose(value) {
      this.generateOrderVisible = value;
    },
    // 显示添加关联商品弹框
    showRelationDialog() {
      let user = this.$store.state.vuex_user;
      if (!user || !user.sysType) {
        return this.$message.info("请先登录");
      }
      let sysType = user.sysType;
      if (sysType == 5) {
        this.userType = 2;
      } else if (sysType == 2) {
        this.userType = 1;
      }
      this.relationGoodsVisible = true;
    },
    // 添加关联商品-取消
    addRelationGoodsHandleClose(value) {
      this.relationGoodsVisible = value;
    },

    computePrice() {
      let sum = (this.goods.buyPrice * 100 * this.count) / 100;
      let transportFee = this.goods.transportFee;
      if (sum >= this.goods.decreaseAmount) {
        // 达到免邮金额
        return sum;
      } else {
        return sum + transportFee;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./webGoodsDetail.scss";
</style>
