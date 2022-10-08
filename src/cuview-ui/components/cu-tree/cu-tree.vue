<template>
  <div>
    <el-tree ref="tree" :data="treeList" :show-checkbox="showCheckbox" :props="propsRule"
      :default-checked-keys="defaultCheckedKeys" :default-expanded-keys="defaultCheckedKeys"
      :check-strictly="checkStrictly" :node-key="nodeKey" @check-change="checkChange" @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
import webFinancialServiceVue from '../../../views/webpageViews/webFinancialService/webFinancialService.vue';

export default {
  props: {
    treeList: {// 组件节点渲染数据
      type: Array,
      default: () => [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    },
    propsRule: {// 组件节点渲染绑定字段 配置选项
      type: Object,
      default: () => {
        return {
          children: 'children',// 指定子树为节点对象的某个属性值
          label: "label",// 指定节点标签为节点对象的某个属性值
          disabled: "disabled",// 指定节点选择框是否禁用为节点对象的某个属性值
          isLeaf: 'isLeaf',	// 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        }
      }
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: {// 默认选中节点
      type: Array,
      default: () => []
    },
    nodeKey: {// 通过 key 来获取或设置选中节点
      type: String,
      default: 'id'
    },
    checkStrictly: {// 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      defaultkeys: [],

    }
  },
  created() {
  },
  mounted() {
    if (this.defaultCheckedKeys.length) {
      console.log(this.checkStrictly);
      this.checkDefaultKeys(this.defaultCheckedKeys)

    }

  },
  watch: {
    immediate: true,
  },
  computed: {
  },
  methods: {
    checkDefaultKeys(keys) {
      this.$nextTick(() => {
        keys.forEach((value) => {
          this.$refs.tree.setChecked(value, true, false);// 解决数据回显时 父节点选中默认选中全部子节点问题
        });
        this.$emit('update:checkStrictly', false);
        console.log(this.checkStrictly);
      });
      // this.$refs.tree.setCheckedKeys(keys)
    },
    checkChange() {
      // 子节点选中默认选中父节点
      let checkedKeys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()];
      console.log(checkedKeys);
      this.$emit('getCheckedKeys', checkedKeys);
    },

    handleNodeClick(data) {
      console.log(data);
      this.$emit('nodeClick', data);
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
