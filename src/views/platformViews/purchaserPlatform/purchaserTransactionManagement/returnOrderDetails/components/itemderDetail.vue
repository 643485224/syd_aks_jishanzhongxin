<template>
  <!-- 订单详情(已收货) -->
  <div>
    <div class="fenge"></div>
    <div class="box1">
      <div class="box1_item1">
        <div>{{ statusTypeList[derDetailData.order.status] }}</div>
        <div>
          <el-button
            class="box1_item1_button1"
            type="default"
            @click="logisticsButton"
            >查看物流</el-button
          >

          <!-- 订单状态为待收货才能进行收货 -->
          <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
          <el-button
            class="box1_item1_button2"
            type="primary"
            v-if="derDetailData.order.status == 3"
            @click="confirmReceiptButton"
            >确认收货</el-button
          >

          <!-- 订单状态 已收货 或者 已完成 才能进行评价 -->
          <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
          <el-button
            v-if="
              derDetailData.order.status == 4 || derDetailData.order.status == 6
            "
            class="box1_item1_button2"
            type="primary"
            @click="evaluateHandleButton"
            >评价</el-button
          >

          <!-- 退货：（在线支付（退货申请）订单状态在未完成之前都可以进行退货（除待审核外））
                     （货到付款（退货申请）订单的发票状态在待开票、拒绝收票都可以进行退货） -->
          <!-- 支付方式fkType   1 在线支付  2 货到付款-->
          <!-- 发票状态fpStatus 1  待开票  2  待收票  3 待付款（已收票）  4    待结算（采购商已付款）   5  完成收款   6  拒绝收票 -->
          <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价-->
          <el-button
            v-if="
              tableItemData.fkType == 1 &&
              derDetailData.order.status < 6 &&
              derDetailData.order.status != 1
            "
            class="box1_item1_button3"
            type="default"
            @click="returnGoodsButton"
            >申请退货</el-button
          >
          <el-button
            v-if="
              tableItemData.fkType == 2 &&
              (tableItemData.fpStatus == 1 || tableItemData.fpStatus == 6) &&
              derDetailData.order.status < 6 &&
              derDetailData.order.status != 1
            "
            class="box1_item1_button3"
            type="default"
            @click="returnGoodsButton"
            >申请退货</el-button
          >
        </div>
      </div>
      <!-- 在线支付： 提交订单、付款成功、等待发货、等待收货、已完成/已取消/已退货 -->
      <!-- 货到付款： 提交订单、等待发货、等待收货、等待开票、等待收票、付款成功、已完成/已取消/已退货-->
      <!-- 支付方式fkType   1 在线支付  2 货到付款-->
      <!-- 如果是已取消/已退货，只显示点亮提交订单和已取消/已退货，如果是其他的，根据进度点亮步骤 -->
      <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价 10待取消 11待退货 12已退货-->
      <div class="box1_item2" v-if="tableItemData.fkType == 1">
        <el-steps :active="elStepsValue" align-center>
          <el-step icon="el-icon-tickets">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">提交订单</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.orderTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 1">
            <el-step
              class="hong"
              icon="el-icon-document-delete"
              finish-status="success"
            >
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 1"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-bank-card">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">付款成功</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.payTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 2">
            <el-step
              class="hong"
              icon="el-icon-document-delete"
              finish-status="success"
            >
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 2"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-truck">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待发货</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.deliveryTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 3">
            <el-step
              class="hong"
              icon="el-icon-document-delete"
              finish-status="success"
            >
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 3"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-box">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待收货</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.receiveGoodsTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 4">
            <el-step
              class="hong"
              icon="el-icon-document-delete"
              finish-status="success"
            >
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 4"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-document-checked">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">已完成</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.completeTime }}
                </div>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>

      <div class="box1_item2" v-if="tableItemData.fkType == 2">
        <el-steps :active="elStepsValue" align-center>
          <el-step icon="el-icon-tickets">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">提交订单</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.orderTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 1">
            <el-step
              class="hong"
              icon="el-icon-document-delete"
              finish-status="success"
            >
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 1"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-truck">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待发货</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.deliveryTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 2">
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 2"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-box">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待收货</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.receiveGoodsTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 3">
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            v-if="derDetailData.order.status == 12 && elStepsValue == 3"
          >
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-notebook-2">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待开票</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.invoiceTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template v-if="derDetailData.order.status == 7 && elStepsValue == 4">
            <el-step class="hong" icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            class="hong"
            v-if="derDetailData.order.status == 12 && elStepsValue == 4"
          >
            <el-step icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-finished">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">等待收票</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.receiveInvoiceTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template
            class="hong"
            v-if="derDetailData.order.status == 7 && elStepsValue == 5"
          >
            <el-step icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            class="hong"
            v-if="derDetailData.order.status == 12 && elStepsValue == 5"
          >
            <el-step icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-bank-card">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">付款成功</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.payTime }}
                </div>
              </div>
            </template>
          </el-step>
          <template
            class="hong"
            v-if="derDetailData.order.status == 7 && elStepsValue == 6"
          >
            <el-step icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已取消</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.cancelTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <template
            class="hong"
            v-if="derDetailData.order.status == 12 && elStepsValue == 6"
          >
            <el-step icon="el-icon-document-delete">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span_error mt_10">已退货</div>
                  <div class="box1_item2_span_error">
                    {{ buyerTranManagerOrderProcessObject.returnTime }}
                  </div>
                </div>
              </template>
            </el-step>
          </template>
          <el-step icon="el-icon-document-checked">
            <template slot="description">
              <div class="flex_fc_ac">
                <div class="box1_item2_span mt_10">已完成</div>
                <div class="box1_item2_span">
                  {{ buyerTranManagerOrderProcessObject.completeTime }}
                </div>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="fenge"></div>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item1" :span="24">订单信息</el-col>
    </el-row>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">订单编号:</span
        >{{ derDetailData.order.orderNo }}</el-col
      >
      <el-col class="box2_item2" :span="12"
        ><span class="mr_10">创建时间:</span>
        {{
          derDetailData.order.orderTime == null
            ? null
            : new Date(derDetailData.order.orderTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              )
        }}
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">订单状态:</span
        >{{ statusTypeList[derDetailData.order.status] }}</el-col
      >
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">订单类型:</span
        >{{ orderType[derDetailData.order.orderType] }}</el-col
      >
    </el-row>
    <div class="fenge"></div>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item1" :span="12">收货信息</el-col>
      <el-col class="box2_item1" :span="12">配送信息</el-col>
    </el-row>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">收货人:</span
        >{{ derDetailData.order.consignee }}</el-col
      >
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">配送方式:</span
        >{{ deliveryMethodType[derDetailData.order.deliveryMethod] }}</el-col
      >
    </el-row>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">手机号:</span
        >{{ derDetailData.order.consigneePhone }}</el-col
      >
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">配送时间:</span>
        {{
          derDetailData.order.deliveryTime == null
            ? null
            : new Date(derDetailData.order.deliveryTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              )
        }}</el-col
      >
    </el-row>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">收货地址:</span
        >{{ derDetailData.order.consigneeAddress }}</el-col
      >
      <el-col class="box2_item2" :span="12">
        <span class="mr_10">收货时间:</span>
        {{
          derDetailData.order.receiveGoodsTime == null
            ? null
            : new Date(derDetailData.order.receiveGoodsTime).Format(
                "yyyy-MM-dd hh:mm:ss"
              )
        }}
      </el-col>
    </el-row>
    <div class="fenge"></div>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item1" :span="24">商品信息</el-col>
    </el-row>
    <cu-table
      :showHeight="false"
      :tableHeader="tableHeader"
      :tableData="tableData"
      :showPagination="false"
      :showTitle="false"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template slot="status" slot-scope="value">
        {{ statusTypeList[value.value.status] }}
      </template>
    </cu-table>
    <div class="fenge"></div>
    <el-row :gutter="20" class="mt_10">
      <el-col class="box2_item1" :span="24">总计</el-col>
    </el-row>
    <div class="box4_item1">
      <span class="mr_10">商品总计:</span>
      {{ shangpingAllamount }} 元
    </div>
    <div class="box4_item1">
      <span class="mr_10">运费总计:</span
      >{{ derDetailData.order.transportFee }} 元
    </div>
    <div class="box4_item1">
      <span class="mr_10">实付费:</span>
      <span class="box4_item2">
        {{ shangpingAllamount + derDetailData.order.transportFee }}</span
      >
      元
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      // 表头
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "产品编号",
          key: "ybCode",
          align: "center",
        },
        {
          title: "通用名",
          key: "commonName",
          align: "center",
        },
        {
          title: "剂型",
          key: "jx",
          width: "120",
          align: "center",
        },
        {
          title: "规格",
          key: "specification",
          width: "120",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
          width: "120",
          align: "center",
        },
        {
          title: "生产企业",
          key: "manufacturer",
          align: "center",
        },
        {
          title: "数量",
          key: "quantity",
          width: "200",
          align: "center",
        },
        {
          title: "采购价(元)",
          key: "buyPrice",
          width: "120",
          align: "center",
        },
        {
          title: "小计",
          key: "subtotal",
          width: "120",
          align: "center",
        },
      ],
      tableData: [],
      statusTypeList: {
        1: "待响应",
        2: "待发货",
        3: "待收货",
        4: "已收货",
        5: "待付款",
        6: "已完成",
        7: "已取消",
        8: "已拒绝",
        9: "已评价",
        10: "待取消",
        11: "待退货",
        12: "已退货",
      },
      orderType: {
        1: "药品",
        2: "器械",
      },
      deliveryMethodType: {
        1: "阿克苏集散中心物流",
        2: "普通物流",
      },
      elStepsValue: 0, //步骤条状态
      shangpingAllamount: 0, //商品总计
    };
  },
  props: {
    //表格单条数据
    tableItemData: {
      type: Object,
      default: () => {},
    },
    // 详情数据
    derDetailData: {
      type: Object,
      default: () => {},
    },
    buyerTranManagerOrderProcessObject: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // console.log("tableItemData:", this.tableItemData);
    // console.log("derDetailData:", this.derDetailData);
    //支付方式fkType   1 在线支付  2 货到付款
    if (this.tableItemData.fkType == 1) {
      //在线支付
      //  orderTime             提交订单
      //  payTime               支付时间
      //  deliveryTime          发货时间
      //  receiveGoodsTime      收货时间
      //  completeTime          完成时间
      if (this.buyerTranManagerOrderProcessObject.orderTime) {
        this.elStepsValue = 1;
      }
      if (this.buyerTranManagerOrderProcessObject.payTime) {
        this.elStepsValue = 2;
      }
      if (this.buyerTranManagerOrderProcessObject.deliveryTime) {
        this.elStepsValue = 3;
      }
      if (this.buyerTranManagerOrderProcessObject.receiveGoodsTime) {
        this.elStepsValue = 4;
      }
      if (this.buyerTranManagerOrderProcessObject.completeTime) {
        this.elStepsValue = 5;
      }
    } else if (this.tableItemData.fkType == 2) {
      //货到付款
      //  orderTime             提交订单
      //  deliveryTime          发货时间
      //  receiveGoodsTime      收货时间
      //  invoiceTime           开票时间
      //  receiveInvoiceTime    收票时间
      //  payTime               支付时间
      //  completeTime          完成时间
      if (this.buyerTranManagerOrderProcessObject.orderTime) {
        this.elStepsValue = 1;
      }
      if (this.buyerTranManagerOrderProcessObject.deliveryTime) {
        this.elStepsValue = 2;
      }
      if (this.buyerTranManagerOrderProcessObject.receiveGoodsTime) {
        this.elStepsValue = 3;
      }
      if (this.buyerTranManagerOrderProcessObject.invoiceTime) {
        this.elStepsValue = 4;
      }
      if (this.buyerTranManagerOrderProcessObject.receiveInvoiceTime) {
        this.elStepsValue = 5;
      }
      if (this.buyerTranManagerOrderProcessObject.payTime) {
        this.elStepsValue = 6;
      }
      if (this.buyerTranManagerOrderProcessObject.completeTime) {
        this.elStepsValue = 7;
      }
    }

    this.tableData = this.derDetailData.goodsDetailVos;
    this.tableData.forEach((element) => {
      this.shangpingAllamount = this.shangpingAllamount + element.subtotal;
    });
  },
  methods: {
    // 查看物流按钮
    logisticsButton() {
      this.$message.info("该功能建设中...  仅做参考");
      this.$emit("logisticsButton");
    },
    // 确认收货按钮
    confirmReceiptButton() {
      this.$emit("confirmReceiptButton");
    },
    // 评价按钮
    evaluateHandleButton() {
      this.$emit("evaluateHandleButton");
    },
    // 申请退货按钮
    returnGoodsButton() {
      this.$emit("returnGoodsButton");
    },
    handleSizeChange(val) {
      this.pages.current = 1;
      this.pages.size = val;
      this.SelectUserApi(); // 查询用户-接口
    },
    handleCurrentChange(val) {
      this.pages.current = val;
      this.SelectUserApi(); // 查询用户-接口
    },
  },
};
</script>
<style lang="scss" scoped>
// 分隔线
.fenge {
  width: 100%;
  height: 2px;
  background: #eeeeee;
  margin: 18px 0px;
}
.box1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box1_item1 {
  div {
    min-width: 288px;
    font-size: 24px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00c514;
    margin-bottom: 10px;
  }
  .box1_item1_button1 {
    border-color: #156cc2;
    color: #156cc2;
  }
  .box1_item1_button2 {
    border-color: #ff480e;
    background: #ff480e;
  }
  .box1_item1_button3 {
    border-color: #999999;
    color: #999999;
  }
}
::v-deep.box1_item2 {
  width: 1000px;
  .el-steps {
    .el-step {
      .el-step__head.is-finish {
        color: #00c514;
        .el-step__line {
          background-color: #00c514;
          background: transparent;
          border-top: 5px dotted;
          .el-step__line-inner {
            border-width: 0 !important;
          }
        }
      }
      .el-step__head.is-process {
        .el-step__line {
          color: #c0c4cc !important;
        }
        .el-step__icon.is-icon {
          color: #c0c4cc !important;
        }
      }
    }
    .hong {
      .el-step__head.is-wait {
        .el-step__icon.is-icon {
          color: red !important;
        }
      }
      .el-step__main {
        color: red !important;
      }
    }
  }
  .el-step__line {
    background: transparent;
    border-top: 5px dotted;
    .el-step__line-inner {
      border-width: 0 !important;
    }
  }

  .box1_item2_span {
    width: 100px;
    font-size: 12px;
    color: #00023a;
    font-weight: 500;
  }
  .box1_item2_span_error {
    width: 100px;
    font-size: 12px;
    color: red;
    font-weight: 500;
  }
}

.box2_item1 {
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 600;
  color: #00023a;
}
.box2_item2 {
  color: #999999;
}

.box4_item1 {
  text-align: right;
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #999999;
  margin-bottom: 10px;
}
.box4_item2 {
  text-align: right;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ff480e;
}
</style>
