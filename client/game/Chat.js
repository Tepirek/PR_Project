class Chat {
    constructor(sock) {
        this.socket = sock;
        this.socket.on('message', this.log);
    };
};

Chat.prototype.init = function () {
    let config = JSON.parse(localStorage.getItem('config'));
    this.chat = document.querySelector('.chat');
    this.chat.innerHTML = `
        <ul id = "events"></ul>
        <div class="controls">
            <div class="chat-wrapper">
                <form id="chat-form">
                    <input id="chat" autocomplete="off" title="chat" />
                    <button id="say">Send</button>
                </form>
            </div>
      </div>
    `;
    this.chat.style.display = (config.chat) ? 'block' : 'none'; 

    this.messages = document.querySelector('#events');

    document.querySelector('.chatButton').addEventListener('click', () => {
        if(config.chat) {
            this.chat.style.display = 'none';
            config.chat = false;
        } else {
            this.chat.style.display = 'block';
            config.chat = true;
            // przewijanie czatu do najnowszych wiadomości
            this.messages.scrollTop = this.messages.scrollHeight;
        }
        localStorage.setItem('config', JSON.stringify(config));
    });

    document.querySelector('#chat-form').addEventListener('submit', (e) => {
        this.onChatSubmitted(e);
    });
    
    this.socket.emit('initChat');
};

Chat.prototype.onChatSubmitted = function (e) {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    if(text != '') this.socket.emit('message', text);
    input.value = '';
};

Chat.prototype.log = function(msg) {
    const parent = document.querySelector('#events');
    const li = document.createElement('li');
    li.innerHTML = `<small>${msg.date}</small> - ${msg.text}`;
    parent.appendChild(li);
    parent.scrollTop = parent.scrollHeight;
}