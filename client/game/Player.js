class Player {
    constructor(nick,id) {
        this.nick = nick;
        this.id = id;
        this.gameObjects = new Array();
        this.gold = 50;
        this.wood = 0;
        this.stone = 0;
        this.food = 25;
    }
};