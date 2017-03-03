// app.photoGrid

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");

module.exports = Backbone.View.extend({

    el: '#photo-grid',

    events: {
        'click .grid-photo': 'popOverImage',
    },

    initialize: function () {
        "use strict";
        if (this.$el.length === 1) {

            this.photos = this.$(".grid-photo");

            if (this.photos.length > 0) {
                this.controlGrid();
            }

            var gridJSON = this.$(".hid");
            console.log(gridJSON);

        }

    },

    controlGrid: function () {
        "use strict";

        console.log(this.photos.length);

        console.log('control grid');

    },

    popOverImage: function (e) {
        "use strict";

        e.preventDefault();

        if (app.mindbodyModel.get("popoverVisible") !== true) {
            app.mindbodyModel.set({
                popoverVisible: true,
            });
        }

        console.log(e);
    },
});
