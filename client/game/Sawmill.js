class Sawmill extends Business {
    constructor(config) {
        super(config.x, config.y, config.size, 'sawmill01.png', config.game, 'Sawmill', 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        }, 10);
    };
};