def get_max_area(height: [int]) -> int:
    max_area = min(height[:2])
    for idx, i in enumerate(height[2:], start=2):
        all_areas_with_current_idx = [
            min(i, i2) * (idx - idx2) for idx2, i2 in enumerate(height[:idx])
        ]
        max_area = max([max_area] + all_areas_with_current_idx)

    return max_area


def main():
    print(get_max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))


if __name__ == "__main__":
    main()
