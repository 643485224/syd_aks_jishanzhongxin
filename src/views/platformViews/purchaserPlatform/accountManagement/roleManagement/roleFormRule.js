import test from "@/cuview-ui/function/test.js";

let validateLetter = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("权限名称不能为空"));
  }
  if (!test.letter(value)) {
    return callback(new Error("权限名称只能由英文字母组成"));
  }
  callback()

}
export let roleFormRule = [
  // {
  //     key: 'name',
  //     view: 'input',
  //     label: '权限名称',
  //     placeholder: '请输入权限名称',
  //     rules: [
  //         { required: true, message: "请输入权限名称", trigger: "change" },
  //         { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur",validator:validateLetter }
  //     ]
  // },
  {
    key: 'roleName',
    view: 'input',
    label: '角色名称',
    placeholder: '请输入角色名称',
    rules: [{
        required: true,
        message: "请输入角色名称",
        trigger: "change"
      },
      {
        min: 2,
        max: 20,
        message: "名称长度不得少于2个字符",
        trigger: "blur"
      }
    ]
  },
  {
    key: 'menuId',
    view: 'tree',
    label: '权限',
    placeholder: '请选择角色权限',
    rules: [{
      required: true,
      message: "请选择角色权限",
      trigger: "blur"
    }],
    data: [],
    propsRule: {
      children: 'children',
      label: "menuName"
    },
    defaultCheckedKey: 'isChecked', // 依靠哪个字段确认该节点是否默认选中
    dynamicEnable: true,
    realTimeDynamic: false,
  },
  {
    key: 'description',
    view: 'input-textarea',
    label: '角色描述',
    placeholder: '请输入角色描述',
    rules: []
  }
]
