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
      this.renderStatus();
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
      console.log('stranger');
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
      // console.log(data);
      var userID = data['client']['ID'];
      // app.mindbodyView.makeAJAXcall('client-schedule-01.php?userID=' + userID, 'status');
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
    // console.log(this.model);
    var templateUser = _.template($('#mb-login-user').html());
    // clean out the old:
    this.$el.empty();
    this.$el.append(templateUser(this.model.toJSON()));
  },

  getClientInfo: function() {
    // console.log('call for class information');

    if(this.model.get('client') !== false){
      var theClient = this.model.get('client');

      var argString = '';
      argString += '?userID=' + theClient['ID'];
      argString += '&timeStart=' + this.model.get('loginTime');
      argString += '&duration=' + this.model.get('scheduleSpan');
      // console.log(this.model.get('loginTime'));

      app.mindbodyView.makeAJAXcall('client-schedule-01.php' + argString, 'clientSchedule');

    };

    // app.mindbodyView.makeAJAXcall('client-schedule-01.php?userID=true', 'login');
  },

  showCountDown: function(secondsToLogout) {
    var timeRemaining,
        minutesRemaining,
        secondsRemaining;

    if( secondsToLogout >= 60 ){
      minutesRemaining = Math.floor(secondsToLogout / 60);
      secondsRemaining = secondsToLogout - (minutesRemaining * 60);
    } else {
      minutesRemaining = 0;
      secondsRemaining = secondsToLogout;

    }

    if( secondsRemaining < 10 ) {
      secondsRemaining = "0" + secondsRemaining;
    }

    this.$('span.countdown').html(minutesRemaining + ':' + secondsRemaining);
  },

  addRegisteredClasses: function(data) {
    // data is the result of a call to the API.

    var visits = data['GetClientVisitsResult']['Visits']['Visit'];

    if(visits){
      // console.log(this.model.get('client')['FirstName']);
      this.model.set({'clientSchedule': visits});

      // console.log('Workouts on ' + this.model.get('client')['FirstName'] + "'s schedule: ");
      // for (i = 0; i < visits.length; i++) {
      //   console.log( visits[i]['ClassID'] );
      // }

      // console.log(this.model);

    }


    // console.log( this.model.get('clientSchedule') );
  }

});
