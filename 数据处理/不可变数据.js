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
  