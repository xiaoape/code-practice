// 单链表是否有环
// 标志法
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 入参是头结点 
const hasCycle = function(head) {
    // 只要结点存在，那么就继续遍历
    while(head){
        // 如果 flag 已经立过了，那么说明环存在
        if(head.flag){
            return true;
        }else{
            // 如果 flag 没立过，就立一个 flag 再往下走
            head.flag = true;
            head = head.next;
        }
    }
    return false;
};

// 利用 JSON.stringify() 不能序列化含有循环引用的结构
var hasCycle2 = function(head) {
    try{
        JSON.stringify(head);
        return false;
    }
    catch(err){
        return true;
    }
};

// 快慢指针
var hasCycle3 = function(head) {
    if(!head || !head.next) {
        return false
    }
    let fast = head.next.next, slow = head
    while(fast !== slow) {
        if(!fast || !fast.next) return false
        fast = fast.next.next
        slow = slow.next
    }
    return true
};
