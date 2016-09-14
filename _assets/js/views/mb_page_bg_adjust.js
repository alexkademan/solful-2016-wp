// app.mbBgAdjust
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: '#page',

  popOverBgOpen: function(backgroundScroll) {
    var bgStyle = '';
    bgStyle += 'position:fixed; ';
    bgStyle += 'top: -' + backgroundScroll + 'px;';

    this.$el.attr('style', bgStyle);
  },

  popOverBgClose: function() {
    this.$el.removeAttr('style');
  }

});
