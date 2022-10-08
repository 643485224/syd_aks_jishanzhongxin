/**
 * 模拟点击事件
 * @param selector
 * @return none
 */
const simulationClick = (selector = 'body') => {
  let e = document.createEvent('MouseEvents')
  e.initEvent('click', true, true)
  document.querySelector(selector).dispatchEvent(e)
}

export default simulationClick
