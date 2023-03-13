// 策略模式用于将一组特定行为封装成对象，以便能够动态更改其行为而不必更改其类结构。
// 以下是策略模式的使用场景：

// 1.当有多个算法可以完成同一件任务，并且客户端需要根据特定条件来选择其中一种算法时。

// 2.如果一个对象具有许多行为，而且必须经常更改这些行为之一，则可以使用策略设计模式。
// 定义一个策略对象
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
}

// 定义一个类实现策略模式
class Calculator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  execute(a, b) {
    return this.strategy(a, b);
  }
}

//创建一个新实例
let calculator = new Calculator(strategies.add);

//执行加法策略
console.log(calculator.execute(5, 2)); //7

//执行乘法策略
calculator.setStrategy(strategies.multiply);
console.log(calculator.execute(5, 2)); //10
