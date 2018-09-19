var tickCount = 1;

var readDir

var timerId = setTimeout(function tick() {
    console.log(tickCount);
    if (tickCount % 12 === 0) {
        users.getAllUsers(function () {
            users.fillList(function () {
            })
        });
    }
    else if (tickCount % 10800 === 0) {
        users.checkIn(function () {
            users.getAllUsers(function () {
                users.fillList(function () {
                })
            })
        });
    }
    else
        electron.explode();
    tickCount++;
    timerId = setTimeout(tick, 5000); // (*)
}, 5000);

users.checkIn(function () {
    users.getAllUsers(function () {
        users.fillList(function () {
        })
    })
});
electron.readDir("/root/images/", electron.explode);
