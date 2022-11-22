/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}
// 案例:
// console.log("表单验证：", this.$cu.test.email(value));
/**
 * 验证手机格式（手机号验证的最新正则表达式2022-10-9）
 */
function mobile(value) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)
}
/**
 * 是否固定电话
 */
function landline(value) {
  let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

/**
 * 验证日期格式
 */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证纯字母 纯字母为true，非纯字母为false
 */
function letter(value) {
  return /^[a-zA-Z]+$/.test(value);
}
/**
 * 验证纯中文 纯中文为true，非纯中文为false
 */
function chinese(value) {
  let reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}
/**
 * 验证纯数字（包含正,负,0,小数） 纯数字为true，非纯数字为false
 */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 由数字和字母组成的字符串
 */
function enOrNum(value) {
  let reg = /^[A-Za-z0-9]+$/g;
  return reg.test(value);
}

/**
 * 由数字、字母或者下划线组成的字符串 
 */
function enOrNumOrzf(value) {
  let reg = /^\w{3,20}$/g;
  return reg.test(value);
}

/**
 * 验证正整数（包含0） 正整数（或0）为true   ，其他为false
 */
function digits(value) {
  return /^[1-9]\d*|0$/.test(value)
}

/**
 * 验证负整数（包含0） 负整数（或0）为true   ，其他为false
 */
function fudigits(value) {
  return /^-[1-9]\d*|0$/.test(value)
}

/**
 * 验证浮点数（包含0） 浮点数(或0)为true，其他为false
 */
function float(value) {
  return /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/.test(value)
}


/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value)
}


/**
 * 验证邮政编码
 */
function postalCode(value) {
  return /^[0-9]\d{5}$/.test(value)
}


/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}




/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1]
}



/**
 * 判断是否为空 为空返回true 不为空返回false
 */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信验证码
 */
function code(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value);
}

/**
 * 是否6-12位数字、字母组合
 */
function password(value) {
  return new RegExp(`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$`).test(value);
}
/**
 * 是否6位数字
 */
function numberSix(value) {
  let reg = /^\d{6}$/;
  return reg.test(value);
}


/**
 * 是否银行卡号
 */
function bankcardNum(value) {
  return new RegExp(/^([1-9]{1})(\d{14}|\d{18})$/).test(value);
}


const validator = (rule, value, callback) => {
  if (!test[rule.methods](value)) {
    return callback(new Error(`${rule.message}`));
  } else return callback();
}



// eg: 常用校验函数
/**
 * ruleValidate: {
          phone: [
            {
              methods: 'mobile',             // 表单验证方法名 -> 对应本文件内方法名
              message: '请输入正确的手机号',   // 表单错误提示文本
              required: true, validator: this.$cu.test.validator, trigger: 'blur'
            }
          ]
  }
 *
 */

let test = {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  fudigits,
  float,
  enOrNumOrzf,
  idCard,
  postalCode,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
  password,
  numberSix,
  bankcardNum,
  validator,
}


export default test
