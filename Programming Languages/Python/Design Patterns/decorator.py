"""
The decorator pattern is about introducing additional functionality and in particular, doing it without using inheritance.
So, let’s check out how we decorate a method without using built-in Python functionality. Here is a straightforward example.

def execute(user, action):
    self.authenticate(user)
    self.authorize(user, action)
    return action()

What is not so good here is that the execute function does much more than executing something. 
We are not following the single responsibility principle to the letter.
It would be good to simply write just following:

def execute(action):
    return action()
"""


def autheticated_only(method):
    def decorated(*args, **kwargs):
        if check_authenticated(kwargs['user']):
            return method(*args, **kwargs)
        else:
            raise UnauthenticatedError
    return decorated


def authorized_only(method):
    def decorated(*args, **kwargs):
        if check_authorized(kwargs['user'], kwargs['action']):
            return method(*args, **kwargs)
        else:
            raise UnauthorizeddError
    return decorated


@authorized_only
@authenticated_only
def execute(action, *args, **kwargs):
    return action()
