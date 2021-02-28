const tools = require('./functions');

class Chat {
    constructor(io, sock) {
        this.messages = Array();
        this.io = io;
        this.socket = sock;
        this.socket.on('message', (request) => {
            this.saveMessage(request);
        });
    }
}

Chat.prototype.saveMessage = function(request) {
    const message = {
        date: tools.getDate(),
        text: request
    };
    this.messages.push(message);
}

Chat.prototype.sendMessage = function(sock, msg) {
    this.socket.to(sock.id).emit('message', {
        date: tools.getDate(), 
        text: msg
    });
}

module.exports = {
    Chat: Chat
}