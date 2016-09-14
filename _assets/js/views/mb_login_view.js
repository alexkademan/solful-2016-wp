// app.mbLogInView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: '#mastheadLogin',

  events:{
    'click a.logIn': 'logInUser',
    'click a.logOut': 'logOutUser',
    'click a.mbAccount span': 'toggleAccountInfo'
  },

  initialize: function() {
    // this is necessary to the whole program, because I'm able to
    // more efficiently get the full URL to the program out of
    // WP than I can out of JS. This is just to keep things portable.
    // (but its not the nicest solution...)
    var mbURL = this.$('#mb-login-mbFeedURL')[0].href;

    if( mbURL ){
      // set the needed var for the whole application,
      this.model.set({mbFeedURL: mbURL});
      this.model.on({'change:loggedIn': this.renderStatus}, this);

      // 'loginWorking' is the emergency shutoff to disable login feature.
      if(this.model.get('loginWorking') === true){
        this.renderStatus();
      }
    };
  },

  logInUser: function() {
    app.mbBackGroundShader.openPopUp('login');
  },

  toggleAccountInfo: function() {
    app.mbBackGroundShader.openPopUp('accountInfo');
  },

  logOutUser: function() {
    // this call erases the session, and removes session data from model.
    if(this.model.get('loggedIn') === true){
      app.mindbodyView.makeAJAXcall('login-status.php?leave=true', 'login');
      this.model.set({loginFormWaiting: true});
    };
  },

  logInOut: function(data){

    if(data === 'stranger'){
      // user not logged in.
      this.model.set({
        GUID: false,
        client: false,
        loggedIn: false,
        loginTime: '',
        clientCountDown: false, // the countdown to auto-logout
        clientCountDownR: false // Readable client count down (like a clock)
      });

      // kill off the schedule cookie
      this.adjustClientSchedule(false);
      // document.cookie = "mb-client-schedule=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

      // make the login form disappear, if it's still around:
      app.mbBackGroundShader.killPopOver();


    } else if(data['GUID']) {
      // the user JUST got her login credentials.
      // or reloaded the page while logged in.
      this.model.set({
        GUID: data['GUID'],
        client: data['client'],
        loggedIn: true,
        loginFormWaiting: false,
        // popoverVisible: false,
        loginTime: data['loginTime']
      });

      if( this.model.get('workoutRequested') === false){
        this.model.set({popoverVisible: false});

      } else {
        app.mbBackGroundShader.openPopUp('workout', this.model.get('workoutRequested'));
        // then remove the class from the model, so it's not in our way next time we come through here:
        this.model.set({workoutRequested: false});

      };

      // start the countdown for automatic logout.
      app.mindbodyView.checkStatus();

      // now that we're logged in, get info about the client:
      this.getClientInfo(data);

      // keep the login username in the cookie for next time she loads the page:
      document.cookie = "mb-client-username=" + data['client']['Email'] + "; expires=Thu, 18 Dec 3016 12:00:00 UTC;";


    } else if(data['ValidateLoginResult']){
      // we caught an error message.
      this.model.set({
        loginFormWaiting: false,
        loginERRmessage: data.ValidateLoginResult.Message
      });
    };
  },

  renderStatus: function() {
    if(this.model.get('loggedIn') === false){
      // client is NOT logged into MINDBODY:
      this.renderStranger();
    }else if (this.model.get('loggedIn') === true){
      // client IS logged into MINDBODY:
      this.renderUser();
    };

  },

  renderStranger: function() {;
    var templateStranger = _.template($('#mb-login-stranger').html());
    // clean out the old:
    this.$el.empty();
    this.$el.append(templateStranger(this.model.toJSON()));

  },
  renderUser: function(){
    var templateUser = _.template($('#mb-login-user').html());
    // clean out the old:
    this.$el.empty();
    this.$el.append(templateUser(this.model.toJSON()));

    // the stuff that display's info about the logged in client:
    // app.clientInfoView = new ClientInfo({model: this.model});
  },

  getClientInfo: function() {

    // we either:
    // A. Just logged into MINDBODY, or
    // B. just loaded the web page, but are still logged into MINDBODY
    if(this.model.get('client') !== false){

      // get the cookies,
      var cookieArray = app.mbMethods.mbGetCookieArray( document.cookie );

      if(cookieArray['mb-client-schedule']){
        // the schedule is cached to a JSON string in the cookie
        // add to the live model:
        this.adjustClientSchedule(JSON.parse(cookieArray['mb-client-schedule']));

      };

      // check the client's schedule again.
      // This may override the cookie that we just loaded into the model.
      var argString = '';
      argString += '?userID=' + this.model.get('client')['ID'];
      argString += '&timeStart=' + this.model.get('pageLoadTime');
      argString += '&duration=' + this.model.get('scheduleSpan');

      app.mindbodyView.makeAJAXcall('client-schedule-01.php' + argString, 'clientSchedule');

    };
  },

  addRegisteredClasses: function(data) {

    // data is the result of a call to the API.
    if(data === undefined) {
      // there aren't any classes
      this.adjustClientSchedule(false);

    } else {
      // we just need part:
      // data = data['GetClientScheduleResult']['Visits']['Visit'];

      // We have found that the client is logged into more than zero classes.
      // If they're only logged into a single class, than data is only one object.
      // we need it to be a collection of objects instead.
      var clientSched = [];
      if(data.ClassID !== undefined){
        // if there is a ClassID, than there is only one class
        clientSched[0] = data.ClassID;
      } else {
        for(x in data) {
          // add every enrolled class to the array.
          clientSched[clientSched.length] = data[x]['ClassID'];
        }
      };

      // add to the live model:
      this.adjustClientSchedule(clientSched);
    }
  },

  adjustClientSchedule: function(schedArray) {
    // this function was all over the document. so I consolidated it here.
    // either erase the sched (like on a log-out)
    // or update the client's schedule to reflect the array that was passed as the only argument.
    if(schedArray === false) {
      // reset the client schedule
      this.model.set({
        'clientSchedule': false,
        'clientSchedCount': 0
      });
      // remove cookie if it's there (the schedule is empty):
      document.cookie = "mb-client-schedule=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    } else {
      // the argument was an array so add it to the model:
      this.model.set({
        'clientSchedule': schedArray,
        'clientSchedCount': schedArray.length
      });
      // store in cookie for quicker response when page loads:
      // document.cookie = "mb-client-schedule=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "mb-client-schedule=" + JSON.stringify(schedArray);


    }

  }

});
