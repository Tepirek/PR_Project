class Farm extends Business {
    constructor(config) {
        super(config.x, config.y, config.size, 'Farm', config.color, config.game, 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        }, 10);
    };
};