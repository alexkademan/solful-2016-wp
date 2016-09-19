// app.wpAdminBar

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: '#wpadminbar',

  initialize: function() {
    if(this.$el.length === 1) {
      // logged into WP as a blog administrator
      // seeing as WP is clunky old PHP, this only can change between page loads
      // So I'm opting not to bother adding this status to the model.

      this.wholeHTML = $('html');
      // this.setMenuHeight();
      // app.windowStatus.on({'change:windowWidth': this.setMenuHeight}, this);


    } else {
      // NOT logged into WP.
    }
  },


  // setMenuHeight: function() {
  //   // workaround to keep the WP menu from covering my site navigation:
  //   app.mainNav.positionMastheadWP( this.$el.height() );
  // },

  getAdminHeight: function() {
    return this.$el.height();
  },

  hideAdminMenu: function(){
    if(this.$el.length === 1) { // gotta be logged in to do any of this...
      this.wholeHTML.attr('style', 'margin-top: 0 !important');
      this.$el.attr('style', 'height: 0 !important; overflow: hidden');
    }
  },

  unHideAdminMenu: function() {
    if(this.$el.length === 1) { // gotta be logged in to do any of this...
      this.wholeHTML.removeAttr('style');
      this.$el.removeAttr('style');
    }
  }


});
