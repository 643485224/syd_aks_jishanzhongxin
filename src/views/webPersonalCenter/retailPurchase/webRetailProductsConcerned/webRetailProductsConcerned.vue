<template>
  <div class="page-container">
    <div class="content_three">
      <div class="content_three_title">
        <div>
          <span class="content_three_title1" :class="type == 'goods' ? 'active' : ''"
            @click="typeClick('goods')">关注的商品</span>
          <span class="content_three_title2" :class="type == 'shop' ? 'active' : ''"
            @click="typeClick('shop')">关注的店铺</span>
        </div>
      </div>
      <div class="content_three_tabs" v-if="type == 'goods' && cates.length">
        <div>
          分类：
          <span class="content_three_tabtitle" :class="currentCateId == item.saleCategoryId ? 'tab_active' : ''"
            @click="cateSwitch(item.saleCategoryId)" v-for="item in cates" :key="item.saleCategoryId">{{
                item.saleCategoryName
            }}({{ item.count }})</span>
        </div>
      </div>
      <div class="goods-list" v-if="type == 'goods'">
        <!-- 商品索引 -->
        <GoodsList v-if="cates" title="药品索引" v-loading="goodsLoading" :cates="cates[0] && cates[0].children"
          :list="goodsList" @changeCate="changeGoodsCate" :type="type"></GoodsList>
      </div>
      <el-pagination v-if="type == 'shop'" :current-page="pages.currPageNo" :page-size="pages.pageSize"
        @current-change="handleCurrentChange" layout="total,  prev, pager, next, jumper" :total="pages.total">
      </el-pagination>
      <div class="shop-list" v-if="type == 'shop'">
        <template v-if="shopList.length">
          <div class="shop-item" v-for="(shop, index) in shopList" :key="index">
            <div class="shop-cover mr_10">
              <el-image v-lazy :src="shop.logoUrl" alt="" v-if="shop.logoUrl">
                <div slot="error" class="image-slot">
                  <el-empty description="暂无图片"></el-empty>
                </div>
              </el-image>
              <el-empty description="暂无图片" v-else></el-empty>
            </div>
            <div class="shop-info">
              <div class="shop-info-header">
                <div class="name ml_20">{{ shop.unitName }}</div>
                <div class="pagination">
                  <span class="mr_10"><span class="active">{{ shop.goodsPageNo }}</span>/{{ shop.pageCount }}</span>
                  <el-button-group>
                    <el-button size="mini" icon="el-icon-arrow-left" :disabled="shop.goodsPageNo == 1"
                      @click="goodsPageSwitch(shop, 'subtract')"></el-button>
                    <el-button size="mini" icon="el-icon-arrow-right" :disabled="shop.goodsPageNo >= shop.pageCount"
                      @click="goodsPageSwitch(shop, 'add')"></el-button>
                  </el-button-group>
                </div>
              </div>
              <div class="shop-goods">
                <div class="goods-item" v-for="(item, index) in shop.goods"
                  @click="toDetail(item.type, item.supplierGoodsId)" :key="index">
                  <img class="goods-cover" :src="item.mallPicture" alt="" />
                  <div class="goods-price">￥{{ item.buyPrice }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-empty description="暂无关注店铺" :image-size="200" v-else></el-empty>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getFollowClassification,
  queryFollowList,
  getFollowShopList,
  getGoodsListByFollowShop,
} from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import GoodsList from "@/views/webPersonalCenter/retailPurchase/components/goodsList/goodsList.vue";
export default {
  components: {
    GoodsList,
  },
  data() {
    return {
      type: "goods", // 商品/店铺区分
      cates: [], // 药品药械下分类
      goodsList: [], // 商品列表
      shopList: [], // 店铺列表
      goodsLoading: false,
      currentCateId: undefined, // 当前分类id
      pages: {
        // 关注店铺分页
        currPageNo: 1,
        pageSize: 5,
        unitName: "",
        total: 0,
      },
    };
  },
  watch: {
    $route(to, from) {
      console.log(to);
      if (to.path.indexOf("webRetailShopsConcerned") != -1) {
        this.type = "shop";
        this.getShops();
      } else {
        this.type = "goods";
        this.getCates();
      }
      console.log("watch", this.type);
    },
  },
  created() {
    console.log(this.$route);
    if (this.$route.path.indexOf("webRetailShopsConcerned") != -1) {
      this.type = "shop";
      this.getShops();
    } else {
      this.type = "goods";
      this.getCates();
    }
    console.log("watch", this.type);
  },
  mounted() {
    if (this.type == "shop") {
      this.getShops();
    } else {
      this.getCates();
    }
  },
  methods: {
    getCates() {
      getFollowClassification()
        .then((res) => {
          if (res.code == 200) {
            console.log(res.data);
            this.cates = res.data;
            if (this.cates.length) {
              this.cateSwitch(this.cates[0].saleCategoryId);
            }
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 商品/店铺 点击切换
    typeClick(value) {
      this.type = value;
      if (value == "goods") {
        this.getCates();
      } else {
        this.getShops();
      }
    },
    // 分类 点击切换
    cateSwitch(value) {
      this.currentCateId = value;
      if (this.type == "goods") {
        this.getGoodsByCateId(value);
      }
    },
    // 获取分类下商品列表
    getGoodsByCateId(saleCategoryId) {
      queryFollowList({ saleCategoryId })
        .then((res) => {
          if (res.code == 200) {
            console.log(res.data);
            this.goodsList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取店铺列表
    getShops() {
      let params = {
        currPageNo: this.pages.currPageNo,
        pageSize: this.pages.pageSize,
        unitName: this.pages.unitName,
      };
      console.log(params);
      getFollowShopList(params)
        .then((res) => {
          if (res.code == 200) {
            console.log(res.data);
            this.shopList = res.data.records;
            this.pages.total = res.data.total;
            console.log(this.shopList);
            this.shopList.forEach((item, i) => {
              item.goodsPageNo = 1;
              item.goodsPageSize = 4;
              item.pageCount = 1;
              this.getGoodsListByFollowShop(this.shopList[i], item.supplierId);
            });
            console.log(this.shopList);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 读取关注店铺下分页商品
    getGoodsListByFollowShop(shop, supplierId) {
      let params = {
        supplierId,
        currPageNo: shop.goodsPageNo,
        pageSize: shop.goodsPageSize,
      };
      console.log(params);
      getGoodsListByFollowShop(params)
        .then((res) => {
          if (res.code == 200) {
            shop.goods = res.data.records;
            shop.goodsTotal = res.data.total;
            shop.pageCount =
              shop.goodsTotal % 4 > 0
                ? Math.ceil(shop.goodsTotal / 4)
                : shop.goodsTotal / 4;
            this.$forceUpdate();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 店铺分页切换
    handleCurrentChange(val) {
      console.log(val);
      this.pages.currPageNo = val;
      this.getShops();
    },
    // 商品分页切换
    goodsPageSwitch(shop, type) {
      if (type == "add") {
        shop.goodsPageNo += 1;
      } else {
        shop.goodsPageNo -= 1;
      }
      this.getGoodsListByFollowShop(shop, shop.supplierId);
    },
    // 点击商品跳转详情页
    toDetail(type, id) {
      switch (type) {
        case "foods":
          // 新页面打开
          return window.open(
            this.$router.resolve({
              path: "/webTradingMall/webFoodDetail",
              query: { type: this.type, id },
            }).href,
            "_blank"
          );
        default:
          // 新页面打开
          return window.open(
            this.$router.resolve({
              path: "/webTradingMall/webGoodsDetail",
              query: { type: this.type, id },
            }).href,
            "_blank"
          );
      }
    },
    // 点击进行跳转
    toRouter(name) {
      // 新页面打开
      let routeData = this.$router.resolve({
        name: name,
        params: {},
      });
      window.open(routeData.href, "_blank");
      // 本页面打开
      // this.$router.push({
      //   name: name,
      //   params: {},
      // });
    },
    changeGoodsCate() { },
  },
};
</script>
<style lang="scss" src="./webRetailProductsConcerned.scss" scoped>

</style>
