<template>
  <div class="seach" ref="contentBox">
    <div class="seach1">
      <div class="seach-item">
        当前位置：
        <span @click="routeJump1()"> 首页 </span>
        ><span @click="routeJump2()">
          {{ types[$route.query.spType] }}
        </span>
        ><span @click="routeJump3()">相关订单</span> ><span>详情</span>
      </div>
      <div class="BodyOne flex">
        <!-- 在线支付： 提交订单、付款成功、等待发货、等待收货、已完成/已取消/已退货 -->
        <!-- 货到付款： 提交订单、等待发货、等待收货、等待开票、等待收票、付款成功、已完成/已取消/已退货-->
        <!-- 支付方式fkType   1 在线支付  2 货到付款-->
        <!-- 如果是已取消/已退货，只显示点亮提交订单和已取消/已退货，如果是其他的，根据进度点亮步骤 -->
        <!-- 订单状态status   1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成  7  已取消 8 已拒绝   9 已评价 10待取消 11待退货 12已退货-->
        <div class="box1_item2" v-if="fkType == 1">
          <el-steps :active="elStepsValue" align-center>
            <el-step icon="el-icon-tickets">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">提交订单</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 1
              "
            >
              <el-step
                class="hong"
                icon="el-icon-document-delete"
                finish-status="success"
              >
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 1
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-bank-card">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">付款成功</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 2
              "
            >
              <el-step
                class="hong"
                icon="el-icon-document-delete"
                finish-status="success"
              >
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 2
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-truck">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">等待发货</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 3
              "
            >
              <el-step
                class="hong"
                icon="el-icon-document-delete"
                finish-status="success"
              >
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 3
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-box">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">等待收货</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 4
              "
            >
              <el-step
                class="hong"
                icon="el-icon-document-delete"
                finish-status="success"
              >
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 4
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-document-checked">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">已完成</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>

        <div class="box1_item2" v-if="fkType == 2">
          <el-steps :active="elStepsValue" align-center>
            <el-step icon="el-icon-tickets">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">提交订单</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 1
              "
            >
              <el-step
                class="hong"
                icon="el-icon-document-delete"
                finish-status="success"
              >
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 1
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-truck">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">等待发货</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 2
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 2
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-box">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">等待收货</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 3
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 3
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-notebook-2">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">等待开票</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 4
              "
            >
              <el-step class="hong" icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              class="hong"
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 4
              "
            >
              <el-step icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-finished">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">等待收票</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              class="hong"
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 5
              "
            >
              <el-step icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              class="hong"
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 5
              "
            >
              <el-step icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-bank-card">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">付款成功</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
            <template
              class="hong"
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 7 &&
                elStepsValue == 6
              "
            >
              <el-step icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已取消</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <template
              class="hong"
              v-if="
                superviseDrugManageGetOrderDetailReturn.status == 12 &&
                elStepsValue == 6
              "
            >
              <el-step icon="el-icon-document-delete">
                <template slot="description">
                  <div class="flex_fc_ac">
                    <div class="box1_item2_span_error mt_10">已退货</div>
                    <div class="box1_item2_span_error">2022-08-20</div>
                    <div class="box1_item2_span_error">18:20</div>
                  </div>
                </template>
              </el-step>
            </template>
            <el-step icon="el-icon-document-checked">
              <template slot="description">
                <div class="flex_fc_ac">
                  <div class="box1_item2_span mt_10">已完成</div>
                  <div class="box1_item2_span">2022-08-20</div>
                  <div class="box1_item2_span">18:20</div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div class="BodyTwo">
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item1" :span="24">订单信息</el-col>
        </el-row>
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item2" :span="12">
            <span class="mr_10">订单编号:</span>
            {{ superviseDrugManageGetOrderDetailReturn.orderNo }}
          </el-col>
          <el-col class="box_item2" :span="12"
            ><span class="mr_10">创建时间:</span>
            {{ superviseDrugManageGetOrderDetailReturn.createTime }}
          </el-col>
        </el-row>
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item2" :span="12">
            <span class="mr_10">订单状态:</span>
            {{ statusList[superviseDrugManageGetOrderDetailReturn.status] }}
          </el-col>
          <el-col class="box_item2" :span="12">
            <span class="mr_10">订单类型:</span>
            {{
              orderTypeList[superviseDrugManageGetOrderDetailReturn.orderType]
            }}
          </el-col>
        </el-row>
      </div>

      <div class="BodyTwo">
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item1" :span="12">收货信息</el-col>
          <el-col class="box_item1" :span="12">配送信息</el-col>
        </el-row>
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item2" :span="12">
            <span class="mr_10">收货人:</span>
            {{ superviseDrugManageGetOrderDetailReturn.orderType }}
          </el-col>
          <el-col class="box_item2" :span="12">
            <span class="mr_10">配送方式:</span>
            {{
              deliveryMethodList[
                superviseDrugManageGetOrderDetailReturn.deliveryMethod
              ]
            }}
          </el-col>
        </el-row>
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item2" :span="12">
            <span class="mr_10">收货人手机号:</span>
            {{ superviseDrugManageGetOrderDetailReturn.consigneePhone }}
          </el-col>
          <el-col class="box_item2" :span="12">
            <span class="mr_10">配送时间:</span>
            {{ superviseDrugManageGetOrderDetailReturn.deliveryTime }}
          </el-col>
        </el-row>
        <el-row :gutter="100" class="mt_10">
          <el-col class="box_item2" :span="12">
            <span class="mr_10">收货地址:</span>
            {{ superviseDrugManageGetOrderDetailReturn.consigneeAddress }}
          </el-col>
          <el-col class="box_item2" :span="12">
            <span class="mr_10">收货时间:</span>
            {{ superviseDrugManageGetOrderDetailReturn.receiveGoodsTime }}
          </el-col>
        </el-row>
      </div>

      <div class="BodyThree">
        <el-row :gutter="100">
          <el-col class="box_item1" :span="24">商品信息</el-col>
        </el-row>
        <cu-table
          :showHeight="false"
          :tableHeader="tableHeader"
          :tableData="tableData"
          :showPagination="false"
          :showTitle="false"
        >
          <template slot="status" slot-scope="value">
            {{ statusTypeList[value.value.status] }}
          </template>
        </cu-table>
      </div>

      <div class="BodyFour">
        <el-row :gutter="100">
          <el-col class="box_item1" :span="24">总计</el-col>
        </el-row>
        <div class="box4_item1">
          <span class="mr_10">商品总计:</span>
          {{ allPrice }} 元
        </div>
        <div class="box4_item1">
          <span class="mr_10">运费总计:</span
          >{{ superviseDrugManageGetOrderDetailReturn.transportFee }} 元
        </div>
        <div class="box4_item1">
          <span class="mr_10">实付款:</span>
          <span class="box4_item2">{{
            allPrice + superviseDrugManageGetOrderDetailReturn.transportFee
          }}</span>
          元
        </div>
      </div>
    </div>

    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  superviseDrugManageGetOrderDetail,
  superviseApparatusManageGetOrderDetail,
} from "@/api/aksApi/platformApi/supervise.js";
export default {
  data() {
    return {
      statusList: {
        1: "待响应",
        2: "待发货",
        3: "待收货",
        4: "已收货",
        5: "待付款",
        6: "待评价",
        7: "已取消",
        8: "已拒绝",
        9: "已评价",
        10: "待取消",
        11: "待退货",
        12: "已退货",
      },
      orderTypeList: {
        1: "集采",
        2: "零售",
      },
      deliveryMethodList: {
        1: "阿克苏集散中心物流",
        2: "普通快递",
      },
      types: {
        1: "药品搜索",
        2: "药械搜索",
        3: "企业搜索",
      },
      fkType: 2,
      status: 0,
      elStepsValue: 0,

      // 表头
      tableHeader: [
        {
          title: "药品医保编码",
          key: "goodsCode",
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
          align: "center",
        },
        {
          title: "规格",
          key: "specification",
          align: "center",
        },
        {
          title: "单位",
          key: "unit",
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
          align: "center",
        },
        {
          title: "单价",
          key: "price",
          align: "center",
        },

        {
          title: "耗材材质",
          key: "material",
          align: "center",
        },
      ],
      tableData: [],
      tableItemData: {},
      superviseDrugManageGetOrderDetailReturn: {}, // 查询订单详情-接口回参
      allPrice: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableItemData = JSON.parse(this.$route.query.tableItemData);
      if (this.$route.query.spType == 1) {
        this.superviseDrugManageGetOrderDetailApi(); // 药品查询订单详情-接口
      } else if (this.$route.query.spType == 2) {
        this.superviseApparatusManageGetOrderDetailApi(); // 药械查询订单详情-接口
      }
    });
  },

  methods: {
    // 药品查询订单详情-接口
    superviseDrugManageGetOrderDetailApi() {
      let valueData = {
        orderId: this.tableItemData.id,
        orderType: this.tableItemData.orderType,
      };
      superviseDrugManageGetOrderDetail(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.superviseDrugManageGetOrderDetailReturn = res.data;
            this.tableData = res.data.superviseGoodsDetailVos;
            this.allPrice = 0;
            this.tableData.forEach((element) => {
              this.allPrice = this.allPrice + element.price * element.quantity;
            });
            //支付方式fkType   1 在线支付  2 货到付款
            if (this.superviseDrugManageGetOrderDetailReturn.fkType == 1) {
              //在线支付
              //  orderTime             提交订单
              //  payTime               支付时间
              //  deliveryTime          发货时间
              //  receiveGoodsTime      收货时间
              //  completeTime          完成时间
              if (this.superviseDrugManageGetOrderDetailReturn.orderTime) {
                this.elStepsValue = 1;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.payTime) {
                this.elStepsValue = 2;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.deliveryTime) {
                this.elStepsValue = 3;
              }
              if (
                this.superviseDrugManageGetOrderDetailReturn.receiveGoodsTime
              ) {
                this.elStepsValue = 4;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.completeTime) {
                this.elStepsValue = 5;
              }
            } else if (
              this.superviseDrugManageGetOrderDetailReturn.fkType == 2
            ) {
              //货到付款
              //  orderTime             提交订单
              //  deliveryTime          发货时间
              //  receiveGoodsTime      收货时间
              //  invoiceTime           开票时间
              //  receiveInvoiceTime    收票时间
              //  payTime               支付时间
              //  completeTime          完成时间
              if (this.superviseDrugManageGetOrderDetailReturn.orderTime) {
                this.elStepsValue = 1;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.deliveryTime) {
                this.elStepsValue = 2;
              }
              if (
                this.superviseDrugManageGetOrderDetailReturn.receiveGoodsTime
              ) {
                this.elStepsValue = 3;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.invoiceTime) {
                this.elStepsValue = 4;
              }
              if (
                this.superviseDrugManageGetOrderDetailReturn.receiveInvoiceTime
              ) {
                this.elStepsValue = 5;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.payTime) {
                this.elStepsValue = 6;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.completeTime) {
                this.elStepsValue = 7;
              }
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 药械查询订单详情-接口
    superviseApparatusManageGetOrderDetailApi() {
      let valueData = {
        orderId: this.tableItemData.id,
        orderType: this.tableItemData.orderType,
      };
      superviseApparatusManageGetOrderDetail(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.superviseDrugManageGetOrderDetailReturn = res.data;
            this.tableData = res.data.superviseGoodsDetailVos;
            this.allPrice = 0;
            this.tableData.forEach((element) => {
              this.allPrice = this.allPrice + element.price * element.quantity;
            });
            //支付方式fkType   1 在线支付  2 货到付款
            if (this.superviseDrugManageGetOrderDetailReturn.fkType == 1) {
              //在线支付
              //  orderTime             提交订单
              //  payTime               支付时间
              //  deliveryTime          发货时间
              //  receiveGoodsTime      收货时间
              //  completeTime          完成时间
              if (this.superviseDrugManageGetOrderDetailReturn.orderTime) {
                this.elStepsValue = 1;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.payTime) {
                this.elStepsValue = 2;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.deliveryTime) {
                this.elStepsValue = 3;
              }
              if (
                this.superviseDrugManageGetOrderDetailReturn.receiveGoodsTime
              ) {
                this.elStepsValue = 4;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.completeTime) {
                this.elStepsValue = 5;
              }
            } else if (
              this.superviseDrugManageGetOrderDetailReturn.fkType == 2
            ) {
              //货到付款
              //  orderTime             提交订单
              //  deliveryTime          发货时间
              //  receiveGoodsTime      收货时间
              //  invoiceTime           开票时间
              //  receiveInvoiceTime    收票时间
              //  payTime               支付时间
              //  completeTime          完成时间
              if (this.superviseDrugManageGetOrderDetailReturn.orderTime) {
                this.elStepsValue = 1;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.deliveryTime) {
                this.elStepsValue = 2;
              }
              if (
                this.superviseDrugManageGetOrderDetailReturn.receiveGoodsTime
              ) {
                this.elStepsValue = 3;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.invoiceTime) {
                this.elStepsValue = 4;
              }
              if (
                this.superviseDrugManageGetOrderDetailReturn.receiveInvoiceTime
              ) {
                this.elStepsValue = 5;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.payTime) {
                this.elStepsValue = 6;
              }
              if (this.superviseDrugManageGetOrderDetailReturn.completeTime) {
                this.elStepsValue = 7;
              }
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

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
        });
      }
    },
    // 跳转去相关订单
    routeJump3() {
      this.$router.push({
        name: "webSuperviseProductInformation",
        query: {
          goodsId: this.$route.query.goodsId,
          spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
          elSelectValue: this.$route.query.elSelectValue,
          elInputValue: this.$route.query.elInputValue,
        },
      });
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

      &:nth-child(4) {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}

.BodyOne {
  height: 206px;
  border-bottom: 1px solid #eeeeee;
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
}
.BodyTwo {
  padding: 38px 113px;
  border-bottom: 1px solid #eeeeee;
  .box_item1 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
  .box_item2 {
    font-size: 16px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
  }
}

.BodyThree {
  padding: 22px 113px 32px 113px;
  border-bottom: 1px solid #eeeeee;
  .box_item1 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
}
.BodyFour {
  padding: 22px 113px 32px 113px;
  border-bottom: 1px solid #eeeeee;
  .box_item1 {
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
  .box4_item1 {
    text-align: right;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #00023a;
    margin-bottom: 10px;
  }
  .box4_item2 {
    text-align: right;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #ff480e;
  }
}
</style>
