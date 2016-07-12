// app.mainNavMasthead

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  el: '#mh-stripe',

  initialize: function() {
    // console.log('mainNavMasthead');
    app.windowStatus.on('change:vScrollPosition', this.manageMasthead);
    app.mainNavModel.on('change:mastheadOn', this.showHideMasthead);
  },

  manageMasthead: function() {
    // call the whole thing off if the mobileMenu is open:
    if(app.mainNavModel.get('mobileMenu') === false){
      app.mainNavMasthead.checkStatus();
    }

  },

  checkStatus: function() {

    if( (this.$el.height() * 0.75) >= app.windowStatus.get('vScrollPosition') ){
      // we're scrolled down less than 2/3 the height of the masthead:
      app.mainNavModel.set({ 'mastheadShowing': 'protected' });
      // this will immediately be changed to "yes"
    }

    if(
      app.mainNavModel.get('mastheadShowing') === 'protected'
      ||
      ( app.windowStatus.get('vScrollDirection') === 'up'
      && app.mainNavModel.get('mastheadShowing') === 'no' )
    ) {

        app.mainNavModel.set({ 'mastheadShowing': 'yes' });
        if(app.mainNavModel.get('mastheadOn') !== true ) {
          app.mainNavModel.set({ 'mastheadOn': true });
        }

    } else if (
      app.windowStatus.get('vScrollDirection') === 'down'
      && app.mainNavModel.get('mastheadShowing') === 'yes'
    ) {
        // console.log('moving downward.');
        app.mainNavModel.set({ 'mastheadShowing': 'no' });
        if(app.mainNavModel.get('mastheadOn') !== false ) {
          app.mainNavModel.set({ 'mastheadOn': false });
        }

    }
  },

  showHideMasthead: function() {
    if(app.mainNavModel.get('mastheadOn') === false) {
      // hide
      $(document.body).addClass('hiddenMasthead');
    } else if (app.mainNavModel.get('mastheadOn') === true) {
      // show
      $(document.body).removeClass('hiddenMasthead');
    }
  },

  checkOnHeight: function() {
    return this.$el.height();
  }

});
