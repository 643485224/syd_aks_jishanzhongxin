<template>
  <div>
    <div class="content_body">
      <div v-if="show == 1" class="content_body_item1">
        <div class="body_item1_one">{{ payName }}</div>
        <div class="body_item1_two">
          <div id="qrcode" ref="qrcode"></div>

          <!-- <img v-lazy src="../image/success.png" alt="" /> -->
        </div>
        <div class="body_item1_three">扫一扫支付水费</div>
        <div class="body_item1_four">
          <div class="body_item1_four1">
            <div class="body_item1_four1_title">月份</div>
            <div
              v-for="(
                item, index
              ) in distributionCenterPayGenerateSupplierFeeReturn"
              :key="index"
            >
              <div class="body_item1_four1_txt">{{ item.feeMonth }}</div>
            </div>
          </div>
          <div class="body_item1_four1">
            <div class="body_item1_four1_title">金额（元）</div>
            <div
              v-for="(
                item, index
              ) in distributionCenterPayGenerateSupplierFeeReturn"
              :key="index"
            >
              <div class="body_item1_four1_txt">{{ item.amount }}</div>
            </div>
          </div>
        </div>
        <div class="body_item1_five">
          合计:
          <span class="payNumber">{{
            distributionCenterPayGenerateSupplierFeeReturnTotalAmount
          }}</span>
          元
        </div>
      </div>
      <div v-if="show == 2" class="content_body_item2">
        <div class="body_item2_one">支付费用</div>
        <el-form
          class="body_item2_two"
          :label-position="'right'"
          :model="payForm"
          :rules="rulespayForm"
          ref="refpayForm"
          label-width="110px"
        >
          <el-form-item label="支付方式" prop="type">
            <el-radio-group v-model="payForm.type" style="width: 100%">
              <div class="body_item2_two1">
                <el-radio :label="1" :disabled="false">
                  <span class="el_radio_1">账号余额支付</span>
                  <span class="el_radio_2">可用余额(元)：{{ 50000 }} </span>
                  <span class="el_radio_3" v-if="false"> 余额不足 </span>
                </el-radio>
              </div>
              <div class="body_item2_two2 flex_ac">
                <el-radio :label="2" :disabled="true">
                  <span class="el_radio_1">信用付</span>
                  <span class="el_radio_2">可用额度(元)：{{ 0 }} </span>
                  <span class="el_radio_3" v-if="true"> 余额不足 </span>
                </el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="payForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div class="flex">
              <el-input
                v-model="payForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <el-button
                type="primary"
                class="size"
                @click="useVerify"
                :disabled="diflag"
                >{{ titels }}<span v-if="diflag">({{ times }})</span></el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="支付密码" prop="password">
            <el-input
              v-model="payForm.password"
              placeholder="请输入支付密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="default"
              class="body_item2_three1"
              @click="payHandleClose"
              >返回</el-button
            >
            <el-button
              type="primary"
              class="body_item2_three2"
              @click="payHandleOk"
              >支付</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div v-if="show == 3" class="content_body_item3">
        <img src="./components/image/success.png" alt="" />
        <div class="body_item3_one">支付成功</div>
        <div class="body_item3_two">支付金额 300.00元</div>
      </div>
    </div>
    <Verify
      @success="success"
      :mode="pop"
      :captchaType="blockPuzzle"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    ></Verify>
    <!-- 最底部组件 -->
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import Verify from "./components/verifition/Verify.vue";
import test from "../../../../cuview-ui/function/test";
import { distributionCenterPayGenerateSupplierFee } from "@/api/aksApi/platformApi/supplierPlatformApi";
import { payCaptcha, verify } from "@/api/aksApi/platformApi/loginApi";
import QRCode from "qrcodejs2";
export default {
  components: {
    Verify,
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!test.mobile(value)) {
        return callback(new Error("手机格式不正确"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!test.numberSix(value)) {
        return callback(new Error("请输入六位验证码"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入支付密码"));
      } else if (!test.numberSix(value)) {
        return callback(new Error("请输入六位支付密码"));
      } else {
        callback();
      }
    };
    return {
      payPropertyType: null,
      payName: "",
      show: 1,
      type: 1,
      // 扫描支付-接口传参
      payForm: {
        type: null, //支付方式
        phone: "", //手机号
        code: "", //验证码
        password: "", //支付密码
      },
      // 扫描支付-表单验证
      rulespayForm: {
        type: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            validator: validateCode,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      blockPuzzle: "blockPuzzle",
      pop: "pop",
      falgs: false,
      titels: "获取验证码",
      diflag: false,
      times: 60,

      distributionCenterPayGenerateSupplierFeeReturn: [], // 通过token生成供应商对应的信息-接口回参
      distributionCenterPayGenerateSupplierFeeReturnTotalAmount: "", //支付总金额
    };
  },
  mounted() {
    // DOM 更新了
    console.log("window.location.href:", window.location.host);
    // 页面路由接收参数 payPropertyType: 1水费   2电费   3物业费
    this.payPropertyType = this.$route.query.payPropertyType;
    if (this.$route.query.payPropertyType == 1) {
      this.payName = "水费";
    } else if (this.$route.query.payPropertyType == 2) {
      this.payName = "电费";
    } else if (this.$route.query.payPropertyType == 3) {
      this.payName = "物业费";
    }
    this.distributionCenterPayGenerateSupplierFeeApi(); // 通过token生成供应商对应的信息-接口
  },
  methods: {
    // 通过token生成供应商对应的信息-接口
    distributionCenterPayGenerateSupplierFeeApi() {
      let valueData = {
        feeType: this.payPropertyType,
        username: this.$store.state.vuex_token.supplier.username,
      };
      distributionCenterPayGenerateSupplierFee(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.distributionCenterPayGenerateSupplierFeeReturn = res.data.list;
            this.distributionCenterPayGenerateSupplierFeeReturnTotalAmount =
              res.data.totalAmount;
            this.qrcode();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(res.message);
        });
    },
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 220,
        height: 220,
        text: `http://${window.location.host}/#/payProperty?payPropertyType=${
          this.payPropertyType
        }&supplierId=${
          this.$store.state.vuex_token.supplier.id
        }&supplierName=${encodeURIComponent(
          this.$store.state.vuex_token.supplier.username
        )}`, // 需要二维码跳转的地址
        colorDark: "#000", //前景色
        colorLight: "rgba(0,0,0,0)", //背景色
      });
    },

    useVerify() {
      if (this.payForm.phone == "") {
        this.falgs = false;
        this.$message.error("请输入手机号后再获取验证码！");
      } else if (!test.mobile(this.payForm.phone)) {
        this.falgs = false;
        this.$message.error("手机格式不正确，无法获取验证码");
      } else {
        this.falgs = true;
        this.$refs.verify.show();
      }
    },
    success(params) {
      verify(params).then((res) => {
        if (res.repMsg == "成功") {
          this.times = 60;
          let tims = setInterval(() => {
            if (this.times == 0) {
              this.diflag = false;
              clearInterval(tims);
              this.titels = "获取验证码";
            } else {
              this.diflag = true;
              this.titels = "已发送验证码";
              this.times--;
            }
          }, 1000);
          let phone = "";
          phone = this.payForm.phone;

          let params = {
            phone: phone,
          };
          payCaptcha(params).then((res) => {
            if ((res.code = 200)) {
              this.payForm.code = "";
            }
          });
        }
      });
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
    },

    // 支付费用-返回按钮
    payHandleClose() {
      this.resetForm("refpayForm"); //表单重置
    },
    // 支付费用-支付按钮
    payHandleOk() {
      this.submitForm("refpayForm"); //表单验证
    },
    // 支付费用-接口
    mmApi() {
      console.log("payForm:", this.payForm);
      this.$message.success("接口开发中");
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 成功
          if (formName == "refpayForm") {
            this.mmApi();
          }
        } else {
          // 失败
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 扫描支付
      this.payForm.type = null; //支付方式
      this.payForm.phone = ""; //手机号
      this.payForm.code = ""; //验证码
      this.payForm.password = ""; //支付密码
      this.$router.go(-1); //返回上一页
    },
  },
};
</script>
<style lang="scss" scoped>
.content_body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 166px - 170px);
  background-color: #f4f4f4;
  color: #00023a;
}
// 水费、电费、物业费
.content_body_item1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 20px 0px;
  padding: 13px 0px 0px 0px;
  background: #ffffff;
  .body_item1_one {
    font-size: 40px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
  }
  .body_item1_two {
    margin-top: 5px;
    width: 220px;
    height: 220px;
    #qrcode {
      width: 220px;
      height: 220px;
    }
  }
  .body_item1_three {
    margin-top: 13px;
    font-size: 20px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
  }
  .body_item1_four {
    margin-top: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    .body_item1_four1 {
      width: 156px;
      text-align: center;
      .body_item1_four1_title {
        font-size: 20px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #00023a;
      }
      .body_item1_four1_txt {
        font-size: 14px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        color: #00023a;
        line-height: 40px;
      }
    }
  }
  .body_item1_five {
    margin-top: 33px;
    margin-bottom: 92px;
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #ff480e;
    .payNumber {
      font-size: 30px;
    }
  }
}

// 支付费用
.content_body_item2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 20px 0px;
  padding: 13px 0px 0px 0px;
  background: #ffffff;
  .body_item2_one {
    font-size: 40px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
  .body_item2_two {
    margin-top: 57px;
    ::v-deep .el-form-item__label {
      font-size: 18px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #00023a;
    }
    ::v-deep .el-radio {
      font-weight: 600;
      color: #00023a;
    }
    .body_item2_two1 {
      margin-top: 12px;
      height: 20px;
      // background: #eeeeee;

      .el_radio_1 {
        display: inline-block;
        width: 100px;
      }
      .el_radio_2 {
        display: inline-block;
        width: 140px;
        margin-left: 20px;
      }
      .el_radio_3 {
        display: inline-block;
        margin-left: 20px;
      }
    }
    .body_item2_two2 {
      margin-top: 20px;
      height: 20px;
      // background: #eeeeee;

      .el_radio_1 {
        display: inline-block;
        width: 100px;
      }
      .el_radio_2 {
        display: inline-block;
        width: 140px;
        margin-left: 20px;
      }
      .el_radio_3 {
        display: inline-block;
        margin-left: 20px;
      }
    }

    .body_item2_three1 {
      margin-top: 20px;
      margin-bottom: 60px;
      width: 160px;
      height: 48px;
    }
    .body_item2_three2 {
      margin-left: 37px;
      width: 160px;
      height: 48px;
      background: #ff480e !important;
      color: #ffffff !important;
      border-color: #ff480e !important;
    }
  }
}

// 支付完成
.content_body_item3 {
  width: 1200px;
  min-height: calc(100vh - 166px - 170px - 40px);
  margin: 20px 0px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .body_item3_one {
    margin-top: 10px;
    font-size: 36px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
  .body_item3_two {
    margin-top: 10px;
    font-size: 20px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
  }
}
</style>
