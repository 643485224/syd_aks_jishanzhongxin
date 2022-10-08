<template>
  <div>
    <!-- <div>数字滚动组件</div> -->
    <div class="iCountUp">
      <CountUp
        :delay="delay"
        :endVal="endVal"
        :options="options"
        @ready="onReady"
      />
    </div>
  </div>
</template>
<script>
import CountUp from "vue-countup-v2";
export default {
  name: "cu-countup",
  components: {
    CountUp,
  },
  data() {
    return {
      options: {
        startVal: 0, //开始时的值
        duration: 3, //持续多久 单位是秒
        useEasing: true,
        useGrouping: true,
        separator: "", //千分位
        decimal: ".",
        decimalPlaces: 0, //控制小数位数
        prefix: "", //开头拼接
        suffix: "", //末尾拼接
      },
    };
  },
  props: {
    delay: {
      type: Number,
      default: 0, //延迟多少毫秒开始
    },
    endVal: {
      type: Number,
      default: 0, //设置结束的值
    },
  },

  methods: {
    onReady: function (instance, CountUp) {
      const that = this;
      instance.update(that.endVal);
    },
  },
};
</script>

<style scoped></style>
