    // 链表
    function linkedList(){
        function Node(val){
            this.val= val
            this.next = null
        }
        let length = 0 // 空链表初始长度为0
        let head = null // 空链表没有第一个元素
        // 尾部追加
        this.push = function(val){ // 形参val为要插入的项
            // 创建node项
            let node = new Node(val)
            // 创建当前节点current，由于单向链表从第一个项开始遍历，所以将第一项head赋值给current
            let current = head
            // 当第一项head为null时，说明该链表时一个空链表
            if (head === null) {
                head = node // 将要插入的node项直接作为该链表的第一项
            } else { // 该链表不为空
                   // 循环遍历链表
                while (current.next) { 
                    current = current.next
                }
                // 当前项的下一项next指针为null时证明没有下一项，跳出循环
                // 跳出循环后证明已经到达尾部，此时当前项（也是最后一项）的next指针指向插入项    
                current.next = node
            }
            length++ // 插入一个新项后使长度递增
        }
        // 在任意位置插入
       this.insert = function(position, val){ // 形参position为插入位置，val为插入的值
            // 首先判断想要插入的位置是否在合理范围内
            if (position >= 0 && position <= length) {
                // es6语法，创建node插入项，当前项current，前一项previous， 索引index(从0开始)
                let [node, current, previous, index] = [new Node(val), head, null, 0]
                // 当插入的位置为0 说明在第一项的位置插入
                if (position === 0) {
                    node.next = current // 直接将插入项的下一项next指针指向当前项(第一项)
                    head = node // 此时node为第一项，所以重新对head进行赋值
                } else { // 其他位置插入
                    // 循环遍历
                    while (index++ < position){// 当索引值小于想要插入的位置时
                        // previous=是对想要插入新元素的位置之前一个元素的引用
                        previous = current
                        // current变量=对想要插入新元素的位置之后一个元素的引用
                        current = current.next
                    }
                    // 跳出循环后，使前一项的next指针指向插入项
                    previous.next = node
                    // 插入项的next指针指向下一项
                    node.next = current
                }
                length++
                return true // 插入成功返回 true
            } else {
                return false // 失败返回 false
            }
        }
        // 移除
        this.removeAt = function(position){// 形参position为删除位置
            // 首先判断想要删除的位置是否在合理范围内
            if (position >= 0 && position < length){
                // es6语法，当前项current，前一项previous， 索引index(从0开始)
                let [current, previous, index] = [head, null, 0]
                 // 当删除的位置为0 说明删除第一项
                if (position === 0) {
                    head = current.next // current = head； head.next = null 所以head=null 
                } else {
                    // 循环遍历
                    while (index++ < position) {
                       // previous=对想要删除的位置之前一个元素的引用
                        previous = current
                        // current变量=对想要删除元素的位置之后一个元素的引用
                        current = current.next
                    }
                    // 跳出循环后，使前一项的next指针指向后一项的next指针，就可以跨过想要删除的项
                    // 此时当前项就会被丢弃在内存中等待垃圾回收机制回收
                    // 通俗来说，A,B,C,删除B，使A.next指向B.next，而B.next = C，就相当于A.next指向C
                    previous.next = current.next
                }
                length-- // 删除元素 长度减少
                return current.val   //返回删除的元素
            } else {
                return null // 不符合条件返回null
            }
        }
        // 索引
      this.indexOf = function (val) {
            let [current,index] = [head, 0]
            // 循环遍历，如果current存在，判断形参和current的值是否相等，相等返回对应index
            // 不相等则index自增，将current的下一项current.next赋值给current
            while (current) {
                if (val=== current.val) {
                    return index
                }
                index++
                current = current.next
            }
            return -1
        }
        // 是否为空
        this.isEmpty = function(){
            return length === 0
        }
        // 长度
        this.size = function(){
            return length
        }
        // 获取第一个元素
        this.getHead = function (){
            return head
        }
    }