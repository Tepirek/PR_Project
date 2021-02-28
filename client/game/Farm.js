class Farm extends Business {
    constructor(posX, posY, tileSize) {
        super(posX, posY, tileSize, 'farm01.png', 'Farm', 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        }, 10);
    };
};