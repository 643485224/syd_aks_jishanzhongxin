<template>
  <div class="login">
    <div class="login-header">
      <div class="header-left">
        <div class="header-logo"></div>
        <p class="logo-text">国内独家线下线上无缝粘合采配管运服平台</p>
      </div>
      <div class="header-right">
        <div class="header-title" @click="clickRuterButton('/webHomePage')">
          网站首页
        </div>
      </div>
    </div>
    <cu-animation
      class="login-content"
      ref="cu_animation"
      :type="'flipInY'"
      :time="0.5"
    >
      <div class="login-form" id="login-form">
        <div
          class="login-form-body"
          v-loading="isLogin"
          element-loading-text="加载中，请稍后"
          element-loading-spinner="el-icon-loading"
        >
          <div class="login-form-bodyRightTitle">
            <span class="active" v-if="currentPlatform == 'operation'"
              >运营平台登录</span
            >
            <span class="active" v-if="currentPlatform == 'supplier'"
              >供应商登录</span
            >
            <span class="active" v-if="currentPlatform == 'purchaser'"
              >采购商登录</span
            >
            <span class="active" v-if="currentPlatform == 'supervise'"
              >监管部门登录</span
            >
            <span class="active" v-if="currentPlatform == 'RetailPurchase'"
              >用户登录</span
            >
            <el-tag
              effect="plain"
              style="
                border-color: #00c1de;
                color: #00c1de;
                background: #e6f9fc;
                font-size:14px;
              "
              >扫码登录</el-tag
            >
          </div>
          <div
            class="login-form-sction-radio"
            v-if="currentPlatform == 'supplier'"
          >
            <div class="section-lable">类型:</div>
            <el-radio-group v-model="qyType">
              <el-radio
                :label="+value"
                class="el_radio"
                v-for="(label, value) in supplierTypes"
                :key="value"
                >{{ label }}
              </el-radio>
            </el-radio-group>
          </div>
          <div
            class="login-form-sction-radio"
            v-if="currentPlatform == 'purchaser'"
          >
            <div class="section-lable">类型:</div>
            <el-radio-group v-model="qyType">
              <el-radio :label="1" class="el_radio">公立医院</el-radio>
              <el-radio :label="2" class="el_radio">私立医院</el-radio>
              <el-radio :label="3" class="el_radio">药店</el-radio>
              <el-radio :label="4" class="el_radio">个体</el-radio>
            </el-radio-group>
          </div>
          <div
            class="login-form-sction-radio"
            v-if="currentPlatform == 'supervise'"
          >
            <div class="section-lable">类型:</div>
            <el-radio-group v-model="qyType">
              <el-radio :label="1" class="el_radio">卫生健康部</el-radio>
              <el-radio :label="2" class="el_radio">医疗保障部门</el-radio>
              <el-radio :label="3" class="el_radio">药监部门</el-radio>
              <el-radio :label="4" class="el_radio">其他监管部门</el-radio>
            </el-radio-group>
          </div>
          <!-- 账号 -->
          <div
            class="login-form-section"
            :style="'border-bottom: 0.0133333333rem solid #eee'"
          >
            <div class="section-icon">
              <!-- <img src="./image/userAction.svg" v-if="select.username" /> -->
              <i class="el-icon el-icon-user"></i>
            </div>
            <div class="section-input">
              <input
                type="text"
                @focus="select.username = true"
                v-model="form.username"
                @keydown.enter="onSubmit"
                @blur="select.username = false"
                placeholder="请输入账号"
              />
            </div>
          </div>
          <!-- 密码 -->
          <div
            class="login-form-section"
            :style="'border-bottom: 0.0133333333rem solid #eee'"
          >
            <div class="section-icon">
              <!-- <img src="./image/password.svg" v-if="select.password" /> -->
              <i class="el-icon el-icon-lock"></i>
            </div>

            <div class="section-input">
              <input
                :type="select.eyes ? 'text' : 'password'"
                v-model="form.password"
                @keydown.enter="onSubmit"
                @focus="select.password = true"
                @blur="select.password = false"
                placeholder="请输入密码"
              />
            </div>
            <div class="section-right" @click="select.eyes = !select.eyes">
              <img src="./image/eyeAction.svg" v-if="select.eyes" />
              <img src="./image/eye.svg" v-else />
            </div>
          </div>
          <!-- 运营验证码 -->
          <div
            v-if="this.currentPlatform == 'operation'"
            class="login-form-section"
            :style="
              select.code ? 'border-bottom: 0.0133333333rem solid #1990ff' : ''
            "
          >
            <div class="section-icon" @click="captchaApi">
              <img :src="imageUrl" style="width: 100px; height: 40px" />
            </div>
            <div class="section-input">
              <input
                type="text"
                @focus="select.code = true"
                v-model="form.code"
                @keydown.enter="onSubmit"
                @blur="select.code = false"
                placeholder="请输入验证码"
              />
            </div>
          </div>
           <!-- 监管平台验证码 -->
          <div
            v-if="this.currentPlatform == 'supervise'"
            class="login-form-section"
            :style="
              select.code ? 'border-bottom: 0.0133333333rem solid #1990ff' : ''
            "
          >
            <div class="section-icon" @click="captchaApi">
              <img :src="imageUrl" style="width: 100px; height: 40px" />
            </div>
            <div class="section-input">
              <input
                type="text"
                @focus="select.code = true"
                v-model="form.code"
                @keydown.enter="onSubmit"
                @blur="select.code = false"
                placeholder="请输入验证码"
              />
            </div>
          </div>
          <!-- 零购客户平台验证码 -->
          <div
            v-if="this.currentPlatform == 'RetailPurchase'"
            class="login-form-section"
            :style="
              select.code ? 'border-bottom: 0.0133333333rem solid #1990ff' : ''
            "
          >
            <div class="section-icon" @click="captchaApi">
              <img :src="imageUrl" style="width: 100px; height: 40px" />
            </div>
            <div class="section-input">
              <input
                type="text"
                @focus="select.code = true"
                v-model="form.code"
                @keydown.enter="onSubmit"
                @blur="select.code = false"
                placeholder="请输入验证码"
              />
            </div>
          </div>
          <div class="login-form-button">
            <div class="login-form-submit" @click="onSubmit">
              <div class="submit-label">登录</div>
              <div class="submit-filter"></div>
            </div>
          </div>
          <div class="login-form-forgetPassword">
            <div
              class="login-form-forgetPassword-one"
              @click="forgotPasswordClick"
            >
              忘记密码
            </div>
            <a v-if="loginType==5"
              class="login-form-forgetPassword-two"
              @click="clickRuterButton(`RetailRegistration`)"
              >免费注册
            </a>
            <a v-else
              class="login-form-forgetPassword-two"
              @click="clickRuterButton(`/Register?sysType=${loginType}`)"
              >免费注册
            </a>
          </div>
          <div class="login-form-qita">
            <span>第三方登录：</span>
            <div class="login-form-qita-qiu"></div>
            <div class="login-form-qita-qiu"></div>
            <div class="login-form-qita-qiu"></div>
            <div class="login-form-qita-qiu"></div>
          </div>
        </div>
      </div>
    </cu-animation>
    <div class="login-footer">
      <p>Copyright © 2022 阿克苏药品集散中心 ICP备17005284号-1</p>
    </div>
  </div>
</template>

<script>
// 自适应
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var docEl = document.documentElement;
    var rem = docEl.clientWidth / 10;
    if (document.getElementById("login-form")) {
      if (
        rem > docEl.style.fontSize.split("px")[0] &&
        document.body.clientHeight -
          document.getElementById("login-form").offsetHeight <
          150
      ) {
        return;
      }
    }
    docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
  }

  setRemUnit();
  window.setRemUnit = setRemUnit;

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);

import { catchAwait } from "@/utils/catchAwait.js";
import {
  captcha,
  login,
  buyerLogin,
  supplierLogin,
  getAllMenuList,
  userInfo,
  getMenusByUserId,
  superviseLogin,
  customerLogin
} from "../../../api/aksApi/platformApi/loginApi";
import { mapState } from "vuex";
import { supplierTypes } from "@/utils/httpDataTypes.js";

export default {
  data() {
    return {
      loginType: null, // 登录类型
      isLogin: false, //开启关闭加载中
      select: {
        username: false, //用户名
        password: false, //密码
        eyes: false, //密码眼睛
        code: false, //验证码
      },
      form: {
        username: "", //用户名
        password: "", //密码
        code: "", //验证码
      },
      imageUrl: "", //验证码图片
      qyType: 1, // 企业类型
      currentPlatform: "", //区分operation(运营)、supplier(供应)、purchaser(采购) supervise(监管部门)
      supplierTypes, // 供应商企业类型
    };
  },
  mounted() {
    this.setRemUnit(); //自适应

    this.captchaApi(); // 获取验证码
    console.log(this.vuex_platform);
    this.currentPlatform = this.vuex_platform || "operation";
    switch (this.currentPlatform) {
      case "operation":
        this.loginType = 1;
        break;
      case "purchaser":
        this.loginType = 2;
        break;
      case "supplier":
        this.loginType = 3;
        break;
      case "supervise":
        this.loginType = 4;
        break;
        case "RetailPurchase":
          this.loginType = 5;
          break;
      default:
        break;
    }
  },
  computed: {
    ...mapState(["vuex_platform"]),
  },
  methods: {
    //自适应
    setRemUnit() {
      var docEl = document.documentElement;
      var rem = docEl.clientWidth / 10;
      let fontSize = docEl.style.fontSize.split("px")[0];
      let abs =
        document.body.clientHeight -
        document.getElementById("login-form").offsetHeight;
      if (document.getElementById("login-form")) {
        if (rem > (fontSize ? fontSize : 0) && abs < 100) {
          docEl.style.fontSize = (abs < 0 ? 180 : rem) - Math.abs(abs) + "px";
          return;
        }
      }
      docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
    },
    // 获取验证码
    captchaApi() {
      captcha()
        .then((res) => {
          this.imageUrl = URL.createObjectURL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 登录按钮
    onSubmit() {
      if (this.isLogin) return this.$message.info("别着急,喝杯茶冷静下..");
      if (!this.form.username) {
        return this.$message.error("账号不能为空");
      } else if (!this.form.password) {
        return this.$message.error("密码不能为空");
      } else {
        this.isLogin = true;
        //  currentPlatform: "", //operation(运营)、supplier(供应)、purchaser(采购)supervise(监管部门)
        //RetailPurchase(零购平台)
        if (this.currentPlatform == "operation") {
          this.operationLogin();
        } else if (this.currentPlatform == "supplier") {
          this.supplierLogin();
        } else if (this.currentPlatform == "purchaser") {
          this.purchaserLogin();
        } else if (this.currentPlatform == "supervise") {
          this.superviseLoin();
        } else if(this.currentPlatform == "RetailPurchase"){
          this.RetailPurchase()
        }
      }
    },
    //零购平台登录接口
   async RetailPurchase(){
    if (!this.form.code) {
        this.isLogin = false;
        return this.$message.error("验证码不能为空");
      }
      let valueData = {
        username: this.form.username,
        password: this.form.password,
        code: this.form.code,
      };
      let [err, res] = await catchAwait(customerLogin(valueData));
      if (err) {
        return (this.isLogin = false);
      }
      if (res.code != 200) {
        this.isLogin = false;
        return this.$message.error(res.message);
      }
      this.$store.commit("$uStore", {
        name: "vuex_token",
        value: res.data,
      });
      
      this.$store.commit("$uStore", {
        name: "vuex_user",
        value: res.data.user,
      });
      this.$message({
        message: res.message,
        type: "success",
        duration: 2000,
      });
      // await this.getUserInfo(res.data.token);
      // // await this.getMenuList();  //暂时路由
      // this.isLogin = false;
      // this.$message({
      //   message: res.message,
      //   type: "success",
      //   duration: 2000,
      // });
    this.$router.push("/webPersonalMain/webRetailPurchaseHome"); // 直接跳转零购平台
    
   },
    //监管部门登录
    async superviseLoin() {
      console.log("监管部门");
      if (!this.form.code) {
        this.isLogin = false;
        return this.$message.error("验证码不能为空");
      }
      let valueData = {
        username: this.form.username,
        password: this.form.password,
        code: this.form.code,
        watchType: this.qyType,
      };

      let [err, res] = await catchAwait(superviseLogin(valueData));
      if (err) {
        return (this.isLogin = false);
      }
      if (res.code != 200) {
        this.isLogin = false;
        return this.$message.error(res.message);
      }
      this.$store.commit("$uStore", {
        name: "vuex_token",
        value: res.data,
      });
      this.$store.commit("$uStore", {
        name: "vuex_user",
        value: res.data.supervise,
      });
      // await this.getUserInfo(res.data.token);
      // await this.getMenuList();  //暂时路由
      this.isLogin = false;
      this.$message({
        message: res.message,
        type: "success",
        duration: 2000,
      });
      this.$router.push("/webSuperviseMain/webSuperviseDrugs"); // 直接跳转药品监管
      
    },
    // 运营平台登录
    async operationLogin() {
      if (!this.form.code) {
        this.isLogin = false;
        return this.$message.error("验证码不能为空");
      }
      let valueData = {
        username: this.form.username,
        password: this.form.password,
        code: this.form.code,
      };
      // 运营平台-用于运营平台登录-接口;
      let [err, res] = await catchAwait(login(valueData));
      console.log(res);
      if (err) {
        return (this.isLogin = false);
      }
      if (res.code != 200) {
        this.isLogin = false;
        return this.$message.error(res.message);
      }
      this.$store.commit("$uStore", {
        name: "vuex_token",
        value: res.data,
      });
      await this.getUserInfo(res.data.token);
      await this.getMenuList();
      this.isLogin = false;
      this.$router.push("/main/operationStatistics");
      this.$message({
        message: res.message,
        type: "success",
        duration: 2000,
      });
    },
    // 供应商登录
    async supplierLogin() {
      let valueData = {
        username: this.form.username,
        password: this.form.password,
        supplierType: this.qyType,
      };
      // 供应商-用于供应商登录-接口
      let [err, res] = await catchAwait(supplierLogin(valueData));
      if (err) {
        return (this.isLogin = false);
      }
      if (res.code != 200) {
        this.isLogin = false;
        return this.$message.error(res.message);
      }
      this.$store.commit("$uStore", {
        name: "vuex_token",
        value: res.data,
      });
      await this.getUserInfo(res.data.token);
      await this.getMenuList();
      this.isLogin = false;
      this.$router.push("/webHomePage");
      // this.$router.push("/main/supplierWorkbench");
      this.$message.success(res.message);
    },
    // 采购商登录
    async purchaserLogin() {
      let valueData = {
        username: this.form.username,
        password: this.form.password,
        buyerType: this.qyType,
      };
      // 采购商-用于采购商登录-接口
      let [err, res] = await catchAwait(buyerLogin(valueData));
      if (err) {
        return (this.isLogin = false);
      }
      if (res.code != 200) {
        this.isLogin = false;
        return this.$message.error(res.message);
      }
      this.$store.commit("$uStore", {
        name: "vuex_token",
        value: res.data,
      });
      await this.getUserInfo(res.data.token);
      await this.getMenuList();
      this.isLogin = false;
      this.$router.push("/webHomePage");
      // this.$router.push("/main/purchaserHome");
      this.$message.success(res.message);
    },
    // 获取当前用户绑定角色下 权限菜单列表
    async getMenuList() {
      let [err, res] = await catchAwait(getMenusByUserId());
      console.log(err, res.data);
      if (err || res.code != 200) {
        this.$message.error("获取权限菜单失败");
        return false;
      }
      this.$store.commit("saveLoginInfo", res.data);
    },
    async getUserInfo(token) {
      let [err, res] = await catchAwait(userInfo({ name: token }));
      console.log(err, res);
      if (err) {
        this.$message.error("获取用户信息失败");
      }
      this.$store.commit("$uStore", {
        name: "vuex_user",
        value: res.user,
      });
    },
    // 获取所有的菜单列表(非分页带层级关系用于绑定树形菜单控件)
    getAllMenuListApi() {
      getAllMenuList({ sysType: 3 })
        .then((res) => {
          console.log(res);
          console.log(this.$store);
          console.log(this.$store.state);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    clickLogin() {
      this.$router.push("/home");
    },

    // 忘记密码按钮
    forgotPasswordClick() {
      // this.$router.push("/password");
      //  currentPlatform: "", //operation(运营)、supplier(供应)、purchaser(采购)
      if (this.currentPlatform == "supplier") {
        this.$router.push("/password/?ksysType=3");
      } else if (this.currentPlatform == "operation") {
        this.$router.push("/password/?ksysType=1");
      } else if (this.currentPlatform == "purchaser") {
        this.$router.push("/password/?ksysType=2");
      }
      // console.log(this.currentPlatform);
      // console.log(this.$route.path);
    },
    // 动画重置
    platformChange() {
      this.$refs.cu_animation.again();
      this.$store.commit("switchPlatform", this.currentPlatform);
    },
    // 点击跳转
    clickRuterButton(value) {
      this.$router.push(value);
    },
  },
};
</script>
<style lang="scss" scoped>
$baseRem: 75;

/*@function double($n) {
  　　　　@return $n / $baseRem;　　}*/
// 1920*1080 状态下 rpxToRem(1) == 2.3266px
@function rpxToRem($args) {
  @return calc($args/$baseRem) * 1rem;
}

.login::-webkit-scrollbar {
  display: none;
}

.login {
  background: url("~@/assets/images/LoginBg.png") no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  overflow: scroll;
  padding-right: rpxToRem(100.92);
  &-header {
    padding-top: 35px;
    padding-bottom: 30px;
    padding-left: rpxToRem(100.92);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;

      .header-logo {
        width: rpxToRem(138.5);
        height: rpxToRem(23);
        background: url("~@/assets/images/textLogo.png");
        background-size: 100% 100%;
      }

      .logo-text {
        font-size: 18px;
        font-family: "FZXingKai-S04-Regular";
        font-weight: 400;
        color: #ffffff;
      }
    }

    .header-right {
      font-size: 24px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #ffffff;
      .header-title {
        cursor: pointer;
      }
    }
  }
  &-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &-form {
    width: rpxToRem(295);
    height: rpxToRem(310);
    // max-height: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);
    // border-radius: rpxToRem(10.75);
    padding: rpxToRem(14);
    &-body {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    &-bodyRightTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: rpxToRem(6);
      font-size: rpxToRem(23);
      font-weight: bold;
      color: #ff480e;
    }

    &-section {
      display: flex;
      align-items: center;
      // width: rpxToRem(133);
      margin-bottom: rpxToRem(8);
      border-bottom: rpxToRem(1) solid rgba(0, 0, 0, 0.06);
      padding: rpxToRem(5.68) 0;

      .section-icon {
        display: flex;

        ::v-deep .el-icon {
          font-size: rpxToRem(12.72);
          color: #020552;
        }

        img {
          width: rpxToRem(11.72);
          height: rpxToRem(11.72);
          color: #020552;
        }
      }

      .section-input {
        margin-left: rpxToRem(7.81);
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        // font-size: rpxToRem(12);
        input {
          height: 100%;
          width: 100%;
          border: none;
          font-size: rpxToRem(12);
          background-color: #fff !important;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-transition-delay: 99999s;
          -webkit-transition: color 99999s ease-out,
            background-color 99999s ease-out;
        }
      }

      .section-right {
        display: flex;

        img {
          width: rpxToRem(10.85);
          height: rpxToRem(10.85);
        }
      }
    }

    &-sction-radio {
      display: flex;
      padding: rpxToRem(4) 0 rpxToRem(12);
      line-height: 1;

      .section-lable {
        color: #00023a;
        white-space: nowrap;
        text-align: left;
        font-size: rpxToRem(12);
        margin-right: rpxToRem(10);
      }
      .el-radio {
        margin-bottom: rpxToRem(6);
      }
      ::v-deep.el-radio__input {
        vertical-align: inherit;
        font-size: 24px;
      }
      ::v-deep.el-radio__label {
        color: #00023a;
        font-size: rpxToRem(12);
      }
      ::v-deep.el-radio__inner {
        width: 18px;
        height: 18px;
      }
      ::v-deep.el-radio__input.is-checked + .el-radio__label {
        color: #409eff;
      }
    }

    &-button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-submit {
      margin-top: rpxToRem(4);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: rpxToRem(30);
      background: #ff480e;

      // border-radius: rpxToRem(2);
      .submit-label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rpxToRem(12);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        z-index: 2;
      }
    }

    &-submit:hover {
      transform: scale(1.01);
    }

    // 忘记密码样式
    &-forgetPassword {
      display: flex;
      justify-content: flex-end;
      margin-top: rpxToRem(6);
      margin-bottom: rpxToRem(10);

      &-one {
        color: #020552;
        font-size: rpxToRem(10);
        margin-right: rpxToRem(8);
      }

      &-one:hover {
        text-decoration: underline;
      }

      &-two {
        color: #020552;
        font-size: rpxToRem(10);
      }

      &-two:hover {
        text-decoration: underline;
      }
    }

    &-qita {
      color: #020552;
      font-size: rpxToRem(12);
      display: flex;
      align-items: center;

      span {
        margin-right: rpxToRem(6);
      }

      &-qiu {
        height: rpxToRem(24);
        width: rpxToRem(24);
        border-radius: 50%;
        background: #00c1de;
        margin-right: rpxToRem(6);
      }

      &-qiu:hover {
        transform: scale(1.01);
      }

      &-qiu:nth-child(2) {
        background: url("./image/dlzc_wx.png");
        background-size: 100% 100%;
      }

      &-qiu:nth-child(3) {
        background: url("./image/dlzc_zfb.png");
        background-size: 100% 100%;
      }

      &-qiu:nth-child(4) {
        background: url("./image/dlzc_qq.png");
        background-size: 100% 100%;
      }

      &-qiu:nth-child(5) {
        background: url("./image/dlzc_wb.png");
        background-size: 100% 100%;
      }
    }
  }
  &-footer {
    padding: 34px;
    text-align: center;
    font-size: rpxToRem(6);
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
  }
}

input {
  background: none;
  outline: none;
  border: 0;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: none;
  background: #fff;
  outline: none;
}
</style>
