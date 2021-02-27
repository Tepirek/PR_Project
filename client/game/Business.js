class Business extends Building {
    constructor(efficiency) {
        super();
        this.efficiency = efficiency;
    };
};

Business.prototype.getEfficiency = function() {
    return this.efficiency;
}

