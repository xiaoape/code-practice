// 代理模式
// 使用者无权访问目标对象,中间加代理，通过代理做授权和控制

// 举例
class ReadImg {
    constructor(fileName){
        this.fileName = fileName
        this.loadFromDisk()   //初始化即从硬盘中加载，模拟
    }
    display() {
        console.log('display...' +this.fileName)
    }
    loadFromDisk() {
        console.log('loading...' + this.fileName)
    }
}
class ProxyImg {
    constructor(fileName) {
        this.realImg = new ReadImg(fileName)
    }
    display() {
        this.realImg.display()
    }
}
let proxyImg = new ProxyImg('1.png');  //loading... 1.png
proxyImg.display()    //display...   1.png


// 举例

//明星
let star = {
    name:'张xx',
    age:'25',
    phone:'star:323423423'
}
//经纪人
let agent = new Proxy(star,{
    get:function (target,key){
        if(key ==='phone'){
            //返回经纪人自己的电话
            return 'agent:23223534'
        }
        if(key ==='price'){
            //明星不报价，经纪人报价
            return 120000
        }
        return target[key]
    },
    set:function(target,key,val){
        if(key === 'customPrice') {
            if(val <100000) {
                //最低10w
                throw new Error('价格太低')
            }else {
                target[key] = val
                return true
            }
        }
    }
})
// 测试
console.log(agent.name) //张xx
console.log(agent.age)  //25
console.log(agent.phone) //agent:23223534
console.log(agent.price)  //120000
agent.customPrice = 150000  //如果设置位90000，则会报错
console.log('agent.customPrice',agent.customPrice) //agent.customPrice 150000
