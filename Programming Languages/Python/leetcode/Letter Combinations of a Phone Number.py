DIGIT_TO_LETTERS = {
    "1": "",
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
    "*": "+",
    "0": "_",
    "#": "",
}


def get_letter_combinations(digits: str) -> [str]:
    if not digits:
        return ""
    if len(digits) == 1:
        return DIGIT_TO_LETTERS[digits[0]]

    letter_combinations = get_letter_combinations(digits[1:])
    digit_letters = DIGIT_TO_LETTERS[digits[0]]
    if not digit_letters:
        return letter_combinations

    new_letter_combinations = []
    for combination in letter_combinations:
        new_letter_combinations.extend(
            [letter + combination for letter in digit_letters]
        )
    return new_letter_combinations


def main():
    print(get_letter_combinations("1234"))


if __name__ == "__main__":
    main()
