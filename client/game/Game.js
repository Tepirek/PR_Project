class Game {
    constructor(sock, player) {
        this.player = player;
        this.gameBoard = document.querySelector('.gameBoard');
        this.gameOptions = document.querySelector('.gameOptions');
        this.socket = sock;
        this.socket.on('game_init', (response) => {
            this.init(response);
        });
        this.socket.on('game_addNewBuilding', (response) => {
            this.__addNewBuilding(response);
        });
        this.config = {
            areaSize: 24,
            width: 64,
            height: 32
        };
        this.cost = {
            tower: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            },
            farm: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            },
            mine: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            },
            quarry: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            },
            sawmill: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            },
            base: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            },
            squad: {
                costs: {
                    gold: 1,
                    wood: 1,
                    stone: 1,
                    food: 1
                }
            }
        };
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
    this.update();
};

Game.prototype.update = function() {
    setInterval(() => {
        this.player.addToStats();
        this.player.printStats();
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
    if(this.canBuy(target)){
        const index = position.x*this.config.width + position.y;
        const building = this.getBuilding(position, target);
        this.player.stats.food += 25;
        this.addNewWorker(building);
        this.map[index].setFree(false);
        this.map[index].setObject(building);
        delete this.map[index];
        this.map[index] = building;
        this.buy(target);
        this.socket.emit('game_addNewBuilding', {
            x: position.x,
            y: position.y,
            id: this.player.id,
            target: target
        });
    }
};

Game.prototype.__addNewBuilding = function(response) {
    
};

Game.prototype.addNewWorker = function(object) {
    if(object.name == 'Base') {
       if(this.player.stats.food >= 250 && object.workers + 10 <= object.capacity) {
            object.workers += 10;
            this.player.stats.food -= 250;
        }
    } else if(this.player.stats.food >= 25 && object.workers + 1 <= object.capacity) {
        object.workers++;
        this.player.stats.food -= 25;
        // TODO: dodawanie surowców za pracowników
        this.player.workers[`${object.name.toLowerCase()}`]++;
        let key = '';
        if(object.name == 'Farm') key = 'food';
        else if(object.name == 'Sawmill') key = 'wood';
        else if(object.name == 'Mine') key = 'gold';
        else if(object.name == 'Quarry') key = 'stone';
        this.player.workers[`${key}`]++;
    }
    this.player.printStats();
    object.gameObject.click();
};



Game.prototype.getBuilding = function(position, target) {
    let config = { 
        x: position.x, 
        y: position.y, 
        size: this.config.areaSize, 
        game: this, 
        color: this.player.getColor()
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

Game.prototype.buy = function(target) {
    Object.entries(this.player.stats).forEach(entry => {
        const [key, value] = entry;
        this.player.stats[key] -= this.cost[`${target}`].costs[key];
    });
    this.player.printStats();
};