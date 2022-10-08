<template>
  <div class="page-container table-page">
    <div class="content_one flex_ac_jb">
      <span>已有收货地址</span>
      <el-button type="primary" class="btn_ff480e" @click="addButton"
        >添加地址</el-button
      >
    </div>
    <div
      class="content_two mt_20"
      v-for="item in buyerAddressGetAddressListData"
      :key="item"
    >
      <div class="content_two_left">
        <div class="content_two_left1">
          <span class="mr_20">{{ item.consignee }}</span>
          <span class="mr_20">{{ item.contactPhone }}</span>
        </div>
        <div class="content_two_left2">
          <span class="mr_20">收货地址:</span>
          <span class="mr_20">{{ item.consigneeAddress }}</span>
        </div>
        <div class="content_two_left3">
          <span class="mr_20">详细收货地址:</span>
          <span class="mr_20">{{ item.consigneeArea }}</span>
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
      :visible="addVisible"
      @handleClose="addHandleClose()"
      @handleOk="addHandleOk()"
    >
      <div class="content_three mt_20 flex_fc_ac">
        <div class="content_three_item">
          <div class="content_three_item_lable">收货人:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressAddAddressRequest.consignee"
              placeholder="请输入收货人姓名"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">联系号码:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressAddAddressRequest.contactPhone"
              placeholder="请输入联系号码"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">收货地址:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressAddAddressRequest.consigneeArea"
              placeholder="请输入收货地址"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">详细收货地址:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressAddAddressRequest.consigneeAddress"
              placeholder="请输入收货地址"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">邮政编码:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressAddAddressRequest.zipCode"
              placeholder="请输入邮政编码"
            ></el-input>
          </div>
        </div>

        <div class="content_three_item mt_10">
          <div class="content_three_item_lable"></div>
          <div class="content_three_item_input">
            <el-checkbox
              v-model="buyerAddressAddAddressRequest.isDefault"
              label="设为默认收货地址"
              name="type"
            ></el-checkbox>
          </div>
        </div>
      </div>
    </cu-dialog>

    <cu-dialog
      width="600px"
      title="修改地址"
      :center="'center'"
      :showClose="true"
      :visible="editVisible"
      @handleClose="editHandleClose()"
      @handleOk="editHandleOk()"
    >
      <div class="content_three mt_20 flex_fc_ac">
        <div class="content_three_item">
          <div class="content_three_item_lable">收货人:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressEditAddressRequest.consignee"
              placeholder="请输入收货人姓名"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">联系号码:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressEditAddressRequest.contactPhone"
              placeholder="请输入联系号码"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">收货地址:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressEditAddressRequest.consigneeArea"
              placeholder="请输入收货地址"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">详细收货地址:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressEditAddressRequest.consigneeAddress"
              placeholder="请输入收货地址"
            ></el-input>
          </div>
        </div>
        <div class="content_three_item mt_20">
          <div class="content_three_item_lable">邮政编码:</div>
          <div class="content_three_item_input">
            <el-input
              v-model="buyerAddressEditAddressRequest.zipCode"
              placeholder="请输入邮政编码"
            ></el-input>
          </div>
        </div>

        <div class="content_three_item mt_10">
          <div class="content_three_item_lable"></div>
          <div class="content_three_item_input">
            <el-checkbox
              v-model="buyerAddressEditAddressRequest.isDefault"
              label="设为默认收货地址"
              name="type"
            ></el-checkbox>
          </div>
        </div>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerAddressAddAddress,
  buyerAddressDelAddress,
  buyerAddressEditAddress,
  buyerAddressGetDefaultAddress,
  buyerAddressSetDefaultAddress,
  buyerAddressGetAddressList,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
export default {
  data() {
    return {
      // 获取采购商默认地址列表-接口回参
      buyerAddressGetAddressListData: [],
      buyerAddressGetAddressListItemData: {},
      // 获取采购商默认地址-接口回参
      buyerAddressGetDefaultAddressObject: {
        buyerId: 0,
        consignee: "",
        consigneeAddress: "",
        consigneeArea: "",
        contactPhone: "",
        id: 0,
        isDefault: 0,
        zipCode: "",
      },
      // 新增采购商地址-接口传参
      buyerAddressAddAddressRequest: {
        consignee: "", //收货人
        contactPhone: "", //联系电话
        consigneeArea: "", //收货地址
        consigneeAddress: "", //详细收货地址
        zipCode: "", //邮政编码
        isDefault: 0, //是否默认地址 0否 1是
        id: 0,
        buyerId: 0, //采购商id
      },

      // 编辑采购商地址-接口传参
      buyerAddressEditAddressRequest: {
        consignee: "", //收货人
        contactPhone: "", //联系电话
        consigneeArea: "", //收货地址
        consigneeAddress: "", //详细收货地址
        zipCode: "", //邮政编码
        isDefault: 0, //是否默认地址 0否 1是
        id: 0,
        buyerId: 0, //采购商id
      },

      addVisible: false, //添加弹框
      editVisible: false, //修改弹框
    };
  },
  mounted() {
    this.buyerAddressGetAddressListApi(); // 获取采购商默认地址列表-接口
    this.buyerAddressGetDefaultAddressApi(); // 获取采购商默认地址-接口
  },
  methods: {
    // 新增采购商地址-接口
    buyerAddressAddAddressApi() {
      let valueData = {
        buyerId: this.buyerAddressAddAddressRequest.buyerId,
        consignee: this.buyerAddressAddAddressRequest.consignee,
        consigneeAddress: this.buyerAddressAddAddressRequest.consigneeAddress,
        consigneeArea: this.buyerAddressAddAddressRequest.consigneeArea,
        contactPhone: this.buyerAddressAddAddressRequest.contactPhone,
        id: this.buyerAddressAddAddressRequest.id,
        isDefault: this.buyerAddressAddAddressRequest.isDefault == true ? 1 : 0,
        zipCode: this.buyerAddressAddAddressRequest.zipCode,
      };
      buyerAddressAddAddress(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.addVisible = false;
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
        consigneeArea: this.buyerAddressEditAddressRequest.consigneeArea,
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
    // 获取采购商默认地址-接口
    buyerAddressGetDefaultAddressApi() {
      this.buyerAddressGetDefaultAddressObject = {};
      buyerAddressGetDefaultAddress()
        .then((res) => {
          if (res.code == 200) {
            this.buyerAddressGetDefaultAddressObject = res.data;
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
    // 添加地址按钮
    addButton() {
      this.buyerAddressAddAddressRequest.consignee = ""; //收货人
      this.buyerAddressAddAddressRequest.contactPhone = ""; //联系电话
      this.buyerAddressAddAddressRequest.consigneeArea = ""; //收货地址
      this.buyerAddressAddAddressRequest.consigneeAddress = ""; //详细收货地址
      this.buyerAddressAddAddressRequest.zipCode = ""; //邮政编码
      this.buyerAddressAddAddressRequest.isDefault = 0; //是否默认地址 0否 1是
      this.buyerAddressAddAddressRequest.id = 0;
      this.buyerAddressAddAddressRequest.buyerId = 0; //采购商id
      this.addVisible = true;
    },
    // 添加地址弹框-取消按钮
    addHandleClose() {
      this.addVisible = false;
    },
    // 添加地址弹框-确定按钮
    addHandleOk() {
      if (!this.buyerAddressAddAddressRequest.consignee) {
        this.$message.error("收货人不能为空");
        return;
      }
      if (!this.buyerAddressAddAddressRequest.contactPhone) {
        this.$message.error("联系号码不能为空");
        return;
      }
      if (!this.buyerAddressAddAddressRequest.consigneeArea) {
        this.$message.error("收货地址不能为空");
        return;
      }
      if (!this.buyerAddressAddAddressRequest.consigneeAddress) {
        this.$message.error("详细收货地址不能为空");
        return;
      }
      if (!this.buyerAddressAddAddressRequest.zipCode) {
        this.$message.error("邮政编码不能为空");
        return;
      }
      console.log("传参：", this.buyerAddressAddAddressRequest);
      this.buyerAddressAddAddressApi();
    },

    // 修改地址按钮
    editButton(item) {
      this.buyerAddressEditAddressRequest.consignee = item.consignee; //收货人
      this.buyerAddressEditAddressRequest.contactPhone = item.contactPhone; //联系电话
      this.buyerAddressEditAddressRequest.consigneeArea = item.consigneeArea; //收货地址
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
    },
    // 修改地址弹框-确定按钮
    editHandleOk() {
      if (!this.buyerAddressEditAddressRequest.consignee) {
        this.$message.error("收货人不能为空");
        return;
      }
      if (!this.buyerAddressEditAddressRequest.contactPhone) {
        this.$message.error("联系号码不能为空");
        return;
      }
      if (!this.buyerAddressEditAddressRequest.consigneeArea) {
        this.$message.error("收货地址不能为空");
        return;
      }
      if (!this.buyerAddressEditAddressRequest.consigneeAddress) {
        this.$message.error("详细收货地址不能为空");
        return;
      }
      if (!this.buyerAddressEditAddressRequest.zipCode) {
        this.$message.error("邮政编码不能为空");
        return;
      }
      console.log("传参：", this.buyerAddressEditAddressRequest);
      this.buyerAddressEditAddressApi();
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
  },
};
</script>
<style lang="scss" scoped>
@import "./receivingAddressManagement.scss";
</style>
