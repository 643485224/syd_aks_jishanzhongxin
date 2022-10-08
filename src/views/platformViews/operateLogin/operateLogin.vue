<template>
  <div class="login">
    <div class="login-logo"></div>
    <!--如果有轮播的话: 轮播位置-->
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="login-banner">
        <div class="login-banner-img"></div>
        <div>
          <div class="login-banner-title">
            阿克苏药品集散中心
            <div style="font-wight: bolder; font-weight: 600; font-size: 52px">
              网数融综管运服平台
              <span v-if="currentPlatform == 'operation'">运营平台</span>
              <span v-if="currentPlatform == 'supplier'">供应商</span>
              <span v-if="currentPlatform == 'purchaser'">采购商</span>
            </div>
          </div>
          <div class="login-banner-titleX">
            怎么
            <span v-if="currentPlatform == 'operation'">运营</span>
            <span v-if="currentPlatform == 'supplier'">供应</span>
            <span v-if="currentPlatform == 'purchaser'">采购</span>
            你说了算
          </div>
        </div>
      </div>
    </cu-animation>
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="formTopTitle">
        <div class="formTopTitle_one"></div>
        <div class="formTopTitle_two" @click="clickRuterButton('/webHomePage')">
          网站首页
        </div>
      </div>
      <div class="login-form" id="login-form">
        <div class="login-form-body">
          <div
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
              <!-- <el-radio-group
                  class="platform-radios"
                  v-model="currentPlatform"
                  @change="platformChange()"
                >
                  <el-radio label="operation">运营</el-radio>
                  <el-radio label="supplier">供应</el-radio>
                  <el-radio label="purchaser">采购</el-radio>
                </el-radio-group> -->
              <el-tag
                effect="plain"
                style="
                  border-color: #00c1de;
                  color: #00c1de;
                  background: #e6f9fc;
                "
                >扫码登录</el-tag
              >
            </div>
            <!-- 账号 -->
            <div
              class="login-form-section"
              :style="
                select.username
                  ? 'border-bottom: 0.0133333333rem solid #1990ff'
                  : ''
              "
            >
              <div class="section-icon">
                <img src="./image/userAction.svg" v-if="select.username" />
                <img src="./image/user.svg" v-else />
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
              :style="
                select.password
                  ? 'border-bottom: 0.0133333333rem solid #1990ff'
                  : ''
              "
            >
              <div class="section-icon">
                <img src="./image/password.svg" v-if="select.password" />
                <img src="./image/passwordAction.svg" v-else />
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
            <!-- 验证码 -->
            <div
              v-if="this.currentPlatform == 'operation'"
              class="login-form-section"
              :style="
                select.code
                  ? 'border-bottom: 0.0133333333rem solid #1990ff'
                  : ''
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
              <a
                class="login-form-forgetPassword-two"
                @click="clickRuterButton('/Register')"
                >免费注册
              </a>
            </div>
            <div class="login-form-qita">
              <span>其他登录方式：</span>
              <div class="login-form-qita-qiu"></div>
              <div class="login-form-qita-qiu"></div>
              <div class="login-form-qita-qiu"></div>
              <div class="login-form-qita-qiu"></div>
            </div>
          </div>
        </div>
      </div>
    </cu-animation>
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
} from "../../../api/aksApi/platformApi/loginApi";
import { mapState } from "vuex";
export default {
  data() {
    return {
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

      currentPlatform: "", //区分operation(运营)、supplier(供应)、purchaser(采购)
    };
  },
  mounted() {
    this.setRemUnit(); //自适应

    this.captchaApi(); // 获取验证码

    this.currentPlatform = "operation";
    this.$store.commit("switchPlatform", this.currentPlatform);
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
        //  currentPlatform: "", //operation(运营)、supplier(供应)、purchaser(采购)
        if (this.currentPlatform == "operation") {
          this.operationLogin();
        } else if (this.currentPlatform == "supplier") {
          this.supplierLogin();
        } else if (this.currentPlatform == "purchaser") {
          this.purchaserLogin();
        }
      }
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
      this.$store.commit("resetTagItem");
      this.$message.success(res.message);
    },
    // 供应商登录
    async supplierLogin() {
      let valueData = {
        username: this.form.username,
        password: this.form.password,
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
      this.$router.push("/main/supplierWorkbench");
      this.$store.commit("resetTagItem");
      this.$message.success(res.message);
    },
    // 采购商登录
    async purchaserLogin() {
      let valueData = {
        username: this.form.username,
        password: this.form.password,
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
      this.$router.push("/main/purchaserHome");
      this.$store.commit("resetTagItem");
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
      return;
      getAllMenuList()
        .then((res) => {
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
      this.$router.push("/Password");
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
  background: url("./image/LoginBg.png") no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: scroll;
  display: flex;
  align-items: center;
  padding-right: rpxToRem(100.92);
  justify-content: space-between;

  &-banner {
    display: flex;
    // align-items: center;

    &-img {
      width: rpxToRem(56.64);
      height: rpxToRem(56.64);
      background: url("./image/LoginLogo.png");
      margin-right: rpxToRem(10);
      background-size: 100% 100%;
    }

    &-title {
      font-size: rpxToRem(14.32);
      margin-bottom: rpxToRem(10);
    }

    &-titleX {
      font-size: rpxToRem(10.32);
    }

    color: #ffffff;

    img {
      width: rpxToRem(421.88);
      height: rpxToRem(307.81);
    }
  }

  &-form {
    // width: rpxToRem(200);
    // height: rpxToRem(220);
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);
    // border-radius: rpxToRem(10.75);
    padding: rpxToRem(20);

    &-bodyRightTitle {
      font-size: rpxToRem(8);
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: rpxToRem(6);
    }

    &-section {
      display: flex;
      align-items: center;
      // width: rpxToRem(133);
      margin-bottom: rpxToRem(6);
      border-bottom: rpxToRem(1) solid rgba(0, 0, 0, 0.06);
      padding: rpxToRem(6.68) 0;

      .section-icon {
        display: flex;

        img {
          color: red;
          width: rpxToRem(11.72);
          height: rpxToRem(11.72);
        }
      }

      .section-input {
        margin-left: rpxToRem(7.81);
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;

        input {
          height: 100%;
          width: 100%;
          border: none;
          font-size: rpxToRem(8);
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

    &-button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-submit {
      margin-top: rpxToRem(6);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: rpxToRem(15.47);
      background: #00c1de;

      // border-radius: rpxToRem(2);
      .submit-label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: rpxToRem(7);
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
        color: #999999;
        font-size: rpxToRem(6);
        margin-right: rpxToRem(8);
      }

      &-one:hover {
        text-decoration: underline;
      }

      &-two {
        color: #999999;
        font-size: rpxToRem(6);
      }

      &-two:hover {
        text-decoration: underline;
      }
    }

    &-qita {
      color: #999999;
      font-size: rpxToRem(6);
      display: flex;
      align-items: center;
      span {
        margin-right: rpxToRem(6);
      }
      &-qiu {
        height: rpxToRem(14);
        width: rpxToRem(14);
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

.active {
  color: #00023a;
}

.formTopTitle {
  display: flex;
  justify-content: space-between;
  margin-top: rpxToRem(6);
  margin-bottom: rpxToRem(10);
  color: #ffffff;
  .formTopTitle_one {
    font-size: rpxToRem(6);
    margin-right: rpxToRem(8);
  }

  .formTopTitle_one:hover {
    text-decoration: underline;
  }

  .formTopTitle_two {
    font-size: rpxToRem(6);
  }

  .formTopTitle_two:hover {
    text-decoration: underline;
  }
}
</style>
