class Man {
    constructor(name) {
        this.name = name
    }
    alertName() {
        alert(this.name)
    }
}

class Factory {
    static create(name) {
        return new Man(name)
    }
}

Factory.create('aaa').alertName()