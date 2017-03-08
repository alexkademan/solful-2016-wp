

var Backbone = require("backbone");
var $ = require("jquery");

module.exports = Backbone.View.extend({


    shuffleArray: function (array) {
        "use strict";

        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    getRandomInt: function (min, max) {
        "use strict";

        // random integer betweein a min and max int.
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    },

    findSlideSize: function (imageInfo, windowWidth, windowHeight) {
        "use strict";

        // calculate the size of the image when it fits the slideshow
        var fixedSize = [];

        console.log(imageInfo);
        console.log(windowWidth);
        console.log(windowHeight);


        if (imageInfo.width >= imageInfo.height) {

            // landscape ratio

        } else {

            // portrait ratio (taller than wide)
            fixedSize.height = windowHeight;

            if(fixedSize.height > imageInfo.height) {
                console.log(fixedSize.height / imageInfo.height);

                fixedSize.width = imageInfo.width * (fixedSize.height / imageInfo.height);

            }

        }

        return fixedSize;
    },
});
