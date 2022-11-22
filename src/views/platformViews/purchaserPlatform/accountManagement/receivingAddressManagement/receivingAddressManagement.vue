<template>
  <!-- 其他地方直接以这页面为组件进行了引用 中心商城->立即购买页面，点击更多地址调用 -->
  <div class="page-container table-page">
    <div class="content_one flex_ac_jb">
      <span>已有收货地址</span>
      <el-button type="primary" class="btn_ff480e" @click="addButton"
        >添加地址</el-button
      >
    </div>
    <div
      class="content_two mt_20"
      v-for="(item, index) in buyerAddressGetAddressListData"
      :key="index"
      @click="getisDefault(item.id, item.isDefault)"
    >
      <div class="content_two_left">
        <div class="content_two_left1">
          <span class="mr_20">{{ item.consignee }}</span>
          <span class="mr_20">{{ item.contactPhone }}</span>
        </div>
        <div class="content_two_left2">
          <span class="mr_20">收货地址:</span>
          <span class="mr_20">{{ item.consigneeArea }}</span>
        </div>
        <div class="content_two_left3">
          <span class="mr_20">详细收货地址:</span>
          <span class="mr_20">{{ item.consigneeAddress }}</span>
        </div>
        <div class="content_two_left3">
          <span class="mr_20">邮政编码:</span>
          <span class="mr_20">{{ item.zipCode }}</span>
        </div>
      </div>
      <div class="content_two_right">
        <div class="content_two_right1" v-if="item.isDefault == 1">
          默认地址
        </div>
        <div class="content_two_right2 mt_20" v-else>
          <el-popconfirm
            title="确定设该条地址为默认地址吗？"
            @confirm="setAsDefaultAddressButton(item)"
          >
            <a slot="reference" class="content_two_right2">设为默认地址</a>
          </el-popconfirm>
        </div>
        <div class="content_two_right2 mt_20">
          <a class="content_two_right2" @click="editButton(item)">编辑地址</a>
        </div>
        <div class="content_two_right3 mt_20">
          <el-popconfirm
            title="确定删除该条地址信息吗？"
            @confirm="deleteButton(item)"
          >
            <a slot="reference" class="content_two_right3">删除地址</a>
          </el-popconfirm>
        </div>
      </div>
    </div>

    <cu-dialog
      width="600px"
      title="添加地址"
      :center="'center'"
      :showClose="true"
      :appendToBody="true"
      :visible="addVisible"
      @handleClose="addHandleClose()"
      @handleOk="addHandleOk()"
    >
      <el-form
        class="mt_40 ml_40 mr_40"
        :label-position="'right'"
        :model="buyerAddressAddAddressRequest"
        :rules="rulesBuyerAddressAddAddressRequest"
        ref="refBuyerAddressAddAddressRequest"
        label-width="110px"
      >
        <el-form-item label="收货人" prop="consignee">
          <el-input
            v-model="buyerAddressAddAddressRequest.consignee"
            placeholder="请输入收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input
            v-model="buyerAddressAddAddressRequest.contactPhone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="consigneeArea">
          <!-- <el-input
            v-model="buyerAddressAddAddressRequest.consigneeArea"
            placeholder="请选择收货地址(所在地区)"
          ></el-input> -->
          <el-cascader
            clearable
            filterable
            style="width: 100%"
            v-model="buyerAddressAddAddressRequest.consigneeArea"
            :options="cityAllLists"
            @change="handleChange"
            placeholder="请选择收货地址(所在地区)"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细收货地址" prop="consigneeAddress">
          <el-input
            v-model="buyerAddressAddAddressRequest.consigneeAddress"
            placeholder="小区楼栋/乡村名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input
            v-model="buyerAddressAddAddressRequest.zipCode"
            placeholder="请输入邮政编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="isDefault" style="margin-bottom: 0px">
          <el-checkbox
            v-model="buyerAddressAddAddressRequest.isDefault"
            label="设为默认收货地址"
            name="type"
          ></el-checkbox>
        </el-form-item>
      </el-form>
    </cu-dialog>

    <cu-dialog
      width="600px"
      title="修改地址"
      :center="'center'"
      :showClose="true"
      :appendToBody="true"
      :visible="editVisible"
      @handleClose="editHandleClose()"
      @handleOk="editHandleOk()"
    >
      <el-form
        class="mt_40 ml_40 mr_40"
        :label-position="'right'"
        :model="buyerAddressEditAddressRequest"
        :rules="rulesBuyerAddressEditAddressRequest"
        ref="refBuyerAddressEditAddressRequest"
        label-width="110px"
      >
        <el-form-item label="收货人" prop="consignee">
          <el-input
            v-model="buyerAddressEditAddressRequest.consignee"
            placeholder="请输入收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input
            v-model="buyerAddressEditAddressRequest.contactPhone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="consigneeArea">
          <!-- <el-input
            v-model="buyerAddressEditAddressRequest.consigneeArea"
            placeholder="请输入收货地址"
          ></el-input> -->
          <el-cascader
            clearable
            filterable
            style="width: 100%"
            v-model="buyerAddressEditAddressRequest.consigneeArea"
            :options="cityAllLists"
            @change="handleChange"
            placeholder="请选择收货地址(所在地区)"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细收货地址" prop="consigneeAddress">
          <el-input
            v-model="buyerAddressEditAddressRequest.consigneeAddress"
            placeholder="请输入详细收货地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input
            v-model="buyerAddressEditAddressRequest.zipCode"
            placeholder="请输入邮政编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="isDefault" style="margin-bottom: 0px">
          <el-checkbox
            v-model="buyerAddressEditAddressRequest.isDefault"
            label="设为默认收货地址"
            name="type"
          ></el-checkbox>
        </el-form-item>
      </el-form>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerAddressAddAddress,
  buyerAddressDelAddress,
  buyerAddressEditAddress,
  buyerAddressSetDefaultAddress,
  buyerAddressGetAddressList,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
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
    var validateZipCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮政编码不能为空"));
      } else if (!test.postalCode(value)) {
        return callback(new Error("邮政编码格式不正确"));
      } else {
        callback();
      }
    };
    return {
      // 获取采购商默认地址列表-接口回参
      buyerAddressGetAddressListData: [],
      buyerAddressGetAddressListItemData: {},

      // 新增采购商地址-接口传参
      buyerAddressAddAddressRequest: {
        consignee: "", //收货人
        contactPhone: "", //联系电话
        consigneeArea: [], //收货地址
        consigneeAddress: "", //详细收货地址
        zipCode: "", //邮政编码
        isDefault: 0, //是否默认地址 0否 1是
        id: 0,
        buyerId: 0, //采购商id
      },
      // 新增采购商地址-表单验证
      rulesBuyerAddressAddAddressRequest: {
        consignee: [
          { required: true, message: "收货人不能为空", trigger: "blur" },
        ],
        contactPhone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        consigneeArea: [
          { required: true, message: "收货地址不能为空", trigger: "change" },
        ],
        consigneeAddress: [
          { required: true, message: "详细收货地址不能为空", trigger: "blur" },
        ],
        zipCode: [
          {
            required: true,
            trigger: "blur",
            validator: validateZipCode,
          },
        ],
        isDefault: [{ required: false, message: "", trigger: "blur" }],
      },

      // 编辑采购商地址-接口传参
      buyerAddressEditAddressRequest: {
        consignee: "", //收货人
        contactPhone: "", //联系电话
        consigneeArea: [], //收货地址
        consigneeAddress: "", //详细收货地址
        zipCode: "", //邮政编码
        isDefault: 0, //是否默认地址 0否 1是
        id: 0,
        buyerId: 0, //采购商id
      },
      // 编辑采购商地址-表单验证
      rulesBuyerAddressEditAddressRequest: {
        consignee: [
          { required: true, message: "收货人不能为空", trigger: "blur" },
        ],
        contactPhone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        consigneeArea: [
          { required: true, message: "收货地址不能为空", trigger: "change" },
        ],
        consigneeAddress: [
          { required: true, message: "详细收货地址不能为空", trigger: "blur" },
        ],
        zipCode: [
          {
            required: true,
            trigger: "blur",
            validator: validateZipCode,
          },
        ],
        isDefault: [{ required: false, message: "", trigger: "blur" }],
      },

      addVisible: false, //添加弹框
      editVisible: false, //修改弹框

      value: "",
      cityAllLists: [],
    };
  },
  mounted() {
    this.diquchuli(cityAllList);
    this.cityAllLists = cityAllList;
    console.log("sss:", this.cityAllLists);
    this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
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
    handleChange(cityName) {
      console.log("cityName:", cityName);
    },
    // 新增采购商地址-接口
    buyerAddressAddAddressApi() {
      let valueData = {
        buyerId: this.buyerAddressAddAddressRequest.buyerId,
        consignee: this.buyerAddressAddAddressRequest.consignee,
        consigneeAddress: this.buyerAddressAddAddressRequest.consigneeAddress,
        consigneeArea:
          this.buyerAddressAddAddressRequest.consigneeArea.toString(),
        contactPhone: this.buyerAddressAddAddressRequest.contactPhone,
        id: this.buyerAddressAddAddressRequest.id,
        isDefault: this.buyerAddressAddAddressRequest.isDefault == true ? 1 : 0,
        zipCode: this.buyerAddressAddAddressRequest.zipCode,
      };
      buyerAddressAddAddress(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.addVisible = false;
            this.resetForm("refBuyerAddressAddAddressRequest");
            this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除采购商地址-接口
    buyerAddressDelAddressApi() {
      buyerAddressDelAddress(this.buyerAddressGetAddressListItemData.id)
        .then((res) => {
          if (res.code == 200) {
            this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑采购商地址-接口
    buyerAddressEditAddressApi() {
      let valueData = {
        buyerId: this.buyerAddressEditAddressRequest.buyerId,
        consignee: this.buyerAddressEditAddressRequest.consignee,
        consigneeAddress: this.buyerAddressEditAddressRequest.consigneeAddress,
        consigneeArea:
          this.buyerAddressEditAddressRequest.consigneeArea.toString(),
        contactPhone: this.buyerAddressEditAddressRequest.contactPhone,
        id: this.buyerAddressEditAddressRequest.id,
        isDefault:
          this.buyerAddressEditAddressRequest.isDefault == true ? 1 : 0,
        zipCode: this.buyerAddressEditAddressRequest.zipCode,
      };
      buyerAddressEditAddress(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.editVisible = false;
            this.resetForm("refBuyerAddressEditAddressRequest");
            this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取采购商默认地址列表-接口
    buyerAddressGetAddressListApi() {
      buyerAddressGetAddressList()
        .then((res) => {
          if (res.code == 200) {
            this.buyerAddressGetAddressListData = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 设置采购商默认地址-接口
    buyerAddressSetDefaultAddressApi() {
      buyerAddressSetDefaultAddress(this.buyerAddressGetAddressListItemData.id)
        .then((res) => {
          if (res.code == 200) {
            this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //默认地址
    getisDefault(id, isDefault) {
      if (isDefault == 1) {
        this.$message.success("已经是默认地址");
      } else {
        buyerAddressSetDefaultAddress(id)
          .then((res) => {
            if (res.code == 200) {
              this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 添加地址按钮
    addButton() {
      this.addVisible = true;
    },
    // 添加地址弹框-取消按钮
    addHandleClose() {
      this.addVisible = false;
      this.resetForm("refBuyerAddressAddAddressRequest");
    },
    // 添加地址弹框-确定按钮
    addHandleOk() {
      this.submitForm("refBuyerAddressAddAddressRequest");
      console.log("传参：", this.buyerAddressAddAddressRequest);
    },

    // 修改地址按钮
    editButton(item) {
      this.buyerAddressEditAddressRequest.consignee = item.consignee; //收货人
      this.buyerAddressEditAddressRequest.contactPhone = item.contactPhone; //联系电话
      this.buyerAddressEditAddressRequest.consigneeArea =
        item.consigneeArea.split(","); //收货地址
      this.buyerAddressEditAddressRequest.consigneeAddress =
        item.consigneeAddress; //详细收货地址
      this.buyerAddressEditAddressRequest.zipCode = item.zipCode; //邮政编码
      this.buyerAddressEditAddressRequest.isDefault =
        item.isDefault == 1 ? true : false; //是否默认地址 0否 1是
      this.buyerAddressEditAddressRequest.id = item.id;
      this.buyerAddressEditAddressRequest.buyerId = item.buyerId; //采购商id
      this.editVisible = true;
    },
    // 修改地址弹框-取消按钮
    editHandleClose() {
      this.editVisible = false;
      this.resetForm("refBuyerAddressEditAddressRequest");
    },
    // 修改地址弹框-确定按钮
    editHandleOk() {
      this.submitForm("refBuyerAddressEditAddressRequest");
      console.log("传参：", this.buyerAddressEditAddressRequest);
    },

    // 删除按钮
    deleteButton(item) {
      this.buyerAddressGetAddressListItemData = item;
      this.buyerAddressDelAddressApi();
    },
    // 设为默认地址按钮
    setAsDefaultAddressButton(item) {
      this.buyerAddressGetAddressListItemData = item;
      this.buyerAddressSetDefaultAddressApi();
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addVisible) {
            this.buyerAddressAddAddressApi(); // 新增采购商地址-接口
          } else if (this.editVisible) {
            this.buyerAddressEditAddressApi(); // 编辑采购商地址-接口
          }
        } else {
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.buyerAddressAddAddressRequest.consignee = ""; //收货人
      this.buyerAddressAddAddressRequest.contactPhone = ""; //联系电话
      this.buyerAddressAddAddressRequest.consigneeArea = []; //收货地址
      this.buyerAddressAddAddressRequest.consigneeAddress = ""; //详细收货地址
      this.buyerAddressAddAddressRequest.zipCode = ""; //邮政编码
      this.buyerAddressAddAddressRequest.isDefault = 0; //是否默认地址 0否 1是
      this.buyerAddressAddAddressRequest.id = 0;
      this.buyerAddressAddAddressRequest.buyerId = 0; //采购商id

      this.buyerAddressEditAddressRequest.consignee = ""; //收货人
      this.buyerAddressEditAddressRequest.contactPhone = ""; //联系电话
      this.buyerAddressEditAddressRequest.consigneeArea = []; //收货地址
      this.buyerAddressEditAddressRequest.consigneeAddress = ""; //详细收货地址
      this.buyerAddressEditAddressRequest.zipCode = ""; //邮政编码
      this.buyerAddressEditAddressRequest.isDefault = 0; //是否默认地址 0否 1是
      this.buyerAddressEditAddressRequest.id = 0;
      this.buyerAddressEditAddressRequest.buyerId = 0; //采购商id
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./receivingAddressManagement.scss";
</style>
