<template>
  <div>
    <div class="content-body">
      <div class="content-top">
        <!-- 分类导航 -->
        <ul class="content-top-nav">
            <li class="nav-item" v-for="item in cates" :key="item.name">
              <div class="left">
                <img v-lazy :src="item.src" alt="" />
                <div class="text">{{ item.name }}</div>
              </div>
              <div class="right">
                <div class="row">
                  <template v-for="(child, index) in item.children">
                    <div
                      :key="index"
                      v-if="index < 4"
                      :class="'cate-item ' + (index == 0 ? 'active' : '')"
                      @click="routerGo(child.name)"
                    >
                      <span style="cursor: pointer">{{ child.name }}</span>
                    </div>
                  </template>
                </div>
                <div class="row">
                  <template v-for="(child, index) in item.children">
                    <div
                      :key="index"
                      v-if="index >= 4"
                      :class="'cate-item ' + (index == 0 ? 'active' : '')"
                      @click="routerGo(child.name)"
                    >
                      <span style="cursor: pointer">{{ child.name }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </li>
          <li>
            <p class="more" @click="routerGo('查看全部')">查看全部</p>
          </li>
        </ul>
        <!-- 轮播图 -->
        <div class="content-top-right">
          <el-carousel height="520px">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="carouse-item">
                <div class="inner">
                  <div class="title">生产企业&nbsp;配送企业&nbsp;医疗机构</div>
                  <div class="desc">互联互通药械数据全流程智能追溯</div>
                  <!-- <el-button type="primary" class="btn">我要采购商品</el-button> -->
                </div>
                <img v-lazy src="./image/navRightImg.png" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 各用户身份登录入驻入口 -->
      <div class="content-btn mt_20">
        <div
          class="content_btnItem btnItem_three"
          @click="clickButton('申请入驻')"
        >
          <div class="itemBox">
            <div class="itemTitle">申请入驻</div>
            <div class="itemTitlePY">APPLICATION IN</div>
          </div>
          <img v-lazy class="itemImage" :src="gifSrc3" alt="" />
        </div>
        <div
          class="content_btnItem btnItem_four"
          @click="clickButton('我是采购商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是采购商</div>
            <div class="itemTitlePY">PURCHASER</div>
          </div>
          <img v-lazy class="itemImage" :src="gifSrc1" alt="" />
        </div>

        <div
          class="content_btnItem btnItem_two"
          @click="clickButton('我是供应商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是供应商</div>
            <div class="itemTitlePY">SUPPLIER</div>
          </div>
          <img v-lazy class="itemImage mr_10" :src="gifSrc2" alt="" />
        </div>

        <div
          class="content_btnItem btnItem_one"
          @click="clickButton('我是监管机构')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是监管机构</div>
            <div class="itemTitlePY">I'M THE REGULATOR</div>
          </div>
          <img v-lazy class="itemImage" :src="gifSrc4" alt="" />
        </div>
      </div>
      <div class="products-lists">
        <!-- 药品索引 -->
        <GoodsList
          v-if="cates"
          title="药品索引"
          v-loading="drugLoading"
          :cates="cates[0] && cates[0].children"
          :list="drugList"
          @changeCate="changeGoodsCate"
          type="drug"
        ></GoodsList>
        <!-- 药械索引 -->
        <GoodsList
          v-if="cates"
          title="药械索引"
          v-loading="apparatusLoading"
          :cates="cates[1] && cates[1].children"
          :list="apparatusList"
          @changeCate="changeApparatusCate"
          type="apparatus"
        ></GoodsList>
        <!-- 美食索引 -->
        <GoodsList
          v-if="cates && showFoods"
          title="美食索引"
          v-loading="foodsLoading"
          :cates="cates[2] && cates[2].children"
          :list="foodsList"
          @changeCate="changeFoodsCate"
          type="foods"
        ></GoodsList>
      </div>
      <!-- 友情链接组件 -->
      <cu-friendshipLink></cu-friendshipLink>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  getSaleCategoryMenuLevel,
  getDrugList,
  getApparatusList,
  getFoodList,
} from "@/api/aksApi/platformApi/centerMallApi.js";
import GoodsList from "../components/goodsList/goodsList.vue";
export default {
  components: {
    GoodsList,
  },
  data() {
    return {
      gifSrc1: require("./image/webTradingMall-btnItem1.gif"),
      gifSrc2: require("./image/webTradingMall-btnItem2.gif"),
      gifSrc3: require("./image/webTradingMall-btnItem3.gif"),
      gifSrc4: require("./image/webTradingMall-btnItem4.gif"),
      cates: [], // 分类数据
      drugList: [], // 药品索引数据
      apparatusList: [], // 药械索引数据
      foodsList: [], // 美食索引数据
      username: undefined, // 用户名 用于商品接口传参 获取不同价格
      drugLoading: false, // 药品数据加载
      apparatusLoading: false, //  药械数据加载
      foodsLoading: false, //  美食数据加载
      showFoods: true, // 显示美食商品
    };
  },
  mounted() {
    this.username = this.$store.state.vuex_user.sysType
      ? this.$store.state.vuex_user.username
      : undefined;
      console.log( this.username);
    this.getCates();
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 获取分类数据
    getCates() {
      getSaleCategoryMenuLevel()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.cates = res.data;
            this.cates.forEach((element, index) => {
              element.src = require("./image/webTradingMall-navIcon" +
                (index + 1) +
                ".png");
            });
            console.log("sss:", this.cates);
            this.getGoodsList();
            this.getApparatusList();
            let user = this.$store.state.vuex_user;
            console.log(user);
            // 2022-10-28 10:53,取消控制采购商不能采购其他东西
            // if (user.sysType != 2) {
            //   this.getFoodList();
            // } else {
            //   this.showFoods = false;
            // }
            this.getFoodList();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取药品数据
    getGoodsList(cateId) {
      this.drugLoading = true;
      let params = {
        saleCategoryId: cateId ? cateId : this.cates[0].children[0].id,
      }
      //用户登录不需要usename
      if(this.$store.state.vuex_user.sysType==5) {
        params.username =undefined
      }else{
        params.username= this.username
      }

      getDrugList(params).then((res) => {
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.drugList = data.records;
            this.drugLoading = false;
          } else {
            this.$message.error(res.message);
            this.drugLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.drugLoading = false;
        });
    },
    // 获取药械数据
    getApparatusList(cateId) {
      console.log(this.cates[0].children);
      this.apparatusLoading = true;

      let params = {
        saleCategoryId: cateId ? cateId : this.cates[1].children[0].id,
      }
      //用户登录不需要usename
      if(this.$store.state.vuex_user.sysType==5) {
        params.username =undefined
      }else{
        params.username= this.username
      }
      getApparatusList(params)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.apparatusList = data.records;
            this.apparatusLoading = false;
          } else {
            this.$message.error(res.message);
            this.apparatusLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.apparatusLoading = false;
        });
    },
    // 获取美食数据
    getFoodList(cateId) {
      console.log(this.cates[0].children);
      this.foodsLoading = true;
      getFoodList({
        saleCategoryId: cateId ? cateId : this.cates[2].children[0].id,
        username: this.username,
      })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.foodsList = data.records;
            this.foodsLoading = false;
          } else {
            this.$message.error(res.message);
            this.foodsLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.foodsLoading = false;
        });
    },

    // 切换药品二级分类
    changeGoodsCate(id) {
      console.log(id);
      this.getGoodsList(id);
    },
    // 切换药械二级分类
    changeApparatusCate(id) {
      console.log(id);
      this.getApparatusList(id);
    },
    // 切换药械二级分类
    changeFoodsCate(id) {
      console.log(id);
      this.getFoodList(id);
    },

    // 各平台入口点击回调
    clickButton(value) {
      if (value == "我是采购商") {
        if (this.$store.state.vuex_user.sysType == 2) {
          this.$message.success("您已登录，无需再次登录");
        } else {
          this.$store.commit("switchPlatform", "purchaser");
          this.$router.push("/login");
        }
      } else if (value == "我是供应商") {
        this.$store.commit("switchPlatform", "supplier");
        this.$router.push("/login");
      } else if (value == "申请入驻") {
        this.$store.commit("switchPlatform", "operation");
        this.$router.push("/Register");
      } else if (value == "我是监管机构") {
        this.$router.push("/webUnderConstruction");
        // this.$router.push("/webIndustrySupervision");
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webTradingMall",
        });
      }
    },
    // 建设中跳转
    underConstructionButton() {
      let routeData = this.$router.resolve({
        name: "webUnderConstruction",
        // query: { species: "Brassica rapa" },
      });
      window.open(routeData.href, "_blank");
      // this.$router.push("/webUnderConstruction");
      // this.$store.commit("$uStore", {
      //   name: "vuex_webName",
      //   value: "webUnderConstruction",
      // });
    },

    toDetail(id) {
      this.$router.push("/webGoodsDetail");
    },
    // 顶部筛选跳转
    routerGo(routerQuery) {
      this.$store.commit("$uStore", {
        name: "vuex_webName",
        value: "webTradingMall",
      });
      this.$router.push({
        path: "/webTradingMallSearch",
        query: {
          routerQuery: routerQuery, // payPropertyType: 1水费   2电费   3物业费
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./webTradingMall.scss";
</style>
