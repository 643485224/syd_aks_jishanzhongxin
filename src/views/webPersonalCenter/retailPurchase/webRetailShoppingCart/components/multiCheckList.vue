<template>
  <div class="multi-check" :style="{ width: width }">
    <div class="multi-check-item" v-if="isCheckAll">
      <slot name="checkallRender" :isIndeterminate="isIndeterminate" :checkAll="checkAll" :totalLabel="totalLabel"
        :handlerChange="handlerChange">
        <el-checkbox label="全选" :indeterminate="isIndeterminate" v-model="checkAll"
          @change="handlerChange(0, null, $event)">
          <slot name="checkallText">
            全选 {{ totalLabel }}
          </slot>
        </el-checkbox>
        <!-- <el-checkbox label="反选" v-model="checkInvert" @change="handlerChange(-1, null, $event)">反选</el-checkbox> -->
      </slot>
    </div>
    <div class="multi-check-group " v-for="(item) in newDataList" :key="item[fieldProps['key']]">
      <div class="multi-check-group-header">
        <el-checkbox v-model="item.isChecked" :indeterminate="item.isIndeterminate" :label="item[fieldValue]"
          :value="item[fieldValue]" @change="handlerChange(1, item, $event)"> {{ showLabel ? item[fieldLabel] : ' ' }}
        </el-checkbox>
        <slot name="group" :value="item">

        </slot>
      </div>
      <div class="multi-check-group-content"  :style="inline?'display:inline-block':''" >
          <div class="multi-check-item" v-for="child in (item[fieldChildren] || [])" :key="child[fieldValue]">
            <el-checkbox v-model="child.isChecked" @change="handlerChange(2, item, $event)" :label="child[fieldValue]">
            {{ showLabel ? child[fieldLabel] : ' ' }}
          </el-checkbox>
          <slot name="item" :value="child">

          </slot>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// checkallText  全选文字
// checkallRender  全选内容渲染

export default {
  name: 'multiCheckList',
  props: {
    isCheckAll: {            //是否显示全选
      type: Boolean,
      default: false
    },
    dataList: {            //数据集合
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    defaultCheckedKeys: {        //默认选中项
      type: Array,
      default: () => ([])
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    invert: {
      type: Boolean,
      default: false
    },
    inline: {
      type:Boolean,
      default:true,
    },
    fieldProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          children: 'children',
        }
      }
    }
  },

  data() {
    let fieldValue = this.fieldProps.value;
    let fieldChildren = this.fieldProps.children;
    let fieldLabel = this.fieldProps.label;

    return {
      checkInvert: false,
      checkAll: false,
      isIndeterminate: false,
      totalLabel: '',
      newDataList: [],   //为了不污染prop dataList
      fieldValue,
      fieldChildren,
      fieldLabel
    }
  },
  watch: {
    newDataList: {
      handler() {
        const isChangeSum = this.newDataList.reduce((prev, cur) => {
          return prev + (+(cur.isChange || 0));
        }, 0);
        const isCheckSum = this.newDataList.reduce((prev, cur) => {
          return prev + (+(cur.isChecked || 0));
        }, 0);
        this.checkAll = (isCheckSum && isCheckSum === this.newDataList.length);
        this.isIndeterminate = !!isChangeSum;
        if (isCheckSum && isCheckSum === this.newDataList.length) {
          this.isIndeterminate = false;
        }
        this.totalLabel = isChangeSum === 0 ? "" : `已选择(${isChangeSum})个分类`;
      },
      immediate: true,
      deep: true
    },
    dataList: {
      handler: function (val) {
        //这里只做简单的拷贝，深拷贝需要自己实现,这里只是为了演示
        this.newDataList = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    getDataList() {
      let fieldChildren = this.fieldChildren;
      let fieldValue = this.fieldValue;

      let parentList = []
      let childList = []
      let parentInfoList = []
      let childInfoList = []
      this.newDataList.forEach(item => {
        console.log(item);
        if (item.isChecked) {
          parentList.push(item[fieldValue])
          parentInfoList.push(item)
        }
        ; (item[fieldChildren] || []).forEach(child => {
          console.log(child);
          if (child.isChecked) {
            childList.push(child[fieldValue]);
            childInfoList.push(child)

          }
        })
      })
      return [parentList, childList,parentInfoList,childInfoList]
    }
  },
  methods: {
    initCheckedKeys() {        //初始化默认选中项
      let fieldChildren = this.fieldChildren;
      let fieldValue = this.fieldValue;
      ; (this.newDataList || []).forEach(item => {
        if (!item[fieldChildren] || !Array.isArray(item[fieldChildren])) item[fieldChildren] = []
        item[fieldChildren].forEach(child => {
          if (this.defaultCheckedKeys.includes(child[fieldValue])) {
            this.$set(child, 'isChecked', true);
          }
        });
        if (item[fieldChildren].length) {
          const every = item[fieldChildren].every(it => it.isChecked)   //子集全部选中
          const some = item[fieldChildren].some(it => it.isChecked)   //子集没有全部选中
          this.$set(item, 'isChecked', every);
          this.$set(item, 'isIndeterminate', some && !every);
          this.$set(item, 'isChange', some)
        }
      })
    },
    handlerCheckAll(isChecked) {
      let fieldChildren = this.fieldChildren;
      this.newDataList.forEach(item => {
        this.$set(item, 'isChecked', isChecked);
        this.$set(item, 'isChange', isChecked);
        if (isChecked) this.$set(item, 'isIndeterminate', false);
        item[fieldChildren].forEach(child => {
          this.$set(child, 'isChecked', isChecked);
        })
      });
    },
    handlerChange($type, $row, $event) {
      let fieldChildren = this.fieldChildren;
      let isChecked = !$event.target ? $event : $event.target.checked;
      if ($type === 0) {        //全选
        this.handlerCheckAll(isChecked)
        this.$emit('change', this.getDataList[0], this.getDataList[1], this.getDataList[3])
        return
      }
      if ($type === 1) {
        $row[fieldChildren].forEach((item) => {
          this.$set(item, 'isChecked', isChecked);

        })
      }
      const checkCount = $row[fieldChildren].reduce((prev, cur) => {
        let check = 0;
        if (cur.isChecked === undefined) {
          check = 0;
        } else {
          check = +cur.isChecked
        }
        return prev + (+check);
      }, 0);    //统计选择的次数
      this.$set($row, 'isChange', checkCount === 0 ? false : true);
      this.$set($row, 'isChecked', (checkCount && checkCount === $row[fieldChildren].length) ? true : false);
      this.$set($row, 'isIndeterminate', (checkCount && checkCount < $row[fieldChildren].length) ? true : false);
      this.$emit('change', this.getDataList[0], this.getDataList[1],this.getDataList[3])
    }
  },
  mounted() {
    this.initCheckedKeys()
  }
}
</script>
<style lang="scss" scoped>
.multi-check {
  position: relative;
  text-align: left;

  .multi-check-group,
  .multi-check-item {
    width: 100%;
    // background-color: #F9FAFB;
    // padding: 10px 0;
    // padding-left: 25px;
    border-radius: 6px;
  }
  .multi-check-item {
    display: flex;

  }

  .multi-check-group-header {
    display: flex;

  }
}
</style>
