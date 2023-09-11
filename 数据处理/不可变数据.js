// 实现一个类似immutable的不可变数据

class CustomImmutableList {
    constructor(values = []) {
      this.values = values;
    }
  
    push(value) {
      // 创建一个新的 CustomImmutableList 实例，共享旧数据并添加新数据
      return new CustomImmutableList([...this.values, value]);
    }
  
    get(index) {
      return this.values[index];
    }
  
    // 其他操作方法...
  
    // 不可变性的实现：其他操作方法返回新的 CustomImmutableList 实例
  }
  
  // 创建一个初始的 CustomImmutableList
  const myList = new CustomImmutableList([1, 2, 3]);
  
  // 使用 push 方法添加新元素，并创建一个新的 CustomImmutableList
  const newList = myList.push(4);
  
  // 原始 CustomImmutableList 保持不变，仍然包含 [1, 2, 3]
  console.log(myList.values); // [1, 2, 3]
  
  // 新的 CustomImmutableList 包含 [1, 2, 3, 4]
  console.log(newList.values); // [1, 2, 3, 4]


  // 如果是嵌套比较深的数据呢

  class DeepImmutableObject {
    constructor(data = {}) {
      this.data = data;
    }
  
    // 更新嵌套属性
    updateNestedProperty(path, value) {
      const newData = { ...this.data };
      let currentLevel = newData;
  
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        currentLevel[key] = { ...currentLevel[key] }; // 创建新的嵌套对象
        currentLevel = currentLevel[key];
      }
  
      const lastKey = path[path.length - 1];
      currentLevel[lastKey] = value;
  
      return new DeepImmutableObject(newData);
    }
  
    // 获取属性值
    get(path) {
      let currentLevel = this.data;
      for (const key of path) {
        currentLevel = currentLevel[key];
        if (currentLevel === undefined) return undefined;
      }
      return currentLevel;
    }
  }
  
  // 创建一个初始的 DeepImmutableObject
  const myObject = new DeepImmutableObject({
    user: {
      name: 'Alice',
      address: {
        city: 'New York',
      },
    },
  });
  
  // 更新嵌套属性并创建新的 DeepImmutableObject
  const updatedObject = myObject.updateNestedProperty(['user', 'address', 'city'], 'San Francisco');
  
  console.log(myObject.get(['user', 'address', 'city'])); // 输出: 'New York'
  console.log(updatedObject.get(['user', 'address', 'city'])); // 输出: 'San Francisco'
  
  
  // 感觉这样意义不大，如果只是想要保证数据的不可变性的话，完全可以使用深拷贝来实现了