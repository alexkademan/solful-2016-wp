// app.mindbodyModel

var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {

    loginWorking: true,

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
    urlMINDBODY: '',
    urlMBloginForm: '', // the link below the login form that allows the client to switch to MINDBODY and do what thyre looking to do there instead of here.

    workoutRequested: false, // if the user is trying to sign in for a workout, but hasn't logged in, store the workout model here temporarily.
    workoutRequestedID: false,

    pageLoadTime: '',
    loginMaxTime: 3000, // need to automatically log the client out after 50 minutes. (3000 seconds)
    // loginMaxTime: 120, // 2 minute timer just for testing.
    loginTime: '', // the time that the client logged in.
    currentTime: '', // time of day (in seconds)

    availableTrainers: '', // array of names of trainers from WordPress to cross reference for availability.

    scheduleSpan: 518400, // 518400 is the number of seconds in 6 days. Show today plus the rest of a week.

    loggedIn: false,
    cachedUserName: '', // this gets added to the cookie at successful login, to auto-fill the login form field.
    GUID: false, // USER ID with MINDBODY issued at login.
    client: false, // array of info that comes back from the API about the user.
    clientSchedule: false, // gonna be an array of the classes that the client is signed up for.
    loginFormRendered: false,
    loginFormVisible: false, // toggle login form visibility.
    loginFormWaiting: false, // when you click "Sign In" the form needs to wait for response from API
    loginERRmessage: '' // probably wrong username or password.
  }

});
