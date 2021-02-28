class Building extends GameObject {
    constructor(posX, posY, tileSize, image, name, life, costs) {
        super(posX, posY, tileSize, image);
        this.name = name;
        this.currentLife = life;
        this.life = life;
        this.costs = costs;
    };
};

Building.prototype.canBuy = function(stats) {
    let buy = true;
    Object.entries(stats).forEach(entry => {
        const [key, value] = entry;
        if(value < this.costs[key]) {
            buy = false;
        }
    });
    return buy;
}