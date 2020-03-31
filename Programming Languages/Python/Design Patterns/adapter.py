"""
Let’s say you have a working method for logging information to a given destination. 
Your method expects the destination to have a write() method (as every file object has, for example).

def log(message, destination):
    destination.write('[{}] - {}'.format(datetime.now(), message))

I would say it is a well written method with dependency injection, which allows for great extensibility. 
Say you want to log to some UDP socket instead to a file,you know how to open this UDP socket but the only problem is that the socket object has no write() method. 
You need an Adapter!
"""
import socket


class SocketWriter(object):

    def __init__(self, ip, port):
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._ip = ip
        self._port = port

    def write(self, message):
        self._socket.send(message, (self._ip, self._port))


def log(message, destination):
    destination.write('[{}] - {}'.format(datetime.now(), message))


def main():
    udp_destination = SocketWriter('1.2.3.4', '9999')
    log('Something happened', udp_destination)


if __name__ == "__main__":
    main()
