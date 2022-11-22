<template>
  <div class="page-container table-page">
    <el-form
      class="enterprise-info"
      ref="infoForm"
      :class="isEdit ? ' isEdit' : ' noEdit'"
      :model="info"
      :rules="rules"
      :label-width="'110px'"
      label-position="right"
      :disabledIgnoreValidate="true"
    >
      <div class="info">
        <div class="info-title">
          企业信息
          <el-button
            class="edit-btn"
            type="primary"
            v-if="!isEdit"
            @click="isEdit = true"
            >编辑
          </el-button>
        </div>

        <div class="info-content">
          <div class="info-item">
            <div class="label">单位名称:</div>
            {{ info.unitName }}
          </div>
          <!-- <div class="info-item">
            <div class="label">状态:</div>{{ auditTypes[info.auditStatus] }}
          </div>
          -->
          <div class="info-item">
            <div class="label">登录账号:</div>
            {{ vuex_user.username }}
          </div>
          <el-form-item
            class="info-item form-item"
            label="采购类型:"
            :prop="'unitType'"
          >
            <template v-if="isEdit">
              <el-select
                class="selectInput"
                placeholder="请选择采购类型"
                v-model="info.unitType"
                clearable
              >
                <el-option
                  v-for="(label, value) in unitTypeList"
                  :key="value"
                  :label="label"
                  :value="value"
                >
                  {{ label }}
                </el-option>
              </el-select>
            </template>
            <template v-else>
              {{ unitTypeList[info.unitType] }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="企业电话:"
            :prop="'businessPhone'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.businessPhone"></el-input>
            </template>
            <template v-else>
              {{ info.businessPhone }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="营业执照:"
            :prop="'businessLicenseUrl'"
          >
            <div class="img-item mb_10">
              <template v-if="isEdit">
                <cu-upload-image
                  :files.sync="uploadArrObj.businessLicenseUrl"
                  @submit="submitFile(arguments, 'businessLicenseUrl')"
                  width="162px"
                  height="118px"
                >
                </cu-upload-image>
                <span>营业执照图片</span>
              </template>
              <template v-else>
                <img :src="info.businessLicenseUrl" alt="" />
                <span>营业执照图片</span>
              </template>
            </div>
            <div class="img-item mb_10">
              <template v-if="isEdit">
                <cu-upload-image
                  :files.sync="uploadArrObj.licenceUrl"
                  @submit="submitFile(arguments, 'licenceUrl')"
                  width="162px"
                  height="118px"
                ></cu-upload-image>
                <span>许可证图片</span>
              </template>
              <template v-else>
                <img :src="info.licenceUrl" alt="" />
                <span>许可证图片</span>
              </template>
            </div>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="企业logo:"
            :prop="'logoUrl'"
          >
            <template v-if="isEdit">
              <cu-upload-image
                :files.sync="uploadArrObj.logoUrl"
                @submit="submitFile(arguments, 'logoUrl')"
                width="163px"
                height="163px"
              ></cu-upload-image>
            </template>
            <template v-else>
              <img class="info-logo" :src="info.logoUrl" alt="" />
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="法人身份证:"
            :prop="'legalIdFrontUrl'"
          >
            <div class="img-item">
              <template v-if="isEdit">
                <cu-upload-image
                  :files.sync="uploadArrObj.legalIdFrontUrl"
                  @submit="submitFile(arguments, 'legalIdFrontUrl')"
                  width="162px"
                  height="118px"
                >
                </cu-upload-image>
                <span>身份证正面图片</span>
              </template>
              <template v-else>
                <img :src="info.legalIdFrontUrl" alt="" />
                <span>身份证正面图片</span>
              </template>
            </div>
            <div class="img-item">
              <template v-if="isEdit">
                <cu-upload-image
                  :files.sync="uploadArrObj.legalIdBackUrl"
                  @submit="submitFile(arguments, 'legalIdBackUrl')"
                  width="162px"
                  height="118px"
                >
                </cu-upload-image>
                <span>身份证反面图片</span>
              </template>
              <template v-else>
                <img :src="info.legalIdBackUrl" alt="" />
                <span>身份证反面图片</span>
              </template>
            </div>
          </el-form-item>
        </div>
      </div>
      <div class="info">
        <div class="info-title">企业联系人</div>
        <div class="info-content">
          <el-form-item
            class="info-item form-item"
            label="姓名:"
            :prop="'contactUser'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.contactUser"></el-input>
            </template>
            <template v-else>
              {{ hiddenInfo(info.contactUser, "name") }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="电话号码:"
            :prop="'phone'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.phone"></el-input>
            </template>
            <template v-else>
              {{ hiddenInfo(info.phone, "phone") }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="职务:"
            :prop="'post'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.post"></el-input>
            </template>
            <template v-else>
              {{ info.post }}
            </template>
          </el-form-item>
        </div>
      </div>
      <div class="info">
        <div class="info-title">财务信息</div>
        <div class="info-content goods-desc">
          <el-form-item
            class="info-item form-item"
            label="发票抬头:"
            :prop="'invoiceHeader'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.invoiceHeader"></el-input>
            </template>
            <template v-else>
              {{ info.invoiceHeader }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="纳税人识别号:"
            :prop="'taxpayerIdNumber'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.taxpayerIdNumber"></el-input>
            </template>
            <template v-else>
              {{ info.taxpayerIdNumber }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="开户名称:"
            :prop="'bankAccountName'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.bankAccountName"></el-input>
            </template>
            <template v-else>
              {{ info.bankAccountName }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="银行账号:"
            :prop="'bankAccountNo'"
          >
            <template v-if="isEdit">
              <el-input v-model="info.bankAccountNo"></el-input>
            </template>
            <template v-else>
              {{ info.bankAccountNo }}
            </template>
          </el-form-item>
          <el-form-item
            class="info-item form-item"
            label="对公账户:"
            prop="corporateAccount"
          >
            <template v-if="isEdit">
              <el-input v-model="info.corporateAccount"></el-input>
            </template>
            <template v-else>
              {{ info.corporateAccount }}
            </template>
          </el-form-item>
        </div>
      </div>

      <div class="submit-bar">
        <!-- && type != 'firstComplete' -->
        <el-button
          size="default"
          v-if="isEdit && type != 'firstComplete'"
          @click="cancel"
          >取消</el-button
        >
        <el-button type="primary" size="default" v-if="isEdit" @click="saveEdit"
          >保存修改</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  buyerAccountManageGetBuyer,
  buyerAccountManageModifyBuyerInfo,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import { mapState } from "vuex";
import test from "@/cuview-ui/function/test";
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error("电话号码不能为空"));
      // }
      if (value && !test.mobile(value)) {
        return callback(new Error("电话号码格式不正确"));
      }
      return callback();
    };
    var validateLicenceUrl = (rule, value, callback) => {
      if (!this.info.licenceUrl) {
        return callback(new Error("请上传许可证图片"));
      } else {
        callback();
      }
    };
    var validateLegalIdBackUrl = (rule, value, callback) => {
      if (!this.info.licenceUrl) {
        return callback(new Error("请上传身份证反面图片"));
      } else {
        callback();
      }
    };

    return {
      unitTypeList: {
        1: "医疗机构",
        2: "药店",
        3: "个人",
      },
      auditTypes: {
        1: "待审核",
        2: "审核通过",
        3: "不通过",
      },
      info: {},
      isEdit: false,
      uploadArrObj: {
        businessLicenseUrl: [],
        licenceUrl: [],
        logoUrl: [],
        legalIdFrontUrl: [],
        legalIdBackUrl: [],
      },
      tableHeader: [
        {
          title: "仓库编号",
          slot: "num",
        },
      ],
      storeHouseList: [],
      showStoreHouseEditDialog: false,
      rules: {
        // corporateAccount: [
        //   { required: true, message: '请填写对公账户', trigger: 'blur' },
        // ],
        unitType: [
          { required: true, message: "请选择采购类型", trigger: "blur" },
        ],
        businessPhone: [
          // { required: true, message: '请填写企业电话', trigger: 'blur' },
          {
            message: "电话号码格式不正确",
            trigger: "blur",
            validator: validateMobile,
          },
        ],
        // businessLicenseUrl: [
        //   { required: true, message: '请上传营业执照', trigger: 'change' },
        //   { required: true, message: '请上传许可证图片', trigger: 'change', validator: validateLicenceUrl },
        // ],
        // logoUrl: [
        //   { required: true, message: '请上传企业logo', trigger: 'blur' },
        // ],
        // legalIdFrontUrl: [
        //   { required: true, message: '请上传身份证正面图片', trigger: 'change' },
        //   { required: true, message: '请上传身份证反面图片', trigger: 'change', validator: validateLegalIdBackUrl },
        // ],
        contactUser: [
          { required: true, message: "请填写企业联系人姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请填写企业联系人电话", trigger: "blur" },
          {
            message: "电话号码格式不正确",
            trigger: "blur",
            validator: validateMobile,
          },
        ],
        post: [
          { required: true, message: "请填写企业联系人职务", trigger: "blur" },
        ],
        invoiceHeader: [
          { required: true, message: "请填写发票抬头", trigger: "blur" },
        ],
        taxpayerIdNumber: [
          { required: true, message: "请填写纳税人识别号", trigger: "blur" },
        ],
        bankAccountName: [
          { required: true, message: "请填写开户名称", trigger: "blur" },
        ],
        bankAccountNo: [
          { required: true, message: "请填写银行账号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getEnterpriseInfo();
  },
  mounted() {
    if (this.type == "firstComplete") {
      this.isEdit = true;
    }
  },
  computed: {
    ...mapState(["vuex_user"]),
  },
  methods: {
    getEnterpriseInfo() {
      buyerAccountManageGetBuyer()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.info = res.data;
            this.info.unitType += "";
            for (const key in this.uploadArrObj) {
              this.info[key]
                ? (this.uploadArrObj[key] = [{ name: "", url: this.info[key] }])
                : null;
            }
            console.log(this.uploadArrObj);
          } else {
            this.$message.warning("企业信息获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitFile(args, type) {
      let res = args[0];
      console.log(res, type);
      if (res.code == 200) {
        let url = res.data;
        this.info[type] = url;
        this.$message.success("上传图片成功！");
      } else {
        this.$message.success("上传图片失败，请重试！");
      }
    },

    // submit() {
    //   this.info.list = this.storeHouseList;
    //   this.showStoreHouseEditDialog = false;
    // },

    cancel() {
      this.isEdit = false;
      this.getEnterpriseInfo();
    },
    saveEdit() {
      this.$refs["infoForm"].validate((valid, validObj) => {
        console.log(this.info);
        if (valid) {
          this.saveData();
        } else {
          console.log(validObj);
          for (const key in validObj) {
            const element = validObj[key];
          }
          this.$message.warning("表单校验未通过");
          return false;
        }
      });
    },
    saveData() {
      console.log(this.info, this.uploadArrObj);
      delete this.info.ckId;
      this.info["ckid"] = this.info.list
        ? this.info.list.map((item) => item && item.id)
        : [];
        delete this.info.ckid //不用ckid就删除了
        console.log(this.info);
      buyerAccountManageModifyBuyerInfo(this.info)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.message);
            this.isEdit = false;
            this.getEnterpriseInfo();
            if (this.type == "firstComplete") {
              this.$emit("close");
            }
            // 图片显示处理
            for (const key in this.uploadArrObj) {
              this.info[key]
                ? (this.uploadArrObj[key] = [{ name: "", url: this.info[key] }])
                : null;
            }

            console.log(this.uploadArrObj);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hiddenInfo(val, type) {
      if (!val) {
        return "";
      }
      switch (type) {
        case "phone":
          return val.slice(0, 3) + "****" + val.slice(7, 12);
          break;
        case "name":
          return val.slice(0, 1) + "**";
          break;
        default:
          return "";
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./enterpriseInformationManagement.scss";
</style>
