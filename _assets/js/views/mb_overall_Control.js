// app.mbOverallControl
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: document.body,

  events: {
    'keydown': 'escapeKey'
  },

  escapeKey: function(e) {
    // this method is here because this file is tied to
    // document.body. So I'm using it to catch keyboard events.
    // I am not proud of this. THIS IS HOW SOFTWARE GETS UN-MANAGEABLE !!!
    if(e.keyCode === 27 && this.model.get('popoverVisible') === true){
      // escape key === 27
      this.model.set({ popoverVisible: false});
    };

  },

  setPopOverPageHeight: function(pageHeight) {
    this.$el.attr('style', 'height: ' + pageHeight + 'px;');
  },

  removePopOverPageHeight: function(){
    // configure some inline styles for the pop over on its way out...
    this.$el.removeAttr('style');
  }

});
