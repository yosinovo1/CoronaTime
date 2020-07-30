class ListNode:

    def __init__(self, val: int = 0, next=None):
        self.val = val
        self.next = next

    def get_list(self):
        if not self.next:
            return str(self.val)
        return f"{self.val}->{self.next.get_list()}"


def swap_pairs(head: ListNode) -> ListNode:
    if not head:
        return

    if not head.next:
        return head

    head.next.next = swap_pairs(head.next.next)
    temp_node = head.next
    head.next = temp_node.next
    temp_node.next = head
    head = temp_node

    return head


def main():
    n5 = ListNode(5)
    n4 = ListNode(4, n5)
    n3 = ListNode(3, n4)
    n2 = ListNode(2, n3)
    n1 = ListNode(1, n2)
    print(n1.get_list())
    print(swap_pairs(n1).get_list())


if __name__ == "__main__":
    main()
