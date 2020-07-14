def find_longest_substring_without_repeating_chars(s: str) -> str:
    current_seq = ""
    longest_seq = ""

    for c in s:
        if c not in current_seq:
            current_seq += c
            continue
        if len(current_seq) > len(longest_seq):
            longest_seq = current_seq
        current_seq = current_seq[current_seq.index(c) + 1:]

    return longest_seq


def main():
    print(find_longest_substring_without_repeating_chars("abcabcbb"))
    print(find_longest_substring_without_repeating_chars("bbbbb"))
    print(find_longest_substring_without_repeating_chars("pwwkew"))


if __name__ == "__main__":
    main()
