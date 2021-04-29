class Game {
    constructor(sock, player) {
        this.player = player;
        this.gameBoard = document.querySelector('.gameBoard');
        this.gameOptions = document.querySelector('.gameOptions');
        this.socket = sock;
        this.socket.on('game_init', (response) => {
            this.init(response);
        });
        this.socket.on('game__updateStats', (response) => {
            this.__updateStats(response);
        });
        this.socket.on('game__addNewBuilding', (response) => {
            this.__addNewBuilding(response);
        });
    }
};

Game.prototype.init = function(response) {
    document.body.style.backgroundColor = '#333333';
    const antBg = document.querySelector('.backgroundImage');
    const footer = document.querySelector('.footer');
    document.querySelector('.container').removeChild(antBg);
    document.querySelector('.container').removeChild(footer);
    this.config = response.config;
    this.map = response.map;
    this.cost = response.costs;
    this.gameBoard.style.width = `${this.config.width * this.config.areaSize}px`;
    this.gameBoard.style.height = `${this.config.height * this.config.areaSize}px`;
    this.gameOptions.style.width = `${this.config.width * this.config.areaSize}px`;
    for(let i = 0; i < this.config.height; i++) {
        for(let j = 0; j < this.config.width; j++) {
            const index = i*this.config.width + j;
            let area = new Area(i, j, this.config.areaSize, 'grass', 1, this);
            if(this.map[index]) {
                this.map[index] = area;
                const position = { x: i, y: j };
                area = this.addNewBuilding(position, 'base');
            }
            this.map[index] = area;
        }
    }
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

Game.prototype.__updateStats = function(response) {
    this.player.stats = response.stats;
    this.player.workers = response.workers;
    this.player.printStats();
};

Game.prototype.addNewBuilding = function(position, target) {
    if(this.canBuy(target)){
        this.socket.emit('game_addNewBuilding', {
            id: this.player.id,
            position: {
                x: position.x,
                y: position.y,
            },
            target: target
        });
    }
};

Game.prototype.__addNewBuilding = function(response) {
    const index = response.position.x*this.config.width + response.position.y;
    const building = this.getBuilding(response.position, response.target, response.color);
    // TODO: żeby kurwa nie dawało workersów każdemu za darmo xD
    if(this.player.color == response.color) this.addNewWorker(building);
    this.map[index].setFree(false);
    this.map[index].setObject(building);
    delete this.map[index];
    this.map[index] = building;
};

Game.prototype.addNewWorker = function(object) {
    if(object.name == 'Base') {
       if(this.player.stats.food >= 250 && object.workers + 10 <= object.capacity) {
            object.workers += 10;
            this.player.stats.food -= 250;
        }
    } else if(this.player.stats.food >= 25 && object.workers + 1 <= object.capacity) {
        object.workers++;
    }
    this.socket.emit('game_addNewWorker', {
        id: this.player.id,
        object: object
    });
};

Game.prototype.getBuilding = function(position, target, color) {
    let config = { 
        x: position.x, 
        y: position.y, 
        size: this.config.areaSize, 
        game: this, 
        color: color
    };
    let building;
    if(target == 'tower') building = new Tower(config);
    else if(target == 'mine') building = new Mine(config);
    else if(target == 'sawmill') building = new Sawmill(config);
    else if(target == 'quarry') building = new Quarry(config);
    else if(target == 'farm') building = new Farm(config);
    else if(target == 'base') building = new Base(config);
    else if(target == 'squad') building = new Squad(config);
    return building;
};

Game.prototype.canBuy = function(target) {
    let buy = true;
    Object.entries(this.player.stats).forEach(entry => {
        const [key, value] = entry;
        if(parseInt(value) < parseInt(this.cost[`${target}`].costs[key])) {
            buy = false;
        }
    });
    return buy;
};