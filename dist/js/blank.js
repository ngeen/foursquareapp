var tickCount = 1;

var timerId = setTimeout(function tick() {
    console.log(tickCount);
    if (tickCount % 12 === 0) {
        users.getAllUsers(function () {
            users.fillList(function () {
                users.explode();
            })
        });
    }
    else if (tickCount % 10800 === 0) {
        users.checkIn(function () {
            users.getAllUsers(function () {
                users.fillList(function () {
                    users.explode();
                })
            })
        });
    }
    else
        users.explode();
    tickCount++;
    timerId = setTimeout(tick, 10000); // (*)
}, 10000);

users.checkIn(function () {
    users.getAllUsers(function () {
        users.fillList(function () {
            users.explode();
        })
    })
});
