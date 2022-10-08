<template>
  <!-- 弹框组件 -->
  <div class="elDialog-wrapper">
    <el-dialog :top="top" class="elDialog" :title="title" :width="width" :visible.sync="visible"
      :before-close="handleClose" :center="center" :fullscreen="fullscreen" :modal="modal" :show-close="showClose"
      :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnEsc" :destroy-on-close="destroyOnClose" :append-to-body="appendToBody"
      :modal-append-to-body="modalAppendToBody">
      <!-- 使用头部插槽 页面不使用即为下方状态 -->
      <div slot="title" :style="{ 'background': '#0E78F3', 'color': 'white' }">
        <slot name="title">
          <div class="dialog-title">{{ title }}</div>
        </slot>
      </div>
      <slot></slot>
      <!-- 使用底部插槽 页面不使用即为下方状态 -->
      <div slot="footer">
        <slot name="footer">
          <div class="dialog-footer">
            <el-button class="elButtonTwo" @click="handleClose">取 消</el-button>
            <el-button class="elButtonOne" type="primary" @click="handleOk">确 定</el-button>
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "cu-dialog",
  props: {
    // Dialog 的标题，也可通过具名 slot='title' 传入
    title: {
      type: String,
      default: "",
    },
    top: {
      type: String,
      default: "15vh",
    },
    width: {
      type: String,
      default: "",
    },
    // 是否显示 Dialog，支持 .sync 修饰符
    visible: {
      type: Boolean,
      default: false,
    },
    // 是否对头部和底部采用居中布局
    center: {
      type: Boolean,
      default: false,
    },
    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: false,
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    // 关闭时是否销毁内部元素
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    // Dialog 自身是否插入至 body 元素上
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // 遮罩层是否插入至 body 元素上
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    // 点击 esc 是否可以关闭弹窗
    closeOnEsc: {
      type: Boolean,
      default: false,
    },

  },
  methods: {
    // 点击遮罩层 或 右上角X
    handleClose() {
      this.$emit("handleClose");
    },
    // 确定按钮
    handleOk() {
      this.$emit("handleOk");
    },
  },
};
</script>
<style lang="scss">
.dialog-title {
  font-family: "Microsoft YaHei";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  // line-height: 32px;
  // color: #000000;
  color: #FFFFFF;
}

.dialog-footer {
  display: flex;
  justify-content: center;

  .elButtonOne{
    width: 120px;
    height: 32px;
    margin-right: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .elButtonTwo {
    width: 120px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// .elDialog-wrapper {
  .el-dialog {
    border-radius: 8px;

  }
// }

// 遮罩层样式
.elDialog {
  // background-color: rgba(0, 0, 0, 0.3);
}

// 头部样式
.elDialog .el-dialog__header {
  // padding: 20px 20px 20px 20px;
  padding: 17px;
  border-radius: 8px 8px 0 0;
  background-color: #0E78F3;

  .el-dialog__headerbtn {
    top: 15px;
    font-size: 20px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #FFFFFF;

    .el-icon-close {
      color: #0E78F3;
    }
  }
}

// 内容样式
.elDialog .el-dialog__body {
  padding: 0px 20px 0px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

// 底部样式
.elDialog .el-dialog__footer {
  padding: 20px 20px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>
