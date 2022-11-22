<template>
  <div v-loading.fullscreen.lock="loading">
    <cu-dialog
      width="650px"
      title="在线支付"
      :center="'center'"
      :showClose="true"
      :visible="onlinePaymentVisible"
      @handleClose="onlinePaymentHandleClose()"
      @handleOk="onlinePaymentHandleOk()"
    >
      <div class="onlinePayment">
        <div class="onlinePayment_one mt_40">
          <div class="flex" style="color: #999999">
            支付金额：
            <span style="color: #ff480e">￥ {{ payAmount }} </span>&nbsp;元
          </div>
        </div>
        <el-radio-group v-model="payType" style="width: 100%">
          <div class="onlinePayment_two flex_ac pl_20 mt_20">
            <el-radio :label="1" :disabled="payBalance < payAmount">
              <span class="el_radio_1"> 账号余额支付 </span>
              <span class="el_radio_2"> 可用余额(元)：{{ payBalance }} </span>
              <span class="el_radio_2" v-if="payBalance < payAmount">
                余额不足
              </span>
            </el-radio>
          </div>
          <div class="onlinePayment_two flex_ac pl_20 mt_20">
            <el-radio :label="2" :disabled="payCredit < payAmount">
              <span class="el_radio_1"> 信用付款 </span>
              <span class="el_radio_2"> 可用额度(元)：{{ payCredit }} </span>
              <span class="el_radio_2" v-if="payCredit < payAmount">
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
              :disabled="payBalance < payAmount && payCredit < payAmount"
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
            <div class="el_input">{{ phone }}</div>
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
              <VerifyBtn :phone="phone"></VerifyBtn>
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
              type="textarea"
              rows="4"
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
  getAmount,
  propertyCostsPay,
  getSupplier,
} from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { payCaptcha } from "@/api/aksApi/platformApi/loginApi.js";
import VerifyBtn from "../verifyBtn/verifyBtn.vue";
export default {
  components: { VerifyBtn },
  props: {
    onlinePaymentVisible: {
      type: Boolean,
      default: false,
    },
    paylist: {
      type: Array,
      default: () => [],
    },
    diyPayType: {
      type: String,
      default: "在线支付",
    },
  },
  data() {
    return {
      inputPasswordVisible: false,
      paymentCashierVisible: false,
      password: "",
      code: "",
      payType: 1,
      payBalance: 0,
      payCredit: 0,
      payOrderId: null,
      payPwd: "",
      payCode: "",
      payRemark: "",
      payTime: null,
      paycurrentTime: null,
      payAmount: 0,
      phone: "",
      loading: false,
      jumpVisible: false,
      jumpValue: null,
      jumpTitle: "", //跳转弹框标题
      havePayPassword: false,
    };
  },
  created() {
    console.log(this.paylist);
  },
  mounted() {
    this.getAmount();
    this.getEnterpriseInfo();
    console.log(this.paylist);
    this.payAmount = this.paylist.reduce(
      (total, current) => total + current.amount,
      0
    );
    console.log(this.payAmount);
    this.phone = this.$store.state.vuex_user.phone;
  },
  watch: {
    immediate: true,
    paylist(val) {
      console.log(val);
    },
  },
  methods: {
    // 获取企业信息
    getEnterpriseInfo() {
      getSupplier()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.havePayPassword = res.data.payPassword ? true : false;
          } else {
            this.$message.warning("企业信息获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取可支付余额
    getAmount() {
      this.loading = true;
      let supplierId = this.$store.state.vuex_user.sysId;
      console.log(supplierId);
      getAmount({ supplierId })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.payBalance = res.data.amount; //余额
            this.payCredit = res.data.creditAmount; //信用
          } else {
            this.$message.error(res.message);
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // 获取支付验证码-接口
    payCaptchaApi() {
      this.loading = true;
      payCaptcha({ phone: this.$store.state.vuex_user.phone })
        .then((res) => {
          console.log(res);
          this.loading = false;
          if (res.code == 200) {
            // this.payCode = res.data;
            this.wait = 60;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 支付-接口
    paymentApi() {
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
        payPassword: this.payPwd,
        payAmount: this.payAmount,
        payRemark: this.payRemark,
        payType: this.payType,
        phone: this.phone,
        propertyFeePayDetailVoList: this.paylist,
      };
      console.log(valueData);
      this.loading = true;
      console.log(valueData);
      propertyCostsPay(valueData)
        .then((res) => {
          console.log(res);
          this.loading = false;
          if (res.code == 200) {
            this.$emit("afterSubmit", false);
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
      if (!this.havePayPassword) {
        this.jumpTitle =
          "您还未设置支付密码，是否自动跳转到账号安全页面进行设置?";
        this.jumpValue = 1; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
        this.jumpVisible = true;
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
      this.paymentApi(); //支付验证-接口
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
        pathName = "/main/supplierWorkbench/supplierAccountSecurity";
      }
      // else if (this.jumpValue == 2) {
      //   title = "s后将为您自动跳转到收货地址管理页面，您可以设置收货地址";
      //   pathName = "/webPersonalMain/receivingAddressManagement";
      // }
      // else if (this.jumpValue == 3) {
      //   title = "s后将为您自动跳转到充值页面，您可以进行余额充值";
      //   pathName = "/webPersonalMain/paymentSettlementCenter";
      // }
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
<style lang="scss" src="./payment.scss" scoped></style>
