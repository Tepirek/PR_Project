(() => {

    if(!localStorage.getItem('config')) localStorage.setItem('config', JSON.stringify({
        chat: false,
    }));
    if(!localStorage.getItem('action')) localStorage.setItem('action', JSON.stringify({
        type: '',
        target: ''
    }));

    const sock = io();
    sock.on('connect', () => {
        localStorage.setItem('user', sock.id);
        const chat = new Chat(sock);
        chat.init();
    
        const player = new Player('test', sock.id);
        localStorage.setItem('player', JSON.stringify(player));
    
        const game = new Game(sock);
        game.addPlayer(player);
        game.init();
        game.update();
    });
})();