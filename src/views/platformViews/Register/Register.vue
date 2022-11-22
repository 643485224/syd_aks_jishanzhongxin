<template>
  <div class="register">
    <!--如果有轮播的话: 轮播位置-->
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="register_one">
        <div class="register_one_img"></div>
        <div class="register_one_text">
          <div
            class="register_one_text1"
            @click="clickRuterButton('/webHomePage')"
          >
            网站首页
          </div>
          <div class="register_one_text1" @click="clickRuterButton('/login')">
            已有账号，前往登录
          </div>
        </div>
      </div>
    </cu-animation>
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="register_two">
        <!-- 供应商  紫色 #F5E8FF -->
        <!-- 采购商   绿色 #E2FFEC -->
        <div
          class="login_form"
          :style="
            sfType == '采购商' ? 'background:#E2FFEC' : 'background:#F5E8FF'
          "
          id="login-form"
        >
          <div class="login-form-body">
            <div
              v-loading="isLogin"
              element-loading-text="加载中，请稍后"
              element-loading-spinner="el-icon-loading"
            >
              <div class="flex formTitle1">
                注册账户
                <span v-if="sfType == '采购商'">（采购商）</span>
                <span v-if="sfType == '供应商'">（供应商）</span>
              </div>
              <div class="flex formTitle2 mb_20">SOURCEHANSANSCNREGULAR</div>
              <div class="flex_ac mb_20">
                <div class="form_lable">身份选择</div>
                <el-radio-group v-model="sfType" @change="platformChange()">
                  <el-radio label="采购商" class="el_radio">采购商</el-radio>
                  <el-radio label="供应商" class="el_radio">供应商</el-radio>
                </el-radio-group>
              </div>
              <div class="flex_ac mb_20">
                <div class="form_lable">类型选择</div>
                <el-radio-group v-if="sfType == '采购商'" v-model="qyType">
                  <el-radio :label="1" class="el_radio">公立医院</el-radio>
                  <el-radio :label="2" class="el_radio">私立医院</el-radio>
                  <el-radio :label="3" class="el_radio">药店</el-radio>
                  <el-radio :label="4" class="el_radio">个体</el-radio>
                </el-radio-group>
                <el-radio-group v-if="sfType == '供应商'" v-model="qyType">
                  <el-radio :label="+value" class="el_radio" v-for="label,value in supplierTypes" :key="value">{{label}} </el-radio>
                </el-radio-group>
              </div>
              <div v-show="sfType == '采购商'">
                <el-form
                  status-icon
                  :label-position="'right'"
                  :model="formCaiGouRenValue"
                  :rules="rulesformCaiGouRenValue"
                  ref="ruleFormCaiGouRen"
                  label-width="180px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="企业/单位名称" prop="unitName">
                    <el-input
                      v-model="formCaiGouRenValue.unitName"
                      placeholder="请输入企业/单位名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="企业统一编码" prop="unifiedCode">
                    <el-input
                      v-model="formCaiGouRenValue.unifiedCode"
                      placeholder="请输入企业统一编码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="登录账户" prop="username">
                    <el-input
                      v-model="formCaiGouRenValue.username"
                      placeholder="可使用数字、字母，请谨记账号"
                    ></el-input>
                  </el-form-item>
                  <el-row class="el_row">
                    <el-col :span="12" class="el_col">
                      <el-form-item label="密码" prop="password1">
                        <el-input
                          show-password
                          v-model="formCaiGouRenValue.password1"
                          placeholder="请输入密码"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="el_col">
                      <el-form-item label="确认密码" prop="password2">
                        <el-input
                          show-password
                          v-model="formCaiGouRenValue.password2"
                          placeholder="请输入确认密码"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="el_row">
                    <el-col :span="12" class="el_col">
                      <el-form-item label="手机号" prop="phone">
                        <el-input
                          v-model="formCaiGouRenValue.phone"
                          placeholder="请输入手机号"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="el_col">
                      <el-form-item label="验证码" prop="captcha">
                        <div class="flex">
                          <el-input
                            v-model="formCaiGouRenValue.captcha"
                            placeholder="请输入验证码"
                          ></el-input>
                          <el-button
                            type="primary"
                            class="size"
                            @click="useVerify"
                            :disabled="diflag"
                            >{{ titels
                            }}<span v-if="diflag"
                              >({{ times }})</span
                            ></el-button
                          >
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="el_row">
                    <el-col :span="12" class="el_col">
                      <el-form-item label="联系人" prop="contactUser">
                        <el-input
                          v-model="formCaiGouRenValue.contactUser"
                          placeholder="请输入联系人"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" class="el_col">
                      <el-form-item label="职务" prop="post">
                        <el-input
                          v-model="formCaiGouRenValue.post"
                          placeholder="请输入职务"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="即时通" prop="msn">
                    <el-input
                      v-model="formCaiGouRenValue.msn"
                      placeholder="请输入即时通（qq或微信）"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="sfType == '供应商'">
                <el-form
                  status-icon
                  :label-position="'right'"
                  :model="formGongYingShangValue"
                  :rules="rulesformGongYingShangValue"
                  ref="ruleFormGongYingShang"
                  label-width="180px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="企业/单位名称" prop="unitName">
                    <el-input
                      v-model="formGongYingShangValue.unitName"
                      placeholder="请输入企业/单位名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="企业统一编码" prop="unifiedCode">
                    <el-input
                      v-model="formGongYingShangValue.unifiedCode"
                      placeholder="请输入企业统一编码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="登录账户" prop="username">
                    <el-input
                      v-model="formGongYingShangValue.username"
                      placeholder="可使用数字、字母，请谨记账号"
                    ></el-input>
                  </el-form-item>
                  <el-row class="el_row">
                    <el-col :span="12" class="el_col">
                      <el-form-item label="密码" prop="password1">
                        <el-input
                          show-password
                          v-model="formGongYingShangValue.password1"
                          placeholder="请输入密码"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="el_col">
                      <el-form-item label="确认密码" prop="password2">
                        <el-input
                          show-password
                          v-model="formGongYingShangValue.password2"
                          placeholder="请输入密码"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="el_row">
                    <el-col :span="12" class="el_col">
                      <el-form-item label="手机号" prop="phone">
                        <el-input
                          v-model="formGongYingShangValue.phone"
                          placeholder="请输入手机号"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="el_col">
                      <el-form-item label="验证码" prop="captcha">
                        <div class="flex">
                          <el-input
                            v-model="formGongYingShangValue.captcha"
                            placeholder="请输入验证码"
                          ></el-input>
                          <el-button
                            type="primary"
                            class="size"
                            @click="useVerify"
                            :disabled="diflag"
                            >{{ titels
                            }}<span v-if="diflag"
                              >({{ times }})</span
                            ></el-button
                          >
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="联系人" prop="contactUser">
                    <el-input
                      v-model="formGongYingShangValue.contactUser"
                      placeholder="请输入联系人"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="即时通" prop="msn">
                    <el-input
                      v-model="formGongYingShangValue.msn"
                      placeholder="请输入即时通（qq或微信）"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="上传资格证书" prop="settleAnnexList">
                    <el-upload
                      action
                      :http-request="httpRequestFunction"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-form>
              </div>
              <el-checkbox
                class="flex mb_10"
                v-model="isYuedu"
                label="我已阅读《会员须知》并同意《入市协议》"
                name="type"
              ></el-checkbox>
              <div class="login_form_button">
                <div class="login_form_submit" @click="onSubmit">
                  <div class="login_form_submit_label">注册</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cu-animation>

    <div class="ver">
      <Verify
        @success="success"
        :mode="pop"
        :captchaType="blockPuzzle"
        :imgSize="{ width: '330px', height: '155px' }"
        ref="verify"
      ></Verify>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
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
import {
  captcha,
  payCaptcha,
  buyerRegister,
  verify,
} from "../../../api/aksApi/platformApi/loginApi";
import { upload, fileDelete } from "@/api/aksApi/platformApi/commonApi.js";
import Verify from "./components/verifition/Verify.vue";
import test from "../../../cuview-ui/function/test";
import { supplierTypes } from "@/utils/httpDataTypes.js";

export default {
  components: {
    Verify,
  },
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入登录账户"));
      }
      if (!test.enOrNum(value)) {
        return callback(new Error("使用数字、字母组合，请谨记账号"));
      }
      return callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!test.password(value)) {
        return callback(new Error("密码需6-12位数字、字母组合"));
      } else {
        if (this.formCaiGouRenValue.password2 !== "") {
          this.$refs.ruleFormCaiGouRen.validateField("password2");
        }
        if (this.formGongYingShangValue.password2 !== "") {
          this.$refs.ruleFormGongYingShang.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (
        value !== this.formCaiGouRenValue.password1 &&
        value !== this.formGongYingShangValue.password1
      ) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!test.mobile(value)) {
        return callback(new Error("手机格式不正确"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "", //验证码图片
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
      supplierTypes,// 供应商企业类型
      sfType: "采购商", //采购商 或 供应商
      qyType: 1, //药品企业 或 药械企业
      isYuedu: false, // 我已阅读《会员须知》并同意《《入市协议》
      //   采购商注册
      formCaiGouRenValue: {
        unitName: "", // 企业/单位名称
        username: "", // 登录账户
        password1: "", // 设置密码
        password2: "", // 确认密码
        contactUser: "", // 联系人
        phone: "", // 手机号
        post: "", // 职务
        captcha: "", // 验证码
        unifiedCode: "", //企业统一编码
        msn: "", //即时通
      },
      rulesformCaiGouRenValue: {
        unitName: [
          { required: true, message: "请输入企业/单位名称", trigger: "blur" },
        ],
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUserName,
          },
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        password2: [
          { required: true, trigger: "blur", validator: validatePass2 },
        ],
        contactUser: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        post: [{ required: true, message: "请输入职务", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        unifiedCode: [
          { required: true, message: "请输入企业统一编码", trigger: "blur" },
        ], //企业统一编码
        msn: [{ required: false, message: "请输入即时通", trigger: "blur" }], //即时通
      },

      //   供应商注册
      formGongYingShangValue: {
        unitName: "", // 企业/单位名称
        username: "", // 登录账户
        phone: "", // 手机号
        captcha: "", // 验证码
        password1: "", // 设置密码
        password2: "", // 确认密码
        contactUser: "", //联系人
        unifiedCode: "", //企业统一编码
        msn: "", //即时通
        settleAnnexList: [], //上传附件
      },
      dialogVisible: false,
      dialogImageUrl: "",
      rulesformGongYingShangValue: {
        unitName: [
          { required: true, message: "请输入企业/单位名称", trigger: "blur" },
        ],
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUserName,
          },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        password2: [
          { required: true, trigger: "blur", validator: validatePass2 },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        contactUser: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        unifiedCode: [
          { required: true, message: "请输入企业统一编码", trigger: "blur" },
        ],
        msn: [{ required: false, message: "请输入即时通", trigger: "blur" }],
        settleAnnexList: [
          {
            type: "array",
            required: true,
            message: "最少上传一张资格证书",
            trigger: "change",
          },
        ], //上传资格证书
      },

      blockPuzzle: "blockPuzzle",
      pop: "pop",
      falgs: false,
      titels: "获取验证码",
      diflag: false,
      times: 60,
      phonflag: true,
      phoneflag1: true,
    };
  },
  mounted() {
    console.log(this.$route.query.sysType); //判断是否是3供应2采购商
    if (this.$route.query.sysType == 3) {
      this.sfType = "供应商";
    } else if (this.$route.query.sysType == 2) {
      this.sfType = "采购商";
    }
    this.setRemUnit(); //自适应
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

    // 通用-用户注册-接口
    buyerRegisterApi() {
      if (this.sfType == "采购商") {
        if (
          this.formCaiGouRenValue.password1 != this.formCaiGouRenValue.password2
        ) {
          this.$message.error("两次输入密码不一致，请重新输入！");
          return;
        }
        let valueData = {
          contactUser: this.formCaiGouRenValue.contactUser, //联系人
          password: this.formCaiGouRenValue.password2, //密码
          phone: this.formCaiGouRenValue.phone, //手机号
          post: this.formCaiGouRenValue.post, //职务
          qyType: this.qyType, //类型@ 1 医院   2  药店   3   个人
          sfType: this.sfType == "供应商" ? 1 : 2, //身份@ 1 供应商 2 采购商
          unitName: this.formCaiGouRenValue.unitName, //单位名称
          username: this.formCaiGouRenValue.username, //登录账号
          captcha: this.formCaiGouRenValue.captcha, //验证码
          unifiedCode: this.formCaiGouRenValue.unifiedCode, //企业统一编码
          msn: this.formCaiGouRenValue.msn, //即时通
        };
        console.log("valueData:", valueData);
        buyerRegister(valueData)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(
                res.message + ";将为您自动跳转到登录界面！请稍后..."
              );
              setTimeout(() => {
                this.$store.commit("switchPlatform", "purchaser");
                this.$router.push("/login");
              }, 2000);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.sfType == "供应商") {
        if (
          this.formGongYingShangValue.password1 !=
          this.formGongYingShangValue.password2
        ) {
          this.$message.error("两次输入密码不一致，请重新输入！");
          return;
        }
        let valueData = {
          password: this.formGongYingShangValue.password2, //密码
          phone: this.formGongYingShangValue.phone, //手机号
          contactUser: this.formGongYingShangValue.contactUser, //联系人
          qyType: this.qyType, //类型@ 1 药品企业 2 器械企业
          sfType: this.sfType == "供应商" ? 1 : 2, //身份@ 1 供应商 2 采购商
          unitName: this.formGongYingShangValue.unitName, //单位名称
          username: this.formGongYingShangValue.username, //登录账号
          captcha: this.formGongYingShangValue.captcha,
          unifiedCode: this.formGongYingShangValue.unifiedCode, //企业统一编码
          msn: this.formGongYingShangValue.msn, //即时通
          settleAnnexList: this.formGongYingShangValue.settleAnnexList, //上传资格证书
        };
        console.log("valueData:", valueData);
        buyerRegister(valueData)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(
                res.message + ";将为您自动为您跳转到登录界面！请稍后..."
              );
              setTimeout(() => {
                this.$store.commit("switchPlatform", "supplier");
                this.$router.push("/login");
              }, 2000);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 点击跳转
    clickRuterButton(value) {
      if (value == "/login") {
        if (this.sfType == "供应商") {
          this.$store.commit("switchPlatform", "supplier");
          this.$router.push("/login");
        } else if (this.sfType == "采购商") {
          this.$store.commit("switchPlatform", "purchaser");
          this.$router.push("/login");
        }
      } else {
        this.$router.push(value);
      }
    },
    // 动画重置
    platformChange() {
      if (this.sfType == "采购商") {
        this.resetForm("ruleFormCaiGouRen"); // 表单重置
      } else if (this.sfType == "供应商") {
        this.resetForm("ruleFormGongYingShang"); // 表单重置
      }
      this.$refs.verify.closeBox(); //刷新
      this.times = 0;
      console.log("1:", this.times);
      this.$refs.cu_animation.again();
      this.$store.commit("switchPlatform", this.currentPlatform);
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.qyType = 1;
      this.isYuedu = false;
      //   采购商注册-重置
      this.formCaiGouRenValue.unitName = ""; // 单位名称
      this.formCaiGouRenValue.username = ""; // 登录账户
      this.formCaiGouRenValue.password1 = ""; // 设置密码
      this.formCaiGouRenValue.password2 = ""; // 确认密码
      this.formCaiGouRenValue.contactUser = ""; // 联系人
      this.formCaiGouRenValue.phone = ""; // 手机号
      this.formCaiGouRenValue.post = ""; // 职务
      this.formCaiGouRenValue.captcha = ""; // 验证码
      this.formCaiGouRenValue.value9 = false; // 我已阅读《会员须知》并同意《《入市协议》
      this.formCaiGouRenValue.unifiedCode = ""; //企业统一编码
      this.formCaiGouRenValue.msn = ""; //即时通
      //   供应商注册-重置
      this.formGongYingShangValue.unitName = ""; // 单位名称
      this.formGongYingShangValue.username = ""; // 登录账户
      this.formGongYingShangValue.phone = ""; // 手机号
      this.formGongYingShangValue.captcha = ""; // 验证码
      this.formGongYingShangValue.password1 = ""; // 设置密码
      this.formGongYingShangValue.password2 = ""; // 确认密码
      this.formGongYingShangValue.contactUser = ""; // 联系人
      this.formGongYingShangValue.unifiedCode = ""; //企业统一编码
      this.formGongYingShangValue.msn = ""; //即时通
      this.formGongYingShangValue.settleAnnexList = []; //上传资格证书
    },
    // 登录按钮
    onSubmit() {
      if (this.sfType == "采购商") {
        this.submitForm("ruleFormCaiGouRen"); // 表单重置
      } else if (this.sfType == "供应商") {
        this.submitForm("ruleFormGongYingShang"); // 表单重置
      }
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isYuedu) {
            this.buyerRegisterApi();
          } else {
            this.$message.info(
              "请先勾选我已阅读《会员须知》并同意《《入市协议》"
            );
          }
        } else {
        }
      });
    },

    useVerify() {
      if (this.sfType == "采购商") {
        if (this.formCaiGouRenValue.phone == "") {
          this.falgs = false;
        } else {
          this.falgs = true;
        }
      } else if (this.sfType == "供应商") {
        if (this.formGongYingShangValue.phone == "") {
          this.falgs = false;
        } else {
          this.falgs = true;
        }
      }

      if (this.falgs) {
        this.$refs.verify.show();
      } else {
        this.$message.error("请输入手机号后再获取验证码！");
      }
    },
    success(params) {
      verify(params).then((res) => {
        if (res.repMsg == "成功") {
          this.times = 60;
          let tims = setInterval(() => {
            console.log("2:", this.times);

            if (this.times == 0) {
              this.diflag = false;
              clearInterval(tims);
              this.titels = "获取验证码";
            } else {
              this.diflag = true;
              this.titels = "已发送验证码";
              this.times--;
            }
          }, 1000);
          let phone = "";
          if (this.sfType == "采购商") {
            phone = this.formCaiGouRenValue.phone;
          } else if (this.sfType == "供应商") {
            phone = this.formGongYingShangValue.phone;
          }

          let params = {
            phone: phone,
          };
          payCaptcha(params).then((res) => {
            if ((res.code = 200)) {
              if (this.sfType == "采购商") {
                this.formCaiGouRenValue.captcha = "";
              } else if (this.sfType == "供应商") {
                this.formGongYingShangValue.captcha = "";
              }
            }
          });
        }
      });
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
    },
    fileDeleteApi(value) {
      let valueData = new FormData();
      valueData.append("objectKey", value);
      fileDelete(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
      this.formGongYingShangValue.settleAnnexList.forEach(
        (value, index, array) => {
          //value为遍历的当前元素，index为当前索引，array为正在操作的数组
          if (value.annexName == file.name) {
            let s = value.annexUrl;
            this.fileDeleteApi(s.substring(s.indexOf(".cn") + 3));
            array.splice(index, 1);
          }
        }
      );
      this.onSubmit(); //表单验证
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async httpRequestFunction(itemData) {
      console.log("itemData:", itemData);
      let objectsss = {
        annexName: "",
        annexUrl: "",
      };
      objectsss.annexName = itemData.file.name;
      await upload(itemData.file).then((res) => {
        console.log(res);
        if (res.code == 200) {
          objectsss.annexUrl = res.data;
          this.formGongYingShangValue.settleAnnexList.push(objectsss);
          this.$message.success("上传图片成功!");
        } else {
          this.$message.error("上传图片失败!");
        }
      });
      await this.onSubmit(); //表单验证
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

//隐藏滚动条
// .login::-webkit-scrollbar {
//   display: none;
// }

.register {
  background: url("~@/assets/images/LoginBg.png") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.register_one {
  margin-top: 40px;
  width: 1200px;
  display: flex;
  justify-content: space-between;

  .register_one_img {
    width: 278px;
    height: 46px;
    background: url("~@/assets/images/textLogo.png");
    background-size: 100% 100%;
  }

  .register_one_text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;

    .register_one_text1 {
      text-align: right;
      font-size: 20px;
    }

    .register_one_text1:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.register_two {
  margin-top: 20px;
  width: 1200px;
}

.login_form {
  // width: rpxToRem(200);
  // height: rpxToRem(340);
  // background: #e2ffec;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);
  // border-radius: rpxToRem(10.75);
  padding: 10px 50px 30px 50px;
  background-color: #fff;

    .login-form-body {
    //   background-image: url("~@/assets/images/watermark.png");
    // background-size: 100% 100%;
    }
  .formTitle1 {
    font-size: 36px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }

  .formTitle2 {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #02076F;
  }

  ::v-deep .el-input__inner {
    height: 42px;
  }
}

.form_lable {
  color: #00023a;
  width: 180px;
  font-size: rpxToRem(10);
  text-align: right;
  padding-right: 10px;
  margin-right: 20px;
}

::v-deep .el-form-item__label,
::v-deep .el-form-item__content,
.el-input,
::v-deep .el-radio__label,
::v-deep .el-checkbox__label {
  font-size: rpxToRem(10);
}

// .el_radio {
//   width: 160px;
// }

.login_form_button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_form_submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: rpxToRem(22.47);
  background: #00c1de;

  .login_form_submit_label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rpxToRem(10);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    z-index: 2;
  }
}

.login_form_submit:hover {
  transform: scale(1.01);
}
</style>
