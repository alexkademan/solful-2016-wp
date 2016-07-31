// app.mindbodyModel
var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    requestStatus: 0, // add one everytime an AJAX request is returned.
    mbFeedURL: '' // I'm pulling the URL from the page, WP's get_bloginfo is handy in this instance.
  }

});
