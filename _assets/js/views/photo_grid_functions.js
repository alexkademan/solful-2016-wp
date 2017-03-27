

var Backbone = require("backbone");
var _ = require("underscore");
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
        var newSize = [];

        // console.log('window width: ' + windowWidth + ' height: ' + windowHeight);
        // console.log('image width: ' + imageInfo.width + ' height: ' + imageInfo.height);


        if (imageInfo.width >= imageInfo.height) {

            // landscape ratio:
            newSize.width = windowWidth;
            newSize.height = imageInfo.height * (windowWidth / imageInfo.width);

            if (newSize.height > windowHeight) {
                newSize.height = windowHeight;
                newSize.width = imageInfo.width * (windowHeight / imageInfo.height);
            }

        } else {

            // portrait ratio:
            newSize.height = windowHeight;
            newSize.width = imageInfo.width * (windowHeight / imageInfo.height);

            if (newSize.width > windowWidth) {
                newSize.width = windowWidth;
                newSize.height = imageInfo.height * (windowWidth / imageInfo.width);
            }
        }

        return newSize.width;
    },

    slideTemplate: function () {
        "use strict";

        var t = '<span class="padd"><div class="slide"></div></span>';
        // t +=    '<img src="<%= image %>" style="<%= xy %>" />';

        return _.template(t);
    },
});
