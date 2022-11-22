<template>
  <div>
    <div class="content-body">
      <div class="content_one">
        <div class="content_one1">
          <div>
            全部结果>
            <!-- <el-tag
              class="mr_10"
              style="
                font-size: 18px;
                background: #ff480e;
                border-color: #ff480e;
              "
              v-for="tag in tags"
              :key="tag.name"
              closable
              type="danger"
              effect="dark"
              @close="handleClose(tag)"
            >
              {{ tag.name }} </el-tag
            > -->
            <el-tag
              class="mr_10"
              style="
                font-size: 14px;
                background: #ff480e;
                border-color: #ff480e;
              "
              closable
              type="danger"
              effect="dark"
              v-if="centerMallSearchGoodsOut.brand"
              @close="screenClick(1, null)"
            >
              品牌:{{ centerMallSearchGoodsOut.brand }}
            </el-tag>
            <el-tag
              class="mr_10"
              style="
                font-size: 14px;
                background: #ff480e;
                border-color: #ff480e;
              "
              closable
              type="danger"
              effect="dark"
              v-if="centerMallSearchGoodsOut.manufacturer"
              @close="screenClick(2, null)"
            >
              厂家:{{ centerMallSearchGoodsOut.manufacturer }}
            </el-tag>
            <el-tag
              class="mr_10"
              style="
                font-size: 14px;
                background: #ff480e;
                border-color: #ff480e;
              "
              closable
              type="danger"
              effect="dark"
              v-if="centerMallSearchGoodsOut.model"
              @close="screenClick(3, null)"
            >
              型号:{{ centerMallSearchGoodsOut.model }}
            </el-tag>
            <el-tag
              class="mr_10"
              style="
                font-size: 14px;
                background: #ff480e;
                border-color: #ff480e;
              "
              closable
              type="danger"
              effect="dark"
              v-if="centerMallSearchGoodsOut.specification"
              @close="screenClick(4, null)"
            >
              规格:{{ centerMallSearchGoodsOut.specification }}
            </el-tag>
            "{{ routerQuery }}"
          </div>
          <!-- <div v-if="open" @click="openOrStow">
            展开筛选
            <i class="el-collapse-item__arrow el-icon-arrow-down"></i>
          </div> -->
          <!-- <div v-else @click="openOrStow">
            收起筛选
            <i class="el-collapse-item__arrow el-icon-arrow-left is-active"></i>
          </div> -->
        </div>
        <div
          v-if="
            !open && centerMallGetSearchConditionReturn.brandList.length > 0
          "
          class="content_one2"
        >
          <div class="content_one21">品牌选择:</div>
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.brandList"
          >
            <div
              :key="index"
              v-if="index <= 6"
              class="content_one22"
              :style="
                centerMallSearchGoodsOut.brand == item ? 'color:#ff480e;' : null
              "
              @click="screenClick(1, item)"
            >
              {{ item }}
            </div>
          </template>
          <div
            v-if="
              open1 && centerMallGetSearchConditionReturn.brandList.length > 7
            "
            @click="openOrStow1()"
          >
            展开
            <i class="el-collapse-item__arrow el-icon-arrow-down"></i>
          </div>
          <div
            v-else-if="
              !open1 && centerMallGetSearchConditionReturn.brandList.length > 7
            "
            @click="openOrStow1()"
          >
            收起
            <i class="el-collapse-item__arrow el-icon-arrow-left is-active"></i>
          </div>
        </div>
        <div v-if="!open1" class="content_one3">
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.brandList"
          >
            <span
              :key="item"
              v-if="index > 6"
              class="content_one3_item"
              :style="
                centerMallSearchGoodsOut.brand == item ? 'color:#ff480e;' : null
              "
              @click="screenClick(1, item)"
              >{{ item }}</span
            >
          </template>
        </div>
        <div
          v-if="
            !open &&
            centerMallGetSearchConditionReturn.manufacturerList.length > 0
          "
          class="content_one2"
        >
          <div class="content_one21">厂家选择:</div>
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.manufacturerList"
          >
            <div
              :key="index"
              v-if="index <= 6"
              class="content_one22"
              :style="
                centerMallSearchGoodsOut.manufacturer == item
                  ? 'color:#ff480e;'
                  : null
              "
              @click="screenClick(2, item)"
            >
              {{ item }}
            </div>
          </template>
          <div
            v-if="
              open2 &&
              centerMallGetSearchConditionReturn.manufacturerList.length > 7
            "
            @click="openOrStow2()"
          >
            展开
            <i class="el-collapse-item__arrow el-icon-arrow-down"></i>
          </div>
          <div
            v-else-if="
              !open2 &&
              centerMallGetSearchConditionReturn.manufacturerList.length > 7
            "
            @click="openOrStow2()"
          >
            收起
            <i class="el-collapse-item__arrow el-icon-arrow-left is-active"></i>
          </div>
        </div>
        <div v-if="!open2" class="content_one3">
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.manufacturerList"
          >
            <span
              :key="item"
              v-if="index > 6"
              class="content_one3_item"
              :style="
                centerMallSearchGoodsOut.manufacturer == item
                  ? 'color:#ff480e;'
                  : null
              "
              @click="screenClick(2, item)"
              >{{ item }}</span
            >
          </template>
        </div>
        <div
          v-if="
            !open && centerMallGetSearchConditionReturn.modelList.length > 0
          "
          class="content_one2"
        >
          <div class="content_one21">型号选择:</div>
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.modelList"
          >
            <div
              :key="index"
              v-if="index <= 6"
              class="content_one22"
              :style="
                centerMallSearchGoodsOut.model == item ? 'color:#ff480e;' : null
              "
              @click="screenClick(3, item)"
            >
              {{ item }}
            </div>
          </template>
          <div
            v-if="
              open3 && centerMallGetSearchConditionReturn.modelList.length > 7
            "
            @click="openOrStow3()"
          >
            展开
            <i class="el-collapse-item__arrow el-icon-arrow-down"></i>
          </div>
          <div
            v-else-if="
              !open3 && centerMallGetSearchConditionReturn.modelList.length > 7
            "
            @click="openOrStow3()"
          >
            收起
            <i class="el-collapse-item__arrow el-icon-arrow-left is-active"></i>
          </div>
        </div>
        <div v-if="!open3" class="content_one3">
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.modelList"
          >
            <span
              :key="item"
              v-if="index > 6"
              class="content_one3_item"
              :style="
                centerMallSearchGoodsOut.model == item ? 'color:#ff480e;' : null
              "
              @click="screenClick(3, item)"
              >{{ item }}</span
            >
          </template>
        </div>
        <div
          v-if="
            !open &&
            centerMallGetSearchConditionReturn.specificationList.length > 0
          "
          class="content_one2"
        >
          <div class="content_one21">规格选择:</div>
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.specificationList"
          >
            <div
              :key="index"
              v-if="index <= 6"
              class="content_one22"
              :style="
                centerMallSearchGoodsOut.specification == item
                  ? 'color:#ff480e;'
                  : null
              "
              @click="screenClick(4, item)"
            >
              {{ item }}
            </div>
          </template>
          <div
            v-if="
              open4 &&
              centerMallGetSearchConditionReturn.specificationList.length > 7
            "
            @click="openOrStow4()"
          >
            展开
            <i class="el-collapse-item__arrow el-icon-arrow-down"></i>
          </div>
          <div
            v-else-if="
              !open4 &&
              centerMallGetSearchConditionReturn.specificationList.length > 7
            "
            @click="openOrStow4()"
          >
            收起
            <i class="el-collapse-item__arrow el-icon-arrow-left is-active"></i>
          </div>
        </div>
        <div v-if="!open4" class="content_one3">
          <template
            v-for="(
              item, index
            ) in centerMallGetSearchConditionReturn.specificationList"
          >
            <span
              :key="item"
              v-if="index > 6"
              class="content_one3_item"
              @click="screenClick(4, item)"
              :style="
                centerMallSearchGoodsOut.specification == item
                  ? 'color:#ff480e;'
                  : null
              "
              >{{ item }}</span
            >
          </template>
        </div>
      </div>

      <div class="content_two">
        <div
          @click="screenNameChange(1)"
          :class="
            centerMallSearchGoodsOut.sortBy == 1
              ? 'content_two2'
              : 'content_two1'
          "
        >
          <span>综合</span>
          <div class="imgUrl"></div>
        </div>
        <div
          @click="screenNameChange(2)"
          :class="
            centerMallSearchGoodsOut.sortBy == 2
              ? 'content_two2'
              : 'content_two1'
          "
        >
          <span>销量</span>
          <div class="imgUrl"></div>
        </div>
        <div
          @click="screenNameChange(3)"
          :class="
            centerMallSearchGoodsOut.sortBy == 3
              ? 'content_two2'
              : 'content_two1'
          "
        >
          <span>价格</span>
          <div class="imgUrl"></div>
        </div>
      </div>

      <div class="products-lists">
        <!-- 药品索引 -->
        <!-- v-if="cates"
        :cates="cates[0] && cates[0].children" -->

        <GoodsList
          title="药品索引"
          v-loading="drugLoading"
          :list="centerMallSearchGoodsReturn.drugList"
          @changeCate="changeGoodsCate"
          type="drug"
        ></GoodsList>
        <!-- 药械索引 -->
        <!-- v-if="cates"
        :cates="cates[1] && cates[1].children" -->

        <GoodsList
          title="药械索引"
          v-loading="apparatusLoading"
          :list="centerMallSearchGoodsReturn.apparatusList"
          @changeCate="changeApparatusCate"
          type="apparatus"
        ></GoodsList>
        <!-- 美食索引 -->
        <!-- v-if="cates"
        :cates="cates[2] && cates[2].children" -->

        <GoodsList
          title="美食索引"
          v-loading="foodsLoading"
          :list="centerMallSearchGoodsReturn.foodList"
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
  centerMallGetSearchCondition,              
  centerMallSearchGoods,
} from "@/api/aksApi/platformApi/centerMallApi.js";
import GoodsList from "../../components/goodsList/goodsList.vue";
export default {
  components: {
    GoodsList,
  },
  data() {
    return {
      open: false, //true展开 或 false收起
      open1: true, //true展开 或 false收起
      open2: true, //true展开 或 false收起
      open3: true, //true展开 或 false收起
      open4: true, //true展开 或 false收起
      screenName: "综合", //综合 销量 价格
      screenItemName: "",
      routerQuery: "", //路由传递的值
      tags: [],
      //获取商城搜索条件（品牌、厂家、型号、规格）-接口回参
      centerMallGetSearchConditionReturn: {
        brandList: [], //品牌
        manufacturerList: [], //厂家
        modelList: [], //型号
        specificationList: [], //规格
      },
      centerMallSearchGoodsReturn: {
        foodList:[], //食品
        apparatusList: [], //药械
        drugList:[], //药品
        //  商品列表：
        //  public class MallGoodsList {
        //     @ApiModelProperty(value = "id")
        //     private Integer id;
        //     @ApiModelProperty(value = "索引图片")
        //     private String mallPicture;
        //     @ApiModelProperty(value = "商品名称")
        //     private String mallName;
        //     @ApiModelProperty(value = "采购价")
        //     private BigDecimal buyPrice;
        // }
      }, //中心商城搜索商品-接口回参
      //中心商城搜索商品-接口传参
      centerMallSearchGoodsOut: {
        brand: "", //品牌
        currPageNo: 0, //当前页
        keyword: "", //关键字
        manufacturer: "", //厂家
        model: "", //型号
        pageSize: 0, //每页记录数
        sortBy: 1, //排序 1 综合 2 销量 3 价格
        sortType: "", //排序类型 asc 升序 desc 降序
        specification: "", //规格
      },
      gifSrc1: require("../image/webTradingMall-btnItem1.gif"),
      gifSrc2: require("../image/webTradingMall-btnItem2.gif"),
      gifSrc3: require("../image/webTradingMall-btnItem3.gif"),
      gifSrc4: require("../image/webTradingMall-btnItem4.gif"),
      cates: [], // 分类数据
      drugList: [], // 药品索引数据
      apparatusList: [], // 药械索引数据
      foodsList: [], // 美食索引数据
      username: undefined, // 用户名 用于商品接口传参 获取不同价格
      drugLoading: false, // 药品数据加载
      apparatusLoading: false, //  药械数据加载
      foodsLoading: false, //  美食数据加载
    };
  },

  // 监控route中的数据变化
  watch: {
    $route(to, from) {
      this.routerQuery = this.$route.query.routerQuery;
      this.centerMallSearchGoodsOut.keyword = this.$route.query.routerQuery;
      this.centerMallGetSearchConditionApi(); // 获取商城搜索条件（品牌、厂家、型号、规格）-接口
      this.centerMallSearchGoodsApi(); // 中心商城搜索商品-接口
    },
  },
  mounted() {
    this.routerQuery = this.$route.query.routerQuery;
    this.centerMallSearchGoodsOut.keyword = this.$route.query.routerQuery;
    this.username = this.$store.state.vuex_user
      ? this.$store.state.vuex_user.username
      : undefined;
    // this.getCates();
    this.centerMallGetSearchConditionApi(); // 获取商城搜索条件（品牌、厂家、型号、规格）-接口
    this.centerMallSearchGoodsApi(); // 中心商城搜索商品-接口
  },
  created () {
    
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    // 获取商城搜索条件（品牌、厂家、型号、规格）-接口
    centerMallGetSearchConditionApi() {
      centerMallGetSearchCondition(this.routerQuery)
        .then((res) => {
          if (res.code == 200) {
            this.centerMallGetSearchConditionReturn = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 中心商城搜索商品-接口
    centerMallSearchGoodsApi() {
      centerMallSearchGoods(this.centerMallSearchGoodsOut)
        .then((res) => {
          if (res.code == 200) {
            // foodList食品
            // apparatusList药械
            // drugList药品
            console.log(res.data.apparatusList);
            this.centerMallSearchGoodsReturn.foodList =
              res.data.foodList.records;
            this.centerMallSearchGoodsReturn.apparatusList =
              res.data.apparatusList.records;
            this.centerMallSearchGoodsReturn.drugList =
              res.data.drugList.records;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取分类数据
    getCates() {
      getSaleCategoryMenuLevel()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.cates = res.data;
            this.getGoodsList();
            this.getApparatusList();
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
      getDrugList({
        saleCategoryId: cateId ? cateId : this.cates[0].children[0].id,
        username: this.username,
      })
        .then((res) => {
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
      getApparatusList({
        saleCategoryId: cateId ? cateId : this.cates[1].children[0].id,
        username: this.username,
      })
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

    openOrStow() {
      this.open = !this.open;
    },
    openOrStow1() {
      this.open1 = !this.open1;
    },
    openOrStow2() {
      this.open2 = !this.open2;
    },
    openOrStow3() {
      this.open3 = !this.open3;
    },
    openOrStow4() {
      this.open4 = !this.open4;
    },
    screenNameChange(screenName) {
      this.centerMallSearchGoodsOut.sortBy = screenName;
      this.centerMallSearchGoodsApi(); // 中心商城搜索商品-接口
    },
    screenClick(screenItemType, screenItemName) {
      if (screenItemType == 1) {
        // 品牌
        this.centerMallSearchGoodsOut.brand = screenItemName;
      } else if (screenItemType == 2) {
        //厂家
        this.centerMallSearchGoodsOut.manufacturer = screenItemName;
        34;
      } else if (screenItemType == 3) {
        //型号
        this.centerMallSearchGoodsOut.model = screenItemName;
      } else if (screenItemType == 4) {
        //规格
        this.centerMallSearchGoodsOut.specification = screenItemName;
      }
      this.centerMallSearchGoodsApi();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./webTradingMallSearch.scss";
</style>
