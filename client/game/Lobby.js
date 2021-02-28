class Lobby {
    constructor(sock) {
        this.socket = sock;
        this.socket.on('lobby_connected', this.lobbyConnected);
        this.socket.on('lobby_Players', this.lobbyPlayers);
        this.socket.on('game_prepare', (response) => {
            this.lobbyPrepare(response);
        });
        this.socket.on('game_init', (response) => {
            this.clearLobby(response);
        });
    };
};

Lobby.prototype.init = function() {
    this.lobby = document.querySelector('.lobby');
    this.lobby.innerHTML = `
        <h1>Welcome to the lobby!</h1>
        <ul id = "lobby_players"></ul>
        <div class="lobby-wrapper">
        <form id="lobby-form">
            <label for="lobby">Enter your name!</label>
            <input id="lobby" autocomplete="off" title="lobby" />
            <button id="start">Start</button>
        </form>
        </div>
    `;

    document.querySelector('#lobby-form').addEventListener('submit', (e) => {
        this.lobbyEnter(e);
    });
};

Lobby.prototype.lobbyEnter = function(e) {
    e.preventDefault();
    const input = document.querySelector('#lobby');
    const text = input.value;
    if(text != '') this.socket.emit('lobby_join', text);
    input.value = '';
};

Lobby.prototype.lobbyConnected = function(response) {
    const lobbyWrapper = document.querySelector('.lobby-wrapper');
    lobbyWrapper.innerHTML = `
        <ul class = "lobby_players"></ul>
    `;
};

Lobby.prototype.lobbyPlayers = function(response) {
    const parent = document.querySelector('.lobby_players');
    parent.innerHTML = '';
    for(let i = 0; i < response.length; i++) {
        const player = response[i];
        const li = document.createElement('li');
        li.innerHTML = `<small>${player.date}</small> - ${player.user}`;
        parent.appendChild(li);
    };
}

Lobby.prototype.lobbyPrepare = function(response) {
    const parent = document.querySelector('.lobby_players');
    const timer = document.createElement('div');
    timer.innerHTML = `Gra rozpocznie się za 10s`;
    parent.appendChild(timer);
    setInterval(() => {
        let time = parseInt(timer.innerHTML.split('za ')[1].split('s')[0]);
        timer.innerHTML = `Gra rozpocznie się za ${parseInt(--time)}s`;
    }, 1000);
}

Lobby.prototype.clearLobby = function(response) {
    this.lobby.parentElement.removeChild(this.lobby);
};