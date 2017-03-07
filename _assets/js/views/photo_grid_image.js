// app.photoGrid

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");

module.exports = Backbone.View.extend({

    events: {
        'click a': 'popOverImage',
    },

    initialize: function () {
        "use strict";
        // console.log(this.model.get("order"));

        // console.log(this.model.attributes);
        var t = "",
            spacerLink = this.model.get("spacerURL") +
                    this.model.get("spacerFile"),
            imageLink = this.model.get("imageURL") +
                    this.model.get("imageFile"),
            background = "background-image:url(" + imageLink + ");";


        t += "<div class=\"grid-photo\">";
        t +=    "<img src=\"" + spacerLink + "\" />";
        t +=    "<img src=\"" + spacerLink + "\" style=\"" + background +
                "\" class=\"background\" />";
        t +=    "<a href=\"" + imageLink + "\"></a>\"";
        t += "</div>";

        this.template = _.template(t);

    },

    render: function () {
        "use strict";
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    popOverImage: function (e) {
        "use strict";
        e.preventDefault();

        if (app.mindbodyModel.get("popoverVisible") !== true) {
            this.model.get("parentModel").set({
                currentSlide : this.model.get("order"),
            });
        }
    },

});
