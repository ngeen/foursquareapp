var users = (function() {
    'use strict';

    var users = {
        version: "0.0.1"
    };

    users.effects = ["blind", "bounce", "clip", "drop", "explode", "fade", "fold", "highlight", "puff", "pulsate", "shake", "slide"];
    users.userCards = [];
    users.allUsers = [];
    users.orderCount = 7;
    users.venueId;
    users.authToken;

    users.checkIn = function (callback) {
        var url = "https://api.foursquare.com/v2/checkins/add";
        var jqxhr = $.post( url , { oauth_token : users.authToken, venueId : users.venueId, v : "20180914"  })
            .done(function( data) {
                callback();
                console.log(JSON.stringify(data));
            })
            .fail(function(err) {
                console.error(JSON.stringify( err));
            });
    }

    users.getAllUsers = function (callback) {
        users.userCards = [];
        users.allUsers = [];
        var url = "https://api.foursquare.com/v2/venues/"+users.venueId+"/herenow?oauth_token="+users.authToken+"&v=20180914";
        $.getJSON( url, function( data ) {
            var foursquareApi = JSON.parse(JSON.stringify(data));

            $.each( foursquareApi.response.hereNow.items, function( key, value ) {
                if(key > 0 && key < 7){
                    var tempUser = [];
                    var user = value.user;
                    var photo = user.photo;
                    tempUser.img = photo.prefix+"800x800"+photo.suffix;
                    tempUser.fullName = user.firstName +" " +user.lastName;

                    users.allUsers.push(tempUser);
                }
            });
            callback();
        });
    }

    users.fillList = function (callback) {
        $.each(users.allUsers , function (key, user) {
            users.userCards.push("<div class=\"card card-widget widget-user-2\">\n" +
                "              <!-- Add the bg color to the header using any of the bg-* classes -->\n" +
                "              <div class=\"widget-user-header bg-warning\">\n" +
                "                <div class=\"widget-user-image\">\n" +
                "                  <img class=\"img-circle elevation-2\" src=\""+user.img+"\" alt=\"User Avatar\">\n" +
                "                </div>\n" +
                "                <h5 class=\"widget-user-desc\">"+user.fullName+"</h5>\n" +
                "              </div>\n" +
                "            </div>");
        });
        $( "#cards").html( users.userCards );
        callback();
    }

    users.writeMainUser = function (user) {
        $("#cardName").html(user.fullName);
        $("#cardImg").attr('src', user.img);
    }

    users.getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    users.callback = function() {
        $( "#welcomeDiv" ).removeAttr( "style" ).fadeIn();

    }

    users.getUserByOrder = function () {
        if(users.orderCount++>4)
            users.orderCount = 0
        return users.orderCount;
    }

    users.explode = function() {
        $( "#welcomeDiv" ).effect( users.effects[users.getRandomInt(12)] , null, 500, users.callback );
        var user = users.allUsers[users.getUserByOrder()];
        users.writeMainUser(user);
    }

    return users;
}());