class Player {
    constructor(sock) {
        this.gameObjects = new Array();
        this.stats = {};
        this.workers = {};
        this.socket = sock;
        this.socket.on('player_init', (response) => {
            this.init(response);
        });
    }
};

Player.prototype.createBuilding = function(name) {
    const buildings = document.querySelector('.buildings');
    const building = document.createElement('div');
    building.id = `create${name}`;
    building.className = `buildingPrototype`;
    building.innerHTML = `
        <div class="buildingBox">
            <img src="../src/img/${name}0${this.color}.png" alt="">
            ${name}
        </div>
    `;
    building.addEventListener('click', () => {
        localStorage.setItem('action', JSON.stringify({ type: 'drag', target: `${name.toLowerCase()}` }));
    });
    buildings.appendChild(building);
};

Player.prototype.getColor = function() {
    return this.color;
}

Player.prototype.init = function(response) {
    this.id = response.id;
    this.username = response.username;
    this.color = response.color;
    this.stats = response.stats;
    this.workers = response.workers;
    const tower = this.createBuilding('Tower');
    const mine = this.createBuilding('Mine');
    const sawmill = this.createBuilding('Sawmill');
    const quarry = this.createBuilding('Quarry');
    const farm = this.createBuilding('Farm');
    const base = this.createBuilding('Base');
};

Player.prototype.printStats = function() {
    const stats = document.querySelector('.stats');
    stats.innerHTML = `
        <ul>
            <li>
                Gold
            <span id="gold">
                ${this.stats.gold} (+${this.workers.gold})
            </span>
            </li>
            <li>
                Wood
            <span id="wood">
                ${this.stats.wood} (+${this.workers.wood})
            </span>
            </li>
            <li>
                Stone
            <span id="stone">
                ${this.stats.stone} (+${this.workers.stone})
            </span>
            </li>
            <li>
                Food
            <span id="food">
                ${this.stats.food} (+${this.workers.food})
            </span>
            </li>
            <li>
                Army
            <span id="army">
                ${this.stats.army}
            </span>
            </li>
        </ul>
    `;
};

Player.prototype.getStats = function() {
    return this.stats;
};

Player.prototype.getWorkers = function() {
    return this.workers;
};