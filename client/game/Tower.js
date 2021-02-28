class Tower extends Building {
    constructor(config) {
        super(config.x, config.y, config.size, 'Tower', config.color, config.game, 50, { 
            gold: 20, 
            wood: 20, 
            stone: 20, 
            food: 20 
        });
        this.soldiers = 0;
        this.capacity = 10;
        this.gameObject.onclick = (e) => this.showOptions();
    };
};

Tower.prototype.showOptions = function() {
    const options = document.querySelector('.objectOptions');
    options.innerHTML = `
            ${this.name}
        <table>
            <tr>
                <td>Soldiers</td>
                <td>${this.soldiers}/${this.capacity}</td>
                <td><img src="../src/img/plus.png" alt="plus"></td>
            </tr>
            <tr>
                <td>Life</td>
                <td>${this.currentLife}/${this.life}</td>
            </tr>
        </table>
    `;
}