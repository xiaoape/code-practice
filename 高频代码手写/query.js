// 实现一个 query 方法，实现对数据的链式查询和处理

// 要求
// query 传入参数为原始数据（数组格式，每个元素都是对象）
// 通过进行链式调用对数据执行操作，支持的方法有
// where(predicate): 根据参数的条件进行筛选，参数与 [].filter 的参数类似
// orderBy(key, desc): 根据 key 的值进行排列，默认升序排列，当第二个参数为 true 时降序排列
// groupBy(key): 根据 key 的值对数据元素进行分组，合并为二维数组
// execute(): 执行所有处理并返回最终结果
// 执行 execute 方法时才真正执行操作并返回结果
// 请结合下面示例理解需求
// 示例
// const data = [
//   { name: 'foo', age: 16, city: 'shanghai' },
//   { name: 'bar', age: 24, city: 'hangzhou' },
//   { name: 'fiz', age: 22, city: 'shanghai' },
//   { name: 'baz', age: 19, city: 'hangzhou' }
// ];

// query(data)
//     .where(item => item.age > 18)
//   .orderBy('age')
//   .groupBy('city')
//   .execute();

// 结果返回
// [
//   [
//     { name: 'baz', age: 19, city: 'hangzhou' },
//     { name: 'bar', age: 24, city: 'hangzhou' },
//   ],
//   [
//     { name: 'fiz', age: 22, city: 'shanghai' },
//   ]
// ]
function query(data) {
  let predicate = null;
  let orderKey = null;
  let isDescending = false;
  let groupKey = null;

  const where = (p) => {
    predicate = p;
    return api;
  };


  const orderBy = (key, desc = false) => {
    orderKey = key;
    isDescending = desc;
    return api;
  };

  const groupBy = (key) => {
    groupKey = key;
    return api;
  };

  const execute = () => {
    let result = data.slice();
    if (predicate) {
      result = result.filter(predicate);
    }
    if (orderKey) {
      result.sort((a, b) => {
        const aVal = a[orderKey];
        const bVal = b[orderKey];
        if (aVal < bVal) {
          return isDescending ? 1 : -1;
        } else if (aVal > bVal) {
          return isDescending ? -1 : 1;
        } else {
          return 0;
        }
      });
    }
    if (groupKey) {
      const groups = {};
      result.forEach((item) => {
        const key = item[groupKey];
        if (key in groups) {
          groups[key].push(item);
        } else {
          groups[key] = [item];
        }
      });
      result = Object.values(groups);
    }
    return result;
  };

  const api = {
    where,
    orderBy,
    groupBy,
    execute,
  };

  return api;
}

const data = [{
    name: 'foo',
    age: 16,
    city: 'shanghai'
  },
  {
    name: 'bar',
    age: 24,
    city: 'hangzhou'
  },
  {
    name: 'fiz',
    age: 22,
    city: 'shanghai'
  },
  {
    name: 'baz',
    age: 19,
    city: 'hangzhou'
  }
];

query(data)
  .where(item => item.age > 18)
  .orderBy('age')
  .groupBy('city')
  .execute();
