// 定位环的起点


// 方法一： 设置flag方法
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle = function (head) {
    while (head) {
        if (head.flag) {
            return head;
        } else {
            head.flag = true;
            head = head.next;
        }
    }
    return null;
};