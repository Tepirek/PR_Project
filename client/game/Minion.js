class Minion extends GameObject {
    constructor(life,speed,cx,cy) {
        super(cx,cy,image);
        this.life = life;
        this.speed = speed;
    };
};

Minion.prototype.getLife = function() {
    return this.life;
};

Minion.prototype.getSpeed = function() {
    return this.getSpeed;
}

Minion.prototype.move() = function() {

};


