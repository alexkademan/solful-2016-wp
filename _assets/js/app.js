
var WindowStatsModel = require('./models/window_stats_model');
var WindowStatsView = require('./views/window_stats_view');

var MainNavModel = require('./models/main_nav_model');
var MainNavView = require('./views/main_nav_view');

var MindBodyButton = require('./views/mindbody_button');

var WPadminHider = require('./views/wp_admin_hider_view');

var domReady = require('domready');

var FBfeedModel = require('./models/fb_feed_model');
var FBfeed = require('./views/fb_feed_view');


module.exports = {
  // this is the the whole app init'er
  blastoff: function () {
    var self = window.app = this;

    // wait for document ready to render our main view
    // this ensures the document has a body, etc.
    domReady(function () {

      app.windowStatus = new WindowStatsModel();
      app.windowStatusView = new WindowStatsView({ model : app.windowStatus });

      app.mindBodyButton = new MindBodyButton();
      
      app.mainNavModel = new MainNavModel();
      app.mainNav = new MainNavView({ model: app.mainNavModel });

      app.fbFeedModel = new FBfeedModel();
      app.fbFeed = new FBfeed({ model : app.fbFeedModel });

    });

  }
}

// run it
module.exports.blastoff();
