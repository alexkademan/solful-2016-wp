// app.mainNav
// model: app.mainNavModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var MainNavShader = require('./main_nav_shader_view');
var MainMenuHeight = require('./main_nav_heigt_view');
var NavBackground = require('./main_nav_background');
var MastheadShowHide = require('./main_nav_masthead');

module.exports = Backbone.View.extend({

  el: '#site_header',

  events: {
    'click a.toggle': 'toggleMenu'
  },

  initialize: function(){
    this.model.on('change:mobileMenu', this.openClose);

    app.windowStatus.on({
      'change:palmSize': function(){
        app.mainNav.breakpointChange();
      }
    });

    app.mainNavShader = new MainNavShader({model: this.model});
    app.mainMenuHeight = new MainMenuHeight({model: this.model});
    app.mainNavBackground = new NavBackground();
    app.mainNavMasthead = new MastheadShowHide();

    this.breakpointChange(); // run this once to set the stage.

  },

  toggleMenu: function(e) {
    // just toggle the menu true/false:
    if(this.model.get('mobileMenu') === false){
      this.model.set({ mobileMenu : true });
    } else {
      this.model.set({ mobileMenu : false });
    };

  },

  openClose: function(){
    // runs whenever menu is toggled:
    if( app.mainNav.model.get('mobileMenu') === true ){
      // set class for CSS hook:
      $(document.body).addClass('main_nav_on');
      app.mainNavShader.openShader();
      app.mainMenuHeight.openUp();

      var layoutHeight = app.mainMenuHeight.model.get('menuHeight');

      $(document.body).attr('style', 'height: ' + layoutHeight + 'px');

    } else {
      // remove class
      $(document.body).removeClass('main_nav_on');
      app.mainNavShader.closeShader();
      app.mainMenuHeight.closeDown();

      $(document.body).removeAttr('style');

    };
  },

  closeMenus: function() {
    if( app.mainNav.model.get('mobileMenu') === true ){
      // trigger the standard shutdown:
      app.mainNav.model.set({'mobileMenu' : false });
    }
  },

  breakpointChange: function() {

    if( this.model.get('mobileMenu') === true){
      // closing the menu
      this.closeMenus();
    };

    if( app.windowStatus.get('palmSize') === true ){
      // Make the Palm Sized Layout
      app.mainMenuHeight.closeDown();

      // hide the WP admin menu from client
      $('html').attr('style', 'margin-top: 0 !important');
      $('#wpadminbar').attr('style', 'height: 0 !important; overflow: hidden');

    } else {
      // make the monitor sized layout
      // console.log('make monitor size');
      app.mainMenuHeight.switchToLarger();

      // un-hide the WP admin menu from client
      $('html').removeAttr('style');
      $('#wpadminbar').removeAttr('style');

    };
  },

  positionMasthead: function(scrollY) {
    if(scrollY === 0) {
      // this.$el.removeAttr('style');
    } else {
      // if we're not at zero now, make it so.
      // this keeps the nav from moving away from view:
      // this.$el.attr('style', 'top: ' + 0 + 'px');
    }


    console.log( this.model.get('menuHeight') );
  }

});
