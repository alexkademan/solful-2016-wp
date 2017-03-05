// app.photoGrid

var Backbone = require("backbone");
// var _ = require("underscore");
var $ = require("jquery");

module.exports = Backbone.View.extend({

    el: '#photo-grid',

    events: {
        'click .grid-photo': 'popOverImage',
    },

    initialize: function () {
        "use strict";
        if (this.$el.length === 1) {

            var gridJSON = this.$(".hid");

            if (gridJSON.length === 1) {

                // there is only one allowed div.hid
                gridJSON = JSON.parse(gridJSON[0].innerHTML);

                if (gridJSON.spacer_URL && gridJSON.image_URL) {

                    this.model.set({
                        spacerURL: gridJSON.spacer_URL,
                        imageURL: gridJSON.image_URL,
                        spacers: gridJSON.spacers,
                        images: gridJSON.images,
                        // shuffle image order:
                        imagesShuffled: this.shuffleArray(gridJSON.images),
                    });

                    this.setupGrid();

                }
            }
        }
    },

    setupGrid: function () {
        "use strict";

        var spacers = this.model.get("spacers"),
            images = this.model.get("images"),
            that = this,
            randomInt,
            i;

        for (i = 0; i < images.length; i += 1) {

            randomInt = that.getRandomInt(0, spacers.length);

            console.log(spacers[randomInt]);
            
        }

    },

    shuffleArray: function (array) {
        "use strict";

        var currentIndex = array.length, temporaryValue, randomIndex;

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

    popOverImage: function (e) {
        "use strict";

        // e.preventDefault();
        //
        // if (app.mindbodyModel.get("popoverVisible") !== true) {
        //     app.mindbodyModel.set({
        //         popoverVisible: true,
        //     });
        // }

        console.log(e);
    },

});
