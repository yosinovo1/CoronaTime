PARENTHESES_OPTIONS = {
    "({})", "(){}", "{}()"
}


def generate_parentheses(n: int) -> [str]:
    if n <= 0:
        return [""]
    if n == 1:
        return ["()"]

    sub_parentheses = generate_parentheses(n - 1)
    parentheses = []
    for p in sub_parentheses:
        for option in PARENTHESES_OPTIONS:
            parentheses.append(option.format(p))

    return list(set(parentheses))


def main():
    print(generate_parentheses(3))


if __name__ == "__main__":
    main()
