class Player {
    constructor(nick, socketId) {
        this.nick = nick;
        this.id = socketId;
        this.gameObjects = new Array();
        this.stats = {
            gold: 50,
            wood: 0,
            stone: 0,
            food: 25
        };
        this.workers = {
            gold: 0,
            wood: 0,
            stone: 0,
            food: 0
        };
        this.statsBoxes = {
            gold: document.querySelector('#gold'),
            wood: document.querySelector('#wood'),
            stone: document.querySelector('#stone'),
            food: document.querySelector('#food')
        };
    }
};

Player.prototype.createBuilding = function(name) {
    const buildings = document.querySelector('.buildings');
    const building = document.createElement('div');
    building.id = `create${name}`;
    building.className = `buildingPrototype`;
    building.innerHTML = `
        <div class="buildingBox">
            <img src="../src/img/${name}01.png" alt="">
            ${name}
        </div>
    `;
    building.addEventListener('click', () => {
        localStorage.setItem('action', JSON.stringify({ type: 'drag', target: `${name.toLowerCase()}` }));
    });
    buildings.appendChild(building);
};

Player.prototype.init = function() {
    const tower = this.createBuilding('Tower');
    const mine = this.createBuilding('Mine');
    const sawmill = this.createBuilding('Sawmill');
    const quarry = this.createBuilding('Quarry');
    const farm = this.createBuilding('Farm');
};

Player.prototype.printStats = function() {
    Object.keys(this.stats).forEach(key => {
        this.statsBoxes[key].innerHTML = `${this.stats[key]}(+${this.workers[key]})`;
    });
};

Player.prototype.updateStats = function() {
    Object.keys(this.stats).forEach(key => {
        this.stats[key] += this.workers[key];
    });
};