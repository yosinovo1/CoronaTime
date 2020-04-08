"""
Iterators are objects that can be iterated upon.

In this example we will see 2 different ways to implement iterators.
The first way is to raise StopIteration by the iterator itself to stop the iteration.
The second way is to implemet an 'infinite' iterator and handle it in outer loop that will stop the iteration. 
"""


class FirstTenFibbo:

    def __iter__(self):
        self.f1 = 0
        self.f2 = 1
        self.n = 1
        self.max = 10
        return self

    def __next__(self):
        if self.n <= self.max:
            result = self.f1 + self.f2
            self.f1 = self.f2
            self.f2 = result
            self.n += 1
            return result
        else:
            raise StopIteration


class AllFibbo:

    def __iter__(self):
        self.f1 = 0
        self.f2 = 1
        return self

    def __next__(self):
        result = self.f1 + self.f2
        self.f1 = self.f2
        self.f2 = result
        return result


def main():
    # Way 1
    for i in FirstTenFibbo():
        print(i)

    # Way 2
    a = iter(AllFibbo())
    for i in range(10):
        print(next(a))


if __name__ == "__main__":
    main()
