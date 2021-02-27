class GameObject {
    constructor(cx,cy,image) {
        this.position = { x:cx, y:cy};
        this.dimension = {width: 48,height: 96};
        this.GameObject = document.createElement('div');
        this.image = image;
    };

    run = function() {
        setInterval(() => {
            this.move(0, 1);
        }, 1000/24);
        this.draw();
    };
    
};

GameObject.prototype.getPosition = function() {
    return this.position;
};

GameObject.prototype.getDimension = function() {
    return this.dimension;
};

GameObject.prototype.draw = function() {
    this.gameObject.style = `width:${this.dimension.width}px;height:${this.dimension.height}px;position:absolute;top:${this.position.y};left:${this.position.x};z-index:1000;background-size:cover;`;
    this.gameObject.style.backgroundImage = `url('${this.image}')`;
    this.gameObject.style.top = `${this.position.y}px`;
    this.gameObject.style.left = `${this.position.x}px`;
    document.body.appendChild(this.gameObject);
};

GameObject.prototype.getInfo = function() {
    console.log(this);
};