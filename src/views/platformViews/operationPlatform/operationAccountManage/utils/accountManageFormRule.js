export let accountFormRule = [
    {
        key: 'name',
        view: 'input',
        label: '账号名称',
        placeholder: '请输入账号名称',
        rules: [
            { required: true, message: "请输入账号名称", trigger: "change" },
            { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur" }
        ]
    },
    {
        key: 'realname',
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
            { required: true, message: "请输入手机号", trigger: "blur" },
            { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur", validator: 'validateMobile' }
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
        label: '密码',
        placeholder: '请确认密码',
        rules: [
            { required: true, message: "请确认密码", trigger: "change" },
            { min: 6, max: 12, message: "两次输入密码不一致", trigger: "blur", validator: 'validateCheckPass' }
        ]
    },
    {
        key: 'role',
        view: 'select',
        label: '角色',
        placeholder: '请选择角色',
        rules: [
            { required: true, message: "请选择角色", trigger: "change" },
        ]
    },
    {
        key: 'desc',
        view: 'input-textarea',
        label: '描述',
        placeholder: '请输入账号描述',
        rules: []
    }
]