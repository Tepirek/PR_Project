class Tower extends Building {
    constructor(dmg) {
        super();
        this.dmg = dmg;
    };
};

Tower.prototype.dmg = function() {
    return this.dmg;
}
