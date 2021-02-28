class Business extends Building {
    constructor(posX, posY, tileSize, image, name, life, costs, capacity) {
        super(posX, posY, tileSize, image, name, life, costs);
        this.workers = 0;
        this.capacity = capacity;
        this.gameObject.onclick = (e) => this.showOptions();
    };
};

Business.prototype.addNewWorker = function() {
    if(this.workers + 1 <= this.capacity) {
        // TODO spawdzanie kosztów
        this.workers++;
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
            </tr>
            <tr>
                <td>Life</td>
                <td>${this.currentLife}/${this.life}</td>
            </tr>
        </table>
    `;
}