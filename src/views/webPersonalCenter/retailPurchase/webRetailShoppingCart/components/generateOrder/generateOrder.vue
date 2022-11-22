<template>
  <!--购物车-生成订单按钮-生成订单弹框 -->
  <div v-loading.fullscreen.lock="loading">
    <cu-dialog
      width="90vw"
      top="8vh"
      title="生成订单"
      :center="'center'"
      :showClose="true"
      :visible="generateOrderVisible"
      @handleClose="generateOrderHandleClose()"
      @handleOk="generateOrderHandleOk()"
    >
      <div class="generateOrder">
        <div class="generateOrder_one mt_20">收货人信息</div>
        <div class="generateOrder_two mt_20">
          <span class="mr_40"
            >收货人：{{ receivingAddressInformation.consignee }}</span
          >
          <span class="mr_40"
            >收货人联系电话：{{
              receivingAddressInformation.contactPhone
            }}</span
          >
          <span class="mr_40"
            >收货地址：{{ receivingAddressInformation.consigneeArea }}</span
          >
          <span class="mr_40"
            >详细地址：{{ receivingAddressInformation.consigneeAddress }}</span
          >
          <span class="mr_40"
            >邮政编码：{{ receivingAddressInformation.zipCode }}</span
          >
        </div>
        <div v-for="(item, index) in AllgenerateOrderData" :key="index">
          <div class="generateOrder_four mt_20">
            <div class="generateOrder_bodytext">
              <span class="mr_40"
                >订单{{ index + 1 }}：{{ item.supplierName }}</span
              >
              <span class="mr_40">种类(个)：{{ item.goodsCategoryCount }}</span>
              <span class="mr_40">数量(件)：{{ item.goodsCount }}</span>
              <span class="mr_40">小计金额(元)：{{ item.amount }}</span>
              <span class="mr_40">运费合计(元)：{{ item.transportFee }}</span>
            </div>
          </div>
          <div>
            <cu-table
              :showHeight="false"
              :showTitle="false"
              :showPagination="false"
              :tableHeader="generateOrderTableHeader"
              :tableData="item.cartGoodsList"
            >
              <template #goodsName="value">
                {{ value.value.goodsName }}
                {{ value.value.productName }}
              </template>
              <template #quantity="value">
                <el-input-number
                  class="table_el_input"
                  :controls="false"
                  v-model="value.value.quantity"
                  :min="1"
                  :precision="0"
                  @change="
                    quantityChange(
                      value.value.squantity,
                      value.value.quantity,
                      value.index
                    )
                  "
                ></el-input-number>
              </template>
            </cu-table>
          </div>
        </div>
        <div class="generateOrder_one mt_20">支付方式</div>
        <div class="mt_10">
          <el-button
            :class="
              buyerTranManagerAddOrderObject.fkType == 1 ? 'btn_ff480e' : null
            "
            style="height: 32px"
            type="default"
            @click="fkTypeChange(1)"
            >在线支付</el-button
          >
          <el-button
            style="height: 32px"
            :class="
              buyerTranManagerAddOrderObject.fkType == 2 ? 'btn_ff480e' : null
            "
            type="default"
            @click="fkTypeChange(2)"
            >货到付款</el-button
          >
        </div>
        <div class="generateOrder_five mt_20">
          <div class="generateOrder_five_left">总计：</div>
          <div class="generateOrder_five_right">
            <div>采购总金额：{{ orderTotalSum.amount }}元</div>
            <div class="mt_10">
              运费合计：
              {{ orderTotalSum.transportFee }}
              元
            </div>
            <div class="mt_10">
              应付总金额：
              <span style="color: #ff480e">{{ orderTotalSum.payAmount }}</span>
              元
            </div>
          </div>
        </div>
      </div>
    </cu-dialog>

    <cu-dialog
      width="60vw"
      :title="
        buyerTranManagerAddOrderObject.fkType == 1 ? '在线支付' : '货到付款'
      "
      :center="'center'"
      :showClose="true"
      :visible="onlinePaymentVisible"
      @handleClose="onlinePaymentHandleClose()"
      @handleOk="onlinePaymentHandleOk()"
    >
      <div class="onlinePayment">
        <div class="onlinePayment_one mt_40">
          <div class="flex">
            请在 {{ hr }}小时 {{ min }}分钟 {{ sec }}秒内完成支付,
            {{
              buyerTranManagerAddOrderObject.fkType == 1
                ? "否则订单自动取消"
                : "否则将影响信誉"
            }}
          </div>
          <div class="flex" style="color: #999999">
            支付金额：
            <span style="color: #ff480e">￥{{ orderTotalSum.payAmount }}</span
            >&nbsp;元
          </div>
        </div>
        <el-radio-group v-model="payType" style="width: 100%">
          <div class="onlinePayment_two flex_ac pl_20 mt_20">
            <el-radio
              :label="1"
              :disabled="payBalance < orderTotalSum.payAmount"
            >
              <span class="el_radio_1"> 账号余额支付 </span>
              <span class="el_radio_1"> 可用余额(元)：{{ payBalance }} </span>
              <span
                class="el_radio_1"
                v-if="payBalance < orderTotalSum.payAmount"
              >
                余额不足
              </span>
            </el-radio>
          </div>
          <div class="onlinePayment_two flex_ac pl_20 mt_20">
            <el-radio
              :label="2"
              :disabled="payCredit < orderTotalSum.payAmount"
            >
              <span class="el_radio_1"> 信用付款 </span>
              <span class="el_radio_1"> 可用额度(元)：{{ payCredit }} </span>
              <span
                class="el_radio_1"
                v-if="payCredit < orderTotalSum.payAmount"
              >
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
            <!-- <textarea
              clearable
              class="el_input"
              type="textarea"
              style="outline: none; border: 1px solid #dcdfe6"
              placeholder="请输入支付备注"
              v-model="payRemark"
            /> -->
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
          支付金额：<span style="color: #ff480e"
            >￥{{ orderTotalSum.payAmount }}</span
          >
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
  buyerAddressGetDefaultAddress,
  buyerTranManagerAddOrder,
  buyerTranManagerPayment,
  cartOneKeyBuy,
  buyerTranManagerPayValidate,
  buyerTranManagerOnlinePayAmount,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import { payCaptcha } from "@/api/aksApi/platformApi/loginApi";
export default {
  data() {
    return {
      codeTitle: "获取验证码", //已发送验证码(60s)
      codeTime: 60, //验证码倒计时（60s）
      codeDisabled: false, //验证码不可再点击
      loading: false, //加载中
      receivingAddressInformation: {}, //收货地址信息
      generateOrderTableHeader: [
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "商品名称",
          slot: "goodsName",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "批准文号",
          key: "approvalNumber",
        },
        {
          title: "供应商名称",
          key: "supplierName",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "采购价",
          key: "buyPrice",
        },
        {
          title: "数量",
          key: "quantity", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
        },
        {
          title: "小计",
          slot: "subtotal", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
        },
      ], //生成订单-表头
      generateOrderTableData: [], //生成订单-表内容
      AllgenerateOrderData: [], //生成订单接口回参数据
      generateOrderDataTitleNameList: [], //生成订单接口回参数据数据名列表 ['amount', 'goodsCount', 'payAmount', 'transportFeeS', 'supplier2', 'supplier1', 'supplierOrder1', 'supplierOrder2', 'goodsCategoryCount']
      countDownValue: new Date(), //倒计时时间
      onlinePaymentVisible: false, //在线支付弹框
      inputPasswordVisible: false, //输入密码弹框
      paymentCashierVisible: false, //支付收银台弹框
      password: "", //密码
      code: "", //验证码
      day: "",
      hr: "",
      min: "",
      sec: "",
      purchaseNo: "", //采购单号
      buyerTranManagerAddOrderObject: {
        consignee: null, // 收货人,
        consigneeArea: null, // 收货地址,
        consigneeAddress: null, // 详细地址,
        contactPhone: null, // 联系电话,
        fkType: 1, //支付方式 1在线支付 2货到付款
        bussType: 2, // 业务类型 1 采购单  2 购物车,
        bussId: null, // 业务id  采购单id/购物车id,
        // 供应商明细,
        supplierInfoList: [
          {
            goodsCategoryCount: null, //商品种类
            goodsCount: null, //商品数量
            supplierId: null, //供货商ID
            supplierName: null, //供货商姓名
            transportFee: null, //运费
            amount: null, //金额
            orderType: null, //判断订单类型
            //商品明细列表
            orderJcGoodsList: [
              {
                id: null, //  明细id
                orderId: null, //  订单id
                goodsId: null, //  货品id
                goodsName: null, //  货品名称
                price: null, //  单价
                unit: null, //  单位
                quantity: null, //  数量
              },
            ],
          },
        ],
      },
      payType: null, //付款：1账号余额支付 2信用付款
      payRemark: "", //支付备注
      payBalance: 0, //余额
      payCredit: 0, //信用
      payOrderId: null, //支付使用id
      payCode: "", //支付验证码
      payPwd: "", //支付密码
      payTime: null, //支付结束时间
      paycurrentTime: null, //支付开始时间戳
      orderTotalSum: {},

      jumpVisible: false, //是否进行跳转弹框
      jumpValue: null, //1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址 3余额充值
      jumpTitle: "", //跳转弹框标题
    };
  },
  props: {
    generateOrderVisible: {
      type: Boolean,
      default: false, //生成订单弹框
    },
    listItem: {
      type: Object,
      default: () => {
        return {
          //父级必须传入包含以下三个参数才能正常使用该组件
          id: null, // 业务id  采购单id/购物车id,
          goodsType: null, ////判断订单类型 药品/器械
          goodsIdList: [], // 商品id数组
        };
      },
    },
  },
  mounted() {
    this.buyerTranManagerAddOrderObject.bussId = this.listItem.id; //// 业务id  采购单id/购物车id,
    // this.buyerAddressGetDefaultAddressApi(); // 获取采购商默认地址-接口
    // this.cartOneKeyBuyApi(); // 生成订单-接口
  },
  methods: {
    // 获取采购商默认地址-接口
    buyerAddressGetDefaultAddressApi() {
      this.loading = true;
      buyerAddressGetDefaultAddress()
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            if (res.data) {
              this.receivingAddressInformation = res.data;
              this.buyerTranManagerAddOrderObject.consignee =
                this.receivingAddressInformation.consignee; //收货人
              this.buyerTranManagerAddOrderObject.consigneeAddress =
                this.receivingAddressInformation.consigneeAddress; //详细地址
              this.buyerTranManagerAddOrderObject.consigneeArea =
                this.receivingAddressInformation.consigneeArea; //收货地址
              this.buyerTranManagerAddOrderObject.contactPhone =
                this.receivingAddressInformation.contactPhone; //联系电话
            } else {
              this.jumpTitle =
                "收货地址尚未设置,是否自动跳转到收货地址管理页面进行设置?";
              this.jumpValue = 2; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
              this.jumpVisible = true;
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 一键采购-接口
    cartOneKeyBuyApi() {
      let valueData = {
        cartId: this.listItem.id,
        goodsType: this.listItem.goodsType,
        goodsIds: this.listItem.goodsIdList,
      };
      cartOneKeyBuy(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.generateOrderVisible = true;
            this.AllgenerateOrderData = res.data;
            this.purchaseOnekeyBuyerDataProcessing();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 一键采购数据处理
    purchaseOnekeyBuyerDataProcessing() {
      this.orderTotalSum =
        this.AllgenerateOrderData[
          this.AllgenerateOrderData.length - 1
        ].orderTotalSum;
      this.AllgenerateOrderData = this.AllgenerateOrderData.slice(0, -1);
      this.buyerTranManagerAddOrderObject.supplierInfoList = [];
      for (let i = 0; i < this.AllgenerateOrderData.length; i++) {
        this.AllgenerateOrderData[i].cartGoodsList.forEach((element) => {
          element.price = element.buyPrice;
        });
        let objRequest = {
          goodsCategoryCount: this.AllgenerateOrderData[i].goodsCategoryCount, //商品种类
          goodsCount: this.AllgenerateOrderData[i].goodsCount, //商品数量
          supplierId: this.AllgenerateOrderData[i].supplierId, //供货商ID
          supplierName: this.AllgenerateOrderData[i].supplierName, //供货商姓名
          transportFee: this.AllgenerateOrderData[i].transportFee, //运费
          amount: this.AllgenerateOrderData[i].amount, //金额
          orderType: this.AllgenerateOrderData[i].orderType, //判断订单类型
          //商品明细列表
          orderJcGoodsList: this.AllgenerateOrderData[i].cartGoodsList,
        };
        this.buyerTranManagerAddOrderObject.supplierInfoList.push(objRequest);
      }
    },
    // 新增集采订单-接口
    buyerTranManagerAddOrderApi() {
      if (
        this.buyerTranManagerAddOrderObject.consignee == null ||
        this.buyerTranManagerAddOrderObject.consigneeAddress == null ||
        this.buyerTranManagerAddOrderObject.consigneeArea == null ||
        this.buyerTranManagerAddOrderObject.contactPhone == null
      ) {
        this.jumpTitle =
          "收货地址尚未设置,是否自动跳转到收货地址管理页面进行设置?";
        this.jumpValue = 2; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
        this.jumpVisible = true;
        return;
      }
      this.loading = true;
      buyerTranManagerAddOrder(this.buyerTranManagerAddOrderObject)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.payType = null;
            this.payRemark = ""; //支付备注
            this.payBalance = 0; //余额
            this.payCredit = 0; //信用
            this.payOrderId = null; //支付使用id
            this.payCode = ""; //支付验证码
            this.payPwd = ""; //支付密码
            this.payOrderId = res.data;
            // 当支付方式为货到付款（fkType == 2）直接关闭弹框
            if (this.buyerTranManagerAddOrderObject.fkType == 2) {
              this.$emit("generateOrderHandleClose", false);
              this.$message.success(res.message);
              return;
            }
            this.buyerTranManagerOnlinePayAmountApi();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 在线支付-接口
    buyerTranManagerOnlinePayAmountApi() {
      let valueData = "?";
      this.payOrderId.forEach((element) => {
        valueData += "orderId=" + element + "&";
      });
      valueData = valueData.substring(0, valueData.length - 1);
      buyerTranManagerOnlinePayAmount(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.onlinePaymentVisible = true;
            this.payBalance = res.data.amount; //余额
            this.payCredit = res.data.credit; //信用
            // 账号余额支付
            if (this.payBalance >= res.data.payAmount) {
              this.payType = 1;
            } else if (this.payCredit >= res.data.payAmount) {
              this.payType = 2;
            } else {
              this.payType = null;
            }
            this.paycurrentTime = res.data.currentTime;
            this.payTime = res.data.paraValue;
            this.onlinePaymentButton(); // 在线支付按钮
          } else {
            if (res.message == "您的余额不足，请及时充值") {
              this.jumpTitle = "您的余额不足，是否自动跳转到充值页面进行充值?";
              this.jumpValue = 3; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
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
            this.buyerTranManagerPaymentApi(); // 支付-接口
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
      let valueData = {
        amount: this.orderTotalSum.payAmount,
        orderIdList: this.payOrderId,
        fkType: this.buyerTranManagerAddOrderObject.fkType,
        payRemark: this.payRemark,
        payType: this.payType,
        // transportFee: this.orderTotalSum.transportFee,
      };
      buyerTranManagerPayment(valueData)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.inputPasswordVisible = true;
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
    // 生成订单弹框-取消按钮
    generateOrderHandleClose() {
      this.$emit("generateOrderHandleClose", false);
    },
    // 生成订单弹框-确定按钮
    generateOrderHandleOk() {
      this.buyerTranManagerAddOrderApi(); // 新增集采订单-接口
    },
    // 在线支付按钮
    onlinePaymentButton() {
      var date = new Date();
      var date1 = new Date().getTime(); // 获取当前时间戳
      // var date1 = new Date(this.paycurrentTime).getTime();
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
      this.onlinePaymentVisible = false;
    },
    // 在线支付弹框-确认支付按钮
    onlinePaymentHandleOk() {
      if (!this.payType) {
        this.$message.error("请先选择付款方式");
        return;
      }
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
      this.$emit("generateOrderHandleClose", false);
      this.paymentCashierVisible = false;
      this.inputPasswordVisible = false;
      this.onlinePaymentVisible = false;
    },
    // 点击复制按钮
    clickCopy(msg) {
      const save = function (e) {
        e.clipboardData.setData("text/plain", msg);
        e.preventDefault(); // 阻止默认行为
      };
      const once = {
        once: true,
      };
      document.addEventListener("copy", save, once); // 添加一个copy事件,当触发时执行一次,执行完删除
      document.execCommand("copy"); // 执行copy方法
      this.$message({ message: "复制成功", type: "success" });
    },

    //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址 3余额充值
    jumpButton() {
      let title = "";
      let pathName = "";
      let timesss = 3;
      if (this.jumpValue == 1) {
        title = "s后将为您自动跳转到账号安全页面，您可以设置支付密码";
        pathName = "/webPersonalMain/accountSecurity";
      } else if (this.jumpValue == 2) {
        title = "s后将为您自动跳转到收货地址管理页面，您可以设置收货地址";
        pathName = "/webPersonalMain/receivingAddressManagement";
      } else if (this.jumpValue == 3) {
        title = "s后将为您自动跳转到充值页面，您可以进行余额充值";
        pathName = "/webPersonalMain/paymentSettlementCenter";
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
@import "./generateOrder.scss";
</style>
