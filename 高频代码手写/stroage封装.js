// storage简单封装
var instance = null;
class Storage {
    static getInstance() {
        if (!instance) {
            instance = new Storage();
        }
        return instance;
    }

    setItem(key, value) {
        localStorage.setItem(key, value)
    }

    getItem(key) {
        localStorage.getItem(key)
    }
}


// localStorage好像有兼容性问题,之前写RN的时候在安卓和ios上表现不一样
  

// 方式二
class Storage {
    constructor(namespace) {
        // 命名空间：防止污染全局
        this.namespace = namespace
    }
    set(key, value) {
        // 这一步是将当前的命名空间里的数据都存到localStorage里
        let storage = localStorage.getItem(this.namespace)
        if (!storage){
            // 没有数据默认空对象
            storage = {}
        }else{
            // 有数据就把原来的值转出来，修改参数指定的key的value
            storage = JSON.parse(storage)
        }
        storage[key] =  value
        // 将数据更新到localStorage
        localStorage.setItem(this.namespace,JSON.stringify(storage))
    }
    get(key,def) {
        let storage = localStorage.getItem(this.namespace)
        // 获取不到数据就返回默认值
        if(!storage) return def
        // localStorage里存的是String
        storage = JSON.parse(storage)
        return storage[key]
    }
    remove(key, def) {
        let storage = localStorage.getItem(this.namespace)
        // 获取不到数据就返回默认值
        if(!storage) return def
        storage = JSON.parse(storage)
        // 从对象中删除某个属性
        delete storage[key]
        localStorage.setItem(this.namespace,JSON.stringify(storage))
    }
}

// 注意需要在浏览器环境下执行
let storage = new Storage('storage')
storage.get('hhh')
storage.set('hhh', 'aaa')
storage.get('hhh')
storage.remove('hhh')
storage.get('hhh')
