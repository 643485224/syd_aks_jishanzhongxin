<template>
  <div v-loading.fullscreen.lock="loading">
    <cu-dialog
      width="60vw"
      title="在线支付"
      :center="'center'"
      :showClose="true"
      :visible="onlinePaymentVisible"
      @handleClose="onlinePaymentHandleClose()"
      @handleOk="onlinePaymentHandleOk()"
    >
      <div class="onlinePayment">
        <div class="onlinePayment_one mt_40">
          <div class="flex">
            请在
            {{ day ? day + "天" : null }} {{ hr }}小时 {{ min }}分钟
            {{ sec }}秒内完成支付，否则订单自动取消
          </div>
          <div class="flex" style="color: #999999">
            支付金额：
            <span style="color: #ff480e">￥ {{ payAmount }} </span>&nbsp;元
          </div>
        </div>
        <el-radio-group v-model="payType" style="width: 100%">
          <div class="onlinePayment_two flex_ac pl_20 mt_20">
            <el-radio :label="1" :disabled="payBalance < payAmount">
              <span class="el_radio_1"> 账号余额支付 </span>
              <span class="el_radio_1"> 可用余额(元)：{{ payBalance }} </span>
              <span class="el_radio_1" v-if="payBalance < payAmount">
                余额不足
              </span>
            </el-radio>
          </div>
          <div class="onlinePayment_two flex_ac pl_20 mt_20">
            <el-radio :label="2" :disabled="payCredit < payAmount">
              <span class="el_radio_1"> 信用付款 </span>
              <span class="el_radio_1"> 可用额度(元)：{{ payCredit }} </span>
              <span class="el_radio_1" v-if="payCredit < payAmount">
                余额不足
              </span>
            </el-radio>
          </div>
        </el-radio-group>
      </div>

      <div slot="footer">
        <slot name="footer">
          <div class="dialog-footer">
            <el-button class="elButtonTwo" @click="onlinePaymentHandleClose"
              >取 消</el-button
            >
            <el-button
              class="elButtonOne btn_ff480e"
              type="primary"
              @click="onlinePaymentHandleOk"
              >确认支付</el-button
            >
          </div>
        </slot>
      </div>
    </cu-dialog>

    <cu-dialog
      width="40vw"
      title="输入密码"
      :center="'center'"
      :showClose="true"
      :visible="inputPasswordVisible"
      @handleClose="inputPasswordHandleClose()"
      @handleOk="inputPasswordHandleOk()"
    >
      <div class="inputPassword flex_fc_ac">
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">操作人:</div>
            <div class="el_input">{{ $store.state.vuex_user.username }}</div>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">手机号码:</div>
            <div class="el_input">{{ $store.state.vuex_user.phone }}</div>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">支付密码:</div>
            <el-input
              clearable
              class="el_input"
              v-model="payPwd"
              show-password
              placeholder="请输入支付密码"
            ></el-input>
            <!-- <el-input
              clearable
              class="el_input"
              v-model="payPwd"
              placeholder="请输入支付密码"
            >
            </el-input> -->
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">验证码:</div>
            <div class="el_input flex">
              <el-input clearable v-model="payCode" placeholder="请输入验证码">
              </el-input>
              <el-button
                :disabled="codeDisabled"
                type="primary"
                @click="payCaptchaApi()"
                >{{ codeTitle }}</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title">支付备注:</div>
            <el-input
              clearable
              class="el_input"
              v-model="payRemark"
              placeholder="请输入支付备注"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row class="el_row">
          <el-col :span="24" class="el_col">
            <div class="title"></div>
            <el-button class="elButtonTwo" @click="inputPasswordHandleClose"
              >取 消</el-button
            >
            <el-button
              class="elButtonOne"
              type="primary"
              @click="inputPasswordHandleOk"
              >确定</el-button
            >
          </el-col>
        </el-row>
        <div class="dialog-footer"></div>
      </div>
      <div slot="footer"></div>
    </cu-dialog>

    <cu-dialog
      width="40vw"
      title="支付收银台"
      :center="'center'"
      :showClose="true"
      :visible="paymentCashierVisible"
      @handleClose="paymentCashierHandleClose()"
    >
      <div class="paymentCashier flex_fc_ac">
        <div class="paymentCashier_one mt_20"></div>
        <div class="paymentCashier_two">支付操作成功</div>
        <div class="paymentCashier_three">
          支付金额：<span style="color: #ff480e">￥{{ payAmount }}</span>
          元
        </div>
        <el-button
          class="elButtonOne mt_20"
          type="primary"
          @click="paymentCashierHandleClose"
          >查看订单详情</el-button
        >
      </div>
      <div slot="footer"></div>
    </cu-dialog>

    <cu-dialog
      width="40vw"
      title="提示"
      :showClose="true"
      :visible="jumpVisible"
      @handleClose="jumpHandleClose()"
      @handleOk="jumpHandleOk()"
    >
      <div class="flex mt_20" style="font-size: 20px; color: black">
        {{ jumpTitle }}
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerTranManagerPayment,
  buyerTranManagerPayValidate,
  buyerTranManagerOnlinePayment,
  settlementPayment,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import { payCaptcha } from "@/api/aksApi/platformApi/loginApi";
export default {
  props: {
    onlinePaymentVisible: {
      type: Boolean,
      default: false,
    },
    tableItemData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    diyPayType: {
      type: String,
      default: "在线支付",
    },
  },
  data() {
    return {
      codeTitle: "获取验证码", //已发送验证码(60s)
      codeTime: 60, //验证码倒计时（60s）
      codeDisabled: false, //验证码不可再点击
      inputPasswordVisible: false, //输入密码弹框
      paymentCashierVisible: false, //支付收银台弹框
      password: "", //密码
      code: "", //验证码
      day: "",
      hr: "",
      min: "",
      sec: "",
      payType: null, //付款：1账号余额支付 2信用付款
      payBalance: 0, //余额
      payCredit: 0, //信用
      payOrderId: null, //支付使用id
      payPwd: "", //支付密码
      payCode: "", //支付验证码
      payRemark: "", //支付备注
      payTime: null, //支付结束时间
      paycurrentTime: null, //支付开始时间戳
      payAmount: 0, //支付金额
      loading: false,

      jumpVisible: false, //是否进行跳转弹框
      jumpValue: null, //1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址 3余额充值
      jumpTitle: "", //跳转弹框标题
    };
  },
  mounted() {
    if (this.diyPayType == "在线支付") {
      this.buyerTranManagerOnlinePaymentApi(this.tableItemData.id); // 在线支付-接口
    } else if (this.diyPayType == "支付结算中页面支付") {
      this.buyerTranManagerOnlinePaymentApi(this.tableItemData.orderId); // 支付结算中页面支付-接口
    }
  },
  methods: {
    // 在线支付-接口
    buyerTranManagerOnlinePaymentApi(id) {
      buyerTranManagerOnlinePayment(id)
        .then((res) => {
          if (res.code == 200) {
            this.onlinePaymentVisible = true;
            this.payBalance = res.data.amount; //余额
            this.payCredit = res.data.credit; //信用
            this.payAmount = res.data.payAmount; //支付金额
            // 账号余额支付
            if (this.payBalance >= this.payAmount) {
              this.payType = 1;
            } else if (this.payCredit >= this.payAmount) {
              this.payType = 2;
            } else {
              this.payType = null;
            }
            this.paycurrentTime = res.data.orderTime;
            this.payTime = res.data.paraValue;
            this.onlinePaymentButton(); // 在线支付按钮
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 获取支付验证码-接口
    payCaptchaApi() {
      this.loading = true;
      let params = {
        phone: this.$store.state.vuex_user.phone,
      };
      payCaptcha(params)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.codeTime = 60;
            let tims = setInterval(() => {
              console.log("2:", this.codeTime);

              if (this.codeTime == 0) {
                this.codeDisabled = false;
                clearInterval(tims);
                this.codeTitle = "获取验证码";
              } else {
                this.codeDisabled = true;
                this.codeTime--;
                this.codeTitle = "已发送验证码(" + this.codeTime + "s)";
              }
            }, 1000);
            this.payCode = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 支付验证-接口
    buyerTranManagerPayValidateApi() {
      if (!this.payCode) {
        this.$message.error("请先点击获取验证码");
        return;
      }
      if (!this.payPwd) {
        this.$message.error("请先输入密码");
        return;
      }
      let valueData = {
        captcha: this.payCode,
        payPwd: this.payPwd,
        phone: this.$store.state.vuex_user.phone,
        username: this.$store.state.vuex_user.username,
      };
      this.loading = true;

      buyerTranManagerPayValidate(valueData)
        .then((res) => {
          this.loading = false;

          if (res.code == 200) {
            if (this.diyPayType == "在线支付") {
              this.buyerTranManagerPaymentApi(); // 支付-接口
            } else if (this.diyPayType == "支付结算中页面支付") {
              this.settlementPaymentApi(); // 支付结算中心支付-接口
            }
            this.$message.success(res.message);
          } else {
            if (
              res.message == "您还未设置支付密码，请设置完支付密码再进行支付."
            ) {
              this.jumpTitle =
                "您还未设置支付密码，是否自动跳转到账号安全页面进行设置?";
              this.jumpValue = 1; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
              this.jumpVisible = true;
            } else {
              this.$message.error(res.message);
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 支付-接口
    buyerTranManagerPaymentApi() {
      this.loading = true;
      let orderIdList = [];
      orderIdList.push(this.tableItemData.id);
      let valueData = {
        amount: this.payAmount, //支付金额,
        orderIdList: orderIdList,
        fkType: this.tableItemData.fkType,
        payRemark: this.payRemark,
        payType: this.payType,
      };
      // transportFee: this.tableItemData.transportFee,

      buyerTranManagerPayment(valueData)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.paymentCashierVisible = true;
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 支付结算中心支付-接口
    settlementPaymentApi() {
      let valueData = new FormData();
      valueData.append("payAmount", this.payAmount); //	支付金额
      valueData.append("orderId", this.tableItemData.orderId); //	订单ID
      valueData.append("payType", this.payType); //	付款类型@ 1 余额  2  信用付
      valueData.append("captcha", this.payCode); //	验证码
      valueData.append("payPassword", this.payPwd); //	支付密码
      settlementPayment(valueData)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.paymentCashierVisible = true;
            // 在线支付弹框-取消按钮
            this.$emit("onlinePaymentHandleClose", false);
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    // 在线支付按钮
    onlinePaymentButton() {
      var date = new Date();
      // var date1 = new Date().getTime(); // 获取当前时间戳
      var date1 = new Date(this.paycurrentTime).getTime();
      // 当前时间戳+3600s（一小时，其他时间通过计算时间戳进行相应加减），重新设置 Date 对象
      let timess = this.payTime * 3600000;
      date.setTime(date1 + timess);
      this.countDownValue = date;
      this.countdown();
    },
    //倒计时
    countdown() {
      const end = Date.parse(this.countDownValue);
      const now = Date.parse(new Date());
      const msec = end - now;

      if (msec < 0) return;
      let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.day = day;
      this.hr = hr > 9 ? hr : "0" + hr;
      this.min = min > 9 ? min : "0" + min;
      this.sec = sec > 9 ? sec : "0" + sec;
      const that = this;
      if (day >= 0 && hr >= 0 && min >= 0 && sec >= 0) {
        //倒计时结束关闭订单
        if (day == 0 && hr == 0 && min == 0 && sec == 0) {
          return;
        }
        setTimeout(function () {
          that.countdown();
        }, 1000);
      }
    },
    // 在线支付货到付款按钮
    fkTypeChange(value) {
      this.buyerTranManagerAddOrderObject.fkType = value;
    },
    // 在线支付弹框-取消按钮
    onlinePaymentHandleClose() {
      this.$emit("onlinePaymentHandleClose", false);
    },
    // 在线支付弹框-确认支付按钮
    onlinePaymentHandleOk() {
      if (!this.payType) {
        this.$message.error("请先选择付款方式");
        return;
      }
      this.payPwd = ""; //支付密码
      this.payCode = ""; //支付验证码
      this.payRemark = ""; //支付备注
      this.inputPasswordVisible = true;
    },
    // 输入密码弹框-取消按钮
    inputPasswordHandleClose() {
      this.inputPasswordVisible = false;
    },
    // 输入密码弹框-确定按钮
    inputPasswordHandleOk() {
      this.buyerTranManagerPayValidateApi(); //支付验证-接口
    },
    // 查看订单详情按钮
    paymentCashierHandleClose() {
      this.paymentCashierVisible = false;
      this.inputPasswordVisible = false;
      this.$emit("onlinePaymentHandleClose", false);
    },

    //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址 3余额充值
    jumpButton() {
      let title = "";
      let pathName = "";
      let timesss = 3;
      if (this.jumpValue == 1) {
        title = "s后将为您自动跳转到账号安全页面，您可以设置支付密码";
        pathName = "/main/accountSecurity";
      } else if (this.jumpValue == 2) {
        title = "s后将为您自动跳转到收货地址管理页面，您可以设置收货地址";
        pathName = "/main/receivingAddressManagement";
      } else if (this.jumpValue == 3) {
        title = "s后将为您自动跳转到充值页面，您可以进行余额充值";
        pathName = "/main/paymentSettlementCenter";
      }
      let times = setInterval(() => {
        this.$message.info(`${timesss}${title}`);
        if (timesss == 0) {
          clearInterval(times);
          let routeData = this.$router.resolve({
            path: pathName,
            // query: { goodsId: "1111" },
          });
          window.open(routeData.href, "_blank");
          this.paymentCashierHandleClose();
        } else {
          timesss--;
        }
      }, 1000);
    },

    jumpHandleClose() {
      this.jumpVisible = false;
    },
    jumpHandleOk() {
      this.jumpVisible = false;
      this.jumpButton();
    },
  },
};
</script>
<style lang="scss" scoped>
// 在线支付弹框
.onlinePayment {
  .onlinePayment_one {
    width: 100%;
    font-size: 32px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }

  .onlinePayment_two {
    width: 100%;
    height: 80px;
    background: #eeeeee;

    .el_radio_1 {
      display: inline-block;
      width: 300px;
      padding-left: 20px;
    }
  }
}

// 输入密码弹框
.inputPassword {
  width: 100%;

  .el_row {
    margin-top: 20px;
    width: 400px;

    .el_col {
      display: flex;
      align-items: center;

      .title {
        width: 120px;
        text-align: right;
        margin-right: 20px;
      }

      .el_input {
        width: 300px;

        ::v-deep .el-input__inner {
          border-radius: 0px 0px 0px 0px;
        }
      }
    }
  }
}

// 支付收银台弹框
.paymentCashier {
  height: 262px;

  .paymentCashier_one {
    height: 80px;
    width: 80px;
    // background: rebeccapurple;
    background: url("./image/success.png");
  }

  .paymentCashier_two {
    font-size: 32px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00c514;
  }

  .paymentCashier_three {
    font-size: 32px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
}
</style>
