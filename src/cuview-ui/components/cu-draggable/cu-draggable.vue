<template>
  <div>
    <!-- 拖拽组件 -->
    <!-- <div class="manbox"> -->
    <vue-drag-resize
      v-for="(rect, index) in rects"
      :key="index"
      :w="rect.width"
      :h="rect.height"
      :x="rect.left"
      :y="rect.top"
      :parentW="listWidth"
      :parentH="listHeight"
      :axis="rect.axis"
      :isActive="rect.active"
      :minw="rect.minw"
      :minh="rect.minh"
      :isDraggable="rect.draggable"
      :isResizable="rect.resizable"
      :parentLimitation="rect.parentLim"
      :snapToGrid="rect.snapToGrid"
      :aspectRatio="rect.aspectRatio"
      :z="rect.zIndex"
      :contentClass="rect.class"
      v-on:activated="activateEv(index)"
      v-on:deactivated="deactivateEv(index)"
      v-on:dragging="changePosition($event, index)"
      v-on:resizing="changeSize($event, index)"
    >
      <slot></slot>
      <!-- <img src="../../img/bg_zf.png" height="100%" width="100%" /> -->
    </vue-drag-resize>
    <!-- </div> -->
  </div>
</template>
<script>
/*
    isActive：是否是激活状态
    isDraggable：是否等比例缩放
    isResizable ：是否允许缩放
    isDraggable：是否等比例缩放
    aspectRatio 是否等比例缩放
    parentLimitation 是否超出父级元素
    axis 允许拖拽的方向
*/
export default {
  name: "cu-draggable",
  data() {
    return {
      listWidth: 0,
      listHeight: 0,
      rects: [
        {
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          draggable: true,
          resizable: false,
          minw: 0,
          minh: 0,
          axis: "both",
          parentLim: false,
          snapToGrid: false,
          aspectRatio: false,
          zIndex: 9999,
          color: "#EF9A9A",
          active: false,
        },
      ],
    };
  },
  methods: {
    activateEv(index) {
      console.log(index);
      // this.$store.dispatch('rect/setActive', {id: index});
    },
    // 当前缩放的元素索引
    deactivateEv(index) {
      console.log(index);

      // this.$store.dispatch('rect/unsetActive', {id: index});
    },

    // 拖动的位置
    changePosition(newRect, index) {
      console.log(newRect, index);
      // this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
      // this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
      // this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
      // this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
    },
    // 改变拉伸的大小
    changeSize(newRect, index) {
      console.log(newRect, index);
      // this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
      // this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
      // this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
      // this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
    },
  },
};
</script>
<style lang="less" scoped>
.vdr.active:before {
  outline: none;
}

.manbox {
  height: calc(100vh - 76px - 14px - 68px - 18px - 20px - 20px);
  // height: 100%;
  width: calc(100vw - 220px - 20px - 20px - 20px - 20px);
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid red;
  position: relative;
}
</style>
