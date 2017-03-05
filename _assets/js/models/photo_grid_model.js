var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    defaults: {
        currentSlide: false,
        imageURL: "",
        spacerURL: "",
    }

});
