const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { getUnpackedSettings } = require('http2');

const tools = require('./functions');

const { test, Chat } = require('./Chat');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

let gameParams = {
    config: {
        areaSize: 24,
        width: 64,
        height: 32
    }
};

let messages = Array();
let players = Array();
let lobby = Array();

io.on('connection', (sock) => {
    console.log(`Someone connected! ${sock.id}`);

    sock.on('lobby_join', (name) => {
        sock.join('lobby');
        console.log(`${name} entered the lobby!`);
        players[`${sock.id}`] = {
            id: sock.id,
            username: name,
            color: 2
        };
        console.log(players[sock.id]);
        const data = {
            id: sock.id,
            user: name,
            date: tools.getDate()          
        };
        lobby.push(data);
        sock.emit('lobby_connected', data);
        io.to('lobby').emit('lobby_Players', lobby);
        if(lobby.length == 1) {
            console.log('Game init');
            io.emit('game_prepare', 'abc');
            setTimeout(() => {
                io.to('lobby').emit('game_init', gameParams);
                sock.emit('player_init', players[sock.id]);
            }, 1000);
        }
    });

    // TODO: remove user data when disconnect
    sock.on('disconnect', (sock) => {
        lobby = lobby.filter(obj => {
            if(Object.keys(io.engine.clients).includes(obj.id)) return true;
            else return false;
        });
        // io.emit('lobby_Players', lobby);
    });

    sock.on('message', (msg) => {
        const message = { date: tools.getDate(), text: msg };
        messages.push(message);
        io.emit('message', message);
    });

    sock.on('initChat', () => {
        sock.emit('message', {date: tools.getDate(), text: `Witaj! Połączono jako <span style="color:#1be393">${players[sock.id].username}</span>`});
        messages.forEach(message => {
            sock.emit('message', message);
        });
    });
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('Listening on port 8080!');
});