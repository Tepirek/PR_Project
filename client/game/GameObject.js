class GameObject {
    constructor(posX, posY, tileSize, name, color, game) {
        this.position = {
            x: posX,
            y: posY
        };
        this.size = tileSize;
        this.name = name;
        GameObject.prototype.color = color;
        GameObject.prototype.game = game;
        this.gameObject = document.createElement('div');
        this.gameObject.onmouseenter = (e) => this.mouseenter();
        this.gameObject.onmouseleave = (e) => this.mouseleave();
        this.draw();
    };
};

GameObject.prototype.mouseenter = function() {
    let action = JSON.parse(localStorage.getItem('action'));
    if(action.type == 'drag') {
        this.gameObject.style.border = '3px solid #ff1f1f';
    }
};

GameObject.prototype.mouseleave = function() {
    let action = JSON.parse(localStorage.getItem('action'));
    if(action.type != 'select') {
        this.gameObject.style.border = '';
    }
};

GameObject.prototype.draw = function() {
    this.gameObject.style = `
        position:absolute;
        width:${this.size}px;
        height:${this.size}px;
        top:${this.position.x * this.size}px;
        left:${this.position.y * this.size}px;
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        background-image:url('../src/img/${this.name}0${this.color}.png')
    `;
    document.querySelector('.gameBoard').appendChild(this.gameObject);
};