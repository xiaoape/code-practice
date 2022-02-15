function proxy(func) {
    let instance;
    let handler = {
        construct(target, args) {
            if (!instance) {
                // 没有实例就创造一个实例
                instance = Reflect.construct(func, args)
            }
            // 无论如何都会返回一个实例(new关键字)
            return instance
        }
    }
    return new Proxy(func, handler)
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const SingletonPerson = proxy(Person)

let person1 = new SingletonPerson('zhl', 22)

let person2 = new SingletonPerson('cyw', 22)

console.log(person1 === person2) // true
console.log(person1.name, person1.age) // zhl 22
// 因为第二次new的时候，已经有了实例，这样第二次new就直接返回了上次的实例
// 导致参数失败，是不是第二次实例，我们应该返回的是原来的对象，但是应该要对元对象进行修改
console.log(person2.name, person2.age) // zhl 22