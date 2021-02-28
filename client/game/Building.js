class Building extends GameObject {
    constructor(posX, posY, tileSize, image, game, name, life, costs) {
        super(posX, posY, tileSize, image, game);
        this.name = name;
        this.currentLife = life;
        this.life = life;
        this.costs = costs;
    };
};



