<template>
  <!-- 零购平台=>我的订单=>订单详情=>查看物流页面 -->
  <div class="seach" ref="contentBox">
    <div class="seach1">
      <div class="bodyOne">
        <div class="logistics-details">
          <div class="info">
            <div class="info-top">
              <div class="info1">
                物流单号: {{ sysBuyerOrderLogisticsListReturn.logisticsNo }}
              </div>
              <div class="info1">
                快递员:
                {{ sysBuyerOrderLogisticsListReturn.courier }}
                {{ sysBuyerOrderLogisticsListReturn.courierPhone }}
              </div>
            </div>
            <div class="stage">
              <div
                class="stage-item"
                v-for="(item, index) in logisticsHistoryList"
                :key="index"
              >
                <div class="text">{{ item.createTime }}</div>
                <div class="text">
                  [{{ typeList[item.type] }}]：{{ item.address }}
                </div>
              </div>
            </div>
          </div>
          <div class="map">
            <!-- :markers="markers" :center="center" -->
            <cu-gaudMap></cu-gaudMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sysBuyerOrderLogisticsList } from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["vuex_retailOrders"]),
  },
  data() {
    return {
      // 流转类型
      typeList: {
        1: "出发",
        2: "途径",
        3: "到达",
      },
      tableItemData: {},
      sysBuyerOrderLogisticsListReturn: {}, // 查询订单物流-接口回参
      logisticsHistoryList: [], // 查询订单物流-接口回参子列表
      markers: [[80.250101, 41.241784]], //地图标点位置 [[],[],[]] 默认：新疆维吾尔自治区阿克苏地区温宿县温宿镇温宿县人民医院
      center: [80.250101, 41.241784], //地图中心位置 默认：新疆维吾尔自治区阿克苏地区温宿县温宿镇温宿县人民医院
    };
  },
  mounted() {
    this.sysBuyerOrderLogisticsListApi(); // 订单业务-订单物流信息
  },
  methods: {
    // 订单业务-订单物流信息
    sysBuyerOrderLogisticsListApi() {
      let valueData = {
        id: this.vuex_retailOrders.id,
      };
      sysBuyerOrderLogisticsList(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.sysBuyerOrderLogisticsListReturn = res.data;
            this.logisticsHistoryList = res.data.logisticsHistoryList;
            this.markers = [];
            this.center = [null, null];
            this.center[0] = Number(this.logisticsHistoryList[0].lng);
            this.center[1] = Number(this.logisticsHistoryList[0].lat);
            console.log("center:", this.center);
            this.logisticsHistoryList.forEach((element) => {
              // [lng,lat],
              let array = [];
              array.push(Number(element.lng));
              array.push(Number(element.lat));
              this.markers.push(array);
              console.log("markers:", this.markers);
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 跳转回首页
    // spType：1药品首页 2药械首页 3企业首页
    routeJump1() {
      if (this.$route.query.spType == 1) {
        //药品
        this.$router.push({
          name: "webSuperviseDrugs",
        });
      } else if (this.$route.query.spType == 2) {
        //药械
        this.$router.push({
          name: "webSuperviseEnterprise",
        });
      } else if (this.$route.query.spType == 3) {
        //企业
        this.$router.push({
          name: "webSuperviseMedicalEquipment",
        });
      }
    },
    // 跳转回搜索页
    // spType：1药品搜索页 2药械搜索页 3企业搜索页
    routeJump2() {
      if (this.$route.query.spType == 1) {
        this.$router.push({
          name: "webSuperviseDrugs",
          query: {
            spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
            elSelectValue: this.$route.query.elSelectValue,
            elInputValue: this.$route.query.elInputValue,
          },
        });
      } else if (this.$route.query.spType == 2) {
        this.$router.push({
          name: "webSuperviseEnterprise",
          query: {
            spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
            elSelectValue: this.$route.query.elSelectValue,
            elInputValue: this.$route.query.elInputValue,
          },
        });
      } else if (this.$route.query.spType == 3) {
        //企业
        this.$router.push({
          name: "webSuperviseMedicalEquipment",
        });
      }
    },
    // 跳转去相关订单
    routeJump3() {
      this.$router.push({
        name: "webSuperviseProductInformation",
        query: {
          goodsId: this.$route.query.goodsId,
          spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
          elSelectValue: this.$route.query.elSelectValue,
          elInputValue: this.$route.query.elInputValue,
        },
      });
    },
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
      console.log(this.tableHeigh);
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    refuse(id) {
      console.log(id);
    },
    search() {},
  },
};
</script>
<style lang="scss" scoped>
.seach {
  width: 100%;
  height: calc(100vh - 66px);
  overflow: auto;
  background: #ffffff;
}

.bodyOne {
  position: relative;
  .logistics-details {
    display: flex;
    padding: 45px;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;

    .info {
      width: 456px;
      margin-right: 62px;
      overflow: auto;

      .info-top {
        .info1 {
          font-size: 20px;
          font-family: Source Han Sans CN-Medium, Source Han Sans CN;
          font-weight: bold;
          color: #020552;
        }
        .info1 + .info1 {
          margin-top: 10px;
        }
      }

      .stage {
        margin-top: 10px;
        .stage-item {
          .text {
            font-size: 16px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #020552;
          }
          padding-bottom: 40px;
        }
        .stage-item:not(:last-child) {
          padding-bottom: 40px;
        }
      }
    }

    .map {
      position: relative;
      width: 800px;
      height: 600px;
    }
  }
}
</style>
