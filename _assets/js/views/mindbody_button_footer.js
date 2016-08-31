// app.MindBodyButtonFooter

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  // el: '#MINDBODY-footer-link',
  el: '.MINDBODY-LINK',

  events: {
    'click': 'useButton'
  },

  useButton: function(e) {
    e.preventDefault();
    app.mbMethods.launchMINDBODY( this.model.get('urlMINDBODY') );
  }

});
