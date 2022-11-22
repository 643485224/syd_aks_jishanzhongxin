<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
    <div class="enterprise-info">
      <div class="info ">
        <div class="info-title">企业信息</div>
        <div class="info-content">
          <div class="info-item">
            <div class="label">单位名称:</div>{{ info.unitName }}
          </div>
          <div class="info-item">
            <div class="label">状态:</div>{{ auditTypes[info.auditStatus] }}
          </div>
          <div class="info-item">
            <div class="label">登录账号:</div>{{ vuex_user.name }}
          </div>
          <div class="info-item">
            <div class="label">对公账户:</div>{{ info.corporateAccount }}
          </div>
          <div class="info-item">
            <div class="label">类型:</div>{{ supplierTypes[info.supplierType] }}
          </div>
          <div class="info-item">
            <div class="label">企业电话:</div>{{ info.businessPhone }}
          </div>
          <div class="info-item">
            <div class="label">营业执照:</div>
            <div class="img-item">
              <img v-lazy :src="info.businessLicenseUrl" alt="">
              <span>营业执照图片</span>
            </div>
            <div class="img-item">
              <img v-lazy :src="info.licenceUrl" alt="">
              <span>许可证图片</span>
            </div>
          </div>
          <div class="info-item">
            <div class="label">企业logo:</div>
            <img v-lazy class="info-logo" :src="info.logoUrl" alt="">
          </div>
          <div class="info-item">
            <div class="label">法人身份证:</div>
            <div class="img-item">
              <img v-lazy :src="info.legalIdFrontUrl" alt="">
              <span>身份证正面图片</span>
            </div>
            <div class="img-item">
              <img v-lazy :src="info.legalIdBackUrl" alt="">
              <span>身份证反面图片</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info ">
        <div class="info-title">企业联系人</div>
        <div class="info-content">
          <div class="info-item">
            <div class="label">姓名:</div> {{hiddenInfo(info.contactUser,'name')}}
          </div>
          <div class="info-item">
            <div class="label">手机:</div> {{hiddenInfo(info.phone,'phone')}}
          </div>
          <div class="info-item">
            <div class="label">职务:</div>{{ info.post }}
          </div>

        </div>
      </div>
      <div class="info">
        <div class="info-title">财务信息</div>
        <div class="info-content goods-desc">
          <div class="info-item">
            <div class="label">发票抬头:</div>{{ info.invoiceHeader }}
          </div>
          <div class="info-item">
            <div class="label">纳税人识别号:</div>{{ info.taxpayerIdNumber }}
          </div>
          <div class="info-item">
            <div class="label">开户名称:</div>{{ info.bankAccountName }}
          </div>
          <div class="info-item">
            <div class="label">银行账号:</div>{{ info.bankAccountNo }}
          </div>
        </div>
      </div>
      <div class="info ">
        <div class="info-title">财务信息:</div>
        <div class="info-content">
          <div class="info-item">
            <div class="label">仓库号:</div>{{ info.ckbh }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBuyer } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { mapState } from "vuex";
import { supplierTypes } from "@/utils/httpDataTypes.js";

export default {
  data() {
    return {
      supplierTypes,// 供应商类型
      auditTypes: {
        1: '待审核',
        2: '审核通过',
        3: '不通过',
      },
      info: {}
    }
  },
  created() {
    let purchaserId = this.$route.params.id;
    this.getEnterpriseInfo(purchaserId)
  },
  computed: {
    ...mapState(['vuex_user'])
  },
  methods: {
    getEnterpriseInfo(purchaserId) {
      getBuyer({id:purchaserId}).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.info = res.data;
          console.log(this.info);
        } else {
          this.$message.warning("企业信息获取失败")

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    back() {
      this.$router.go(-1)
    },
    hiddenInfo(val, type) {
      if (!val) { return '' }
      switch (type) {
        case 'phone':
          return val.slice(0, 3) + '********'
          break;
        case 'name':
          return val.slice(0, 1) + '**'
          break;
        default:
          return ''
          break;
      }

    }




  },
}
</script>
<style lang="scss" src="./supplierPurchaserInfo.scss" scoped>

</style>
