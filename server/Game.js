class Game {
    constructor(io, gameParams) {
        this.io = io;
        this.map = new Array();
        this.players = {};
        this.maxPlayers = gameParams.maxPlayers;
        this.config = gameParams.config;
        this.costs = gameParams.costs;
    }
};

Game.prototype.init = function() {
    for(let i = 0; i < this.config.height; i++) {
        for(let j = 0; j < this.config.width; j++) {
            this.map[i*64 + j] = 0;
        }
    }
    this.io.emit('game_init', {
        config: this.config,
        map: this.map,
        costs: this.costs
    });
    Object.values(this.players).forEach(player => {
        this.io.to(player.id).emit('player_init', player);
        this.io.emit('game__addNewBuilding', {
            position: {
                x: player.initialBaseLocation.x,
                y: player.initialBaseLocation.y
            },
            id: player.id,
            target: 'base',
            color: player.color,
            stats: player.stats,
            workers: player.workers
        });
    });
};

Game.prototype.update = function() {
    setInterval(() => {
        Object.values(this.players).forEach(player => {
            player.addToStats();
            this.io.to(player.id).emit('game__updateStats', {
                stats: player.stats,
                workers: player.workers
            });
        });
    }, 1000);
};

Game.prototype.__addNewBuilding = function(request) {
    let player = this.getPlayer(request.id);
    this.buyBuilding(player, request.target);
    request.color = player.color;
    this.io.emit('game__addNewBuilding', request);
    this.io.to(player.id).emit('game__updateStats', player.getGameStats());
};

Game.prototype.__addNewWorker = function(request) {
    let player = this.getPlayer(request.id);
    const target = String(request.object.name).toLowerCase();
    if(this.canBuy(player, this.costs[`${target}`].worker)) {
        let key = '';
        if(target == 'farm') key = 'food';
        else if(target == 'sawmill') key = 'wood';
        else if(target == 'mine') key = 'gold';
        else if(target == 'quarry') key = 'stone';
        player.workers[`${key}`]++;
    }
};

Game.prototype.canBuy = function(player, costs) {
    let buy = true;
    Object.entries(costs).forEach(entry => {
        const [key, value] = entry;
        if(player.stats[`${key}`] < value) {
            buy = false;
            return;
        }
    });
    return buy;
};

Game.prototype.buyBuilding = function(player, target) {
    Object.entries(player.stats).forEach(entry => {
        const [key, value] = entry;
        if(key == 'army') return;
        player.stats[key] -= this.costs[`${target}`].costs[key];
    });
};

Game.prototype.addNewPlayer = function(player) {
    this.players[`${player.id}`] = player;
};

Game.prototype.getPlayer = function(id) {
    return this.players[`${id}`];
};

module.exports = {
    Game: Game
};