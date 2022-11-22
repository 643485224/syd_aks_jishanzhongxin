<template>
  <div>
    <!-- :default-expanded-keys="defaultExpandedKeys"   :render-content="renderContent"-->
    <el-tree :data="data" :props="props" show-checkbox node-key="id" default-expand-all
    :expand-on-click-node="false"
      :default-checked-keys="defaultCheckedKeys" @check-change="handleCheckChange">

      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [
        {
          id: 55,
          name: '商品',
          cartGoodsList: [
            {
              id: 1,
              name: 'ddd',
              cartGoodsList: [
                {
                  id: 3,
                  name: 'xdf ',

                },
                {
                  id: 2,
                  name: 'fg ',

                },
                {
                  id: 5,
                  name: 'dfgh dd',

                },
              ]
            },
            {
              id: 2,
              name: 'ddd',
              cartGoodsList: [
                {
                  id: 1,
                  name: 'xdf ',

                },
                {
                  id: 2,
                  name: 'fg ',

                },
                {
                  id: 3,
                  name: 'dfgh dd',

                },
              ]
            }
          ]
        }
      ]
    }
  },
  data() {
    return {
      props: {
        label: 'name',
        children: 'cartGoodsList'
      },
      count: 1,
      defaultExpandedKeys: [],
      defaultCheckedKeys: []
    };
  },
  created() {
    console.log(this.data);
    let getSlectGoods = (data) => {
      console.log(data);
      return data.map((item) => {
        let cartGoodsList = item.cartGoodsList;
        if (cartGoodsList && cartGoodsList.length) {
         return getSlectGoods(item.cartGoodsList)
        }
        return item.id
      })
    }
    let keys = getSlectGoods(this.data).flat(2)
    console.log(keys)
     keys.unshift(55)
    this.defaultExpandedKeys = keys;

  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    append(data) {
      console.log(data);
      return
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        console.log(node,data);
      return
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-tree-node__expand-icon.expanded {
  display: none;
}
</style>
