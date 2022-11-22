<template>
  <div class="seach" ref="contentBox">
    <div class="seach1">
      <div class="seach-item">
        当前位置：
        <span @click="routeJump1()"> 首页 </span>
        ><span @click="routeJump2()">
          {{ types[$route.query.spType] }}
        </span>
        ><span @click="routeJump3()">相关订单</span> ><span>物流</span>
      </div>

      <div class="bodyOne">
        <div class="logistics-details">
          <div class="info">
            <div class="info-top">
              <p>
                物流单号:
                {{ superviseDrugManageGetOrderLogisticsReturn.logisticsNo }}
              </p>
              <p>
                快递员:
                {{ superviseDrugManageGetOrderLogisticsReturn.courier }}
              </p>
              <p>
                快递员电话:
                {{ superviseDrugManageGetOrderLogisticsReturn.courierPhone }}
              </p>
            </div>
            <div class="stage">
              <div
                class="stage-item"
                v-for="(item, index) in logisticsHistoryList"
                :key="index"
              >
                <div class="time">
                  {{ item.createTime }}
                </div>
                <div class="address">
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
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  superviseDrugManageGetOrderLogistics,
  superviseApparatusManageGetOrderLogistics,
} from "@/api/aksApi/platformApi/supervise.js";
export default {
  data() {
    return {
      types: {
        1: "药品搜索",
        2: "药械搜索",
        3: "企业搜索",
      },
      // 流转类型
      typeList: {
        1: "出发",
        2: "途径",
        3: "到达",
      },
      tableItemData: {},
      superviseDrugManageGetOrderLogisticsReturn: {}, // 查询订单物流-接口回参
      logisticsHistoryList: [], // 查询订单物流-接口回参子列表
      markers: [[80.250101, 41.241784]], //地图标点位置 [[],[],[]] 默认：新疆维吾尔自治区阿克苏地区温宿县温宿镇温宿县人民医院
      center: [80.250101, 41.241784], //地图中心位置 默认：新疆维吾尔自治区阿克苏地区温宿县温宿镇温宿县人民医院
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableItemData = JSON.parse(this.$route.query.tableItemData);
      if (this.$route.query.spType == 1) {
        this.superviseDrugManageGetOrderLogisticsApi(); // 药品查询订单物流-接口
      } else if (this.$route.query.spType == 2) {
        this.superviseApparatusManageGetOrderLogisticsApi(); // 药械查询订单物流-接口
      }
    });
  },
  methods: {
    // 药品查询订单物流-接口
    superviseDrugManageGetOrderLogisticsApi() {
      let valueData = {
        orderId: this.tableItemData.id,
        orderType: this.tableItemData.orderType,
      };
      superviseDrugManageGetOrderLogistics(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.superviseDrugManageGetOrderLogisticsReturn = res.data;
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
    // 药械查询订单物流-接口
    superviseApparatusManageGetOrderLogisticsApi() {
      let valueData = {
        orderId: this.tableItemData.id,
        orderType: this.tableItemData.orderType,
      };
      superviseApparatusManageGetOrderLogistics(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.superviseDrugManageGetOrderLogisticsReturn = res.data;
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
  background: #f4f4f4;
}

.seach1 {
  margin: 0 auto;
  width: 1200px;
  background: #ffffff;
  margin-bottom: 52px;
  .seach-item {
    height: 40px;
    line-height: 40px;
    background: #f4f4f4;
    width: 100%;
    font-size: 16px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #020552;
    span {
      cursor: pointer;

      &:nth-child(4) {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}

.bodyOne {
  position: relative;
  .logistics-details {
    display: flex;
    padding: 50px;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;

    .info {
      margin-right: 62px;
      overflow: auto;

      .info-top {
        color: #00023a;
        padding-bottom: 40px;
      }

      .stage {
        .stage-item:not(:last-child) {
          padding-bottom: 40px;
        }
      }
    }

    .map {
      position: relative;
      height: 600px;
      width: 780px;
    }
  }
}
</style>
