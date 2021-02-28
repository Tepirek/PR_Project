class Mine extends Business {
    constructor(config) {
        super(config.x, config.y, config.size, 'Mine', config.color, config.game, 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        }, 10);
    };
};