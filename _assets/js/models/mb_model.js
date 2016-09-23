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
    mbFeedSSL: 'https://secure147.inmotionhosting.com/~desig362/solfulfitness.com/2016/wp-content/themes/solful-2016-wp/MINDBODY/',

    mbFeedUseSSL: true, // if we use the shared SSL

    signupURLbase: 'https://clients.mindbodyonline.com/ws.asp',
    urlMINDBODY: '',
    urlMBloginForm: '', // the link below the login form that allows the client to switch to MINDBODY and do what thyre looking to do there instead of here.

    workoutRequested: false, // if the user is trying to sign in for a workout, but hasn't logged in, store the workout model here temporarily.
    workoutRequestedID: false,

    pageLoadTime: '',
    loginMaxTime: 3000, // need to automatically log the client out after 50 minutes. (3000 seconds)
    loginTime: '', // the time that the client logged in.
    currentTime: '', // time of day (in seconds)

    availableTrainers: '', // array of names of trainers from WordPress to cross reference for availability.

    scheduleSpan: 518400, // 518400 is the number of seconds in 6 days. Show today plus the rest of a week.

    loggedIn: false,
    cachedUserName: false, // this gets added to the cookie at successful login, to auto-fill the login form field.
    GUID: false, // USER ID with MINDBODY issued at login.
    client: false, // array of info that comes back from the API about the user.

    clientCountDown: false, // number of seconds until auto-logout
    clientCountDownR: false, // Readable, (looks like a clock)

    clientInfoVisible: false, // show or hide the info about the logged in visitor

    clientSchedule: false, // gonna be an array of the classes that the client is signed up for.
    clientSchedCount: 0, // number of classes that the client is enrolled in. This will be watched for state changes.

    loginFormRendered: false,

    popoverVisible: false,

    loginFormVisible: false, // toggle login form visibility.
    loginFormWaiting: false, // when you click "Sign In" the form needs to wait for response from API
    loginERRmessage: '', // probably wrong username or password.
    exitMessage: false, // probably wrong username or password.

    popOverRenderedHeight: 0, // height of the pop over on the screen.
    bgScroll: false // value to scroll the page to when the pop-over is visible
  }

});
