<template>
  <div class="relation-content">
    <cu-dialog
      width="90vw"
      top="8vh"
      title="添加商品"
      :center="'center'"
      :showClose="true"
      :visible="relationGoodsVisible"
      @handleClose="addRelationGoodsHandleClose"
    >
      <div slot="title">添加商品</div>
      <el-tabs v-model="activeName" @tab-click="switchTab" stretch>
        <el-tab-pane label="根据厂家关联推荐" name="first">
          <div class="search-bar">
            <div class="search-item">
              厂家:
              <el-input
                class="selectInput"
                v-model="searchRelationGoodsParams.keyword"
                placeholder="请输入关键字搜索"
              >
              </el-input>
              <el-button class="btn_ff480e" @click="getRelationGoods"
                >查询</el-button
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="根据名称关联推荐" name="second">
          <div class="search-bar">
            <div class="search-item">
              名称:
              <el-input
                class="selectInput"
                v-model="searchRelationGoodsParams.keyword"
                placeholder="请输入关键字搜索"
              >
              </el-input>
              <el-button class="btn_ff480e" @click="getRelationGoods"
                >查询</el-button
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="根据类别关联推荐" name="third">
          <div class="search-bar">
            <div class="search-item">
              类别:
              <el-input
                class="selectInput"
                v-model="searchRelationGoodsParams.keyword"
                placeholder="请输入关键字搜索"
              >
              </el-input>
              <el-button class="btn_ff480e" @click="getRelationGoods"
                >查询</el-button
              >
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="relation-tab-content">
        <cu-table
          class="sale-table"
          :selection="false"
          :showTitle="false"
          :showPagination="true"
          :height="468"
          :loading="loading"
          :tableHeader="tableHeader"
          :tableData="tableData"
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
          <!-- :total="pages.total" @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange" -->
          <template #quantity="value">
            <el-input-number
              class="table_el_input"
              v-model="value.value.quantity"
              :min="1"
              :max="+value.value.squantity"
              :precision="0"
              size="small"
              @change="
                quantityChange(arguments[0], value.value, value.value.squantity)
              "
            ></el-input-number>
          </template>
          <template slot="operate" slot-scope="value">
            <a class="a_156CC2" type="primary" @click="addCart(value.value)"
              >加入购物车</a
            >
          </template>
        </cu-table>
      </div>

      <div slot="footer"></div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  addAssociatedDrugList,
  changeGoodsQuantity,
} from "@/api/aksApi/platformApi/centerMallApi.js";
import { cartAddCartInfo } from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
export default {
  props: {
    relationGoodsVisible: {
      type: Boolean,
      default: false, //生成订单弹框
    },
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
      activeName: "first",
      tableHeader: [
        // 表头
        // {
        //   slot: "expand",
        //   align: "center",
        //   width: "40",
        // },
        {
          title: "名称",
          key: "goodsName",
          width: "120",
          align: "center",
        },
        {
          title: "厂家",
          key: "manufacturer",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "单位",
          slot: "unit",
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
          slot: "quantity",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      tableData: [], // 表内容
      searchRelationGoodsParams: {
        currPageNo: 1,
        pageSize: 10,
        keyword: "",
      },
      total: 0,
    };
  },
  mounted() {
    this.getRelationGoods();
    // this.$nextTick(() => {
    //     let ele = document.getElementsByClassName('el-tabs__active-bar')[0]
    //     ele.style.transform = `translateX(58px)`
    //   })
  },
  methods: {
    getRelationGoods() {
      this.loading = true;
      let params = {
        currPageNo: this.searchRelationGoodsParams.currPageNo,
        // goodsName:'',
        goodsType: this.goodsType == "drug" ? 1 : 2, // 商品类型（1 药品 2 药械）
        keyword: this.searchRelationGoodsParams.keyword,
        // manufacturer: "",
        pageSize: this.searchRelationGoodsParams.pageSize,
        // saleCategoryId: 0
        userType: this.userType,
      };
      addAssociatedDrugList(params)
        .then((res) => {
          if (res.code == 200) {
            console.log(res);
            this.tableData = res.data.list;
            this.total = res.data.totalCount;
            this.relationGoodsVisible = true;
          } else {
            this.$message.error(res.message);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 切换tab
    switchTab(tab, event) {
      console.log(tab, event);
      this.searchRelationGoodsParams = {
        currPageNo: 1,
        pageSize: 10,
        keyword: "",
      };
      this.getRelationGoods();
    },
    handleSizeChange(val) {
      console.log(val);
      this.searchRelationGoodsParams.pageSize = val;
      this.getRelationGoods();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.searchRelationGoodsParams.currPageNo = val;
      this.getRelationGoods();
    },
    // 改变商品数量
    async quantityChange(val, goods, squantity) {
      console.log(val, goods, squantity);
      this.cartChangeCartQuantityApi(goods);
      if (!squantity) {
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          goods.quantity = 1;
        });
        console.log(val, goods, squantity);
      } else {
        if (val > squantity) {
          console.log(val, goods, squantity);
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            goods.quantity = squantity;
          });
        } else if (val == squantity) {
          goods.quantity = squantity;
        } else {
          goods.quantity = val;
        }
      }
      if (val == null || val == undefined || val == 0 || val == "") {
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          goods.quantity = 1;
        });
      }
    },
    // 改变购物车商品数量-接口
    async cartChangeCartQuantityApi(item) {
      let valueData = new FormData();
      valueData.append("goodsId", item.goodsId);
      valueData.append("quantity", item.quantity);
      let res = await changeGoodsQuantity(valueData);
      if (!res || res.code != 200) {
        return false;
      }
      console.log(res);
      return true;
    },
    // 加入购物车
    addCart(goods) {
      console.log("ddd");

      if (!goods.squantity) {
        return this.$message.info("库存不足");
      }
      // goods.goodsId = goods.id;
      // this.goods.goodsCategoryCount = 1;
      // this.goods.goodsCount = this.count;
      goods.amount = goods.amount * goods.quantity;
      goods.goodsType = this.goodsType == "drug" ? 1 : 2; // 1药品 2药械
      let value = [goods];
      this.cartAddCartInfoApi(value);
    },
    // 新增购物车信息-接口
    cartAddCartInfoApi(value) {
      cartAddCartInfo(value)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 关闭
    addRelationGoodsHandleClose() {
      this.$emit("addRelationGoodsHandleClose", false);
    },
  },
};
</script>
<style lang="scss" scoped>
// 头部样式
.relation-content {
  color: #00023a;

  ::v-deep .el-dialog__header {
    background-color: #fff !important;
    color: #00023a;
    font-size: 20px;
  }

  ::v-deep .el-tabs__nav-scroll {
    width: 50%;
    margin: 0 auto;
  }

  ::v-deep .el-tabs__active-bar {
    // width: 38px !important;
    background-color: #ff480e;
  }

  ::v-deep .el-tabs__item {
    font-size: 20px;
    color: #999999;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #00023a;
  }

  .search-bar {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    margin: 20px 0 30px;
    font-size: 14px;
    color: #00023a;

    .search-item {
      margin: 4px 10px 4px 0;

      .el-input {
        width: 230px;
        margin: 0 10px;

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
  }
}
</style>
