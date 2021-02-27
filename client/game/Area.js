class Area {
    constructor(){
        this.who = true; //who is on the area 
    };
};

Area.prototype.getWho = function() {
    return this.who;
}
