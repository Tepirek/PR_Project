class Tower extends Building {
    constructor(config) {
        super(config.x, config.y, config.size, 'Tower', config.color, config.game, 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        });
        this.damage = 3;
    };
};