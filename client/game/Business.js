class Business extends Building {
    constructor(posX, posY, tileSize, image, game, name, life, costs, capacity) {
        super(posX, posY, tileSize, image, game, name, life, costs);
        this.workers = 0;
        this.capacity = capacity;
        this.gameObject.onclick = (e) => this.showOptions();

    };
};

Business.prototype.addNewWorker = function() {
    if(this.workers + 1 <= this.capacity) {
        let player = JSON.parse(localStorage.getItem('player'));
        if(this.canBuy(player.stats)) {
            this.workers++;
            this.game.addNewWorker(player);
        } else console.log('You don\'t have enough materials!');
    } else console.log('You can\'t more workers!');
}



Business.prototype.highlight = function() {
};

Business.prototype.showOptions = function() {
    const options = document.querySelector('.objectOptions');
    options.innerHTML = `
            ${this.name}
        <table>
            <tr>
                <td>Workers</td>
                <td>${this.workers}/${this.capacity}</td>
                <td><img id="addWorker" src="../src/img/plus.png" alt="plus"></td>
            </tr>
            <tr>
                <td>Life</td>
                <td>${this.currentLife}/${this.life}</td>
            </tr>
        </table>
    `;
    document.querySelector('#addWorker').addEventListener('click',() => {
        let player = JSON.parse(localStorage.getItem('player'));
        if(player.stats.food >= 25 && this.workers + 1 <= this.capacity) {
            this.workers++;
            player.stats.food -= 25;
            localStorage.setItem('player',JSON.stringify(player));
            player.updateStats();
            player.printStats();
            this.gameObject.click();//TODO aktualizowanie stanu statystk biznesu XD 
        }
    });
}