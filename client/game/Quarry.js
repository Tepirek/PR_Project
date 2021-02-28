class Quarry extends Business {
    constructor(config) {
        super(config.x, config.y, config.size, 'quarry01.png', config.game, 'Quarry', 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        }, 10);
    };
};