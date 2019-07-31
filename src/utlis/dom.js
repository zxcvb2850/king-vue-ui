/**
 * 添加，删除，查找DOM 的className
 * 由于 classList 的兼容性比较差
 * auth Mr.wang
 * */

export function hasClass(dom, className) {
  if (!dom || !className) return false;
  if (className.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (dom.classList) {
    return dom.classList.contains(className);
  }
  return (` ${dom.className} `).indexOf(` ${className} `) > -1;
}

export function addClass(dom, className) {
  if (!dom) return;
  const isClassList = !!dom.classList;
  if (isClassList) {
    dom.classList.add(className);
  } else {
    const curClass = (dom.className || "").split(" ");
    const classes = (className || "").split(" ");
    classes.forEach((item) => {
      if (!hasClass(dom, item)) {
        curClass.push(item);
      }
    });
    dom.className = curClass.join(" ");
  }
}

export function removeClass(dom, className) {
  if (!dom || !className) return;
  const isClassList = !!dom.classList;
  if (isClassList) {
    dom.classList.remove(className);
  } else {
    const curClass = (dom.className || "").split(" ");
    const classes = className.split(" ");
    classes.forEach((item) => {
      if (hasClass(dom, item)) {
        const index = curClass.indexOf(item);
        if (index > -1) {
          curClass.splice(index, 1);
        }
      }
    });
    dom.className = curClass.join(" ");
  }
}
