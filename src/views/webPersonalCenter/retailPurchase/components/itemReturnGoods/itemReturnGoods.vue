<template>
  <!-- 零购平台=>我的订单=>订单详情=>申请退货页面 -->
  <div class="contentBox" ref="contentBox">
    <div class="contentBox1">
      <el-form
        :label-position="'right'"
        :model="formData"
        :rules="rulesformData"
        ref="refformData"
        label-width="110px"
      >
        <el-form-item label="退货商品" prop="orderId">
          <div class="contentBox11">
            <div class="contentBox111">
              <img v-lazy :src="tableBody[0].mainPicture" alt="" />
            </div>
            <div class="contentBox112">
              <div class="contentBox1121">
                {{ tableBody[0].goodsName }}
              </div>
              <div class="contentBox1122">￥{{ tableBody[0].price }}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="货物状态" prop="goodsStatus">
          <el-radio-group v-model="formData.goodsStatus">
            <el-radio label="未收到货"></el-radio>
            <el-radio label="已收到货"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退货说明" prop="backReason">
          <el-input
            type="textarea"
            style="width: 336px"
            placeholder="请输入退货说明"
            v-model="formData.backReason"
            :autosize="{ minRows: 5, maxRows: 5 }"
          ></el-input>
        </el-form-item>

        <el-form-item label="上传照片" prop="annexUrl">
          <template>
            <cu-upload-image
              @uploadSuccess="upSuccess()"
              :files.sync="formData.annexUrl"
              @submit="submitFile(arguments, 'legalIdBackUrl')"
              width="163px"
              height="163px"
            ></cu-upload-image>
          </template>
        </el-form-item>
      </el-form>

      <div class="contentBox21">
        <el-button class="contentBox211" type="default" @click="handleClose()"
          >取消</el-button
        >
        <el-button class="contentBox212" type="primary" @click="handleOk()"
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  orderCenterSelectOrderDetail,
  sysBuyerReturnOrder,
} from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["vuex_retailOrders"]),
  },
  data() {
    return {
      tableBody: [
        {
          goodsName: "",
          mainPicture: "",
          mallName: null,
          price: 0,
          quantity: 0,
        },
      ],
      // 订单中心 => 订单详情-接口回参
      orderCenterSelectOrderDetailReturn: {},

      urlReturn: "", //上传图片后 接口返回的路径
      // 表单数据
      formData: {
        orderId: "",
        goodsStatus: "未收到货",
        backReason: "",
        annexUrl: [
          //   {
          //     name: "",
          //     url: "https://ydwsrz-20220710.eos-xinjiang-1.cmecloud.cn/upload/202211/marker.png",
          //   },
        ],
      },
      // 表单验证
      rulesformData: {
        orderId: [
          { required: true, message: "未查询到退货商品", trigger: "blur" },
        ],
        goodsStatus: [
          { required: true, message: "请选择货物状态", trigger: "change" },
        ],
        backReason: [
          { required: true, message: "请输入退货说明", trigger: "blur" },
        ],
        annexUrl: [
          { required: true, message: "请上传照片", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.resetForm("refformData");
    this.orderCenterSelectOrderDetailApi(); // 订单中心 => 订单详情-接口
  },
  methods: {
    // 订单中心 => 订单详情-接口
    orderCenterSelectOrderDetailApi() {
      let valueData = {
        orderId: this.vuex_retailOrders.id,
      };
      orderCenterSelectOrderDetail(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.formData.orderId = this.vuex_retailOrders.id;
            this.orderCenterSelectOrderDetailReturn = res.data;
            this.tableBody =
              this.orderCenterSelectOrderDetailReturn.orderLsDetailVoList;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 订单业务-零售订单申请退货-接口
    sysBuyerReturnOrderApi() {
      let valueData = {
        backReason: this.formData.backReason,
        orderId: this.formData.orderId,
        goodsStatus: this.formData.goodsStatus == "未收到货" ? 0 : 1,
        orderLsBackAnnexList: [
          {
            annexType: 1, //附件类型@1 图片  2  音频  3  视频
            annexUrl: this.formData.annexUrl[0].url,
          },
        ],
      };

      sysBuyerReturnOrder(valueData)
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
    submitFile(args, type) {
      let res = args[0];
      if (res.code == 200) {
        this.urlReturn = res.data;
        this.$message.success("上传图片成功！");
      } else {
        this.$message.success("上传图片失败，请重试！");
      }
    },

    // 上传成功钩子函数
    upSuccess(response, file, annexUrl) {
      this.formData.annexUrl.push(file);
      this.$refs.refformData.validateField("annexUrl"); //重置表单
    },

    // 取消按钮
    handleClose() {
      this.$router.go(-1);
    },
    // 确定按钮
    handleOk() {
      this.submitForm("refformData");
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 成功
          if (formName == "refformData") {
            console.log("this.formData:", this.formData);
            this.sysBuyerReturnOrderApi(); // 订单业务-零售订单申请退货-接口
          }
        } else {
          // 失败
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.orderId = "";
      this.formData.goodsStatus = "未收到货";
      this.formData.backReason = "";
      this.formData.annexUrl = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.contentBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;
}

.contentBox1 {
  margin-left: 40px;
  margin-top: 48px;
  .contentBox21 {
    display: flex;
    justify-content: flex-start;
    margin-left: 46px;
    .contentBox211 {
      width: 120px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .contentBox212 {
      margin-left: 45px;
      width: 120px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      background: #ff480e;
      border: 1px solid #ff480e;
    }
  }
}
.contentBox11 {
  margin-top: 12px;
  width: 780px;
  height: 143px;
  display: flex;
  .contentBox111 {
    width: 143px;
    height: 143px;
    img {
      width: 143px;
      height: 143px;
    }
  }
  .contentBox112 {
    margin-left: 20px;
    .contentBox1121 {
      line-height: 20px;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
    }
    .contentBox1122 {
      margin-top: 55px;
      line-height: 20px;
      font-size: 14px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #020552;
    }
  }
}
// 表单标签样式
::v-deep .el-form-item__label {
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
}
</style>
