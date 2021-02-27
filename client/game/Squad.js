class Squad extends GameObject {
    constructor() {
        this.totalStrength = 0;
        this.totalLife = 0;
    };
};


Squad.prototype.getTotalStrength = function() {
    return this.totalStrength;
};

Squad.prototype.getTotalLife = function() {
    return this.totalLife;
};

Squad.prototype.draw = function() {

};