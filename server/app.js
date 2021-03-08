const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { gameParams, baseLocations, buildingCosts, playerParams } = require('./config');
const { Game } = require('./Game');
const { Player } = require('./Player');
const tools = require('./functions');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

const DEBUG = true;
let messages = Array();
let lobby = Array();

const game = new Game(io, gameParams);

io.on('connection', (sock) => {
    sock.on('lobby_join', (name) => {
        const index = lobby.length + 1;
        const initialBaseLocation = {
            x: baseLocations[index].x,
            y: baseLocations[index].y
        };
        const player = new Player(
            sock.id,
            name,
            index,
            playerParams,
            initialBaseLocation
        );
        const data = {
            id: sock.id,
            user: name,
            date: tools.getDate()          
        };
        lobby.push(data);
        sock.emit('lobby_connected', data);
        io.emit('lobby_Players', lobby);
        game.addNewPlayer(player);
        if(lobby.length == game.maxPlayers) {
            io.emit('game_prepare', {});
            game.init();
            game.update();
        }
    });

    // GAME EVENTS
    sock.on('game_addNewBuilding', (request) => {
        game.__addNewBuilding(request);
    });

    sock.on('game_addNewWorker', (request) => {
        game.__addNewWorker(request);
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
            author: game.getPlayer(sock.id).username
        };
        messages.push(message);
        io.emit('message', message);
    });

    sock.on('initChat', () => {
        sock.emit('message', {date: tools.getDate(), text: `Witaj! Połączono jako <span style="color:#1be393">${game.getPlayer(sock.id).username}</span>`});
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