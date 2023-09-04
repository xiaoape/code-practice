// promise.any
Promise.any = function (iterators) {
    const promises = Array.from(iterators);
    const num = promises.length;
    const rejectedList = new Array(num);
    let rejectedNum = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => resolve(value))
                .catch(error => {
                    rejectedList[index] = error;
                    if (++rejectedNum === num) {
                        reject(rejectedList);
                    }
                });
        });
    });
};