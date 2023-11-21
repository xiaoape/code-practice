// lodash_get实现
// _get(obj,'a.b.c')

function _get(obj, path = "") {
  if (!obj) return;
  const attrs = path.split(".");
  let tem = obj;
  for (let i = 0; i < attrs.length; ++i) {
    if (tem && tem[attrs[i]]) {
      tem = tem[attrs[i]];
    } else {
      return;
    }
  }
  return tem;
}

// reduce实现
function get_obj(obj, path = "") {
    if (!obj) return;
    const attrs = path.split(".");
    const res = attrs.reduce((result, item) => {
        return result[item]
    }, obj)
    return res;
}

// 测试案例

const obj = {
  a: {
    b: [1, 2],
  },
};
console.log(_get(obj, "a.b.0")); // 1
console.log(_get(obj, "a.b.1")); // 2
console.log(get_obj(obj, "a.b.0")); // 1
console.log(get_obj(obj, "a.b.1")); // 2
