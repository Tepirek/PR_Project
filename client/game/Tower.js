class Tower extends Building {
    constructor(config) {
        super(config.x, config.y, config.size, 'tower01.png', config.game, 'Tower', 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        });
        this.damage = 3;
    };
};