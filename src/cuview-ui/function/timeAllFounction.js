/**
 * 输入日期格式，返回星期几
 * @param {Date} valueDate 输入的日期格式
 * @return 返回星期几
 */
export const getWeekMethod = (valueDate) => {
  let date = new Date(valueDate).getDay()
  let week = ''
  switch (date) {
    case 0:
      week = "星期日";
      break;
    case 1:
      week = "星期一";
      break;
    case 2:
      week = "星期二";
      break;
    case 3:
      week = "星期三";
      break;
    case 4:
      week = "星期四";
      break;
    case 5:
      week = "星期五";
      break;
    default:
      week = "星期六";
  }
  return week
}


/**
 * 输入日期格式，返回月初-月末
 * @param {Date} valueDate 输入的日期格式
 * @return 返回月初-月末
 */
export const getDateStartAndEnd = (valueDate) => {
  valueDate = '测试' + valueDate
  return valueDate
}

let timeAllFounctioncu = {
  getWeekMethod,
  getDateStartAndEnd
}
export default timeAllFounctioncu
