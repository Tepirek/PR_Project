class Player {
    constructor(id, name, color, playerParams, initialBaseLocation) {
        this.id = id;
        this.username = name;
        this.color = color;
        this.stats = playerParams.stats;
        this.workers = playerParams.workers;
        this.initialBaseLocation = initialBaseLocation
    }
};

Player.prototype.addToStats = function() {
    Object.keys(this.stats).forEach(key => {
        if(key == 'army') return;
        this.stats[key] += this.workers[key];
    });
};

Player.prototype.getGameStats = function() {
    return {
        stats: this.stats,
        workers: this.workers
    };
};

module.exports = {
    Player: Player
};