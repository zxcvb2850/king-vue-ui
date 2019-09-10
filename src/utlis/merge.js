/**
 * 合并多个对象
 * 兼容写法
 * */
export default function (target) {
  for (let i = 0, len = arguments.length; i < len; i += 1) {
    const item = arguments[i];
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = item[key];
        if (value !== undefined) {
          target[key] = value;
        }
      }
    }
  }
  return target;
}
