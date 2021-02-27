class Soldier extends Minion {
    constructor(strength) {
        super();
        this.strength = strength;
    };
};



Soldier.prototype.getStrength = function() {
    return this.strength;
}

Soldier.prototype.patrol = function() {

}

Soldier.prototype.fight = function() {
    
};

