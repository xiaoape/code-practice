// 实现一个方法，检查对象一是否是对象二的子集
function checkIsChildObject(a, b) {
    
  }
  
  const obj = {
    a: 0,
    c: '',
    d: true,
    e: {
      f: 1,
      h: {
        e: 0,
        f: 2,
      },
    },
  };
console.log(checkIsChildObject({ a: 0 }, obj)); // true
console.log(checkIsChildObject({ e: 0 }, obj)); // true
console.log(checkIsChildObject({ a: 0, c: '' }, obj)); // true
console.log(checkIsChildObject({ a: 0, e: 0 }, obj)); // false
console.log(checkIsChildObject({ e: { f: 1 } }, obj)); // true
console.log(checkIsChildObject({ e: { f: 2 } }, obj)); // false
console.log(checkIsChildObject({ h: { e: 0, f: 2 } }, obj)); // true
console.log(checkIsChildObject({ h: { f: 2, e: 0 } }, obj)); // true