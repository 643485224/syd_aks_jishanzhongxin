<template>
  <!-- 设置支付密码组件弹框 -->
  <div>
    <cu-dialog
      width="600px"
      title="设置支付密码"
      :center="'center'"
      :showClose="true"
      :visible="setPaymentPasswordVisible"
      @handleClose="setPaymentPasswordHandleClose()"
      @handleOk="setPaymentPasswordHandleOk()"
    >
      <cu-form
        ref="form"
        :formData.sync="payPassForm"
        :formRule="payPassFormRule"
        class="form"
        :labelWidth="'120px'"
        @submitForm="changePayPassOK"
        @closeForm="setPaymentPasswordHandleClose()"
      >
        <template v-slot:code="value">
          <el-input
            v-model="value.form[value.value.key]"
            :placeholder="value.value.placeholder"
          ></el-input>
        </template>
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import { setPayPassword } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
export default {
  name: "setPaymentPasswordsetPaymentPassword",
  data() {
    return {
      payPassForm: {
        payPassword: "",
        checkPayPassword: "",
      },
      payPassFormRule: [
        {
          key: "payPassword",
          view: "input-password",
          label: "支付密码",
          placeholder: "请输入支付密码",
          rules: [
            {
              required: true,
              trigger: "blur",
              validator: "validatePayPassword",
            },
          ],
        },
        {
          key: "checkPayPassword",
          view: "input-password",
          label: "确认支付密码",
          placeholder: "请再次输入支付密码",
          rules: [
            {
              required: true,
              trigger: "blur",
              validator: "validateCheckPayPassword",
            },
          ],
        },
      ],
    };
  },
  props: {
    setPaymentPasswordVisible: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.payPassForm.payPassword = "";
    this.payPassForm.checkPayPassword = "";
  },
  methods: {
    setPaymentPasswordHandleClose() {
      this.$emit("setPaymentPasswordHandleClose", false);
    },
    setPaymentPasswordHandleOk() {
      this.$emit("setPaymentPasswordHandleClose", false);
    },
    changePayPassOK(formData, formRef) {
      let valueData = new FormData();
      valueData.append("payPassword", formData.checkPayPassword);
      console.log("valueData:", valueData);
      setPayPassword(valueData)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.message);
            this.$emit("setPaymentPasswordHandleClose", false);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./setPaymentPassword.scss";
</style>
