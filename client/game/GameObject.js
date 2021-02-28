class GameObject {
    constructor(posX, posY, tileSize, image) {
        this.position = {
            x: posX,
            y: posY
        };
        this.size = tileSize;
        this.image = image;
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
    this.gameObject.style.cursor = 'pointer';
    this.gameObject.style = `position:absolute;width:${this.size}px;height:${this.size}px;top:${this.position.x * this.size}px;left:${this.position.y * this.size}px;display:flex;align-items:center;justify-content:space-evenly;`;
        this.gameObject.style.backgroundImage = `url('../src/img/${this.image}')`;
};