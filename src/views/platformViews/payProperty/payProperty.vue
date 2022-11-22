<template>
  <div id="login-form">
    <div v-if="show == 1" class="content_body">
      <div class="content_body_item2">
        <div class="body_item2_one">
          支付{{ payName
          }}{{ distributionCenterPayGenerateSupplierFeeReturnTotalAmount }}元
        </div>
        <el-form
          class="body_item2_two"
          :label-position="'left'"
          :model="payForm"
          :rules="rulespayForm"
          ref="refpayForm"
        >
          <el-form-item label="支付方式" prop="type">
            <el-radio-group v-model="payForm.type" style="width: 100%">
              <div class="body_item2_two1">
                <el-radio
                  :label="1"
                  :disabled="
                    distributionCenterPayGenerateSupplierFeeReturnTotalAmount >
                    supplierProperyFeeGetAmountReturn.amount
                  "
                >
                  <span class="el_radio_1">账号余额支付</span>
                  <span class="el_radio_2"
                    >可用余额(元):{{ supplierProperyFeeGetAmountReturn.amount }}
                  </span>
                  <span
                    class="el_radio_3"
                    v-if="
                      distributionCenterPayGenerateSupplierFeeReturnTotalAmount >
                      supplierProperyFeeGetAmountReturn.amount
                    "
                  >
                    余额不足
                  </span>
                </el-radio>
              </div>
              <div class="body_item2_two2 flex_ac">
                <el-radio
                  :label="2"
                  :disabled="
                    distributionCenterPayGenerateSupplierFeeReturnTotalAmount >
                    supplierProperyFeeGetAmountReturn.creditAmount
                  "
                >
                  <span class="el_radio_1">信用付</span>
                  <span class="el_radio_2"
                    >可用额度(元):{{
                      supplierProperyFeeGetAmountReturn.creditAmount
                    }}
                  </span>
                  <span
                    class="el_radio_3"
                    v-if="
                      distributionCenterPayGenerateSupplierFeeReturnTotalAmount >
                      supplierProperyFeeGetAmountReturn.creditAmount
                    "
                  >
                    余额不足
                  </span>
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
            <br />
            <div class="flex">
              <el-input
                v-model="payForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <el-button type="primary" @click="useVerify" :disabled="diflag"
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
          <el-form-item label="支付说明" prop="payRemark">
            <el-input
              v-model="payForm.payRemark"
              placeholder="请输入支付说明"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <!-- <el-button
              type="default"
              class="body_item2_three1"
              @click="payHandleClose"
              >返回</el-button
            > -->
            <el-button
              type="primary"
              class="body_item2_three2"
              @click="payHandleOk"
              >支付</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div v-if="show == 2" class="content_body_item3 flex_fc_ac_jc">
      <img src="./components/image/success.png" alt="" />
      <div class="body_item3_one">支付成功</div>
      <div class="body_item3_two">
        支付金额
        {{ distributionCenterPayGenerateSupplierFeeReturnTotalAmount }}元
      </div>
    </div>
    <Verify
      @success="success"
      :mode="pop"
      :captchaType="blockPuzzle"
      :imgSize="{ width: '330px', height: '155px' }"
      ref="verify"
    ></Verify>
  </div>
</template>
<script>
// 自适应
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var docEl = document.documentElement;
    var rem = docEl.clientWidth / 10;
    if (document.getElementById("login-form")) {
      if (
        rem > docEl.style.fontSize.split("px")[0] &&
        document.body.clientHeight -
          document.getElementById("login-form").offsetHeight <
          150
      ) {
        return;
      }
    }
    docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
  }

  setRemUnit();
  window.setRemUnit = setRemUnit;

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
import {
  supplierProperyFeeScanningCodePay,
  distributionCenterPayGenerateSupplierFee,
  getAmount,
} from "@/api/aksApi/platformApi/supplierPlatformApi";
import Verify from "./components/verifition/Verify.vue";
import test from "@/cuview-ui/function/test";
import { payCaptcha, verify } from "@/api/aksApi/platformApi/loginApi";
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
      show: 1,
      type: 1,
      // 支付费用-接口传参
      payForm: {
        type: null, //支付方式
        phone: "", //手机号
        code: "", //验证码
        password: "", //支付密码
        payRemark: "", //支付说明
      },
      // 支付费用-表单验证
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
        payRemark: [{ required: false, message: "", trigger: "blur" }],
      },
      blockPuzzle: "blockPuzzle",
      pop: "pop",
      falgs: false,
      titels: "获取验证码",
      diflag: false,
      times: 60,
      payPropertyType: null,
      payName: "",
      token: "",
      distributionCenterPayGenerateSupplierFeeReturn: [], // 通过token生成供应商对应的信息-接口回参
      distributionCenterPayGenerateSupplierFeeReturnTotalAmount: "", //支付总金额
      // 查询账户余额-接口回参
      supplierProperyFeeGetAmountReturn: {
        amount: 0,
        creditAmount: 0,
      },
      supplierId: "", //供应商id
      supplierName: "", //供应商名字
    };
  },
  mounted() {
    // 页面路由接收参数 payPropertyType: 1水费   2电费   3物业费
    this.payPropertyType = window.location.href.slice(
      window.location.href.indexOf("payPropertyType=") + 16,
      window.location.href.indexOf("&supplierId=")
    );
    this.supplierId = window.location.href.slice(
      window.location.href.indexOf("supplierId=") + 11,
      window.location.href.indexOf("&supplierName=")
    );
    this.supplierName = decodeURIComponent(
      window.location.href.slice(
        window.location.href.indexOf("supplierName=") + 13
      )
    );
    console.log("this.supplierId:", this.supplierId);
    console.log("this.supplierName:", this.supplierName);
    if (this.payPropertyType == 1) {
      this.payName = "水费";
    } else if (this.payPropertyType == 2) {
      this.payName = "电费";
    } else if (this.payPropertyType == 3) {
      this.payName = "物业费";
    }
    this.setRemUnit(); //自适应
    this.distributionCenterPayGenerateSupplierFeeApi(); // 通过token生成供应商对应的信息-接口
    this.getAmountApi(); // 查询账户余额-接口
  },
  methods: {
    //自适应
    setRemUnit() {
      var docEl = document.documentElement;
      var rem = docEl.clientWidth / 10;
      let fontSize = docEl.style.fontSize.split("px")[0];
      let abs =
        document.body.clientHeight -
        document.getElementById("login-form").offsetHeight;
      if (document.getElementById("login-form")) {
        if (rem > (fontSize ? fontSize : 0) && abs < 100) {
          docEl.style.fontSize = (abs < 0 ? 180 : rem) - Math.abs(abs) + "px";
          return;
        }
      }
      docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
    },
    // 通过token生成供应商对应的信息-接口
    distributionCenterPayGenerateSupplierFeeApi() {
      let valueData = {
        feeType: this.payPropertyType,
        username: this.supplierName,
      };
      distributionCenterPayGenerateSupplierFee(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.distributionCenterPayGenerateSupplierFeeReturn = res.data.list;
            this.distributionCenterPayGenerateSupplierFeeReturnTotalAmount =
              res.data.totalAmount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 供应商-物业费用=>支付-接口
    supplierProperyFeeScanningCodePayApi() {
      let propertyFeePayDetailVoList = [];

      this.distributionCenterPayGenerateSupplierFeeReturn.forEach((element) => {
        let propertyFeePayDetailVoListItem = {
          amount: element.amount, //金额
          feeId: element.id, //费用id
        };
        propertyFeePayDetailVoList.push(propertyFeePayDetailVoListItem);
      });
      let valueData = {
        captcha: this.payForm.code, //验证码
        payAmount:
          this.distributionCenterPayGenerateSupplierFeeReturnTotalAmount, //支付金额
        payPassword: this.payForm.password, //支付密码
        payRemark: "", //支付说明
        payType: this.payForm.type, //支付方式 1 账户余额 2 信用贷
        phone: this.payForm.phone, //手机号
        // 支付明细
        propertyFeePayDetailVoList: propertyFeePayDetailVoList,
        supplierId: this.supplierId, //供应商id
        supplierName: this.supplierName, //供应商名字
      };
      supplierProperyFeeScanningCodePay(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.show = 2;
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询账户余额-接口
    getAmountApi() {
      let valueData = {
        supplierId: this.supplierId,
      };
      getAmount(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.supplierProperyFeeGetAmountReturn = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
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
            this.supplierProperyFeeScanningCodePayApi();
          }
        } else {
          // 失败
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 支付费用
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
$baseRem: 75;
/*@function double($n) {
  　　　　@return $n / $baseRem;　　}*/
// 1920*1080 状态下 rpxToRem(1) == 2.3266px
@function rpxToRem($args) {
  @return calc($args/$baseRem) * 1rem;
}

.content_body {
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  color: #00023a;
  overflow: auto;
}

// 支付费用
.content_body_item2 {
  .body_item2_one {
    margin-top: rpxToRem(40);
    font-size: rpxToRem(32);
    text-align: center;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: 600;
    color: #00023a;
  }
  .body_item2_two {
    padding: 0 rpxToRem(40);
    margin-top: rpxToRem(20);
    ::v-deep .el-form-item__label {
      width: rpxToRem(200);
      font-size: rpxToRem(24);
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 600;
      color: #00023a;
    }
    ::v-deep .el-radio {
      font-weight: 600;
      color: #00023a;
    }
    ::v-deep.el-radio__label {
      font-size: rpxToRem(24);
    }
    .body_item2_two1 {
      padding: 0 rpxToRem(40);
      margin-top: 12px;
      // background: #eeeeee;

      .el_radio_1 {
        display: inline-block;
        width: rpxToRem(160);
      }
      .el_radio_2 {
        display: inline-block;
        width: rpxToRem(280);
      }
      .el_radio_3 {
        display: inline-block;
      }
    }
    .body_item2_two2 {
      padding: 0 rpxToRem(40);
      margin-top: 20px;
      // background: #eeeeee;

      .el_radio_1 {
        display: inline-block;
        width: rpxToRem(160);
      }
      .el_radio_2 {
        display: inline-block;
        width: rpxToRem(280);
      }
      .el_radio_3 {
        display: inline-block;
      }
    }

    .body_item2_three1 {
      margin-top: 20px;
      margin-bottom: 60px;
      width: 160px;
      height: 48px;
    }
    .body_item2_three2 {
      margin-top: rpxToRem(40);
      width: 100%;
      background: #ff480e !important;
      color: #ffffff !important;
      border-color: #ff480e !important;
    }
  }
}

.content_body_item3 {
  height: 100vh;
  color: #00023a;
}
</style>
