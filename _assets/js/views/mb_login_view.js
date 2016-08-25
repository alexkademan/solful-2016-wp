// app.mbLogInView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var LoginForm = require('./mb_login_form_view')

module.exports = Backbone.View.extend({
  el: '#MB-login',

  events:{
    'click a.logIn': 'logInUser',
    'click a.logOut': 'logOutUser'
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

      // new view for login form:
      app.mbLogInForm = new LoginForm({model: this.model});
      this.model.on({'change:loggedIn': this.renderStatus}, this);
      // 'loginWorking' is the emergency shutoff to disable login feature.
      if(this.model.get('loginWorking') === true){
        this.renderStatus();
      }
    };
  },

  logOutUser: function() {
    // this call erases the session, and removes session data from model.
    if(this.model.get('loggedIn') === true){
      app.mindbodyView.makeAJAXcall('login-status.php?leave=true', 'login');
    };
  },

  logInUser: function() {
    this.model.set({loginFormVisible: true});
  },

  logInOut: function(data){

    if(data === 'stranger'){
      // user not logged in.
      this.model.set({
        GUID: false,
        client: false,
        clientSchedule: false,
        loggedIn: false,
        loginTime: ''
      });
    } else if(data['GUID']) {
      // the user JUST got her login credentials.
      this.model.set({
        GUID: data['GUID'],
        client: data['client'],
        loggedIn: true,
        loginFormWaiting: false,
        loginFormVisible: false,
        loginTime: data['loginTime']
      });

      // now that we're logged in, get info about the client:
      this.getClientInfo(data);

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
  },

  showCountDown: function(secondsToLogout) {
    var timeRemaining = app.findDayInfo.findClockValue(secondsToLogout);
    this.$('span.countdown').html(timeRemaining);
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
        // Delete the schedule cookie. We'll cache it when the AJAX request comes back
        document.cookie = "mb-client-schedule=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

        // send cached schedule info from the cookie to the model thru addRegisteredClasses method:
        this.addRegisteredClasses( JSON.parse(cookieArray['mb-client-schedule']) );

      };

      // check the client's schedule again.
      // This may override the cookie that we just loaded into the model.
      var theClient = this.model.get('client');

      var argString = '';
      argString += '?userID=' + theClient['ID'];
      argString += '&timeStart=' + this.model.get('loginTime');
      argString += '&duration=' + this.model.get('scheduleSpan');

      app.mindbodyView.makeAJAXcall('client-schedule-01.php' + argString, 'clientSchedule');

    };
  },

  addRegisteredClasses: function(data) {

    // data is the result of a call to the API.
    // OR the cached info from a cookie.

    // add to the live model:
    this.model.set({'clientSchedule': data});
    // console.log('this is the last thing we heard the program say !@#!');

    // store in cookie for quicker response when page loads:
    document.cookie = "mb-client-schedule=" + JSON.stringify(data);
  }

});
