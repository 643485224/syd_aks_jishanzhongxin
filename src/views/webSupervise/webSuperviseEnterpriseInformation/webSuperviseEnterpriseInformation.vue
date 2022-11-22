<template>
  <div class="seach">
    <div class="seach1">
      <div class="seach-item">
        当前位置：
        <span @click="routeJump1()"> 首页 </span>
        ><span @click="routeJump2()">
          {{ types[$route.query.spType] }}
        </span>
        ><span>企业信息</span>
      </div>
      <div class="seach-count">
        <div class="seach-title">
          <h3>企业信息</h3>
          <div class="title">
            <div class="left">
              <span>单位名称: </span><span>{{ tabDate.unitName }}</span>
            </div>
            <div class="right">
              <span>登录账号: </span><span>{{ tabDate.username }}</span>
            </div>
          </div>
          <div class="title">
            <div class="left">
              <span>供应商类型:</span>
              <span>{{ supplierTypes[tabDate.supplierType] }}</span>
            </div>
            <div class="right">
              <span>企业电话:</span><span>{{ tabDate.businessPhone }}</span>
            </div>
          </div>
          <div class="title">
            <div class="left">
              <span>营业执照:</span>
              <div class="img">
                <div class="imgs">
                  <img :src="tabDate.businessLicenseUrl" alt="" />
                  <p>营业执照图片</p>
                </div>
                <div class="imgs">
                  <img :src="tabDate.licenceUrl" alt="" />
                  <p>许可证图片</p>
                </div>
              </div>
            </div>
            <div class="right">
              <span>企业logo:</span>
              <div class="img">
                <div class="imgs">
                  <img :src="tabDate.logoUrl" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="title">
            <div class="left">
              <span>法人身份证:</span>
              <div class="img">
                <div class="imgs">
                  <img :src="tabDate.legalIdFrontUrl" alt="" />
                  <p>身份证正面图片</p>
                </div>
                <div class="imgs">
                  <img :src="tabDate.legalIdBackUrl" alt="" />
                  <p>身份证反面图片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seach-title">
          <h3>企业联系人</h3>
          <div class="title">
            <div class="left">
              <span>姓名:</span
              ><span>{{ hiddenInfo(tabDate.contactUser, "name") }} </span>
            </div>
            <div class="right">
              <span>电话号码:</span
              ><span>{{ hiddenInfo(tabDate.phone, "phone") }}</span>
            </div>
          </div>
          <div class="title">
            <div class="left">
              <span>职务:</span><span>{{ tabDate.post }}</span>
            </div>
          </div>
        </div>
        <div class="seach-title">
          <h3>财务信息</h3>
          <div class="title">
            <div class="left">
              <span>发票抬头:</span> <span>{{ tabDate.invoiceHeader }}</span>
            </div>
            <div class="right">
              <span>纳税人识别号:</span
              ><span>{{ tabDate.taxpayerIdNumber }}</span>
            </div>
          </div>
          <div class="title">
            <div class="left">
              <span>开户名称:</span><span>{{ tabDate.bankAccountName }}</span>
            </div>
            <div class="right">
              <span>银行账号:</span><span>{{ tabDate.bankAccountNo }}</span>
            </div>
          </div>
          <div class="title">
            <div class="left">
              <span>对公账号:</span><span>{{ tabDate.corporateAccount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  superviseDrugManageSelectCompanyInfo,
  superviseApparatusManageSelectCompanyInfo,
  superviseEnterpriseGetEnterpriseInfo,
} from "@/api/aksApi/platformApi/supervise.js";
import { supplierTypes } from "@/utils/httpDataTypes.js";
export default {
  data() {
    return {
      types: {
        1: "药品搜索",
        2: "药械搜索",
        3: "企业监管",
      },
      supplierTypes,
      supplierId: this.$route.query.supplierId,
      tabDate: [],
    };
  },
  mounted() {
    if (this.$route.query.spType == 1) {
      this.superviseDrugManageSelectCompanyInfoApi(); //药品-获取企业信息-接口
    } else if (this.$route.query.spType == 2) {
      this.superviseApparatusManageSelectCompanyInfoApi(); //药械-获取企业信息-接口
    } else if (this.$route.query.spType == 3) {
      this.superviseEnterpriseGetEnterpriseInfoApi(); //企业-获取企业信息-接口
    }
  },
  methods: {
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
          query: {
            supplierType: this.$route.query.supplierType,
            supplierName: this.$route.query.supplierName,
          },
        });
      }
    },
    //药品-获取企业信息-接口
    async superviseDrugManageSelectCompanyInfoApi() {
      let params = {
        supplierId: this.supplierId,
      };
      superviseDrugManageSelectCompanyInfo(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tabDate = res.data;
          console.log(this.tabDate);
        }
      });
    },
    //药械-获取企业信息-接口
    async superviseApparatusManageSelectCompanyInfoApi() {
      let params = {
        supplierId: this.supplierId,
      };
      superviseApparatusManageSelectCompanyInfo(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tabDate = res.data;
          console.log(this.tabDate);
        }
      });
    },
    //企业-获取企业信息-接口
    async superviseEnterpriseGetEnterpriseInfoApi() {
      let params = {
        id: this.supplierId,
      };
      superviseEnterpriseGetEnterpriseInfo(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tabDate = res.data;
          console.log(this.tabDate);
        }
      });
    },

    hiddenInfo(val, type) {
      if (!val) {
        return "";
      }
      switch (type) {
        case "phone":
          return val.slice(0, 3) + "********";
          break;
        case "name":
          return val.slice(0, 1) + "**";
          break;
        default:
          return "";
          break;
      }
    },
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

      &:nth-child(3) {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .seach-count {
    width: 100%;
    padding: 28px 45px;

    .seach-title {
      width: 100%;
      margin-bottom: 5px;
      h3 {
        font-size: 20px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #020552;
        margin-bottom: 15px;
        padding-left: 40px;
      }
      .title {
        display: flex;
        width: 100%;
        padding: 0 40px;
        margin-bottom: 15px;
        .right,
        .left {
          width: 50%;
          display: flex;
          text-align: right;
          span {
            font-size: 16px;
            line-height: 24px;
            color: #515a6e;
            &:nth-child(2) {
              color: #020552;
            }
            &:nth-child(1) {
              width: 120px;
              margin-right: 10px;
            }
          }
          .img {
            display: flex;
            padding-top: 15px;
            img {
              width: 130px;
              height: 130px;
              &:nth-child(1) {
                margin: 0 15px;
              }
            }
            p {
              width: 100%;
              text-align: center;
              color: #020552;
              font-size: 16px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
