def is_palindrome(s: str) -> bool:
    if not s:
        return True
    return all(s[i] == s[-1 * (i + 1)] for i in range(len(s)))


def longest_palindrome(s: str) -> str:
    if not s:
        return s

    longest_seq = ""
    for i in range(len(s)):
        for j in range(i, len(s)):
            sub_str = s[i:j + 1]
            if len(sub_str) > len(longest_seq) and is_palindrome(sub_str):
                longest_seq = sub_str

    return longest_seq


def main():
    print(longest_palindrome("babad"))
    print(longest_palindrome("cbbd"))
    print(longest_palindrome("a"))
    print(longest_palindrome("abcbaa"))
    print(longest_palindrome("abcbadddddd"))


if __name__ == "__main__":
    main()
