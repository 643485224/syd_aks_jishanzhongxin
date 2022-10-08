<template>
  <div class="page-container table-page">
    <div class="enterprise-info">
      <div class="info ">
        <div class="info-title">账号信息</div>
        <div class="info-content">
          <div class="info-item">
            <div class="label">企业名称:</div>{{ info.unitName }}
          </div>
          <div class="info-item">
            <div class="label">登录账号:</div>{{ vuex_user.username }}
          </div>
          <div class="info-item">
            <div class="label">手机号码:</div>{{ vuex_user.phone }}
          </div>
        </div>
      </div>
      <div class="info ">
        <div class="info-title">安全管理</div>
        <div class="info-content ">
          <div class="operate-item">
            <div class="label">手机号码:</div>
            <div class="operate-desc">{{ vuex_user.phone }}</div>
            <el-button type="text" size="mini" class="operate-btn" @click="showPhoneDialog">修改</el-button>
          </div>
          <div class="operate-item">
            <div class="label">登录密码修改:</div>
            <div class="operate-desc">******</div>
            <el-button type="text" size="mini" class="operate-btn" @click="showPassDialog">修改</el-button>
          </div>
          <div class="operate-item" v-if="!info.payPassword">
            <div class="label">设置支付密码:</div>
            <div class="operate-desc">******</div>
            <el-button type="text" size="mini" class="operate-btn" @click="setPaymentPasswordButton">设置</el-button>
          </div>
          <div class="operate-item" v-else>
            <div class="label">支付密码修改:</div>
            <div class="operate-desc">******</div>
            <el-button type="text" size="mini" class="operate-btn" @click="showPayPassDialogButton">修改</el-button>
          </div>
          <!-- <div class="operate-item">
            <div class="label">密保问题管理:</div>
            <div class="operate-desc">
              密保问题由3个问题以及问题答案组成，专门用于您忘记密码时找回密码。密保问题一旦设置提交，则启动密保保护，
              可通过密保问题找回密码，如未设置，则不能通过密保问题找回密码。</div>
            <el-button type="text" size="mini" class="operate-btn" @click="setQuestion">修改</el-button>
          </div> -->

        </div>
      </div>
    </div>
    <cu-dialog :title="'修改手机号'" width="600px" :visible="phoneVisible" :showClose="true"
      @handleClose="phoneVisible = false">
      <!-- :destroyOnClose="true" @menuListInitData="menuListInitData"-->
      <cu-form ref="form" :formData.sync="phoneForm" :formRule="phoneFormRule" class="form" :labelWidth="'100px'"
        @submitForm="changePhoneOK" @closeForm="phoneVisible = false">
        <template v-slot:code="value">
          <el-input type="text" v-model="value.form[value.value.key]" :placeholder="value.value.placeholder"
            autocomplete="new-password"></el-input>
          <el-button type="primary" size="mini" class="form-btn" @click="getCode">获取验证码</el-button>
        </template>
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>
    <cu-dialog :title="'修改登录密码'" width="50vw" :visible="passVisible" :showClose="true"
      @handleClose="passVisible = false">
      <!-- :destroyOnClose="true" @menuListInitData="menuListInitData"-->
      <cu-form ref="form" :formData.sync="passForm" :formRule="passFormRule" class="form" :labelWidth="'100px'"
        @submitForm="changePassOK" @closeForm="passVisible = false">
        <template v-slot:code="value">
          <el-input type="text" v-model="value.form[value.value.key]" :placeholder="value.value.placeholder"
            autocomplete="new-password"></el-input>
          <el-button type="primary" size="mini" class="form-btn" @click="getCode">获取验证码</el-button>
        </template>
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>
    <cu-dialog :title="'修改支付密码'" width="600px" :visible="payPassVisible" :showClose="true"
      @handleClose="payPassVisible = false">
      <!-- :destroyOnClose="true" @menuListInitData="menuListInitData"-->
      <cu-form ref="forms" :formData.sync="payPassForm" :formRule="payPassFormRule" class="form" :labelWidth="'120px'"
        @submitForm="changePayPassOK" @closeForm="payPassVisible = false">
        <template v-slot:code="value">
          <el-input type="text" v-model="value.form[value.value.key]" :placeholder="value.value.placeholder"
            autocomplete="new-password"></el-input>
          <el-button type="primary" size="mini" class="form-btn" @click="getCode">获取验证码</el-button>
        </template>
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>

    <setPaymentPasswordsetPaymentPassword v-if="setPaymentPasswordVisible"
      :setPaymentPasswordVisible="setPaymentPasswordVisible"
      @setPaymentPasswordHandleClose="setPaymentPasswordHandleClose"></setPaymentPasswordsetPaymentPassword>
  </div>
</template>
<script>
import { getSupplier, updatePhone, updateAccount, changePayPassword} from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { captcha, userInfo } from "@/api/aksApi/platformApi/loginApi.js";
import { mapState } from "vuex";
import test from "@/cuview-ui/function/test.js";
import setPaymentPasswordsetPaymentPassword from "../components/setPaymentPassword/setPaymentPassword.vue";

const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("验证码不能为空"));
  }
  if (!test.code(value)) {
    return callback(new Error("验证码格式不正确"));
  }
  return callback();
}

export default {
  components: {
    setPaymentPasswordsetPaymentPassword
  },
  data() {
    return {
      supplierTypes: {
        1: '药品',
        2: '器械'
      },
      info: {},
      phoneVisible: false,
      phoneForm: {
        oldPhone: '',
        newPhone: '',
        code: ''

      },
      phoneFormRule: [
        {
          key: 'oldPhone',
          view: 'input',
          label: '已登录手机号',
          disabled: true,
          placeholder: '',
        },
        {
          key: 'newPhone',
          view: 'input',
          label: '新手机号',
          placeholder: '',
          rules: [
            { required: true, message: "请输入新手机号", trigger: "blur" },
            { max: 11, message: "请输入正确的手机号", trigger: "blur", validator: 'validateMobile' }
          ]
        },
        // {
        //   key: 'code',
        //   view: 'input',
        //   label: '手机验证码',
        //   placeholder: '',
        //   rules: [{ required: true, message: "请输入手机验证码", trigger: "blur", validator: validateCode }],
        // },
      ],
      passVisible: false,
      passForm: {
        account: '',
        oldPassword: '',
        password: '',
        checkPassword: '',
      },
      passFormRule: [
        {
          key: 'account',
          view: 'input',
          label: '登录账号',
          disabled: true,
          placeholder: '',
        },
        {
          key: 'oldPassword',
          view: 'input',
          label: '原登录密码',
          placeholder: '',
          rules: [
            { required: true, message: "请输入原登录密码", trigger: "blur" },
          ]
        },
        {
          key: 'password',
          view: 'input-password',
          label: '密码',
          placeholder: '请输入密码',
          rules: [
            { required: true, message: "请输入密码", trigger: "change" },
            { min: 6, max: 12, message: "密码需6-12位数字、字母组合(不能纯数字)", trigger: "blur", validator: 'validatePass' }
          ]
        },
        {
          key: 'checkPassword',
          view: 'input-password',
          label: '确认密码',
          placeholder: '请确认密码',
          rules: [
            { required: true, message: "请确认密码", trigger: "change" },
            { min: 6, max: 12, message: "两次输入密码不一致", trigger: "blur", validator: 'validateCheckPass' }
          ]
        },
      ],
      payPassVisible: false,
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
    }
  },
  created() {

  },
  mounted() {
    this.getEnterpriseInfo()
    this.phoneForm.oldPhone = this.vuex_user.phone;
    this.passForm.account = this.vuex_user.name;
  },
  computed: {
    ...mapState(['vuex_user', 'vuex_token'])
  },
  methods: {
    getEnterpriseInfo() {
      getSupplier().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.info = res.data;
          console.log(this.info);
        } else {
          this.$message.warning("企业信息获取失败")

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    getCode() {
      captcha().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.info = res.data;
          console.log(this.info);
        } else {
          this.$message.warning("验证码发送失败，请稍后重试")

        }
      }).catch((err) => {
        console.log(err);
      });
    },
    setQuestion() {
      this.$message.info("该功能尚未开放")
    },
    showPhoneDialog() {
      this.phoneVisible = true;
    },
    changePhoneOK() {
      let { oldPhone, newPhone } = this.phoneForm;
      let params = { oldPhone, newPhone }
      updatePhone(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.phoneForm.oldPhone = this.phoneForm.newPhone;
          this.$message.success("手机号码修改成功")
          this.getUserInfo()
          this.phoneVisible = false;

        } else {
          this.$message.warning(res.message)

        }
      }).catch((err) => {
        console.log(err);
      });

    },
    getUserInfo() {
      let token = this.vuex_token;
      userInfo({ name: token })
        .then((res) => {
          console.log(res);
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
    showPassDialog() {
      this.passVisible = true;

    },
    // 支付密码修改按钮
    showPayPassDialogButton() {
      this.payPassVisible = true;
  console.log(this.$refs.forms);
      this.$refs.forms.resetForm();
    },
    changePassOK(formData, formRef) {
      let { oldPassword, password } = formData;
      let params = { newPassword: password, oldPassword }
      updateAccount(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("账号密码修改成功")
          this.passVisible = false;

        } else {
          this.$message.warning(res.message)

        }
      }).catch((err) => {
        console.log(err);
      });

    },
    changePayPassOK(formData, formRef) {
      let valueData = new FormData();
      valueData.append("oldPayPassword", formData.oldPayPassword);
      valueData.append("newPayPassword", formData.checkPayPassword);
      changePayPassword(valueData)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("账号密码修改成功");
            this.payPassVisible = false;
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
      this.getEnterpriseInfo(); // 获取企业信息-接口
    },
    setPaymentPasswordHandleOk(value) {
      this.setPaymentPasswordVisible = value;
      this.getEnterpriseInfo(); // 获取企业信息-接口
    },
    getCode() {
      captcha().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.info = res.data;
          console.log(this.info);
        } else {
          this.$message.warning("验证码发送失败，请稍后重试")

        }
      }).catch((err) => {
        console.log(err);
      });
    },



  },
}
</script>
<style lang="scss" src="./supplierAccountSecurity.scss" scoped>

</style>
