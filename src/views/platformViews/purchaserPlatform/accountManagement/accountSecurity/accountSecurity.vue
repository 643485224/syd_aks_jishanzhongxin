<template>
  <div class="page-container table-page">
    <div class="enterprise-info">
      <div class="info">
        <div class="info-title">账号信息</div>
        <div class="info-content">
          <div class="info-item">
            <div class="label">企业单位名称:</div>
            {{ info.unitName }}
          </div>
          <div class="info-item">
            <div class="label">账号:</div>
            {{ info.username }}
          </div>
          <div class="info-item">
            <div class="label">手机号码:</div>
            {{ buyerAccountManageGetUserAndPhoneReturnPhone }}
          </div>
        </div>
      </div>
      <div class="info">
        <div class="info-title">安全管理</div>
        <div class="info-content">
          <div class="operate-item">
            <div class="label">手机号码:</div>
            <div class="operate-desc">
              {{ buyerAccountManageGetUserAndPhoneReturnPhone }}
            </div>
            <el-button
              type="text"
              size="mini"
              class="operate-btn"
              @click="phoneVisibleButton"
              >修改</el-button
            >
          </div>
          <div class="operate-item">
            <div class="label">登录密码修改:</div>
            <div class="operate-desc">******</div>
            <el-button
              type="text"
              size="mini"
              class="operate-btn"
              @click="loginPasswordVisibleButton"
              >修改</el-button
            >
          </div>
          <div class="operate-item" v-if="!info.payPassword">
            <div class="label">设置支付密码:</div>
            <div class="operate-desc">******</div>
            <el-button
              type="text"
              size="mini"
              class="operate-btn"
              @click="setPaymentPasswordButton"
              >设置</el-button
            >
          </div>
          <div class="operate-item" v-else>
            <div class="label">支付密码修改:</div>
            <div class="operate-desc">******</div>
            <el-button
              type="text"
              size="mini"
              class="operate-btn"
              @click="showPayPassDialogButton"
              >修改</el-button
            >
          </div>
          <!-- <div class="operate-item">
            <div class="label">密保问题管理:</div>
            <div class="operate-desc">
              密保问题由3个问题以及问题答案组成，专门用于您忘记密码时找回密码。密保问题一旦设置提交，则启动密保保护，
              可通过密保问题找回密码，如未设置，则不能通过密保问题找回密码。
            </div>
            <el-button
              type="text"
              size="mini"
              class="operate-btn"
              @click="setQuestion"
              >修改</el-button
            >
          </div> -->
        </div>
      </div>
    </div>
    <cu-dialog
      :title="'修改手机号'"
      width="520px"
      :visible="phoneVisible"
      :showClose="true"
      @handleClose="phoneHandleClose"
      @handleOk="phoneHandleOk"
    >
      <el-form
        class="phoneDialogClass"
        :label-position="'right'"
        :model="buyerAccountManageUpdatePhoneOut"
        :rules="rulesbuyerAccountManageUpdatePhoneOut"
        ref="refbuyerAccountManageUpdatePhoneOut"
        label-width="110px"
      >
        <el-form-item label="当前手机号" prop="oldPhone">
          <el-input
            :disabled="true"
            v-model="buyerAccountManageUpdatePhoneOut.oldPhone"
            placeholder="请输入当前手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="newPhone" style="margin-bottom: 0">
          <el-input
            v-model="buyerAccountManageUpdatePhoneOut.newPhone"
            placeholder="请输入新手机号"
          ></el-input>
        </el-form-item>
      </el-form>
    </cu-dialog>
    <cu-dialog
      :title="'修改登录密码'"
      width="520px"
      :visible="loginPasswordVisible"
      :showClose="true"
      @handleClose="loginPasswordHandleClose"
      @handleOk="loginPasswordHandleOk"
    >
      <el-form
        class="phoneDialogClass"
        :label-position="'right'"
        :model="buyerAccountManageUpdateAccountOut"
        :rules="rulesbuyerAccountManageUpdateAccountOut"
        ref="refbuyerAccountManageUpdateAccountOut"
        label-width="110px"
      >
        <el-form-item label="登录账号" prop="loginAccount">
          <el-input
            :disabled="true"
            v-model="buyerAccountManageUpdateAccountOut.loginAccount"
            placeholder="请输入登录账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="原登录密码" prop="oldPassword">
          <el-input
            show-password
            v-model="buyerAccountManageUpdateAccountOut.oldPassword"
            placeholder="请输入原登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            show-password
            v-model="buyerAccountManageUpdateAccountOut.password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="password2">
          <el-input
            show-password
            v-model="buyerAccountManageUpdateAccountOut.password2"
            placeholder="请输入确认新密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </cu-dialog>
    <cu-dialog
      :title="'修改支付密码'"
      width="600px"
      :visible="payPasswordVisible"
      :showClose="true"
      @handleClose="payPasswordHandleClose"
      @handleOk="payPasswordHandleOk"
    >
      <cu-form
        ref="formss"
        :formData.sync="payPassForm"
        :formRule="payPassFormRule"
        class="form"
        :labelWidth="'120px'"
        @submitForm="changePayPassOK"
        @closeForm="payPasswordVisible = false"
      >
        <template v-slot:code="value">
          <el-input
            type="text"
            v-model="value.form[value.value.key]"
            :placeholder="value.value.placeholder"
            autocomplete="new-password"
          ></el-input>
          <el-button
            type="primary"
            size="mini"
            class="form-btn"
            @click="getCode"
            >获取验证码</el-button
          >
        </template>
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>

    <setPaymentPasswordsetPaymentPassword
      v-if="setPaymentPasswordVisible"
      :setPaymentPasswordVisible="setPaymentPasswordVisible"
      @setPaymentPasswordHandleClose="setPaymentPasswordHandleClose"
    ></setPaymentPasswordsetPaymentPassword>
  </div>
</template>
<script>
import { captcha, userInfo } from "@/api/aksApi/platformApi/loginApi.js";
import { mapState } from "vuex";
import test from "@/cuview-ui/function/test.js";
import {
  buyerAccountManageGetBuyer,
  buyerAccountManageUpdatePayPwd,
  buyerAccountManageUpdatePhone,
  buyerAccountManageUpdateAccount,
  buyerAccountManageGetUserAndPhone,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import setPaymentPasswordsetPaymentPassword from "../../components/setPaymentPassword/setPaymentPassword.vue";
export default {
  components: {
    setPaymentPasswordsetPaymentPassword,
  },
  data() {
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      if (!test.code(value)) {
        return callback(new Error("验证码格式不正确"));
      }
      return callback();
    };

    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新手机号不能为空"));
      } else if (!test.mobile(value)) {
        return callback(new Error("手机格式不正确"));
      } else {
        callback();
      }
    };
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("原登录密码不能为空"));
      } else if (!test.password(value)) {
        return callback(new Error("密码需6-12位数字、字母组合"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (!test.password(value)) {
        return callback(new Error("密码需6-12位数字、字母组合"));
      } else {
        if (this.buyerAccountManageUpdateAccountOut.password2 !== "") {
          this.$refs.refbuyerAccountManageUpdateAccountOut.validateField(
            "password2"
          );
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认新密码不能为空"));
      } else if (value !== this.buyerAccountManageUpdateAccountOut.password) {
        callback(new Error("两次输入密码不一致!"));
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
      supplierTypes: {
        1: "药品",
        2: "器械",
      },
      info: {},
      phoneForm: {
        oldPhone: "",
        newPhone: "",
        code: "",
      },
      phoneFormRule: [
        {
          key: "oldPhone",
          view: "input",
          label: "已登录手机号",
          disabled: true,
          placeholder: "",
        },
        {
          key: "newPhone",
          view: "input",
          label: "新手机号",
          placeholder: "",
          rules: [
            { required: true, message: "请输入新手机号", trigger: "blur" },
            {
              max: 11,
              message: "请输入正确的手机号",
              trigger: "blur",
              validator: "validateMobile",
            },
          ],
        },
        // {
        //   key: 'code',
        //   view: 'input',
        //   label: '手机验证码',
        //   placeholder: '',
        //   rules: [{ required: true, message: "请输入手机验证码", trigger: "blur", validator: validateCode }],
        // },
      ],

      passForm: {
        account: "",
        oldPassword: "",
        password: "",
        checkPassword: "",
      },
      passFormRule: [
        {
          key: "account",
          view: "input",
          label: "登录账号",
          disabled: true,
          placeholder: "",
        },
        {
          key: "oldPassword",
          view: "input",
          label: "原登录密码",
          placeholder: "",
          rules: [
            { required: true, message: "请输入原登录密码", trigger: "blur" },
          ],
        },
        {
          key: "password",
          view: "input-password",
          label: "密码",
          placeholder: "请输入密码",
          rules: [
            { required: true, message: "请输入密码", trigger: "change" },
            {
              min: 6,
              max: 12,
              message: "密码需6-12位数字、字母组合(不能纯数字)",
              trigger: "blur",
              validator: "validatePass",
            },
          ],
        },
        {
          key: "checkPassword",
          view: "input-password",
          label: "确认密码",
          placeholder: "请确认密码",
          rules: [
            { required: true, message: "请确认密码", trigger: "change" },
            {
              min: 6,
              max: 12,
              message: "两次输入密码不一致",
              trigger: "blur",
              validator: "validateCheckPass",
            },
          ],
        },
      ],
      payPassForm: {
        oldPayPassword: "",
        payPassword: "",
        checkPayPassword: "",
      },
      payPassFormRule: [
        {
          key: "oldPayPassword",
          view: "input-password",
          label: "原支付密码",
          placeholder: "",
          rules: [
            {
              required: true,
              validator: "validatePayPassword",
              trigger: "blur",
            },
          ],
        },
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

      setPaymentPasswordVisible: false, //设置支付密码弹框

      // 获取当前账号手机号-接口回参
      buyerAccountManageGetUserAndPhoneReturn: {},
      buyerAccountManageGetUserAndPhoneReturnPhone: "", //手机号 默认为130****1861 中间四个星星的格式
      // 修改当前账号手机号-弹框
      phoneVisible: false,
      // 修改当前账号手机号-接口传参
      buyerAccountManageUpdatePhoneOut: {
        oldPhone: "",
        newPhone: "", //新手机号
      },
      // 修改当前账号手机号-表单验证
      rulesbuyerAccountManageUpdatePhoneOut: {
        oldPhone: [
          { required: true, message: "当前手机号不能为空", trigger: "blur" },
        ],
        newPhone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
      },

      // 修改当前账号密码-弹框
      loginPasswordVisible: false,
      // 修改当前账号密码-接口传参
      buyerAccountManageUpdateAccountOut: {
        loginAccount: "", //登录账号
        oldPassword: "", //原登录密码
        password: "", //新密码
        password2: "", //确认新密码
      },
      // 修改当前账号密码-表单验证
      rulesbuyerAccountManageUpdateAccountOut: {
        loginAccount: [
          { required: true, message: "登录账号不能为空", trigger: "blur" },
        ],
        oldPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateOldPass,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass,
          },
        ],
        password2: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass2,
          },
        ],
      },

      // 修改支付密码-弹框
      payPasswordVisible: false,
    };
  },
  created() {
    this.buyerAccountManageGetBuyerApi(); // 获取企业信息-接口
    this.buyerAccountManageGetUserAndPhoneApi(); // 获取当前账号手机号-接口
    this.passForm.account = this.vuex_user.name;
  },
  computed: {
    ...mapState(["vuex_user", "vuex_token"]),
  },
  methods: {
    // 获取当前账号手机号-接口
    buyerAccountManageGetUserAndPhoneApi() {
      buyerAccountManageGetUserAndPhone()
        .then((res) => {
          if (res.code == 200) {
            this.buyerAccountManageUpdatePhoneOut.oldPhone = res.data.phone;
            this.buyerAccountManageUpdateAccountOut.loginAccount =
              res.data.username;
            this.buyerAccountManageGetUserAndPhoneReturn = res.data;
            this.buyerAccountManageGetUserAndPhoneReturnPhone =
              this.buyerAccountManageGetUserAndPhoneReturn.phone.slice(0, 3) +
              "****" +
              this.buyerAccountManageGetUserAndPhoneReturn.phone.slice(7, 12);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取企业信息-接口
    buyerAccountManageGetBuyerApi() {
      buyerAccountManageGetBuyer()
        .then((res) => {
          if (res.code == 200) {
            this.info = res.data;
          } else {
            this.$message.warning("企业信息获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getCode() {
      captcha()
        .then((res) => {
          if (res.code == 200) {
            this.info = res.data;
          } else {
            this.$message.warning("验证码发送失败，请稍后重试");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setQuestion() {
      this.$message.info("该功能尚未开放");
    },
    // 修改手机号码按钮
    phoneVisibleButton() {
      this.phoneVisible = true;
    },
    // 修改手机号码弹框-取消按钮
    phoneHandleClose() {
      this.resetForm("refbuyerAccountManageUpdatePhoneOut");
    },
    // 修改手机号码弹框-确定按钮
    phoneHandleOk() {
      this.submitForm("refbuyerAccountManageUpdatePhoneOut"); //表单验证
    },
    // 修改当前账号手机号-接口
    buyerAccountManageUpdatePhoneApi() {
      let valueData = new FormData();
      valueData.append(
        "oldPhone",
        this.buyerAccountManageUpdatePhoneOut.oldPhone
      );
      valueData.append(
        "newPhone",
        this.buyerAccountManageUpdatePhoneOut.newPhone
      );
      buyerAccountManageUpdatePhone(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.resetForm("refbuyerAccountManageUpdatePhoneOut");
            this.$message.success("手机号码修改成功");
            this.buyerAccountManageGetUserAndPhoneApi();
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改登录密码按钮
    loginPasswordVisibleButton() {
      this.loginPasswordVisible = true;
    },
    // 修改登录密码弹框-取消按钮
    loginPasswordHandleClose() {
      this.resetForm("refbuyerAccountManageUpdateAccountOut");
    },
    // 修改登录密码弹框-确定按钮
    loginPasswordHandleOk() {
      this.submitForm("refbuyerAccountManageUpdateAccountOut");
    },
    // 修改当前账号密码-接口
    buyerAccountManageUpdateAccountApi() {
      let valueData = new FormData();
      valueData.append(
        "oldPassword",
        this.buyerAccountManageUpdateAccountOut.oldPassword
      );
      valueData.append(
        "newPassword",
        this.buyerAccountManageUpdateAccountOut.password2
      );
      buyerAccountManageUpdateAccount(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.resetForm("refbuyerAccountManageUpdateAccountOut"); //表单重置
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserInfo() {
      let token = this.vuex_token;
      userInfo({ name: token })
        .then((res) => {
          let { permissions, user } = res;
          this.$store.commit("$uStore", {
            name: "vuex_user",
            value: user,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 支付密码修改按钮
    showPayPassDialogButton() {
      this.payPasswordVisible = true;
      this.$refs.formss.resetForm();
    },
    // 支付密码修改弹框-取消按钮
    payPasswordHandleClose() {
      this.payPasswordVisible = false;
    },
    // 支付密码修改弹框-确定按钮
    payPasswordHandleOk() {},

    changePayPassOK(formData, formRef) {
      let valueData = new FormData();
      valueData.append("oldPayPwd", formData.oldPayPassword);
      valueData.append("newPayPwd", formData.checkPayPassword);
      buyerAccountManageUpdatePayPwd(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.payPasswordVisible = false;
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 设置支付密码按钮
    setPaymentPasswordButton() {
      this.setPaymentPasswordVisible = true;
    },
    setPaymentPasswordHandleClose(value) {
      this.setPaymentPasswordVisible = value;
      this.buyerAccountManageGetBuyerApi(); // 获取企业信息-接口
    },
    setPaymentPasswordHandleOk(value) {
      this.setPaymentPasswordVisible = value;
      this.buyerAccountManageGetBuyerApi(); // 获取企业信息-接口
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 成功
          if (formName == "refbuyerAccountManageUpdatePhoneOut") {
            this.buyerAccountManageUpdatePhoneApi();
          } else if (formName == "refbuyerAccountManageUpdateAccountOut") {
            this.buyerAccountManageUpdateAccountApi();
          }
        } else {
          // 失败
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 修改当前账号手机号
      this.phoneVisible = false;
      this.buyerAccountManageUpdatePhoneOut.newPhone = "";
      // 修改当前账号密码
      this.loginPasswordVisible = false;
      this.buyerAccountManageUpdateAccountOut.oldPassword = "";
      this.buyerAccountManageUpdateAccountOut.password = "";
      this.buyerAccountManageUpdateAccountOut.password2 = "";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./accountSecurity.scss";
</style>
