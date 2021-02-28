class Game {
    constructor() {    
        this.map = new Array();
        this.players = new Array();
        this.gameBoard = document.querySelector('.gameBoard');
        this.gameOptions = document.querySelector('.gameOptions');
        this.config = {
            areaSize: 24,
            width: 64,
            height: 32
        };
    }
};

Game.prototype.init = function() {
    this.gameBoard.style.width = `${this.config.width * this.config.areaSize}px`;
    this.gameBoard.style.height = `${this.config.height * this.config.areaSize}px`;
    this.gameOptions.style.width = `${this.config.width * this.config.areaSize}px`;
    for(let i = 0; i < this.config.height; i++) {
        for(let j = 0; j < this.config.width; j++) {
            let area = new Area(i, j, this.config.areaSize, this);
            this.map[i*this.config.width + j] = area;
            this.gameBoard.appendChild(area.getArea());
        }
    }
    this.players.forEach(player => {
        player.init();
    });
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
    const building = this.getBuilding(position, target);
    console.log(this.map[position.x*this.config.width + position.y]);
    console.log(building);
    this.map[position.x*this.config.width + position.y].setFree(false);
    this.map[position.x*this.config.width + position.y].setObject(building);
    this.map[position.x*this.config.width + position.y] = building;
    console.log(this.map[position.x*this.config.width + position.y]);
};

Game.prototype.addNewWorker = function() {
    const id = localStorage.getItem('user');
    // this.players[id] = ... TODO
};

Game.prototype.getBuilding = function(position, target) {
    let building;
    if(target == 'tower') building = new Tower();
    else if(target == 'mine') building = new Mine();
    else if(target == 'sawmill') building = new Sawmill();
    else if(target == 'quarry') building = new Quarry();
    else if(target == 'farm') building = new Farm(position.x, position.y, this.config.areaSize);
    return building;
};