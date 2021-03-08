const gameParams = {
    maxPlayers: 1,
    config: {
        areaSize: 24,
        width: 64,
        height: 32
    },
    costs: {
        tower: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        },
        farm: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        },
        mine: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        },
        quarry: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        },
        sawmill: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        },
        base: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        },
        squad: {
            costs: {
                gold: 1,
                wood: 1,
                stone: 1,
                food: 1
            },
            worker: {
                food: 1
            }
        }
    }
};

const playerParams = {
    stats: {
        gold: 100,
        wood: 100,
        stone: 100,
        food: 100,
        army: 0
    },
    workers: {
        gold: 0,
        wood: 0,
        stone: 0,
        food: 0
    }
};

const baseLocations = {
    1: { x: 1, y: 1 },
    2: { x: 30, y: 62 },
    3: { x: 30, y: 1 },
    4: { x: 1, y: 62 }
};

module.exports = {
    gameParams: gameParams,
    playerParams: playerParams,
    baseLocations: baseLocations
};