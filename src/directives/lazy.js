/*
   图片懒加载指令  
   指令功能：能防止页面一次性向服务器发送大量请求，导致服务器响应页面卡顿、崩溃等问题
*/
import Vue from 'vue'
Vue.directive('lazy', {
  inserted(el) {
    const imgSrc = el.src
    el.src = ''
    // 观察者
    const observer = new IntersectionObserver((entries) => {
      // 元素出现在可视区域，和离开可视区域被触发
      // entries[0].isIntersecting为true说明当前已经出现（能看到该元素），为false代表该元素未出现（看不见该元素）
      if (entries[0].isIntersecting) {
        //加载图片
        el.src = imgSrc
        // 停止观察
        observer.unobserve(el)
      }

    })
    observer.observe(el)
  }
})
/*
自定义指令存在的钩子函数：
  钩子函数：   
          bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
          inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
          update：所在组件的 VNode 更新时调用，但是可能发生在其子VNode更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
          componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
          unbind：只调用一次，指令与元素解绑时调用
  所有的钩子函数的参数都有以下：
          el：指令所绑定的元素，可以用来直接操作 DOM
          binding：一个对象，包含以下 property：
                                         `name`：指令名，不包括 v- 前缀。
                                         `value`：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
                                         `oldValue`：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
                                         `expression`：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
                                         `arg`：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
                                         `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }
                                         `vnode`：Vue 编译生成的虚拟节点
                                         `oldVnode`：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用
*/
