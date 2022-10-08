import { existsUsername } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

let validateUserName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("账号名称不能为空"));
    }
    existsUsername({userName:value}).then(res =>{
        console.log(res);
        if(res.code != 200 ){
            return callback(new Error(res.message));
        }
        return callback();

    }).catch((err)=>{
        console.log(err);
        return callback(new Error("账号名称校验失败"));
    })

}
const accountFormRule = () =>{
  return [
    {
        key: 'username',
        view: 'input',
        label: '账号名称',
        placeholder: '请输入账号名称',
        rules: [
            { required: true, message: "请输入账号名称", trigger: "change" },
            { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur" },
            { trigger: "blur", validator: validateUserName }
        ],
    },
    {
        key: 'name',
        view: 'input',
        label: '姓名',
        placeholder: '请输入姓名',
        rules: [
            { required: true, message: "请输入姓名", trigger: "change" },
            { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur" }
        ]
    },
    {
        key: 'phone',
        view: 'input-tel',
        label: '手机号',
        placeholder: '请输入手机号',
        rules: [
            { required: true, message: "请输入手机号", trigger: "change" },
            // min: 11, max: 11,
            { message: "请输入正确的手机号", trigger: "blur", validator: 'validateMobile' }
        ]
    },
    {
        key: 'password',
        view: 'input-password',
        label: '密码',
        placeholder: '请输入密码',
        rules: [
            { required: true, message: "请输入密码", trigger: "change" },
            { min: 6, max: 12, message: "密码需6-12位数字、字母组合(不能纯数字)", trigger: "blur", validator: 'validatePass' }
        ]
    },
    {
        key: 'checkPassword',
        view: 'input-password',
        label: '确认密码',
        placeholder: '请确认密码',
        rules: [
            { required: true, message: "请确认密码", trigger: "change" },
            { min: 6, max: 12, message: "两次输入密码不一致", trigger: "blur", validator: 'validateCheckPass' }
        ]
    },
    {
        key: 'roles',
        view: 'select',
        label: '角色',
        placeholder: '请选择角色',
        rules: [
            { required: true, message: "请选择角色", trigger: "blur" },
        ],
        data: [],
        multiple: true,
        dynamicEnable: true,
        realTimeDynamic: false,
    },
    {
        key: 'description',
        view: 'input-textarea',
        label: '描述',
        placeholder: '请输入账号描述',
        rules: []
    }
]
}

const accountFormEditRule = () =>{
  return [
    {
        key: 'username',
        view: 'input',
        label: '账号名称',
        disabled: true,
        placeholder: '请输入账号名称',
        rules: [
            { required: true, message: "请输入账号名称", trigger: "change" },
            { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur" }
        ]
    },
    {
        key: 'name',
        view: 'input',
        label: '姓名',
        placeholder: '请输入姓名',
        rules: [
            { required: true, message: "请输入姓名", trigger: "change" },
            { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur" }
        ]
    },
    {
        key: 'phone',
        view: 'input-tel',
        label: '手机号',
        placeholder: '请输入手机号',
        rules: [
            { required: true, message: "请输入手机号", trigger: "change" },
            // min: 11, max: 11,
            { message: "请输入正确的手机号", trigger: "blur", validator: 'validateMobile' }
        ]
    },
    {
        key: 'password',
        view: 'input-password',
        label: '密码',
        disabled: true,
        placeholder: '请输入密码',
        rules: [
            { required: true, message: "请输入密码", trigger: "change" },
            { min: 6, max: 12, message: "密码需6-12位数字、字母组合(不能纯数字)", trigger: "blur", validator: 'validatePass' }
        ]
    },
    {
        key: 'checkPassword',
        view: 'input-password',
        label: '确认密码',
        disabled: true,
        placeholder: '请确认密码',
        rules: [
            { required: true, message: "请确认密码", trigger: "change" },
            { min: 6, max: 12, message: "两次输入密码不一致", trigger: "blur", validator: 'validateCheckPass' }
        ]
    },
    {
        key: 'roles',
        view: 'select',
        label: '角色',
        placeholder: '请选择角色',
        rules: [
            { required: true, message: "请选择角色", trigger: "blur" },
        ],
        data: [],
        multiple: true,
        dynamicEnable: true,
        realTimeDynamic: false,
    },
    {
        key: 'description',
        view: 'input-textarea',
        label: '描述',
        placeholder: '请输入账号描述',
        rules: []
    }
]
}
export {
    accountFormRule,
    accountFormEditRule
};

