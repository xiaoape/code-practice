// 循环打印红黄绿
// 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

// 三个亮灯函数：

function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}
// 这道题复杂的地方在于需要“交替重复”亮灯，而不是“亮完一次”就结束了。
// （1）用 callback 实现

const task = (timer, light, callback) => {
  setTimeout(() => {
    if (light === 'red') {
      red()
    } else if (light === 'green') {
      green()
    } else if (light === 'yellow') {
      yellow()
    }
    callback()
  }, timer)
}

task(3000, 'red', () => {
  task(2000, 'green', () => {
    task(1000, 'yellow', Function.prototype)
  })
})
// 这里存在一个 bug：代码只是完成了一次流程，执行后红黄绿灯分别只亮一次。该如何让它交替重复进行呢？
// 上面提到过递归，可以递归亮灯的一个周期：

const step = () => {
  task(3000, 'red', () => {
    task(2000, 'green', () => {
      task(1000, 'yellow', step)
    })
  })
}

step()
// 注意看黄灯亮的回调里又再次调用了 step 方法 以完成循环亮灯。
// （2）用 promise 实现

const task2 = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      } else if (light === 'green') {
        green()
      } else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })

const step2 = () => {
  task2(3000, 'red')
    .then(() => task2(2000, 'green'))
    .then(() => task2(2100, 'yellow'))
    .then(step2)
}

step2()
// 这里将回调移除，在一次亮灯结束后，resolve 当前 promise，并依然使用递归进行。
// （3）用 async/await 实现

const taskRunner = async () => {
  await task(3000, 'red')
  await task(2000, 'green')
  await task(2100, 'yellow')
  taskRunner()
}

taskRunner()
