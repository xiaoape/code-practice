// Promise.allSettled实现
const formatSettledResult = (success, value) =>
    success ?
    {
        status: "fulfilled",
        value
    } :
    {
        status: "rejected",
        reason: value
    };

Promise.allSettled = function (iterators) {
    const promises = Array.from(iterators);
    const num = promises.length;
    const settledList = new Array(num);
    let settledNum = 0;

    return new Promise(resolve => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    settledList[index] = formatSettledResult(true, value);
                    if (++settledNum === num) {
                        resolve(settledList);
                    }
                })
                .catch(error => {
                    settledList[index] = formatSettledResult(false, error);
                    if (++settledNum === num) {
                        resolve(settledList);
                    }
                });
        });
    });
};


// 第二种写法
const myPromiseSettled = (items) => {
    const onResolved = (value) => ({ status: "fulfilled", value });
    const onRejected = (reason) => ({ status: "rejected", reason });
    return Promise.all(
      items.map((item) => Promise.resolve(item).then(onResolved, onRejected))
    );
  };