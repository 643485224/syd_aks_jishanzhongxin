
/**
 * Object.assign 合并对象无法合并多层结构  此方法合并对象多层属性值
 * @param target 目标对象  被合并对象
 * @param origin 源对象 合并对象
 * @returns 
 *  */
 export function objectAssignMulti(target, origin) {
    if (origin === null || target === null) return JSON.parse(JSON.stringify(origin));
    if (typeof target == 'object' && typeof origin == 'object') {
      if (Array.isArray(origin) || Array.isArray(target)) {
        return JSON.parse(JSON.stringify(origin))
      };
      // 深拷贝 target
      let obj = JSON.parse(JSON.stringify(origin));
      for (let key in origin) {
        console.log(key);
        if (obj.hasOwnProperty(key)) {
          if (typeof target[key] === 'object' && target[key] != null) {
            console.log(target[key], origin[key]);
            target[key] = objectAssignMulti(target[key], origin[key])
          } else {// target 不存在该 key  直接合并
            target[key] = JSON.parse(JSON.stringify(origin[key]))
          }
        }
      }
    }
  
    return target
  }