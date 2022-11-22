<template>
  <!-- 其他地方直接以这页面为组件进行了引用 中心商城->立即购买页面，点击更多地址调用 -->
  <div class="content_bodys">
    <div class="content_head">
      <div class="content_head_item">
        <div class="content_head-but" @click="add('add')">新增</div>
        <p>
          您已创建<span>{{ addList.length }}</span
          >个收货地址,最多可以创建<span>25</span>个
        </p>
      </div>
    </div>
    <div class="content_bottom" v-for="(val, i) in addList" :key="i"  >
      <div class="content_bottom_item" @click="setDefault(val.id,val.isDefault)">
        <div class="title">
          {{ val.alias }} &nbsp;&nbsp;&nbsp;
          <span v-if="val.isDefault == 1">默认地址</span>
          <i class="el-icon-close close-dw" @click="getdelAddress(val.id)"></i>
        </div>
        <div class="title-item">
          <div class="item-one">
            <div class="item-left">收货人:</div>
            <div class="item-right">{{ val.consignee }}</div>
          </div>
          <div class="item-one">
            <div class="item-left">所在地区:</div>
            <div class="item-right">{{ val.areacode }}</div>
          </div>
          <div class="item-one">
            <div class="item-left">手机号:</div>
            <div class="item-right">{{ val.phone }}</div>
          </div>
          <div class="item-one">
            <div class="item-left">收货地址:</div>
            <div class="item-right">{{ val.address }}</div>
          </div>
          <div class="item-two">
            <div
              class="item-left"
              @click="getadd(val.id)"
              v-show="!val.isDefault == 1"
            >
              设为默认
            </div>
            <div class="item-right" @click="add('edit', val)">编辑</div>
          </div>
        </div>
      </div>
    </div>
    <cu-dialog
      width="1200px"
      :title="title"
      :center="'center'"
      :showClose="true"
      :appendToBody="true"
      :visible="flag"
      @handleClose="editHandleClose"
    >
      <div slot="footer">
        <div class="footer_item">
          <el-form
            :model="customerAddress"
            label-position="top"
            :inline="true"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-form-item label="收货人:" class="shr" prop="consignee">
              <el-input
                placeholder="请输入收货人"
                v-model="customerAddress.consignee"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在地区:" class="shr" prop="consigneeArea">
              <el-cascader
                clearable
                filterable
                style="width: 350px"
                v-model="customerAddress.consigneeArea"
                :options="cityAllLists"
                @change="handleChange"
                placeholder="请选择收货地址(所在地区)"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="手机号:" class="shr" prop="phone">
              <el-input
                v-model="customerAddress.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="收货地址"
              class="lsit shr"
              prop="consigneeAddress"
            >
              <el-input
                v-model="customerAddress.consigneeAddress"
                placeholder="请输入详细收货地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址别名:" class="dzbm shr lsit">
              <el-input
                v-model="customerAddress.alias"
                placeholder="请输入地址别名"
              ></el-input>
              <p>
                建议填写常用名称:
                <span
                  v-for="(val, i) in tabList"
                  :key="i"
                  @click="titles(val.title)"
                  >{{ val.title }}</span
                >
              </p>
            </el-form-item>
            <el-form-item class="lsitt">
              <el-button @click="submitForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="resetForm('ruleForm')"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  getAddressList,
  setDefaultAddress,
  getditAddress,
  getaddAddress,
  getdelAddress,
} from "@/api/aksApi/platformApi/retailPurchaseApi";
import test from "@/cuview-ui/function/test";
import { cityAllList } from "@/components/cityAll";
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("联系电话不能为空"));
      } else if (!test.mobile(value) && !test.landline(value)) {
        return callback(new Error("手机格式不正确（移动电话或固定电话）"));
      } else {
        callback();
      }
    };
    return {
      flag: false,
      title: "",
      tabList: [
        {
          id: 1,
          title: "自己",
        },
        {
          id: 2,
          title: "家人",
        },
        {
          id: 3,
          title: "公司",
        },
      ],
      // 地址-customerAddress
      customerAddress: {
        consignee: "", //收货人
        phone: "", //联系电话
        consigneeArea: [], //收货地址
        consigneeAddress: "", //详细收货地址
        isDefault: 0, //是否默认地址 0否 1是
        customerId: null, //客户id
        alias: "", //别名
        id: 0, //id
      },
      cityAllLists: [],
      addList: [],
      falg: false, //修改
      falg1: false, //新增
      rules: {
        consignee: [
          { required: true, message: "收货人不能为空", trigger: "blur" },
        ],
        consigneeArea: [
          { required: true, message: "收货地址不能为空", trigger: "change" },
        ],
        consigneeAddress: [
          { required: true, message: "详细收货地址不能为空", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
      },
    };
  },
  created() {
    this.getAddressList(); //获取地址信息
  },
  mounted() {
    this.diquchuli(cityAllList);
    this.cityAllLists = cityAllList;
  },
  methods: {
    diquchuli(valueDate) {
      valueDate.forEach((element) => {
        element.label = element.name;
        element.value = element.name;
        if (element.children) {
          return this.diquchuli(element.children);
        }
      });
    },
    //地址列表
    async getAddressList() {
      getAddressList().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.addList = res.data;
        }
      });
    },
    handleChange(cityName) {
      console.log("cityName:", cityName);
      console.log(cityName.toString());
    },
    //设为默认
    getadd(val) {
      this.setDefaultAddress(val);
    },
    //删除
    getdelAddress(val) {
      getdelAddress(val).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 2000,
          });
          this.falg = false;
        } else {
          this.$message.error(res.message);
        }
      });
      this.getAddressList();
    },
    //    //设为默认
    async setDefaultAddress(val) {
      setDefaultAddress(val).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.getAddressList();
          this.$message({
            message: res.message,
            type: "success",
            duration: 2000,
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    setDefault(id,Default){
        if(Default==1){
          this.$message({
            message: '已经是默认地址',
            type: "success",
            duration: 2000,
          });
        }else{
         this.setDefaultAddress(id)
        }
    },
    //关闭按钮
    editHandleClose() {
      this.flag = false;
      this.$refs["ruleForm"].resetFields();
    },
    //修改 添加
    add(val, value) {
      this.flag = true;
      if (val == "add") {
        this.title = "新增收货地址";
        this.falg1 = true;
      } else {
        this.title = "修改收货地址";
        this.falg = true;
        console.log(value);
        this.customerAddress.consignee = value.consignee; //收货人
        this.customerAddress.phone = value.phone; //电话号
        this.customerAddress.consigneeArea = value.areacode.split(","); //所在地区
        this.customerAddress.consigneeAddress = value.address; //详情地址
        this.customerAddress.alias = value.alias; //地址别名
        this.customerAddress.isDefault = value.isDefault;
        this.customerAddress.id = value.id;
        this.customerAddress.customerId = value.customerId;
      }
    },
    //取消
    submitForm(formName) {
      console.log(formName);
      this.flag = false;
      this.customerAddress.alias = null;
      this.$refs[formName].resetFields();
    },
    //确认
    resetForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            address: this.customerAddress.consigneeAddress,
            alias: this.customerAddress.alias,
            consignee: this.customerAddress.consignee,
            customerId: this.customerAddress.customerId,
            id: this.customerAddress.id,
            isDefault: this.customerAddress.isDefault,
            phone: this.customerAddress.phone,
          };
          if (this.falg == true) {
            params.areacode = this.customerAddress.consigneeArea.toString();
            getditAddress(params).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.getAddressList();

                this.$message({
                  message: res.message,
                  type: "success",
                  duration: 2000,
                });
                this.falg = false;
              } else {
                this.$message.error(res.message);
              }
            });
          } else if (this.falg1 == true) {
            params.isDefault = 0;
            params.areacode = this.customerAddress.consigneeArea.toString();
            getaddAddress(params).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.getAddressList();

                this.$message({
                  message: res.message,
                  type: "success",
                  duration: 2000,
                });
                this.falg1 = false;
              } else {
                this.$message.error(res.message);
              }
            });
          }

          this.flag = false;
          this.$refs[formName].resetFields();
          this.customerAddress.alias = null;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //别名点击
    titles(val) {
      this.customerAddress.alias = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.content_bodys {
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow: auto;
}
.content_head {
  padding: 20px 20px;
  width: 100%;
  box-sizing: border-box;
  .content_head_item {
    display: flex;
    // line-height: 40px;
    align-items: center;
    .content_head-but {
      border: 1px solid #ff480e;
      width: 88px;
      height: 32px;
      text-align: center;
      font-size: 16px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #ff480e;
      line-height: 32px;
    }

    p {
      margin-left: 10px;
      font-size: 16px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      span {
        color: #e6a23c;
      }
    }
  }
}
.content_bottom {
  padding: 20px 20px;
  width: 100%;
  box-sizing: border-box;
  .content_bottom_item {
    border: 1px solid #eeeeee;
    padding: 10px 10px;
    .title {
      position: relative;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 20px;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      color: #020552;
      span {
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        background: #e6a23c;
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        padding: 0 5px;
      }
      .close-dw {
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
    .title-item {
      margin-top: 10px;
      width: 100%;
      .item-one {
        width: 100%;
        display: flex;
        .item-left {
          width: 90px;
          text-align: right;
          font-weight: 400;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          color: #020552;
          margin-right: 7px;
          line-height: 28px;
        }
        .item-right {
          font-weight: 400;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          color: #020552;
          line-height: 28px;
        }
      }
      .item-two {
        cursor: pointer;
        width: 100%;
        text-align: right;
        display: flex;
        justify-content: right;
        font-size: 16px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        color: #409eff;
        font-weight: 400;
        .item-left {
          margin-right: 10px;
        }
      }
    }
  }
}
.footer_item {
  text-align: left;
  .el-cascader,
  .el-input {
    width: 350px;
    display: block;
  }
  ::v-deep .el-input__inner {
    width: 350px;
  }
  .dzbm {
    position: relative;
    .el-input {
      width: 260px;
      display: block;
    }
    p {
      position: absolute;
      left: 270px;
      top: 0;
      display: inline-block;
      display: flex;
      align-items: center;
      color: #020552;
      span {
        cursor: pointer;
        margin: 0 4px;
        text-align: center;
        height: 28px;
        line-height: 28px;
        padding: 0 5px;
        color: #020552;
        border: 1px solid #eeeeee;
      }
    }
    ::v-deep .el-input__inner {
      width: 260px;
    }
  }
  .submitForm {
    text-align: center;
  }
}
.el-form-item {
  // .el-form{
  //     display: flex;

  // }
  ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }
  ::v-deep .el-form-item__label {
    text-align: left;
  }
}
.shr {
  text-align: left;
  margin-right: 220px;
  .el-input {
    width: 350px;
    display: block;
  }
  ::v-deep .el-input__inner {
    width: 350px;
  }
}
.lsitt,
.lsit {
  box-sizing: border-box;
  width: 100%;
  .el-input {
    width: 100%;
    display: block;
  }
  ::v-deep .el-input__inner {
    width: 100%;
  }
}
.lsitt {
  text-align: center;
}
</style>
