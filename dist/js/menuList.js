var tickCount = 1;

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

var jqxhr = $.getJSON( "https://social.oenginoz.com/buca.json", {_: new Date().getTime()}, function(data) {
    if(data.venueId === undefined)
        return;
    users.venueId = data.venueId;
    users.authToken = data.authToken;
    users.checkIn(function () {
        users.getAllUsers(function () {
            users.fillList(function () {
            })
        })
    });
    $("#brandh").html("<img id=\"brandImg\" src=\""+data.brandImg+"\" class=\"img-circle elevation-2\" style=\"height: 75px; width: 75px;\"/> "+ data.brandName);
    electron.readDir("/root/images/", electron.explode);
}).fail(function(err) {
    $("#swarmFooter").remove();
    $("#brandh").remove();
    $("#cards").remove();
    $("#menus").removeClass("col-lg-9");
    $("#menus").addClass("col-12");
    electron.readDir("/root/images/", electron.explode);
    console.log(err );
});