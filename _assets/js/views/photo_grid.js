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

        app.mindbodyModel.set({
            popoverVisible: true,
        });

        console.log(e);
    },
});
