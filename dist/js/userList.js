var tickCount = 1;

$.getJSON( "https://social.oenginoz.com/buca.json", function( data ) {
    var VenueJson = JSON.parse(JSON.stringify(data));
    users.venueId = VenueJson.venueId;
    users.authToken = VenueJson.authToken;
});

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
