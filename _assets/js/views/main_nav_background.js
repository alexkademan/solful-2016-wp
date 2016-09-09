// app.mainNavBackground

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: '#page',

  lockBackground: function(backgroundScroll) {
    var bgStyle = '';
    bgStyle += 'position: fixed;';
    bgStyle += 'top: -' + backgroundScroll + 'px;';

    this.$el.attr('style', bgStyle);
  },

  unlockBackground: function() {
    this.$el.removeAttr('style');
  }

});
