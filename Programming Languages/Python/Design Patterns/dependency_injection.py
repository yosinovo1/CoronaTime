"""
(From wikipedia)
Dependency Injection is a technique whereby one object supplies the dependencies of another object. 
A "dependency" is an object that can be used, for example as a service. 
Instead of a client specifying which service it will use, something tells the client what service to use. 
The "injection" refers to the passing of a dependency (a service) into the object (a client) that would use it.
"""


class Command:

    def __init__(self, authenticate=None, authorize=None):
        self.authenticate = authenticate or self._not_authenticated
        self.authorize = authorize or self._not_autorized

    def execute(self, user, action):
        self.authenticate(user)
        self.authorize(user, action)
        return action()


def main():
    if in_sudo_mode:
        command = Command(always_authenticated, always_authorized)
    else:
        command = Command(config.authenticate, config.authorize)
    command.execute(current_user, delete_user_action)


if __name__ == "__main__":
    main()
