import test from './test'

export let formValidates = {
  formData: {},
  formRef: null,
  init(formRef, formData) {
    this.formRef = formRef;
    this.formData = formData;
  },
  validateMobile(rule, value, callback) {
    if (!value) {
      return callback(new Error("手机号码不能为空"));
    }
    if (!test.mobile(value)) {
      return callback(new Error("手机号码格式不正确"));
    }
    return callback();
  },
  // 使用 validatePass 和 validateCheckPass 校验的表单项 key 必须为 password 和 checkPassword
  validatePass(rule, value, callback) {
    if (value === '') {
      return callback(new Error('请输入密码'));
    }
    if (!test.password(value)) {
      return callback(new Error('密码需6-12位数字、字母组合'));
    }
    if (formValidates.formData.checkPassword !== '') {
      formValidates.formRef.validateField('checkPassword');
    }
    return callback();
  },
  validateCheckPass(rule, value, callback) {
    if (value === '') {
      return callback(new Error('请再次输入密码'));
    }
    if (value !== formValidates.formData.password) {
      return callback(new Error('两次输入密码不一致!'));
    }
    return callback();

  },

  // 使用 validatePayPassword 和 validateCheckPayPassword 校验的表单项 key 必须为 payPassword 和 checkPayPassword
  validatePayPassword(rule, value, callback) {
    if (value === "") {
      callback(new Error("密码不能为空"));
    } else if (value.toString().length < 6 || value.toString().length > 12) {
      callback(new Error("密码需6-12位数字、纯数字!"));
    } else if (!test.number(value)) {
      callback(new Error("密码需6-12位数字、纯数字!"));
    } else {
      if (formValidates.formData.checkPayPassword !== '') {
        formValidates.formRef.validateField('checkPayPassword');
      }
      callback();
    }
  },
  validateCheckPayPassword(rule, value, callback) {
    if (value === "") {
      callback(new Error("确认密码不能为空"));
    } else if (value !== formValidates.formData.payPassword) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  }

}
