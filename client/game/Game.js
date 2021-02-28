class Game {
    constructor(sock) {
        this.map = new Array();
        this.gameBoard = document.querySelector('.gameBoard');
        this.gameOptions = document.querySelector('.gameOptions');
        this.socket = sock;
        this.socket.on('game_init', (response) => {
            this.init(response);
        });
    };
};

Game.prototype.init = function(response) {
    console.log(response);
    this.config = response.config;
    this.gameBoard.style.width = `${this.config.width * this.config.areaSize}px`;
    this.gameBoard.style.height = `${this.config.height * this.config.areaSize}px`;
    this.gameOptions.style.width = `${this.config.width * this.config.areaSize}px`;
    for(let i = 0; i < this.config.height; i++) {
        for(let j = 0; j < this.config.width; j++) {
            let area = new Area(i, j, this.config.areaSize, this);
            this.map[i*this.config.width + j] = area;
        }
    }
};

Game.prototype.update = function() {
    setInterval(() => {
        this.players.forEach(player => {
            player.updateStats();
            player.printStats();
        });
    }, 1000);
};

Game.prototype.addPlayer = function(player) {
    if(!this.players.includes(player)) {
        this.players.push(player);
    }
};

Game.prototype.sendData = function(event) {

};

Game.prototype.handleData = function(event) {

};

Game.prototype.addNewBuilding = function(position, target) {
    const index = position.x*this.config.width + position.y;
    const building = this.getBuilding(position, target);
    this.map[index].setFree(false);
    this.map[index].setObject(building);
    delete this.map[index];
    this.map[index] = building;
    console.log(this.map[index]);
};

Game.prototype.addNewWorker = function() {
    
};

Game.prototype.getBuilding = function(position, target) {
    let config = { x: position.x, y: position.y, size: this.config.areaSize, game: this };
    let building;
    if(target == 'tower') building = new Tower(config);
    else if(target == 'mine') building = new Mine(config);
    else if(target == 'sawmill') building = new Sawmill(config);
    else if(target == 'quarry') building = new Quarry(config);
    else if(target == 'farm') building = new Farm(config);
    return building;
};