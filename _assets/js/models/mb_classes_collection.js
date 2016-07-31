var Backbone = require ('backbone');
var Class = require ('./mb_class_model');

module.exports = Backbone.Collection.extend({
    model: Class
});
