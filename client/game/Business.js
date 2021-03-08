class Business extends Building {
    constructor(posX, posY, tileSize, name, color, game, life, costs, capacity) {
        super(posX, posY, tileSize, name, color, game, life, costs);
        this.workers = 0;
        this.capacity = capacity;
        this.gameObject.onclick = (res) => {
            // reset wyboru budynku ze sklepu
            localStorage.setItem('action', JSON.stringify({ type: '', target: '' }));
            this.showOptions(res);
        };
    };
};

Business.prototype.showOptions = function(res) {
    const options = document.querySelector('.objectOptions');
    options.innerHTML = `
            ${this.name}
        <table>
            <tr>
                <td>Workers</td>
                <td>${this.workers}/${this.capacity}</td>
                <td><img id="addWorker" src="../src/img/plus.png" alt="plus" style="cursor:pointer"></td>
            </tr>
            <tr>
                <td>Life</td>
                <td>${this.currentLife}/${this.life}</td>
            </tr>
        </table>
    `;
    document.querySelector('#addWorker').onclick = () => {
        this.game.addNewWorker(this);
        this.gameObject.click();
    }
}