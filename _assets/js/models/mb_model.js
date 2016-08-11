// app.mindbodyModel

var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    studioID: 44288,
    wpSlug: '', // match the slug from WordPress
    requestStatus: 0, // add one everytime an AJAX request is returned.
    schedLoaded: false,
    mainColRendered: false,
    trainersLoaded: false,
    instructor: false, // instructor ID. False for ALL instructors (complete schedule)
    totalWorkouts: 0, // total number of workouts on schedule.
    mbFeedURL: false, // I'm pulling the URL from the page, WP's get_bloginfo is handy in this instance.
    signupURLbase: 'https://clients.mindbodyonline.com/ws.asp',

    loggedIn: false,
    GUID: false, // USER ID with MINDBODY issued at login.
    client: false, // array of info that comes back from the API about the user.
    loginFormVisible: false // toggle login form visibility.
  }

});
