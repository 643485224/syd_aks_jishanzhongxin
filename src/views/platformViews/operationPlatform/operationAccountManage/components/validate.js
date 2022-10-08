import test from '@/cuview-ui/function/test'


export let formValidates = {
    init(formRef,formData){
        this.formRef = formRef;
        this.formData = formData;
        console.log(this.formRef,this.formData);
    },

    validatePass(rule, value, callback) {
        console.log(rule, value);
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            if (this.formData.checkPassword !== '') {
                this.formRef.validateField('checkPassword');
            }
            callback();
        }
    },

}

export function validateMobile(rule, value, callback) {
    console.log(rule, value, callback, test.mobile);
    if (!value) {
        return callback(new Error("手机号码不能为空"));
    }
    if (!test.mobile(value)) {
        return callback(new Error("手机号码格式不正确"));
    }
    return callback();
};

export function validateCheckPass(rule, value, callback) {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};