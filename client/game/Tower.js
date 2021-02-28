class Tower extends Building {
    constructor() {
        super('tower01.png', 'Tower', 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        });
        this.damage = 3;
    };
};