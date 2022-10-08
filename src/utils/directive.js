// directive.js （和main.js同级）
import Vue from 'vue'

Vue.directive('defaultSelect', {
  componentUpdated(el, bindings) {
    const [defaultValues] = bindings.value
    console.log(defaultValues);
    const dealTagCloseStyle = function (tags) {
      // 因为不可删除原有值，所以原有值的index是不会变的，也就是将前n个tag的close隐藏掉即可。n即已有值的长度defaultValues.length
      tags.forEach((el, index) => {
        if (
          index <= defaultValues.length - 1 &&
          ![...el.classList].includes('select-tag-close-none') &&  ![...el.classList].includes('el-tag--info')
        ) {
          el.style.display = 'none' // close 图标隐藏掉
        }
      })
    }
    const dealTagStyle = function (tags) {
        // 因为不可删除原有值，所以原有值的index是不会变的，也就是将前n个tag的close隐藏掉即可。n即已有值的长度defaultValues.length
        tags.forEach((el, index) => {
          if (
              index <= defaultValues.length - 1 &&
              [...el.classList].includes('el-tag--info')
            ) {
              console.log(el);
              // 修改 el-select 多选模式下 tag样式
              el.classList.remove('el-tag--info')
            //   el.style.borderColor = '#d9ecff'
            //   el.style.color = '#409EFF'
            //   el.style.backgroundColor = '#ecf5ff'
            }
        })
      }
    // 设置样式隐藏close icon
    const tags = el.querySelectorAll('.el-tag__close')
    const options = el.querySelectorAll('.el-select__tags .el-tag')
    console.log(options);
    if (tags.length === 0) {
      // 初始化tags为空处理
      setTimeout(() => {
        const tagTemp = el.querySelectorAll('.el-tag__close')
        dealTagCloseStyle(tagTemp)
      })
    } else {
        dealTagCloseStyle(tags)
    }
    if(options.length){
        dealTagStyle(options)
    }
  }
})
