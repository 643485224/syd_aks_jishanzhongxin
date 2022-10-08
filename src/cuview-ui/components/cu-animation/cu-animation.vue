<template>
  <div>
    <!-- 动画组件   
    使用方法：
    <cu-animation :type="'bounce'" :time="0.5"></cu-animation> 
    -->
    <div :class="typeSet" :data-wow-duration="timeSet">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 所有动画集合
      classNameList: {
        // Attention Seekers
        bounce: "wow  animate__bounce",
        flash: "wow  animate__flash",
        pulse: "wow  animate__pulse",
        rubberBand: "wow  animate__rubberBand",
        shake: "wow  animate__shake",
        swing: "wow  animate__swing",
        tada: "wow  animate__tada",
        wobble: "wow  animate__wobble",
        // Bouncing Entrances
        bounceIn: "wow  animate__bounceIn",
        bounceInDown: "wow  animate__bounceInDown",
        bounceInLeft: "wow  animate__bounceInLeft",
        bounceInRight: "wow  animate__bounceInRight",
        bounceInUp: "wow  animate__bounceInUp",
        // Bouncing Exits
        bounceOut: "wow  animate__bounceOut",
        bounceOutDown: "wow  animate__bounceOutDown",
        bounceOutLeft: "wow  animate__bounceOutLeft",
        bounceOutRight: "wow  animate__bounceOutRight",
        bounceOutUp: "wow  animate__bounceOutUp",
        // Fading Entrances
        fadeIn: "wow  animate__fadeIn",
        fadeInDown: "wow  animate__fadeInDown",
        fadeInDownBig: "wow  animate__fadeInDownBig",
        fadeInLeft: "wow  animate__fadeInLeft",
        fadeInLeftBig: "wow  animate__fadeInLeftBig",
        fadeInRight: "wow  animate__fadeInRight",
        fadeInRightBig: "wow  animate__fadeInRightBig",
        fadeInUp: "wow  animate__fadeInUp",
        fadeInUpBig: "wow  animate__fadeInUpBig",
        // Fading Exits
        fadeOut: "wow  animate__fadeOut",
        fadeOutDown: "wow  animate__fadeOutDown",
        fadeOutDownBig: "wow  animate__fadeOutDownBig",
        fadeOutLeft: "wow  animate__fadeOutLeft",
        fadeOutLeftBig: "wow  animate__fadeOutLeftBig",
        fadeOutRight: "wow  animate__fadeOutRight",
        fadeOutRightBig: "wow  animate__fadeOutRightBig",
        fadeOutUp: "wow  animate__fadeOutUp",
        fadeOutUpBig: "wow  animate__fadeOutUpBig",
        // Flippers
        flip: "wow  animate__flip",
        flipInX: "wow  animate__flipInX",
        flipInY: "wow  animate__flipInY",
        flipOutX: "wow  animate__flipOutX",
        flipOutY: "wow  animate__flipOutY",
        // Lightspeed
        lightSpeedIn: "wow  animate__lightSpeedIn",
        lightSpeedOut: "wow  animate__lightSpeedOut",
        // Rotating Entrances
        rotateIn: "wow  animate__rotateIn",
        rotateInDownLeft: "wow  animate__rotateInDownLeft",
        rotateInDownRight: "wow  animate__rotateInDownRight",
        rotateInUpLeft: "wow  animate__rotateInUpLeft",
        rotateInUpRight: "wow  animate__rotateInUpRight",
        // Rotating Exits
        rotateOut: "wow  animate__rotateOut",
        rotateOutDownLeft: "wow  animate__rotateOutDownLeft",
        rotateOutDownRight: "wow  animate__rotateOutDownRight",
        rotateOutUpLeft: "wow  animate__rotateOutUpLeft",
        rotateOutUpRight: "wow  animate__rotateOutUpRight",
        // Sliders
        slideInDown: "wow  animate__slideInDown",
        slideInLeft: "wow  animate__slideInLeft",
        slideInRight: "wow  animate__slideInRight",
        slideOutLeft: "wow  animate__slideOutLeft",
        slideOutRight: "wow  animate__slideOutRight",
        slideOutUp: "wow  animate__slideOutUp",
        // Specials
        hinge: "wow  animate__hinge",
        rollIn: "wow  animate__rollIn",
        rollOut: "wow  animate__rollOut",
      },
    };
  },
  computed: {
    typeSet() {
      return this.classNameList[this.type];
    },
    timeSet() {
      return this.time + "s";
    },
  },
  props: {
    // 动画类型
    type: {
      type: String,
      default: "",
    },
    // 动画时间
    time: {
      type: Number,
      default: 3,
    },
  },
  name: "cu-animation",

  mounted() {
    // 初始化wowjs动画
    new this.$wow.WOW({
      boxClass: "wow", // default 需要执行动画的元素的 class
      animateClass: "animated", // default animation.css 动画的 class
      offset: 0, // default 距离可视区域多少开始执行动画
      mobile: true, // default 是否在移动设备上执行动画
      live: true, // default
    }).init();
  },
  methods: {
    again() {
      new this.$wow.WOW({
        boxClass: "wow", // default 需要执行动画的元素的 class
        animateClass: "animated", // default animation.css 动画的 class
        offset: 0, // default 距离可视区域多少开始执行动画
        mobile: true, // default 是否在移动设备上执行动画
        live: true, // default
      }).init();
    },
  },
};
</script>
<style lang="scss" scoped></style>
