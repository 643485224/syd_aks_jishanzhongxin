/**
 * 输入菜单名返回该菜单所拥有权限
 * @param {string} valueName 
 * @return 返回所拥有权限
 */
export const menuHandle = (valueName) => {
  let arr = []
  let state = 0
  arr = JSON.parse(localStorage.getItem("lifeData"))["vuex_menu"]
  arr.forEach(element => {
    if (element.children.length > 0) {
      element.children.forEach(elemen => {
        if (elemen.children.length > 0) {

        } else {
          if (elemen.name == valueName) {
            state = elemen.state
          }
        }
      })
    } else {
      if (element.name == valueName) {
        state = element.state
      }
    }
  });
  return state
}





export default menuHandle
