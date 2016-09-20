// app.mainNav
// model: app.mainNavModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var MainNavShader = require('./main_nav_shader_view');
var MainMenuHeight = require('./main_nav_height_view');
var NavBackground = require('./main_nav_background');
var MastheadShowHide = require('./main_nav_masthead');

var WPAdminBar = require('./wp_admin_nav_view');

module.exports = Backbone.View.extend({

  el: '#site_header',

  events: {
    'click a.toggle': 'toggleMenu'
  },

  initialize: function(){
    this.model.on({'change:mobileMenu': this.openClose}, this);

    app.mainNavShader = new MainNavShader({model: this.model});
    app.mainMenuHeight = new MainMenuHeight({model: this.model});
    app.mainNavBackground = new NavBackground();
    app.mainNavMasthead = new MastheadShowHide({model: this.model});
    app.wpAdminBar = new WPAdminBar();

    app.windowStatus.on({'change:palmSize': this.breakpointChange}, this);
    app.windowStatus.on({'change:windowWidth': this.positionMastheadWP}, this);

    this.breakpointChange(); // run this once to set the stage.
    this.positionMastheadWP();

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
    if( this.model.get('mobileMenu') === true ){
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
      app.wpAdminBar.hideAdminMenu();

    } else {
      // make the monitor sized layout
      app.mainMenuHeight.switchToLarger();

      // un-hide the WP admin menu from client
      app.wpAdminBar.unHideAdminMenu();

    };
  },

  positionMastheadWP: function() {

    var wpNavHeight = app.wpAdminBar.getAdminHeight();

    // adjust the nav's placement to work around WP's navigation menu that sits on top of it.
    if(wpNavHeight >= 0) {
      this.$el.attr('style', 'margin-top: ' + wpNavHeight + 'px;');

    } else {
      this.$el.removeAttr('style');
    }

  }

});
