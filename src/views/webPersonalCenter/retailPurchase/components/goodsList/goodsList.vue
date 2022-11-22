<template>
  <div>
    <div class="content-products">
      <div class="content-products-nav">
        <!-- <div class="products-cate-title">{{title}}</div> -->
        <!-- <div class="navbar">
          <div v-for="(item, index) in cates" :key="index"
            :class="'cate-item ' + (index == activeIndex ? 'active' : '')" @click="changeCate(index,item.id)">
            <span>{{ item.name }}</span>
          </div>
        </div> -->
      </div>
      <div class="products-cards" v-if="list.length">
        <div
          class="products-card"
          v-for="(item, index) in list"
          :key="index"
          @click="toDetail(item.id)"
        >
          <img v-lazy :src="item.mallPicture || item.indexPicture" alt="" />
          <div class="card-bottom">
            <div class="name">{{ item.mallName }}</div>
            <!-- <div class="desc">50mgx12粒x3板/盒</div> -->
            <div class="flex_jb">
              <div class="price">￥{{ item.price || 0 }}</div>
              <el-button size="mini" class="btn_ff480e" @click="addCart($event,item)"
                >加入购物车</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <el-empty description="暂无关注商品" :image-size="200" v-else></el-empty>
    </div>
  </div>
</template>
<script>
import { followGoodsinsertCart } from "@/api/aksApi/platformApi/retailPurchaseApi.js";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "drug",
    },
    cates: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drugCates: [],
      activeIndex: 0,
    };
  },
  methods: {
    toDetail(id) {
      switch (this.type) {
        case "foods":
          return this.$router.push({
            path: "/webTradingMall/webFoodDetail",
            query: { type: this.type, id },
          });
        default:
          return this.$router.push({
            path: "/webTradingMall/webGoodsDetail",
            query: { type: this.type, id },
          });
      }
    },
    addCart(event,goods) {
      console.log("ddd");
      let user = this.$store.state.vuex_user;
      console.log(user);
      // event.preventDefault();
      event.stopPropagation(); // chromium内核
      if (!user || !user.sysType) {
        return this.$message.info("请先登录");
      }
      if (!goods.squantity) {
        return this.$message.info("库存不足");
      }
      this.cartAddCartInfoApi(goods.id);
    },
    // 新增购物车信息-接口
    cartAddCartInfoApi(id) {
      followGoodsinsertCart(id)
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
    changeCate(index, id) {
      this.activeIndex = index;
      this.$emit("changeCate", id);
    },
  },
};
</script>
<style lang="scss" scoped>
.content-products {
  // min-height: 774px;
  min-height: 300px;
  margin: 10px 0;

  &-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .products-cate-title {
      font-size: 36px;
      font-weight: bold;
      color: #020552;
    }

    .navbar {
      display: flex;
      height: 20px;
      list-style: none;
      font-size: 16px;
      color: #999999;

      .cate-item {
        padding: 0 5px;
        cursor: pointer;
        &:not(:first-child) {
          border-left: 1px solid #d9d9d9;
        }
      }

      .active {
        color: #ff480e;
      }
    }
  }

  .products-cards {
    width: 100%;
    // margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;

    .products-card {
      display: flex;
      flex-direction: column;
      width: 25%;
      min-width: 200px;
      height: max-content;
      padding: 20px 10px 20px;
      background-color: #fff;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;

      img {
        width: 200px;
        height: 200px;
        margin: 0 auto;
      }

      .card-bottom {
        margin-top: 10px;
        margin-left: 10px;
      }

      .name {
        height: 54px;
        font-size: 18px;
        color: #00023a;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //控制行数
        overflow: hidden;
      }

      .desc {
        font-size: 16px;
        color: #999999;
      }

      .price {
        font-size: 20px;
        color: #ff480e;
      }
    }
  }
}

.el-empty {
  width: 100%;
}
</style>
