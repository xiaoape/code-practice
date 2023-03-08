// 迭代器模式

// 顺序访问一个集合,使用者无需知道集合的内部结构（封装）,典型的应用就是Iterator

class Iterator{
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    next() {
        if(this.hasNext()){
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        if(this.index >=this.list.length) {
            return false
        }
        return true
    }
}

class Container {
    constructor(list){
        this.list = list
    }
    //生成遍历器
    getIterator() {
        return new Iterator(this)
    }
}

let container = new Container([1,2,3,4,5,6])
let iterator = container.getIterator()

while(iterator.hasNext()){
    console.log(iterator.next())
}

// 同目录中迭代器实现