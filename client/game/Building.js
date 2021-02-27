class Building extends GameObject {
    constructor(x,y,image,life) {
        super(x,y,image);
        this.life = life;
        this.cost = 50;
        this.size = 1;
    };
};

Building.prototype.getLife = function() {
    return this.life;
}