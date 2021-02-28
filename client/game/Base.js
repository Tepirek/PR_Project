class Base extends Building {
    constructor(config) {
        super(config.x, config.y, config.size, 'Base', config.color, config.game, 200, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        });
    };
};