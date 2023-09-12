// 实现Set数据结构
// 原文链接：https://zhuanlan.zhihu.com/p/74015428

class MySet {  
  constructor() {  
    this.size = 0;  
    this.data = {};  
  }  
  
  // 添加元素  
  add(element) {  
    if (!this.has(element)) {  
      this.data[element] = true;  
      this.size++;  
    }  
    return this;  
  }  
  
  // 删除元素  
  delete(element) {  
    if (this.has(element)) {  
      delete this.data[element];  
      this.size--;  
    }  
    return this;  
  }  
  
  // 检查元素是否存在  
  has(element) {  
    return element in this.data;  
  }  
  
  // 获取Set大小  
  get size() {  
    return this.size;  
  }  
  
  // 清空Set  
  clear() {  
    this.size = 0;  
    this.data = {};  
  }  
}