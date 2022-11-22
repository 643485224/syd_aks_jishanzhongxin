<template>
  <!-- 添加关联商品页面 -->
  <div>
    <div
      class="content"
      v-loading="loading"
      element-loading-text="拼命加载中,请稍后..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <div class="content_body">
        <div class="content1">
          <div class="content11">添加关联商品</div>
        </div>
        <div class="content2"></div>
        <div class="content3">
          <div class="content31">商品名称：</div>
          <el-input
            class="content32"
            placeholder="请输入商品名称"
            suffix-icon="el-icon-search"
            v-model="elInputValue"
          >
          </el-input>
          <el-button class="content33" type="primary" @click="searchButton()"
            >查询</el-button
          >
        </div>
        <el-pagination
          class="mt_20"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total"
        >
        </el-pagination>
        <div class="content4">
          <div class="content41">商品信息</div>
          <div class="content42">供应商名称</div>
          <div class="content43">单价</div>
          <div class="content44">操作</div>
        </div>
        <div
          class="content5"
          v-for="(item, index) in centerMallAddAssociatedDrugListRetu"
          :key="index"
        >
          <div class="content51">
            <div class="content511">
              <img src="" alt="" />
            </div>
            <div class="content512">
              {{ item.goodsName }}
            </div>
          </div>
          <div class="content52">{{ item.supplierName }}</div>
          <div class="content53">￥{{ item.buyPrice }}</div>
          <div class="content54">
            <el-button
              class="content541"
              type="primary"
              @click="addToCart(item)"
            >
              <img
                class="content5411"
                src="./image/gouWuChe.png"
                alt=""
              />加入购物车</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import { centerMallAddAssociatedDrugList } from "@/api/aksApi/platformApi/centerMallApi";
import { customerCartAddRetailCart } from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import { cartAddCartInfo } from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import { valueOf } from "screenfull";
export default {
  props: {
    goodsType: {
      type: String,
      default: 1, // // 商品类型（1 药品 2 药械）
    },
    userType: {
      type: Number,
      default: undefined, // // 用户类型（1 采购商 2 零售用户）
    },
  },
  data() {
    return {
      loading: false, //加载中
      centerMallAddAssociatedDrugListRetu: {}, // 商城平台-中心商城=>添加关联药品列表-接口回参
      pages: {
        total: 0,
        currPageNo: 1,
        pageSize: 10,
      },
      elInputValue: "", //商品名称
    };
  },
  mounted() {
    //"用户类型 (1 采购商 2 零售用户)
    // if (this.$store.state.vuex_user.sysType == 5) {
    //   valueData.userType = 2;
    // } else if (this.$store.state.vuex_user.sysType == 2) {
    //   valueData.userType = 1;
    // }
    this.centerMallAddAssociatedDrugListApi(); // 商城平台-中心商城=>添加关联药品列表-接口
  },
  methods: {
    // 商城平台-中心商城=>添加关联药品列表-接口
    centerMallAddAssociatedDrugListApi() {
      this.loading = true;
      let valueData = {
        goodsType:
          this.goodsType == "drug" || this.goodsType == "apparatus" ? 1 : 2, //商品类型（1 医药 2 非医药）
        userType: this.userType, //用户类型（1 采购商 2 零售用户）
        currPageNo: this.pages.currPageNo, //	当前页
        goodsName: this.elInputValue, //商品名称
        // keyword: "", //关键字
        // manufacturer: "", //厂家
        pageSize: this.pages.pageSize, //页码数
        // retailGoodsType: 0, //非医药商品类型（1 美食 2 温宿好礼 3 二手车））
        // saleCategoryId: 0,//选择类型（类别）
        // yytype: 0,
      };
      centerMallAddAssociatedDrugList(valueData)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            console.log(res);
            this.centerMallAddAssociatedDrugListRetu = res.data.list;
            this.pages.total = res.data.totalCount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 加入购物车（零售）-接口
    customerCartAddRetailCartApi(itemData) {
      let valueData = {
        goodsId: itemData.goodsId, //商品id
        goodsType:
          this.goodsType == "drug" || this.goodsType == "apparatus" ? 1 : 2, //商品类型（1 医药 2 非医药）
        quantity: 1, //数量
        supplierId: itemData.supplierId, //供应商id
        supplierName: itemData.supplierName, //供应商名称
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
          goodsCount: 1,
          goodsId: itemData.goodsId,

          goodsType:
            this.goodsType == "drug"
              ? 1
              : this.goodsType == "apparatus"
              ? 2
              : 3, //商品类型（1药品 2药械 3美食）
          quantity: 1,
          supplierId: itemData.supplierId,
          supplierName: itemData.supplierName,
          unit: itemData.unit,
          sfyyType:
            this.goodsType == "drug" || this.goodsType == "apparatus" ? 1 : 2, //是否医药@ 1 医药  2  非医药
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

    addToCart(itemData) {
      // this.userType //用户类型（1 采购商 2 零售用户）
      if (this.userType == 2) {
        // 零售用户
        this.customerCartAddRetailCartApi(itemData); // 加入购物车（零售）-接口
      } else if (this.userType == 1) {
        // 采购商
        this.cartAddCartInfoApi(itemData);
      }
    },
    // 每页条数改变回调
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.centerMallAddAssociatedDrugListApi(); // 商城平台-中心商城=>添加关联药品列表-接口
    },
    // 页码改变回调
    handleCurrentChange(val) {
      this.pages.currPageNo = val;
      this.centerMallAddAssociatedDrugListApi(); // 商城平台-中心商城=>添加关联药品列表-接口
    },
    // 查询按钮
    searchButton() {
      this.pages.currPageNo = 1;
      this.centerMallAddAssociatedDrugListApi(); // 商城平台-中心商城=>添加关联药品列表-接口
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.content_body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1200px;
  padding: 45px 26px;
  margin: 0px auto;
  min-height: calc(100vh - 166px - 170px);
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #020552;
  background-color: #fff;
}

.content1 {
  width: 100%;

  .content11 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
  }
}
.content2 {
  margin-top: 25px;
  width: 1160px;
  height: 1px;
  background: #d9d9d9;
}
.content3 {
  margin-top: 35px;
  display: flex;
  align-items: center;
  .content31 {
    margin-right: 11px;
  }
  .content32 {
    width: 269px;
  }
  .content33 {
    margin-left: 8px;
    background: #ff480e;
    color: #ffffff;
    border: 1px solid #ff480e;
  }
}
.content4 {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  background: #e8f0f8;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
  .content41 {
    width: 514px;
    height: 21px;
    text-align: left;
  }
  .content42 {
    width: 245px;
    height: 21px;
    text-align: center;
  }
  .content43 {
    width: 223px;
    height: 21px;
    text-align: center;
  }
  .content44 {
    width: 144px;
    height: 21px;
    text-align: center;
  }
}

.content5 {
  margin-top: 20px;
  width: 100%;
  height: 133px;
  border: 1px solid #e8f0f8;
  padding: 26px 0px 26px 20px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;

  .content51 {
    width: 514px;
    height: 100%;
    display: flex;
    .content511 {
      width: 80px;
      height: 80px;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .content512 {
      margin-left: 13px;
      width: 380px;
    }
  }
  .content52 {
    width: 245px;
    height: 100%;
    text-align: center;
  }
  .content53 {
    width: 223px;
    height: 100%;
    text-align: center;
  }
  .content54 {
    width: 144px;
    height: 100%;
    text-align: center;
    .content541 {
      height: 33px;
      width: 120px;
      background: #ffffff;
      color: #00023a;
      border: 1px solid #999999;
      ::v-deep span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .content5411 {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
