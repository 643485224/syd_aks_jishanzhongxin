/**
 * 获取随机颜色
 */
const randomColor = () => {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += ((Math.random() * 16) | 0).toString(16);
  }
  return color;
}
export default randomColor;
