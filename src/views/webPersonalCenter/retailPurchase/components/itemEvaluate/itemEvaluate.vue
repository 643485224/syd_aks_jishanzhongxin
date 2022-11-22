<template>
  <!-- 零购平台=>我的订单=>评价晒单页面 -->
  <!-- 零购平台=>我的订单=>订单详情=>评价晒单页面 -->
  <!-- 零购平台=>评价晒单列表=>评价晒单页面 -->
  <div class="contentBox" ref="contentBox">
    <div class="contentBox1">
      <div class="contentBox11">
        <img v-lazy :src="tableBody[0].mainPicture" alt="" />
      </div>
      <div class="contentBox12">
        {{ tableBody[0].goodsName }}
      </div>
      <div class="contentBox13">￥{{ tableBody[0].price }}</div>
      <!-- <div class="contentBox14">原味684g+榛果味684g</div> -->
    </div>
    <div class="contentBox2">
      <el-form
        class="phoneDialogClass"
        :label-position="'right'"
        :model="formData"
        :rules="rulesformData"
        ref="refformData"
        label-width="110px"
      >
        <el-form-item label="综合评分" prop="score">
          <el-rate
            v-model="formData.score"
            :colors="['#99A9BF', '#ff480ebf', '#FF480E']"
            :show-text="false"
            :texts="['非常差', '差', '一般', '好', '非常好']"
            @change="elRateChange($event, 'score')"
          >
          </el-rate>
        </el-form-item>
        <el-form-item label="商品评分" prop="goodsScore">
          <el-rate
            v-model="formData.goodsScore"
            :colors="['#99A9BF', '#ff480ebf', '#FF480E']"
            :show-text="false"
            :texts="['非常差', '差', '一般', '好', '非常好']"
            @change="elRateChange($event, 'goodsScore')"
          >
          </el-rate>
        </el-form-item>
        <el-form-item label="物流评分" prop="logisticsScore">
          <el-rate
            v-model="formData.logisticsScore"
            :colors="['#99A9BF', '#ff480ebf', '#FF480E']"
            :show-text="false"
            :texts="['非常差', '差', '一般', '好', '非常好']"
            @change="elRateChange($event, 'logisticsScore')"
          >
          </el-rate>
        </el-form-item>

        <el-form-item label="其他描述" prop="remark">
          <el-input
            type="textarea"
            style="width: 336px"
            placeholder="请输入其他描述"
            v-model="formData.remark"
            :autosize="{ minRows: 5, maxRows: 5 }"
          ></el-input>
        </el-form-item>

        <el-form-item label="上传照片" prop="image">
          <template>
            <cu-upload-image
              @uploadSuccess="upSuccess()"
              :files.sync="formData.image"
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
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  orderCenterSelectOrderDetail,
  orderCenterSaveOrderLsEvaluate,
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
        goodsId: null, //	商品id
        goodsType: null, //商品类型
        orderId: null, //订单id
        score: null, //综合评分
        goodsScore: null, //商品评分
        logisticsScore: null, //物流评分
        remark: "", //描述
        image: [
          // {
          //   name: "",
          //   url: "https://ydwsrz-20220710.eos-xinjiang-1.cmecloud.cn/upload/202211/1661303800619.png",
          // },
        ],
      },
      // 表单验证
      rulesformData: {
        score: [
          { required: true, message: "请选择综合评分", trigger: "change" },
        ],
        goodsScore: [
          { required: true, message: "请选择商品评分", trigger: "change" },
        ],
        logisticsScore: [
          { required: true, message: "请选择物流评分", trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入其他描述", trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传照片", trigger: "change" }],
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
            this.formData.goodsId = this.tableBody[0].goodsId;
            this.formData.goodsType = this.tableBody[0].goodsType;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 订单中心 => 零售订单评价-接口
    orderCenterSaveOrderLsEvaluateApi() {
      let valueData = {
        goodsId: this.formData.goodsId, //	商品id
        goodsType: this.formData.goodsType, //商品类型
        image: this.formData.image[0].url, //图片
        orderId: this.formData.orderId, //订单id
        remark: this.formData.remark, //描述
        score: this.formData.score, //综合评分
        goodsScore: this.formData.goodsScore, //商品评分
        logisticsScore: this.formData.logisticsScore, //物流评分
      };
      orderCenterSaveOrderLsEvaluate(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.handleClose();
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

    // 评分改变回调
    elRateChange(value, name) {
      this.formData[name] = value;
      this.$refs.refformData.validateField(name); //重置表单
    },
    // 上传成功钩子函数
    upSuccess(response, file, image) {
      this.formData.image.push(file);
      this.$refs.refformData.validateField("image"); //重置表单
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
            this.orderCenterSaveOrderLsEvaluateApi();
          }
        } else {
          // 失败
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.score = null;
      this.formData.goodsScore = null;
      this.formData.logisticsScore = null;
      this.formData.remark = "";
      this.formData.image = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.contentBox {
  width: 100%;
  height: calc(100% - 59px);
  overflow: auto;
  background: #ffffff;
  display: flex;
  .contentBox1 {
    width: 550px;
    .contentBox11 {
      margin: 64px auto 0px;
      width: 143px;
      height: 143px;
      img {
        width: 143px;
        height: 143px;
      }
    }
    .contentBox12 {
      margin: 24px auto 0px;
      width: 180px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
    }
    .contentBox13 {
      margin: 21px 0px 0px 0px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #020552;
    }
    .contentBox14 {
      margin: 5px auto 0px;
      width: 180px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }
  .contentBox2 {
    margin-top: 64px;
    width: 650px;
    .contentBox21 {
      display: flex;
      justify-content: flex-end;
      margin: 123px 105px 0px 0px;
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
      }
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
// 评分样式
::v-deep .el-rate__icon {
  font-size: 35px;
}
</style>
