// promise.race
function promiseRace(promises) {
    if (!Array.isArray(promises)) {
        throw new Error("promises must be an array")
    }
    return new Promise(function (resolve, reject) {
        promises.forEach(p =>
            Promise.resolve(p).then(data => {
                resolve(data)
            }, err => {
                reject(err)
            })
        )
    })
  }