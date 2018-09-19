var electron = (function() {
    'use strict';

    var fs = require('fs');
    var path = require('path');
    window.$ = window.jQuery = require('jquery');

    var electron = {
        version: "0.0.1"
    };

    electron.imageFiles = [];
    electron.imageCount = 0;
    electron.effects = ["blind", "bounce", "clip", "drop", "explode", "fade", "fold", "highlight", "puff", "pulsate", "shake", "slide"];
    electron.orderCount = 99999999;

    electron.readDir = (dir, callback) => {
        fs.readdir(dir, (err, files) => {
            files.forEach((file) => {
                electron.imageFiles.push(dir+file);
                electron.imageCount++;
            });

        })
        callback();
    }

    electron.readFile = (fileName, callback) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                alert("An error ocurred reading the file :" + err.message);
                return;
            }

            callback(data,fileName);
        });
    };

    electron.getImageFromFile = (filename, callback) => {

        electron.readFile(filename, (data,fileName) => {
            //get image file extension name
            let extensionName = path.extname(fileName);

            //convert image file to base64-encoded string
            let base64Image = new Buffer(data, 'binary').toString('base64');

            //combine all strings
            let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;

            callback(imgSrcString);
        });

    }

    electron.fillImageToId = (fileName, id) => {
        electron.getImageFromFile(fileName, (data) => {
            document.getElementById(id).src = data;
        })

    }

    electron.getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    electron.callback = function() {
        $( "#menuDiv" ).removeAttr( "style" ).fadeIn();

    }

    electron.getmenuImgByOrder = function () {
        if(++electron.orderCount > (electron.imageCount-1))
            electron.orderCount = 0
        return electron.orderCount;
    }

    electron.explode = function() {
        $( "#menuDiv" ).effect( electron.effects[electron.getRandomInt(12)] , null, 500, electron.callback );
        electron.fillImageToId(electron.imageFiles[electron.getmenuImgByOrder()],"img");
    }

    return electron;
})();