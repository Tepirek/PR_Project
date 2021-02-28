class Game {
    constructor() {
        this.map = new Array();
        this.players = new Array();
        this.config = {
            areaSize: 24,
            width: 64,
            height: 32
        };
    }
};

Game.prototype.init = function() {
    for(let i = 0; i < this.config.width * this.config.height; i++) {
        this.map[i] = 0;
    }
};

Game.prototype.addNewPlayer = function(player) {
    this.players.push(player);
};