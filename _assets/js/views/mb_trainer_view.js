// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    console.log(this.model);
  }

});
