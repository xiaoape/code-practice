// LRU缓存机制实现 leetcode原题
/* 思路：准备一个哈希表和双向链表存储键值对，哈希表O(1)就能查找到键值对，
双向链表方便从链表头部新增节点，也可以从队尾删除节点

get的时候，查找哈希表中有没有该键值对，不存在就返回-1，存在就返回该节点的值，
并且将该节点移动到链表的头部
put的时候，查找哈希表中有没有该键值对，如果存在就更新该节点，并且移动到链表的头部，
不存在就创建一个节点，加入到哈希表和链表的头部，并且让节点数count+1，如果超出容量，
就从队尾删除一个节点
复杂度：put、get时间复杂度都是O(1)，空间复杂度O(c)，c是LRU的容量 */

class ListNode {
    constructor(key, value) {//双向链表的单个节点
        this.key = key
        this.value = value
        this.next = null //指向后一个节点
        this.prev = null //指向前一个节点
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity //容量
        this.hashTable = {} //存放键值对信息
        this.count = 0 //键值对数量
        this.dummyHead = new ListNode() //dummy头节点 方便在链表从开始的地方插入
        this.dummyTail = new ListNode()	//dummy尾节点 方便在链表从末尾删除
        this.dummyHead.next = this.dummyTail //dummyHead和dummyTail相互连接
        this.dummyTail.prev = this.dummyHead
    }

    get(key) {
        let node = this.hashTable[key]//查找哈希表中的键值对
        if (node == null) return -1 //不存在该键值对 返回-1
        this.moveToHead(node) //移动到链表头
        return node.value
    }

    put(key, value) {
        let node = this.hashTable[key] //哈希表中查找该键值对
        if (node == null) {
            let newNode = new ListNode(key, value) //不存在就创建节点
            this.hashTable[key] = newNode //加入哈希表
            this.addToHead(newNode) //加入链表头
            this.count++ //节点数+1
            if (this.count > this.capacity) { //超过容量 从队尾删除一个
                this.removeLRUItem()
            }
        } else {
            node.value = value //键值对存在于哈希表中 就更新
            this.moveToHead(node) //移动到队头
        }
    }

    moveToHead(node) {
        this.removeFromList(node)//从链表中删除节点
        this.addToHead(node)//将该节点添加到链表头
    }

    removeFromList(node) {//删除的指针操作
        let tempForPrev = node.prev
        let tempForNext = node.next
        tempForPrev.next = tempForNext
        tempForNext.prev = tempForPrev
    }

    addToHead(node) {//加入链表头的指针操作
        node.prev = this.dummyHead
        node.next = this.dummyHead.next
        this.dummyHead.next.prev = node
        this.dummyHead.next = node
    }

    removeLRUItem() {
        let tail = this.popTail()//从链表中删除
        delete this.hashTable[tail.key]//从哈希表中删除
        this.count--
    }

    popTail() {
        let tailItem = this.dummyTail.prev//通过dummyTail拿到最后一个节点 然后删除
        this.removeFromList(tailItem)
        return tailItem
    }
}


// 参考链接：https://leetcode-cn.com/problems/lru-cache/