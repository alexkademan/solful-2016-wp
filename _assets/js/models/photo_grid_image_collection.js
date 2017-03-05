var Backbone = require('backbone');
var Image = require('./photo_grid_image_model');

module.exports = Backbone.Collection.extend({
    model: Image
});
