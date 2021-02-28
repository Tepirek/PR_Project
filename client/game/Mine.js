class Mine extends Business {
    constructor(config) {
        super(config.x, config.y, config.size, 'mine01.png', config.game, 'Mine', 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        }, 10);
    };
};