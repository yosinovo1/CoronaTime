"""
This pattern gives us a way to treat a request using different methods, each one addressing a specific part of the request. 
One of the best principles for good code is the 'Single Responsibility' principle.

"Every piece of code must do one, and only one, thing."

For example, if we want to censor some content we can implement different censors, each one doing one precise and clearly defined type of censoring. 
These censors could be used to censor offensive words, ads, unsuitable video content, and so on.
"""
import collections
import re


def offensive_censor(content):
    """
    Censors offensive content
    @param content: The content to censor
    @type content: C{str}
    @return: The censored content
    @rtype: C{str}
    """
    OFFENSIVE_TO_CLEAN = {
        "fuck": "f**k",
        "shit": "sh*t"
    }

    for offensive_word in OFFENSIVE_TO_CLEAN:
        content = re.sub(
            offensive_word, OFFENSIVE_TO_CLEAN[offensive_word], content, flags=re.IGNORECASE)
    return content


class ContentCensorer(object):
    def __init__(self, censors):
        self._censors = censors

    @property
    def censors(self):
        return self._censors

    @censors.setter
    def censors(self, censors):
        self._censors = censors

    def add_censor(self, censor):
        if censor not in self._censors:
            self._censors.append(censor)

    def censor(self, content):
        """
        censors the content using the class' censors
        @param content: The content to censor
        @type content: C{str}
        @return: The censored content
        @rtype: C{str}
        """
        for censor in self._censors:
            content = censor(content)
        return content


def main():
    content = "Fuck, I feel like shit."
    censor = ContentCensorer([offensive_censor])
    censored_content = censor.censor(content)
    print(censored_content)


if __name__ == "__main__":
    main()

"""
output:
-------
f**k, I feel like sh*t.
"""
