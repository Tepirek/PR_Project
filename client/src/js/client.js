(() => {
    
    const size = 24;
    const dimension = { w: 64, h:32 };
    const gameBoard = document.querySelector('.gameBoard');
    const gameOptions = document.querySelector('.gameOptions');
    gameBoard.style.width = `${dimension.w * size}px`;
    gameBoard.style.height = `${dimension.h * size}px`;
    gameOptions.style.width = `${dimension.w * size}px`;
    for(let i = 0; i < dimension.h; i++) {
        for(let j = 0; j < dimension.w; j++) {
            let box = document.createElement('div');
            box.style = `position:absolute;width:${size}px;height:${size}px;top:${i*size}px;left:${j*size}px;border: 1px solid #AAAAAA`;
            gameBoard.appendChild(box);
        }
    }

})();