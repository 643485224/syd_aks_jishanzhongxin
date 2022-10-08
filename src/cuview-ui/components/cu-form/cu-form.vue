<template>
  <div>
    <el-form
      :ref="formName"
      :model="form"
      status-icon
      :label-width="labelWidth"
      :label-position="labelPosition"
      :inline="inline"
      :size="size"
    >
      <el-form-item
        :label="item.label"
        v-for="item in formConfig"
        :key="item.key"
        :prop="item.key"
        :disabled="item.disabled"
        :rules="ruleFilter(item, item.rules)"
      >
        <slot
          :name="[item.key]"
          :config="formConfig"
          :value="item"
          :form="form"
        >
          <!-- value.value => item
                    value.form => form
                    value.config => formConfig -->
          <div v-if="item.view == 'input'">
            <el-input
              type="text"
              v-model="form[item.key]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            >
            </el-input>
          </div>
          <div v-if="item.view == 'input-tel'">
            <el-input
              type="tel"
              v-model="form[item.key]"
              :placeholder="item.placeholder"
              autocomplete="new"
              :disabled="item.disabled"
            >
            </el-input>
          </div>
          <div v-if="item.view == 'input-number'">
            <el-input
              type="number"
              v-model.number="form[item.key]"
              :placeholder="item.placeholder"
              :min="0"
              :disabled="item.disabled"
              autocomplete="new"
            ></el-input>
          </div>
          <!-- 密码框 -->
          <div v-if="item.view == 'input-password'">
            <slot
              :name="[item.key]"
              :config="formConfig"
              :value="item"
              :form="form"
            >
              <el-input
                type="password"
                show-password
                v-model="form[item.key]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                autocomplete="new-password"
              ></el-input>
            </slot>
          </div>
          <div v-if="item.view == 'input-textarea'">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form[item.key]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            >
            </el-input>
          </div>
          <!-- 下拉框 -->
          <div v-if="item.view == 'select'">
            <!-- :filterable="item.filterable" :remote="item.remote" :remote-method="remoteMehtod" -->
            <el-select
              v-model="form[item.key]"
              :placeholder="item.placeholder"
              :multiple="item.multiple"
              :key="item.key"
              :loading="dynamicData[item.key + 'loading']"
              loading-text="数据加载中"
              :disabled="item.disabled"
              @visible-change="
                (flag) => {
                  getOptionsArr(flag, item);
                }
              "
              @change="selectChange(arguments, item.key)"
            >
              <template v-if="item.dynamicEnable || item.realTimeDynamic">
                <el-option
                  v-for="(selectItem, index) in dynamicData[item.key]"
                  :label="
                    dynamicData[item.key + 'Rule']
                      ? selectItem[dynamicData[item.key + 'Rule']['label']]
                      : selectItem.label
                  "
                  :value="
                    dynamicData[item.key + 'Rule']
                      ? selectItem[dynamicData[item.key + 'Rule']['value']]
                      : selectItem.value
                  "
                  :key="index"
                >
                </el-option>
              </template>
              <template v-else>
                <el-option
                  v-for="selectItem in item.data"
                  :label="selectItem.label"
                  :value="selectItem.value"
                  :key="selectItem.value"
                >
                </el-option>
              </template>
            </el-select>
          </div>
          <!-- 级联选择器 -->
          <div v-if="item.view == 'cascader'">
            <el-cascader
              :ref="item.key"
              v-model="form[item.key]"
              :options="item.data"
              :placeholder="item.placeholder"
              :props="item.propsRule"
              @change="cascaderChange(arguments, item.key)"
            ></el-cascader>
          </div>
          <!-- 日期选择器 -->
          <div v-if="item.view == 'date-picker'">
            <el-date-picker
              type="date"
              :placeholder="item.placeholder"
              v-model="form[item.key]"
              :disabled="item.disabled"
            >
            </el-date-picker>
          </div>
          <!-- <div v-if="item.view == 'tree'">
                    <template v-if="item.dynamicEnable || item.realTimeDynamic">
                        <cu-tree :treeList="dynamicData[item.key]" :props="item.propsRule" @nodeClick="nodeClick"></cu-tree>
                    </template>
                    <template v-else>
                        <cu-tree :treeList="item.data" :propsRule="item.propsRule" @nodeClick="nodeClick"></cu-tree>
                    </template>
                </div> -->
        </slot>
      </el-form-item>
      <template>
        <slot name="footer">
          <div class="form-footer">
            <el-button class="footer-btn" @click="closeForm">取消</el-button>
            <el-button class="footer-btn" type="primary" @click="submitForm">
              保存
            </el-button>
            <el-button @click="resetForm" v-if="showReset"> 重置 </el-button>
          </div>
        </slot>
      </template>
    </el-form>
  </div>
</template>
<script>
/**
 * 数据动态加载，视图不更新，需在表单显示后使用 $nextTick 修改传入数据， 使用监听方式更新操作  参考https://www.jianshu.com/p/2a11d95ffd2e
 * form：表单数据对象
 * formRule 参数配置：
 * - key: form对象key值
 * - view: 视图表现形式
 * - label: 表单label,
 * - placeholder: 视图为输入框，下拉框等形式时的占位文本,
 * - rules: 该表单项表单校验规则
 * - multiple 视图为下拉框时 配置可多选
 * - filterable 视图为下拉框时 配置可搜索
 * - remote 视图为下拉框 可搜索时 配置远程搜索
 * - remoteMethod 视图为下拉框时 远程搜索下 配置搜索调用方法
 * - disabled 该表单项是否禁用
 * - data: 该表单项需要的数据
 * - dynamicEnable: 开启动态加载数据 外部接收表单项初始化数据方法   created中调用
 * - realTimeDynamic: 开启实时获取动态数据  如下拉框选框显示时获取动态数据
 * - propsRule 声明组件中接收数据渲染节点绑定的字段名称 各视图组件键值不同 具体参考视图组件或element-ui 文档
 *      - 如 tree 视图下 defaultProps: { children: 'children', label:"menuName"}, children 代表子节点 label 代表显示的文本
 * select选框 dynamicEnable 动态数据  通过 表单key值+ InitData 拼接成 组件外接收 select选框数据初始化方法
 * 如: 表单项 视图 view 为select  prop接收的key为roles   初始化该select选框的方法为rolesInitData
 * 该方法接收 item,callback 参数   动态数据获取后通过 callback 传递给组件
 * 初始化该select选框的方法为
 * rolesInitData({ item }, callback) {
 *      console.log(res);
 *      // 一些操作
 *      callback(res.data, {
 *          label: 'roleName',
 *          value: 'id'
 *      })
 * }
 * select选框 动态数据 realTimeDynamic 实时加载 通过 表单key值+ GetData 拼接成 组件外接收 select选框数据初始化方法
 * 如: 表单项 视图 view 为select  prop接收的key为roles   初始化该select选框的方法为rolesGetData
 * 该方法接收 flag item callback 参数   动态数据获取后通过 callback 传递给组件
 * rolesGetData({ flag, item }, callback) {
 *      console.log(res);
 *      // 一些操作
 *      callback(res.data, {
 *          label: 'roleName',
 *          value: 'id'
 *      })
 * }
 * tips: 当表单项为数组时， rules:[{校验配置...}] 中的校验配置项针对 数组每一项设置，如数组项为基本类型 需设置rules数组为对象如:
 * rules: { required: true, message: "请选择角色权限", trigger: "blur" }
 */
import deepClone from "@/cuview-ui/function/deepClone";
/**
 * formValidates  表单校验方法对象
 * 内置手机号码校验 密码确认密码一致性校验等
 * 如果传入的表单校验中 validator 为字符串 且在 formValidates 中可以找到该项，则使用 formValidates 中的表单校验方法
 * 如 validateMobile validatePass validateCheckPass
 */
import { formValidates } from "@/cuview-ui/function/validate";
export default {
  name: "cu-form",
  props: {
    // 表单规则
    formRule: {
      type: Array,
      default: () => [
        {
          key: "name",
          view: "input",
          width: "",
          label: "活动名称",
          placeholder: "请输入活动名称",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
        },
        {
          key: "region",
          view: "select",
          width: "",
          label: "活动区域",
          placeholder: "请输入活动区域",
          data: [
            {
              name: "活动区域1",
              value: "活动区域1",
            },
            {
              name: "活动区域2",
              value: "活动区域2",
            },
          ],
          rules: [
            { required: true, message: "请选择活动区域", trigger: "change" },
          ],
        },
        {
          key: "date",
          view: "date-picker",
          width: "",
          label: "活动日期",
          placeholder: "请选择活动日期",
          rules: [
            { required: true, message: "请选择活动日期", trigger: "change" },
          ],
        },
        {
          key: "desc",
          view: "input-textarea",
          width: "",
          label: "活动描述",
          placeholder: "请输入活动描述",
          rules: [
            { required: true, message: "请输入活动描述", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
        },
        // {
        //     key: 'password',
        //     view: 'input-password',
        //     width: '',
        //     label: '密码',
        //     placeholder: '请输入密码',
        //     rules: [
        //         { required: true, message: "请输入密码", trigger: "change" },
        //         { min: 2, max: 20, message: "密码需6-12位数字、字母组合(不能纯数字)", trigger: "blur", validator: checkPassword }
        //     ]
        // },
      ],
    },
    // 表单数据
    formData: {
      type: Object,
      default: () => {
        return {
          name: "",
          region: "",
          date: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
          password: "",
        };
      },
    },
    size: {
      // 表单尺寸
      type: String,
      default: "medium",
    },
    labelWidth: {
      // label 宽度
      type: String,
      default: "80px",
    },
    labelPosition: {
      // label 位置 top/left/right
      type: String,
      default: "right",
    },
    inline: {
      // 行内表单
      type: Boolean,
      default: false,
    },
    formName: {
      // 表单ref
      type: String,
      default: "cuForm",
    },
    showReset: {
      // 显示重置按钮
      type: Boolean,
      default: false,
    },
    multiple: {
      // 是否多选
      type: Boolean,
      default: false,
    },
    disabledIgnoreValidate: {
      // 是否开启 禁用项忽略表单校验
      type: Boolean,
      default: false,
    },
    // defaultProps: {
    //     children: 'children',
    //     label: 'label'
    // }
  },
  data() {
    return {
      rules: {},
      form: {},
      formConfig: [],
      dynamicData: {
        // roles: [{key:'',value:''}]
      }, // 需要动态获取的数据，通过 $emit  获取到返回值后存在该对象中  以 表单项key值获取
    };
  },
  created() {},
  mounted() {
    this.initData();
    this.initRule();
  },
  watch: {
    formData(newVal, oldVal) {
      this.initData(newVal);
    },
    formRule(newVal) {
      this.initRule(newVal);
    },
  },
  methods: {
    initData(val) {
      this.form = deepClone(val || this.formData);
      // 初始化表单验证对象
      formValidates.init(this.$refs[this.formName], this.form);
    },
    initRule(val) {
      this.formConfig = deepClone(val || this.formRule);
      console.log(this.formConfig);
      this.initDynamicData();
    },
    bindValue() {
      // this.form = deepClone(this.formData)
      // this.$refs[this.formName].resetFields();
    },
    submitForm() {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.$emit(
            "submitForm",
            deepClone(this.form),
            this.$refs[this.formName]
          );
        } else {
          console.log(this.form);
          console.log("error submit!!");
          return false;
        }
      });
    },
    ruleFilter(item, rules) {
      if (rules && rules.length) {
        if (item.disabled && this.disabledIgnoreValidate) {
          return [];
        }
        let checkedRules = rules.map((rule) => {
          if (formValidates[rule.validator]) {
            rule.validator = formValidates[rule.validator];
          }
          return rule;
        });
        return checkedRules;
      } else {
        return [];
      }
    },
    // 初始化动态数据
    initDynamicData() {
      for (let index = 0; index < this.formConfig.length; index++) {
        let item = this.formConfig[index];
        if (item.dynamicEnable && !item.realTimeDynamic) {
          this.dynamicData[item.key + "loading"] = true;
          this.$forceUpdate();
          this.$emit(`${item.key}InitData`, { item }, (val, rule) => {
            setTimeout(() => {
              console.log(this.dynamicData[item.key]);
              this.dynamicData[item.key + "loading"] = false;
              this.dynamicData[item.key] = [];
              this.dynamicData[item.key] = val;
              this.dynamicData[item.key + "Rule"] = rule;
              console.log(this.dynamicData);
              this.$forceUpdate(); // 这里需要强制更新一下，否则渲染不出来下拉框选项
            }, 200);
          });
          console.log(item.dynamicEnable, item.realTimeDynamic);
        }
      }
    },
    // 实时加载数据
    getOptionsArr(flag, item) {
      if (item.realTimeDynamic) {
        // 开启数据实时加载
        this.dynamicData[item.key + "loading"] = true;
        this.$forceUpdate(); // 这里需要强制更新一下，否则渲染不出来下拉框选项
        this.$emit(item.key + "GetData", { flag, item }, (val, rule) => {
          console.log(val, rule);
          setTimeout(() => {
            this.dynamicData[item.key + "loading"] = false;
            this.dynamicData[item.key] = [];
            this.dynamicData[item.key] = val;
            this.dynamicData[item.key + "Rule"] = rule;
            console.log(this.dynamicData);
            this.$forceUpdate(); // 这里需要强制更新一下，否则渲染不出来下拉框选项
          }, 200);
        });
      } else {
        // 解决多选下拉框失去焦点校验规则仍然存在问题
        if (item.config && item.config.multiple) {
          //   console.log("关闭时校验多选值", this.form[item.propName]);
          if (this.form[item.key].length > 0) {
            //  如果至少选择一个了，说明符合要求，就再校验一次，这样校验规则就去掉了
            this.$refs[this.formName].validateField(item.key);
          }
        }
      }
    },
    closeForm() {
      this.$emit("closeForm", this.$refs[this.formName]);
    },
    resetForm() {
      this.$refs[this.formName].resetFields();
      this.$emit("resetForm", this.$refs[this.formName]);
    },
    // 级联选择器 选择项修改
    cascaderChange(args, field) {
      let val = args[0];
      console.log(val, this.$refs[field][0].getCheckedNodes()[0].pathLabels); // pathLabels  各层级label   label 最后一层级label
      let pathLabels = this.$refs[field][0].getCheckedNodes()[0].pathLabels;
      let data = [];
      val.forEach((item, index) => {
        data[index] = {};
        data[index]["value"] = item;
        data[index]["label"] = pathLabels[index];
      });
      this.$emit(field + "Change", data);
    },
    // 下拉框 选择项修改
    selectChange(args, field) {
      let val = args[0];
      let data;
      if (this.dynamicData[field]) {
        data = this.dynamicData[field].filter(
          (item) => item[this.dynamicData[field + "Rule"].value] == val
        )[0];
        this.$emit(field + "Change", data);
      }
    },

    // 下拉框 搜索方法
    // remoteMehtod(query) {
    //     console.log(query);
    //     this.dynamicData['remoteLoading'] = true;
    //     this.$emit('remoteMethod', query, (data) => {
    //         for (const key in data) {
    //             const itemData = data[key];
    //             this.dynamicData[key] = itemData

    //         }
    //         this.dynamicData['remoteLoading'] = false;

    //     })
    // }

    // 单个视图组件相关事件
    // nodeClick(){

    // }
  },
};
</script>
<style lang="scss" scoped>
.form-footer {
  display: flex;
  justify-content: center;

  .footer-btn {
    width: 120px;
    height: 32px;
    margin: 20px 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
