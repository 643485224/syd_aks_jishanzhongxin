<template>
  <div>
    <div
      v-if="!erWeiMaShow"
      class="content"
      v-loading="loading"
      element-loading-text="拼命加载中,请稍后..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <div class="content_body">
        <div class="content1">
          <div class="content11">收货人信息</div>
          <!-- <div class="content12" @click="toPath()">+ 新增收货地址</div> -->
        </div>
        <div class="content2">
          <div class="content21">
            {{ shipToAddress.consignee }}
            <div class="content2Img"></div>
          </div>
          <div class="content22 ml_20">
            {{ shipToAddress.areacode || shipToAddress.consigneeArea }}
          </div>
          <div class="content22 ml_20">
            {{ shipToAddress.address || shipToAddress.consigneeAddress }}
          </div>
          <div class="content22 ml_20">
            {{ shipToAddress.phone || shipToAddress.contactPhone }}
          </div>
          <div class="content23 ml_20">默认地址</div>
          <div class="content24 ml_20" @click="switchAddressButton()">
            更多地址
          </div>
        </div>
        <div class="content3"></div>
        <div class="content4">商品信息</div>
        <div class="content5">
          <div class="content51">商品</div>
          <div class="content52">单价</div>
          <div class="content53">数量</div>
          <div class="content54">小计</div>
        </div>

        <div class="content6" v-if="centerMallShopNowReturn.centerShopNowVo">
          <div class="content61">
            <div class="content611">
              <img
                :src="centerMallShopNowReturn.centerShopNowVo.mallPicture"
                alt=""
              />
            </div>
            <div class="content612">
              {{ centerMallShopNowReturn.centerShopNowVo.goodsName }}
            </div>
          </div>
          <div class="content62">
            ￥{{ centerMallShopNowReturn.centerShopNowVo.buyPrice }}
          </div>
          <div class="content63">
            <el-input-number
              class="table_el_input"
              :value="orderParams.count"
              :controls="true"
              :min="1"
              :max="+centerMallShopNowReturn.centerShopNowVo.squantity"
              :precision="0"
              @change="
                quantityChange(
                  arguments[0],
                  centerMallShopNowReturn.centerShopNowVo,
                  centerMallShopNowReturn.centerShopNowVo.squantity
                )
              "
            >
            </el-input-number>
          </div>
          <div class="content64">￥ {{ orderTotalSum.amount || 0 }}</div>
        </div>
        <div
          v-if="$store.state.vuex_user.sysType == 2"
          class="generateOrder_one mt_20"
        >
          支付方式
        </div>
        <div v-if="$store.state.vuex_user.sysType == 2" class="mt_10">
          <el-button
            :class="
              buyerTranManagerAddOrderOut.fkType == 1 ? 'btn_ff480e' : null
            "
            style="height: 32px"
            type="default"
            @click="fkTypeChange(1)"
            >在线支付</el-button
          >
          <el-button
            style="height: 32px"
            :class="
              buyerTranManagerAddOrderOut.fkType == 2 ? 'btn_ff480e' : null
            "
            type="default"
            @click="fkTypeChange(2)"
            >货到付款</el-button
          >
        </div>
        <div class="content7">
          <div class="content71">
            <div>商品金额:</div>
            <div>运费:</div>
          </div>
          <div class="content72">
            <div>￥{{ orderTotalSum.amount }}</div>
            <div>￥{{ orderTotalSum.transportFee }}</div>
          </div>
        </div>
        <div class="content8">
          <div class="content81">
            <div class="content811">应付金额:</div>
            <div class="content812">￥{{ orderTotalSum.payAmount }}</div>
            <div class="content813">元</div>
          </div>
          <div class="content82">
            <div class="content821">
              配送至:{{
                shipToAddress.areacode || shipToAddress.consigneeArea
              }},{{ shipToAddress.address || shipToAddress.consigneeAddress }}
            </div>
            <div class="content822 ml_20">
              收货人:{{ shipToAddress.consignee }}
              {{ shipToAddress.contactPhone || shipToAddress.phone }}
            </div>
          </div>
        </div>
        <div class="content9">
          <el-button
            class="content91"
            type="primary"
            @click="generateOrderHandleOk()"
            >提交订单</el-button
          >
        </div>
      </div>
    </div>
    <!-- 零购用户下单成功后出来二维码页面 -->
    <div v-if="erWeiMaShow" class="erWeiMa">
      <div class="erWeiMa1">
        <div
          class="erWeiMa11"
          :class="erWeiMaType == 1 ? 'active' : null"
          @click="erWeiMaTypeButton(1)"
        >
          支付宝
        </div>
        <div
          class="erWeiMa12"
          :class="erWeiMaType == 2 ? 'active' : null"
          @click="erWeiMaTypeButton(2)"
        >
          微信
        </div>
      </div>
      <div class="erWeiMa2">
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <div class="erWeiMa3">
        {{ erWeiMaType == 1 ? "请使用支付宝扫码支付" : "请使用微信扫码支付" }}
      </div>
      <div class="erWeiMa4">
        <div class="erWeiMa41" @click="payMenuCancel()">放弃支付</div>
        <div class="erWeiMa42" @click="payMenuOk()">支付成功</div>
      </div>
    </div>
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
            请在 {{ hr }}小时 {{ min }}分钟
            {{ sec }}秒内完成支付，否则订单自动取消
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

    <cu-dialog
      width="1200px"
      top="8vh"
      title="收货地址管理"
      :center="'center'"
      :showClose="true"
      :appendToBody="true"
      :visible="switchAddressVisable"
      @handleClose="switchAddressHandleClose()"
      @handleOk="switchAddressHandleOk()"
    >
      <receivingAddressManagement
        v-if="$store.state.vuex_user.sysType == 2"
      ></receivingAddressManagement>

      <webRetailShipToAddress
        v-if="$store.state.vuex_user.sysType == 5"
      ></webRetailShipToAddress>
    </cu-dialog>

    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  buyerAddressGetDefaultAddress,
  buyerTranManagerAddOrder,
  buyerTranManagerPayment,
  buyerTranManagerPayValidate,
  buyerTranManagerOnlinePayAmount,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import {
  getDefaultAddress,
  sysBuyerAddOrder,
  sysBuyerPayment,
} from "@/api/aksApi/platformApi/retailPurchaseApi.js";
import QRCode from "qrcodejs2";
import receivingAddressManagement from "@/views/platformViews/purchaserPlatform/accountManagement/receivingAddressManagement/receivingAddressManagement.vue";
import webRetailShipToAddress from "@/views/webPersonalCenter/retailPurchase/webRetailShipToAddress/webRetailShipToAddress.vue";
import {
  centerMallShopNow,
  changeGoodsQuantity,
} from "@/api/aksApi/platformApi/centerMallApi";
import { payCaptcha } from "@/api/aksApi/platformApi/loginApi";
export default {
  components: {
    receivingAddressManagement,
    webRetailShipToAddress,
  },
  data() {
    return {
      // 零购收货地址信息 或 采购商收货地址信息
      shipToAddress: {
        // 零购用户收货地址信息参数
        alias: "", //别名
        consignee: "", //收货人
        areacode: "", //收货地址
        address: "", //详细收货地址
        phone: "", //收货人联系电话
        isDefault: 0, //是否默认地址 0非默认地址 1默认地址

        // 采购商收货地址信息参数
        consignee: "", //收货人
        consigneeArea: "", //收货地址
        consigneeAddress: "", //详细收货地址
        contactPhone: "", //收货人联系电话
        isDefault: 0, //是否默认地址 0非默认地址 1默认地址
        zipCode: "", //收货地址邮政编码
      },

      // 采购商-交易管理=>新增集采订单-接口传参
      buyerTranManagerAddOrderOut: {
        consignee: null, // 收货人,
        consigneeArea: null, // 收货地址,
        consigneeAddress: null, // 详细收货地址,
        contactPhone: null, // 收货人联系电话,
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
                goodsId: null, //  商品id
                goodsName: null, //  货品名称
                price: null, //  单价
                unit: null, //  单位
                quantity: null, //  数量
              },
            ],
          },
        ],
      },
      // 零购用户-订单业务-下单-接口传参
      sysBuyerAddOrderOut: {
        amount: null, //订单金额
        consignee: null, // 收货人,
        consigneeAddress: null, // 收货详细地址,
        consigneePhone: null, // 收货人联系电话,
        payAmount: null, //支付金额
        payType: null, //支付方式 1支付宝 2微信
        supplierId: null, //供应商id
        supplierName: null, //供应商名称
        transportFee: null, //运费
        orderLsDetails: [
          {
            goodsId: null, //  商品id
            goodsName: null, //  商品名称
            goodsType: null,
            price: null, // 单价
            unit: null, // 单位
            quantity: null, // 数量
          },
        ],
      },
      centerMallShopNowReturn: {}, // 商城平台-中心商城=>中心商城立即购买-接口回参
      switchAddressVisable: false, //收货地址弹框
      erWeiMaShow: false, // 零售下单成功后弹出二维码页面
      erWeiMaType: 1, //1选中支付宝，2选中微信
      codeTitle: "获取验证码", //已发送验证码(60s)
      codeTime: 60, //验证码倒计时（60s）
      codeDisabled: false, //验证码不可再点击
      loading: false, //加载中
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
      payType: null, //付款:1账号余额支付 2信用付款
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
    orderParams: {
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
    this.buyerTranManagerAddOrderOut.bussId = this.orderParams.id; //// 业务id  采购单id/购物车id,
    if (this.$store.state.vuex_user.sysType == 5) {
      this.lsbuyerAddressGetDefaultAddressApi(); // 获取零售用户默认地址-接口
    } else if (this.$store.state.vuex_user.sysType == 2) {
      this.buyerAddressGetDefaultAddressApi(); // 获取采购商默认地址-接口
    }
    this.centerMallShopNowApi(); // 商城平台-中心商城=>中心商城立即购买-接口
  },

  methods: {
    // 商城平台-中心商城=>中心商城立即购买-接口
    centerMallShopNowApi() {
      let valueData = {
        goodsId: this.orderParams.goodsId,
        goodsType: this.orderParams.goodsType,
        drugType: this.orderParams.drugType,
        property: this.orderParams.type,
        quantity: this.orderParams.count,
      };
      //"用户类型 (1 采购商 2 零售用户)
      if (this.$store.state.vuex_user.sysType == 5) {
        valueData.userType = 2;
      } else if (this.$store.state.vuex_user.sysType == 2) {
        valueData.userType = 1;
      }
      centerMallShopNow(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.generateOrderVisible = true;
            this.centerMallShopNowReturn = res.data;
            this.computePrice();

            if (this.$store.state.vuex_user.sysType == 5) {
              this.retailUsersProcessing(); // 零购用户-商城平台-中心商城=>中心商城立即购买-接口数据处理
            } else if (this.$store.state.vuex_user.sysType == 2) {
              this.purchaserDataProcessing(); // 采购商-商城平台-中心商城=>中心商城立即购买-接口数据处理
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取零售用户默认地址-接口
    lsbuyerAddressGetDefaultAddressApi() {
      this.loading = true;
      getDefaultAddress()
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            if (res.data) {
              this.shipToAddress = res.data;
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
    // 零购用户-商城平台-中心商城=>中心商城立即购买-接口数据处理
    retailUsersProcessing() {
      this.computePrice();
      let orderJcGoodsList = [];
      let objects = {
        goodsId: this.centerMallShopNowReturn.centerShopNowVo.goodsId, //商品id
        goodsName: this.centerMallShopNowReturn.centerShopNowVo.goodsName, //商品名称
        goodsType: this.orderParams.drugType, //商品类型 @ 1  药品  2  药械  3  美食
        price: this.centerMallShopNowReturn.centerShopNowVo.buyPrice, //单价
        quantity: this.centerMallShopNowReturn.centerShopNowVo.quantity, //数量
        unit: this.centerMallShopNowReturn.centerShopNowVo.property, //单位
      };
      orderJcGoodsList.push(objects);
      let valueData = {
        amount: this.orderTotalSum.amount, //订单金额
        consignee: this.shipToAddress.consignee, // 收货人,
        consigneeAddress: this.shipToAddress.address, // 收货详细地址,
        consigneePhone: this.shipToAddress.phone, // 收货人联系电话,
        payAmount: this.orderTotalSum.payAmount, //支付金额
        payType: 1, //支付方式 1支付宝 2微信
        supplierId: this.centerMallShopNowReturn.supplierId, //供应商id
        supplierName: this.centerMallShopNowReturn.supplierName, //供应商名称
        transportFee: this.orderTotalSum.transportFee, //运费
        orderLsDetails: orderJcGoodsList,
      };
      this.sysBuyerAddOrderOut = valueData;
    },

    // 零购用户-订单业务-下单-接口
    sysBuyerAddOrderApi() {
      if (
        this.sysBuyerAddOrderOut.consignee == null ||
        this.sysBuyerAddOrderOut.consigneeAddress == null ||
        this.sysBuyerAddOrderOut.consigneePhone == null
      ) {
        this.jumpTitle =
          "收货地址尚未设置,是否自动跳转到收货地址管理页面进行设置?";
        this.jumpValue = 2; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
        this.jumpVisible = true;
        return;
      }
      this.loading = true;
      sysBuyerAddOrder(this.sysBuyerAddOrderOut)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.payOrderId = res.data;
            this.$message.success(res.message);
            this.erWeiMaShow = true;
            this.$nextTick(() => {
              this.qrcode(); //生成支付二维码
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 零购用户-支付-接口
    sysBuyerPaymentApi() {
      let valueData = {
        orderId: this.payOrderId[0],
        payAmount: this.orderTotalSum.payAmount,
      };
      sysBuyerPayment(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$emit("generateOrderHandleClose", false);
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

    // 采购商-商城平台-中心商城=>中心商城立即购买-接口数据处理
    purchaserDataProcessing() {
      let orderJcGoodsList = [];
      let objects = {
        goodsId: this.centerMallShopNowReturn.centerShopNowVo.goodsId, //  货品id
        goodsName: this.centerMallShopNowReturn.centerShopNowVo.goodsName, //  货品名称
        price: this.centerMallShopNowReturn.centerShopNowVo.buyPrice, //  单价
        unit: this.centerMallShopNowReturn.centerShopNowVo.property, //  单位
        quantity: this.centerMallShopNowReturn.centerShopNowVo.quantity, //  数量
      };
      orderJcGoodsList.push(objects);
      let objRequest = {
        goodsCategoryCount: this.centerMallShopNowReturn.goodsCategoryCount, //商品种类
        goodsCount: this.orderParams.count, //商品数量
        supplierId: this.centerMallShopNowReturn.supplierId, //供货商ID
        supplierName: this.centerMallShopNowReturn.supplierName, //供货商姓名
        transportFee: this.centerMallShopNowReturn.transportFee, //运费
        amount: this.centerMallShopNowReturn.amount, //金额
        orderType: this.orderParams.drugType, //订单类型 @ 1  药品  2  药械  3  美食
        //商品明细列表
        orderJcGoodsList: orderJcGoodsList,
      };
      this.buyerTranManagerAddOrderOut.supplierInfoList = [];
      this.buyerTranManagerAddOrderOut.supplierInfoList.push(objRequest);
    },

    // 获取采购商默认地址-接口
    buyerAddressGetDefaultAddressApi() {
      this.loading = true;
      buyerAddressGetDefaultAddress()
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            if (res.data) {
              this.shipToAddress = res.data;
              this.buyerTranManagerAddOrderOut.consignee =
                this.shipToAddress.consignee; //收货人
              this.buyerTranManagerAddOrderOut.consigneeArea =
                this.shipToAddress.consigneeArea; //收货地址
              this.buyerTranManagerAddOrderOut.consigneeAddress =
                this.shipToAddress.consigneeAddress; //详细收货地址
              this.buyerTranManagerAddOrderOut.contactPhone =
                this.shipToAddress.contactPhone; //收货人联系电话
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

    // 金额计算
    computePrice() {
      // 订单金额 (商品单价*数量)
      console.log(this.centerMallShopNowReturn.centerShopNowVo);
      this.orderTotalSum.amount =
        (this.centerMallShopNowReturn.centerShopNowVo.buyPrice *
          100 *
          this.orderParams.count) /
        100;
      //运费
      this.orderTotalSum.transportFee =
        this.centerMallShopNowReturn.transportFee;
      // 支付金额 (订单金额+运费)
      this.orderTotalSum.payAmount =
        this.orderTotalSum.amount + this.orderTotalSum.transportFee;
    },
    // 改变商品数量
    quantityChange(val, goods, squantity) {
      if (!squantity) {
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.orderParams.count = 1;
        });
      } else {
        if (val > squantity) {
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            this.orderParams.count = squantity;
          });
        } else if (val == squantity) {
          this.orderParams.count = squantity;
        } else {
          this.orderParams.count = val;
        }
      }
      this.cartChangeCartQuantityApi(goods); // 商城平台-中心商城=>改变商品数量-接口

      if (val == null || val == undefined || val == 0 || val == "") {
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.orderParams.count = 1;
        });
      }
      this.computePrice();
    },
    // 商城平台-中心商城=>改变商品数量-接口
    cartChangeCartQuantityApi(item) {
      let valueData = new FormData();
      valueData.append("goodsId", item.goodsId);
      valueData.append("quantity", this.orderParams.count);
      changeGoodsQuantity(valueData)
        .then((res) => {
          if (res.code == 200) {
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 采购商-交易管理=>新增集采订单-接口
    buyerTranManagerAddOrderApi() {
      if (
        this.buyerTranManagerAddOrderOut.consignee == null ||
        this.buyerTranManagerAddOrderOut.consigneeAddress == null ||
        this.buyerTranManagerAddOrderOut.consigneeArea == null ||
        this.buyerTranManagerAddOrderOut.contactPhone == null
      ) {
        this.jumpTitle =
          "收货地址尚未设置,是否自动跳转到收货地址管理页面进行设置?";
        this.jumpValue = 2; //jumpValue 1跳转账号管理页面设置支付密码-2跳转收货地址管理页面 设置收货地址
        this.jumpVisible = true;
        return;
      }
      this.loading = true;
      buyerTranManagerAddOrder(this.buyerTranManagerAddOrderOut)
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
            if (this.buyerTranManagerAddOrderOut.fkType == 2) {
              this.$emit("generateOrderHandleClose", false);
              this.$message.success(res.message);
              return;
            }
            this.buyerTranManagerOnlinePayAmountApi(); // （一键采购）在线支付-接口
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // （一键采购）在线支付-接口
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
        fkType: this.buyerTranManagerAddOrderOut.fkType,
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
      if (this.$store.state.vuex_user.sysType == 5) {
        this.sysBuyerAddOrderApi(); // 零购用户-下单-接口
      } else if (this.$store.state.vuex_user.sysType == 2) {
        this.buyerTranManagerAddOrderApi(); // 采购商-交易管理=>新增集采订单-接口
      }
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
      this.buyerTranManagerAddOrderOut.fkType = value;
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
      if (this.$store.state.vuex_user.sysType == 2) {
        if (this.jumpValue == 1) {
          title = "s后将为您自动跳转到账号安全页面，您可以设置支付密码";
          pathName = "/webPersonalMain/accountSecurity";
        } else if (this.jumpValue == 2) {
          title = "s后将为您自动跳转到收货地址管理页面，您可以设置收货地址";
          pathName = "/webPersonalMain/receivingAddressManagement";
        } else if (this.jumpValue == 3) {
          title = "s后将为您自动跳转到充值页面，您可以进行余额充值";
          pathName = "/webPersonalMain/paymentSettlementCenter";
        } //采购商
      } else if (this.$store.state.vuex_user.sysType == 5) {
        if (this.jumpValue == 2) {
          title = "s后将为您自动跳转到收货地址管理页面，您可以设置收货地址";
          pathName = "/webPersonalMain/webRetailShipToAddress";
        } //用户地址
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
    // 路由跳转
    toPath() {
      console.log("收货地址");
      let paths = "";
      if (this.$store.state.vuex_user.sysType == 5) {
        //  零购用户-收货地址界面
        paths = "/webPersonalMain/webRetailShipToAddress";
      } else if (this.$store.state.vuex_user.sysType == 2) {
        // 采购商-收货地址界面
        paths = "/webPersonalMain/receivingAddressManagement";
      }
      // 新页面打开
      let routeData = this.$router.resolve({
        path: paths,
        query: {},
      });
      window.open(routeData.href, "_blank");
    },
    // 点击切换地址
    switchAddressButton() {
      this.switchAddressVisable = true;
    },
    // 收货地址管理弹框取消按钮
    switchAddressHandleClose() {
      this.switchAddressVisable = false;
      if (this.$store.state.vuex_user.sysType == 5) {
        this.lsbuyerAddressGetDefaultAddressApi(); // 获取零售用户默认地址-接口
      } else if (this.$store.state.vuex_user.sysType == 2) {
        this.buyerAddressGetDefaultAddressApi(); // 获取采购商默认地址-接口
      }
    },
    // 收货地址管理确定按钮
    switchAddressHandleOk() {
      this.switchAddressVisable = false;
      if (this.$store.state.vuex_user.sysType == 5) {
        this.lsbuyerAddressGetDefaultAddressApi(); // 获取零售用户默认地址-接口
      } else if (this.$store.state.vuex_user.sysType == 2) {
        this.buyerAddressGetDefaultAddressApi(); // 获取采购商默认地址-接口
      }
    },
    erWeiMaTypeButton(value) {
      this.erWeiMaType = value;
    },
    // 生成假的二维码
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 220,
        height: 220,
        text: `http://${window.location.host}/#/webTradingMall/webGoodsDetail`, // 需要二维码跳转的地址
        colorDark: "#000", //前景色
        colorLight: "rgba(0,0,0,0)", //背景色
      });
    },
    // 放弃支付按钮
    payMenuCancel() {
      this.$emit("generateOrderHandleClose", false);
    },
    // 支付成功按钮
    payMenuOk() {
      this.sysBuyerPaymentApi();
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.content_body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1200px;
  padding: 45px 26px;
  margin: 0px auto;
  min-height: calc(100vh - 166px - 170px);
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #020552;
  background-color: #fff;
}
.content1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content11 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
  }
  .content12 {
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #0e78f3;
    cursor: pointer;
  }
}
.content2 {
  margin-top: 31px;
  width: 100%;
  display: flex;
  align-items: center;

  .content21 {
    border: 1px solid #ff480e;
    text-align: center;
    line-height: 34px;
    font-size: 16px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    padding: 4px 20px;
    color: #020552;
    position: relative;
    .content2Img {
      position: absolute;
      width: 9px;
      height: 9px;
      background: url(./image/gou.png);
      right: 0px;
      bottom: 0px;
    }
  }
  .content22 {
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #020552;
  }
  .content23 {
    width: 68px;
    height: 24px;
    background: #999999;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 16px;
    text-align: center;
    line-height: 24px;
  }
  .content24 {
    cursor: pointer;
    width: 68px;
    height: 24px;
    background: #0e78f3;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 16px;
    text-align: center;
    line-height: 24px;
  }
}
.content3 {
  margin-top: 40px;
  width: 1160px;
  height: 1px;
  background: #d9d9d9;
}
.content4 {
  margin-top: 15px;
  font-size: 20px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #020552;
}
.content5 {
  display: flex;
  align-items: center;
  margin-top: 21px;
  width: 1155px;
  height: 40px;
  background: #e8f0f8;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
  padding: 0px 20px;
  .content51 {
    width: 629px;
    height: 21px;
  }
  .content52 {
    width: 131px;
    height: 21px;
    text-align: center;
  }
  .content53 {
    width: 223px;
    height: 21px;
    text-align: center;
  }
  .content54 {
    width: 144px;
    height: 21px;
    text-align: center;
  }
}
.content6 {
  padding: 26px 20px;
  display: flex;
  width: 1155px;
  height: 133px;
  border: 1px solid #e8f0f8;
  background: #ffffff;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #020552;
  .content61 {
    display: flex;
    width: 629px;
    .content611 {
      width: 80px;
      height: 80px;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .content612 {
      margin-left: 13px;
      width: 380px;
    }
  }
  .content62 {
    width: 131px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content63 {
    width: 223px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content64 {
    width: 144px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.content7 {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .content71 {
    width: 228px;
    height: 59px;
    text-align: right;
  }
  .content72 {
    text-align: right;
  }
}
.content8 {
  margin-top: 22px;
  width: 100%;
  padding: 10px 40px;
  background: #eeeeee;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
  .content81 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .content811 {
      text-align: right;
    }
    .content812 {
      font-size: 24px;
      font-weight: bold;
      color: #ff480e;
    }
    .content813 {
      color: #ff480e;
    }
  }

  .content82 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 16px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #020552;
  }
}
.content9 {
  margin-top: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .content91 {
    border: 1px solid #ff480e;
    background: #ff480e;
    color: #ffffff;
  }
}

// 支付方式
.generateOrder_one {
  font-size: 16px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #00023a;
}

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

.erWeiMa {
  width: 1200px;
  padding: 45px 26px;
  margin: 0px auto;
  min-height: calc(100vh - 166px - 170px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.erWeiMa1 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #020552;
  .erWeiMa11 {
    cursor: pointer;
    width: 150px;
    height: 40px;
    border: 1px solid #999999;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .erWeiMa12 {
    cursor: pointer;
    width: 150px;
    height: 40px;
    border: 1px solid #999999;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active {
    border: 1px solid #ff480e;
    background: #ff480e;
    color: #ffffff;
  }
}
.erWeiMa2 {
  margin-top: 40px;
  width: 220px;
  height: 220px;
  font-size: 16px;
  color: #020552;
  border: 1px solid #999999;
  #qrcode {
    width: 220px;
    height: 220px;
  }
}
.erWeiMa3 {
  margin-top: 40px;
  font-size: 16px;
  color: #020552;
}
.erWeiMa4 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #020552;
  .erWeiMa41 {
    cursor: pointer;
    width: 150px;
    height: 40px;
    border: 1px solid #999999;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .erWeiMa42 {
    cursor: pointer;
    margin-left: 40px;
    width: 150px;
    height: 40px;
    border: 1px solid #1ad215;
    background: #1ad215;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
