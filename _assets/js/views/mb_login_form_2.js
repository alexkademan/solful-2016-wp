// app.mbLogInForm2
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: 'div',

  initialize: function(){
    this.loginTemplate = _.template($('#mb-log-in-fields').html());
    // this.signinTemplate = _.template($('#mb-sign-in-fields').html());
  },

  render: function(workoutModel) {

    if(workoutModel === undefined) {
      // user clicked on the sign in button in the masthead:
      this.model.set({
        urlMBloginForm: this.model.get('urlMINDBODY'),
        formMessage: 'Or join us with MINDBODY!',
        workoutRequested: false
      });
    } else if(workoutModel.get('classStatus') === 'available'){
      // this is coming from a "sign up for class" button.
      this.model.set({
        urlMBloginForm: workoutModel.get('signupURL'),
        formMessage: 'Or sign up for ' + workoutModel.get('ClassDescription')['Name'] + ' through MINDBODY!',
        workoutRequested: workoutModel // temp storage for the workout they requested.
      });
    }

    cookieArray = app.mbMethods.mbGetCookieArray( document.cookie );
    if(cookieArray['mb-client-username']){
      // add cached username to the model (if it exists):
      this.model.set({'cachedUserName': cookieArray['mb-client-username']});
    } else {
      this.model.set({'cachedUserName': false});
    }

    // send to the pop-over view to display on the page:
    return this.loginTemplate(this.model.toJSON());

  },

  adjustFocus: function() {
    if(this.model.get('cachedUserName') === false){
      // new visitor, focus on the username field:
      this.$('#mb-username').focus();
    } else {
      // returning visitor:
      this.$('#mb-password').focus();
    }
  },

  signInButtom: function(e) {
    e.preventDefault();
    console.log(e);
    this.model.set({loginERRmessage: ''});

    // checking form...
    var username = this.$('#mb-username').val();
    var password = this.$('#mb-password').val();

    if(username === '') {
      this.model.set({'loginERRmessage': 'You must enter your username'});
    } else if(password === '') {
      this.model.set({'loginERRmessage': 'You must enter your password'});
    } else {
      // call the API for the user information:
      var argString = '?un=' + username + '&pw=' + password + '&loginTime=' + this.model.get('currentTime');
      app.mindbodyView.makeAJAXcall('login-03.php' + argString, 'login');
      this.model.set({loginFormWaiting: true});
    }

  }


});
