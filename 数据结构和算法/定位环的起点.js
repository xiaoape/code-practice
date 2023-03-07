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

// 时间复杂度：O(N)，其中 N 为链表中节点的数目。我们恰好需要访问链表中的每一个节点。

// 空间复杂度：O(N)，其中 N 为链表中节点的数目。我们需要将链表中的每个节点都保存在哈希表当中。


// 方式二：快慢指针
// 怎么感觉这个快慢指针需要点数学功底？
function findCycleStart(head) {
    // 使用快慢指针，快指针每次移动两个节点，慢指针每次移动一个节点
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        // 当快指针追上慢指针时，说明链表包含环
        if (slow === fast) {
            // 将慢指针移动到链表头部
            slow = head;
            // 再次使用快慢指针查找环的起点
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow; // 返回环的起点
        }
    }
    return null; // 没有环，返回null
}