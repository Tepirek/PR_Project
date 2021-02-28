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
let index = 1;

io.on('connection', (sock) => {
    console.log(`Someone connected! ${sock.id}`);

    sock.on('lobby_join', (name) => {
        sock.join('lobby');
        console.log(`${name} entered the lobby!`);
        players[`${sock.id}`] = {
            id: sock.id,
            username: name,
            color: index
        };
        index++;
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
            console.log(players);
            io.emit('game_prepare', 'abc');

            // GAME INIT
            let map = Array();
            for(let i = 0; i < 32; i++) {
                for(let j = 0; j < 64; j++) {
                    map[i*64 + j] = 0;
                }
            }
            map[65] = 1;
            gameParams.map = map;
            console.log(gameParams);

            setTimeout(() => {
                Object.values(players).forEach(player => {
                    console.log(player);
                    io.to(player.id).emit('player_init', players[player.id]);
                });
                io.emit('game_init', gameParams);
            }, 1000);
        }
    });

    // TODO: remove user data when disconnect
    sock.on('disconnect', (sock) => {
        index = 1;
        lobby = lobby.filter(obj => {
            if(Object.keys(io.engine.clients).includes(obj.id)) return true;
            else return false;
        });
        // io.emit('lobby_Players', lobby);
    });

    sock.on('message', (msg) => {
        const message = { 
            date: tools.getDate(), 
            text: msg,
            author: players[sock.id].username
        };
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