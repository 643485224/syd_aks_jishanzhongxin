<template>
  <div>
    <div class="content-products">
      <div class="content-products-nav">
        <div class="products-cate-title">{{ title }}</div>
        <div class="navbar">
          <div
            v-for="(item, index) in cates"
            :key="index"
            :class="'cate-item ' + (index == activeIndex ? 'active' : '')"
            @click="changeCate(index, item.id)"
          >
            <span>{{ item.name }}</span>
          </div>
          <!-- <div :class="'cate-item '">
            <span>其它</span>
          </div> -->
        </div>
      </div>
      <div class="products-cards">
        <template v-if="list.length">
          <div
            class="products-card"
            v-for="(item, index) in list"
            :key="index"
            @click="toDetail(item.id,item.supplierId)"
          >
            <img v-lazy :src="item.mallPicture || item.indexPicture" alt="" />
            <div class="card-bottom">
              <div class="name">{{ item.mallName }}</div>
              <!-- <div class="desc">50mgx12粒x3板/盒</div> -->
              <div class="price">￥{{ item.buyPrice || item.price || 0 }}</div>
            </div>
          </div>
        </template>
        <el-empty description="暂无商品" :image-size="200" v-else></el-empty>
      </div>
    </div>
  </div>
</template>
<script>
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
    toDetail(id,supplierId) {
      switch (this.type) {
        case "foods":
          return this.$router.push({
            path: "/webTradingMall/webFoodDetail",
            query: { type: this.type, id,supplierId },
          });
        default:
          return this.$router.push({
            path: "/webTradingMall/webGoodsDetail",
            query: { type: this.type, id,supplierId },
          });
      }
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
  width: 1200px;
  // min-height: 774px;
  min-height: 300px;
  margin: 30px 0;

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
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #eee;

    .products-card {
      display: flex;
      flex-direction: column;

      width: 25%;
      padding: 40px 10px 20px;
      background-color: #fff;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;

      img {
        width: 258px;
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
