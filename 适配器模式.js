class Plug {
    getName() {
        return '港版插头'
    }
}

class Target {
    constructor() {
        this.plug = new Plug()
    }
    getName() {
        return this.plug.getName() + ' 适配器转二脚插头'
    }
}

let target = new Target()
target.getName() // 港版插头 适配器转二脚插头