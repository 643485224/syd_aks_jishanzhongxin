<template>
  <div ref="contentBox" class="page-container table-page">
    <div v-if="buyerBankCardGetBuyerBankCardList.length == 0">
      <div class="content_one ml_40 mt_40">您还没有添加任何银行卡</div>
      <div class="content_two ml_40 mt_20">
        添加银行卡以满足您的业务和个人需求。
      </div>

      <el-button type="primary" class="btn_ff480e ml_40 mt_20"
      @click="addButton" >添加银行卡</el-button
      >
    </div>
    <div v-else>
      <div class="content_one flex_ac_jb">
        <span>已有银行卡</span>
        <el-button type="primary" class="btn_ff480e" @click="addButton"
          >添加银行卡</el-button
        >
      </div>
      <div
        class="content_three mt_20"
        v-for="item in buyerBankCardGetBuyerBankCardList"
        :key="item.bankCardNo"
      >
        <div class="content_three_left">
          <div class="content_three_left1">
            <span class="mr_20">开户行:</span>
            <span class="mr_20">{{ item.bankName }}</span>
          </div>
          <div class="content_three_left1">
            <span class="mr_20">银行卡号:</span>
            <span class="mr_20">{{ item.bankCardNo }}</span>
          </div>
          <div class="content_three_left1">
            <span class="mr_20">创建时间:</span>
            <span class="mr_20">{{ item.createTime }}</span>
          </div>
          <!-- <div class="content_three_left2">
          <span class="mr_20">开户行:</span>
          <span class="mr_20">{{ item.bankName }}</span>
        </div>
        <div class="content_three_left3">
          <span class="mr_20">银行卡号:</span>
          <span class="mr_20">{{ item.bankCardNo }}</span>
        </div>
        <div class="content_three_left3">
          <span class="mr_20">创建时间:</span>
          <span class="mr_20">{{ item.createTime }}</span>
        </div> -->
        </div>
        <div class="content_three_right">
          <div class="content_three_right2 mt_20">
            <a class="content_three_right2" @click="editButton(item)"
              >修改银行卡</a
            >
          </div>
          <div class="content_three_right3 mt_20">
            <el-popconfirm
              title="确定删除该条银行卡信息吗？"
              @confirm="deleteButton(item)"
            >
              <a slot="reference" class="content_three_right3">删除银行卡</a>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>

    <cu-dialog
      width="600px"
      title="添加银行卡"
      :center="'center'"
      :showClose="true"
      :visible="addVisible"
      @handleClose="addHandleClose()"
      @handleOk="addHandleOk()"
    >
      <div class="content_four mt_20 flex_fc_ac">
        <div class="content_four_item">
          <div class="content_four_item_lable">开户行:</div>
          <div class="content_four_item_input">
            <el-input
              v-model="buyerBankCardAddBuyerBankCardRequest.bankName"
              placeholder="请输入开户行"
            ></el-input>
          </div>
        </div>
        <div class="content_four_item mt_20">
          <div class="content_four_item_lable">银行卡号:</div>
          <div class="content_four_item_input">
            <el-input
              v-model="buyerBankCardAddBuyerBankCardRequest.bankCardNo"
              placeholder="请输入银行卡号"
            ></el-input>
          </div>
        </div>
      </div>
    </cu-dialog>

    <cu-dialog
      width="600px"
      title="修改银行卡"
      :center="'center'"
      :showClose="true"
      :visible="editVisible"
      @handleClose="editHandleClose()"
      @handleOk="editHandleOk()"
    >
      <div class="content_four mt_20 flex_fc_ac">
        <div class="content_four_item">
          <div class="content_four_item_lable">开户行:</div>
          <div class="content_four_item_input">
            <el-input
              v-model="buyerBankCardModifyBuyerBankCardRequest.bankName"
              placeholder="请输入开户行"
            ></el-input>
          </div>
        </div>
        <div class="content_four_item mt_20">
          <div class="content_four_item_lable">银行卡号:</div>
          <div class="content_four_item_input">
            <el-input
              v-model="buyerBankCardModifyBuyerBankCardRequest.bankCardNo"
              placeholder="请输入银行卡号"
            ></el-input>
          </div>
        </div>
      </div>
    </cu-dialog>
  </div>
</template>
<script>
import {
  buyerBankCardAddBuyerBankCard,
  buyerBankCardDelBuyerBankCard,
  buyerBankCardGetBuyerBankCard,
  buyerBankCardModifyBuyerBankCard,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
export default {
  data() {
    return {
      // 获取所有银行卡号-接口回参
      buyerBankCardGetBuyerBankCardList: [],
      buyerBankCardGetBuyerBankCardListItem: {},

      addVisible: false, //添加弹框
      editVisible: false, //修改弹框
      // 新增采购商银行卡-接口传参
      buyerBankCardAddBuyerBankCardRequest: {
        bankCardNo: "", //银行卡号
        bankName: "", //开户行
      },

      // 编辑采购商银行卡-接口传参
      buyerBankCardModifyBuyerBankCardRequest: {
        bankCardNo: "", //银行卡号
        bankName: "", //开户行
        id: 0, //id
      },
    };
  },
  mounted() {
    this.buyerBankCardGetBuyerBankCardApi(); // 获取所有银行卡号-接口
  },
  methods: {
    // 添加银行卡-接口
    buyerBankCardAddBuyerBankCardApi() {
      buyerBankCardAddBuyerBankCard(this.buyerBankCardAddBuyerBankCardRequest)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.buyerBankCardGetBuyerBankCardApi(); // 获取所有银行卡号-接口
            this.addVisible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除银行卡号-接口
    buyerBankCardDelBuyerBankCardApi() {
      buyerBankCardDelBuyerBankCard(
        this.buyerBankCardGetBuyerBankCardListItem.id
      )
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.buyerBankCardGetBuyerBankCardApi(); // 获取所有银行卡号-接口
            this.addVisible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取所有银行卡号-接口
    buyerBankCardGetBuyerBankCardApi() {
      buyerBankCardGetBuyerBankCard()
        .then((res) => {
          if (res.code == 200) {
            this.buyerBankCardGetBuyerBankCardList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改银行卡-接口
    buyerBankCardModifyBuyerBankCardApi() {
      buyerBankCardModifyBuyerBankCard(
        this.buyerBankCardModifyBuyerBankCardRequest
      )
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
            this.buyerBankCardGetBuyerBankCardApi(); // 获取所有银行卡号-接口
            this.editVisible = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加银行卡按钮
    addButton() {
      this.buyerBankCardAddBuyerBankCardRequest.bankCardNo = ""; //银行卡号
      this.buyerBankCardAddBuyerBankCardRequest.bankName = ""; //开户行
      this.addVisible = true;
    },
    // 添加银行卡弹框-取消按钮
    addHandleClose() {
      this.addVisible = false;
    },
    // 添加银行卡弹框-确定按钮
    addHandleOk() {
      if (!this.buyerBankCardAddBuyerBankCardRequest.bankName) {
        this.$message.error("开户行不能为空");
        return;
      }
      if (!this.buyerBankCardAddBuyerBankCardRequest.bankCardNo) {
        this.$message.error("银行卡号不能为空");
        return;
      }
      this.buyerBankCardAddBuyerBankCardApi(); // 添加银行卡-接口
    },

    // 修改银行卡按钮
    editButton(item) {
      this.buyerBankCardModifyBuyerBankCardRequest.bankCardNo = item.bankCardNo; //银行卡号
      this.buyerBankCardModifyBuyerBankCardRequest.bankName = item.bankName; //开户行
      this.buyerBankCardModifyBuyerBankCardRequest.id = item.id; //id
      this.editVisible = true;
    },
    // 修改银行卡弹框-取消按钮
    editHandleClose() {
      this.editVisible = false;
    },
    // 修改银行卡弹框-确定按钮
    editHandleOk() {
      if (!this.buyerBankCardModifyBuyerBankCardRequest.bankName) {
        this.$message.error("开户行不能为空");
        return;
      }
      if (!this.buyerBankCardModifyBuyerBankCardRequest.bankCardNo) {
        this.$message.error("银行卡号不能为空");
        return;
      }
      this.buyerBankCardModifyBuyerBankCardApi(); // 修改银行卡-接口
    },

    // 删除按钮
    deleteButton(item) {
      this.buyerBankCardGetBuyerBankCardListItem = item;
      this.buyerBankCardDelBuyerBankCardApi(); // 删除银行卡号-接口
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./bankCardManagement.scss";
</style>
