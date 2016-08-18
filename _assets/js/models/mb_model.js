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

    pageLoadTime: '',
    loginMaxTime: 3000, // need to automatically log the client out after 50 minutes. (3000 seconds)
    // loginMaxTime: 3000, // need to automatically log the client out after 50 minutes. (3000 seconds)
    loginTime: '', // the time that the client logged in.
    currentTime: '', // time of day (in seconds)

    scheduleSpan: 518400, // 518400 is the number of seconds in 6 days. Show today plus the rest of a week.

    loggedIn: false,
    GUID: false, // USER ID with MINDBODY issued at login.
    client: false, // array of info that comes back from the API about the user.
    loginFormRendered: false,
    loginFormVisible: false, // toggle login form visibility.
    loginFormWaiting: false, // when you click "Sign In" the form needs to wait for response from API
    loginERRmessage: '' // probably wrong username or password.
  }

});
