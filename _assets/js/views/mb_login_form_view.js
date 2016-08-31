// app.mbLogInForm
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  el: document.body,

  events: {
    'click div.non-mobile-shader': 'clickScreen',
    'keydown': 'keyAction'
  },

  initialize: function(){
    var node = document.createElement('div');
    node.className = 'loginForm';
    document.body.appendChild(node);

    this.$el = $(node); // cache for ... THE FUTURE!!!
    this.template = _.template($('#mb-login-form').html());
    this.loginTemplate = _.template($('#mb-log-in-fields').html());
    this.signinTemplate = _.template($('#mb-sign-in-fields').html());

    this.model.on({'change:loginFormVisible': this.loginToggle}, this);
    this.model.on({'change:loginFormWaiting': this.loginWaiting}, this);
    this.model.on({'change:loginERRmessage': this.renderErrorMessage}, this);
  },

  clickScreen: function(e) {
    // remove the login form form the page:
    if(
      e.target.className === 'non-mobile-shader'
      || e.target.className === 'schedButton cancel-button'
    ){
      e.preventDefault();
      // this will turn the pop-over off.
      this.model.set({'loginFormVisible': false});
    };

    if( e.target.className === 'schedButton signin-button' ){
      e.preventDefault();
      this.requestSignIn('join');
    }

    if( e.target.className === 'schedButton cancel-class-button' ){
      // cancel appointment button.
      e.preventDefault();
      this.requestSignIn('cancel');
    }

    // submit the form via AJAX:
    if(e.target.className === 'mb-login-button'){
      // the submit input on the form was used:
      e.preventDefault();
      this.model.set({'loginERRmessage': ''});
      this.checkForm();
    }
  },

  keyAction: function(e) {
    if(e.keyCode === 27 && this.model.get('loginFormVisible') === true){
      // escape key:
      this.model.set({'loginFormVisible': false});
    };
  },

  loginToggle: function(){
    // hide the login form, if the model says it shouldn't be here:
    if (this.model.get('loginFormVisible') === false ){
      this.$el.empty();
    }
  },

  requestSignIn: function(joinOrCancel) {
    // someone pushed the "confirm" button to sign up for a class
    var clientID = this.model.get('client')['ID'];
    var classID = this.model.get('workoutRequestedID');

    var args = '?clientID=' + clientID + '&classID=' + classID;

    if(joinOrCancel === 'join'){
      // sign the client into the class
      app.mindbodyView.makeAJAXcall('class-sign-up-01.php' + args, 'signup');

    } else if (joinOrCancel === 'cancel') {
      // sign the client out of the class
      args += '&cancel=true';
      app.mindbodyView.makeAJAXcall('class-sign-up-01.php' + args, 'cancelClass');

    }

    this.model.set({'loginFormWaiting': true});
  },

  checkForm: function(){
    // console.log('checking form...');
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
      this.model.set({'loginFormWaiting': true});
    }
  },

  showForm: function(workoutModel) {

    // store the class ID if there is one for use on the login screen:
    if(workoutModel !== undefined){
      this.model.set({'workoutRequestedID': workoutModel.get('ID')});
    };

    // login form has been requested, put it's status into the model
    // this can't be false if you want the form to be displayed:
    if(this.model.get('loginFormVisible') !== true){
      this.model.set({
        loginFormVisible: true,
        loginFormWaiting: false // reset just incase
      });
    }


    // show the shader that will contain the form:
    this.$el.html(this.template());
    this.shader = this.$('div.non-mobile-shader');


    if(this.model.get('loggedIn') === false){
      // either the user clicked "log in" in the masthead,
      // or they are clicking "sign in" for a class while logged out.
      // they need to either:
      // A. log in and then sign into the class, or
      // B. log in and be back to the website.
      this.showLogInForm(workoutModel);

    } else if(this.model.get('loggedIn') === true) {
      // skip the login form, the user is already signed in.
      this.showSignInForm(workoutModel);
    }




  },

  showLogInForm: function(workoutModel){
    // clear the form if its been used already:
    this.shader.html('');

    // will be needed if the user logs in, or wants to go directly to MINDBODY
    // and ignore all my wonderful software.
    if(workoutModel === undefined) {
      // this is the generic "Log in" button in the masthead,
      // no link sent to the view. Use the one thats already within the model:
      this.model.set({'urlMBloginForm': this.model.get('urlMINDBODY')});
      this.model.set({'formMessage': 'Or join us with MINDBODY!'});

    } else if(workoutModel.get('classStatus') === 'available'){
      // this is coming from a "sign up for class" button.
      this.model.set({'urlMBloginForm': workoutModel.get('signupURL')});
      this.model.set({'formMessage': 'Or sign up for ' + workoutModel.get('ClassDescription')['Name'] + ' through MINDBODY!'});
      this.model.set({'workoutRequested': workoutModel}); // temp storage for the workout they requested.
    }
    // if the user has a cached USER NAME, then add it to the form so they
    // won't have to type it out again.
    var cookieArray = app.mbMethods.mbGetCookieArray( document.cookie );
    if(cookieArray['mb-client-username']){
      // add cached username to the model:
      this.model.set({'cachedUserName': cookieArray['mb-client-username']});
    }

    // show the form:
    this.shader.html(this.loginTemplate(this.model.toJSON()));

    // focus on the sign-in form for convenience:
    if(cookieArray['mb-client-username']){
      // if the username is cached then focus on the password field.
      this.$('#mb-password').focus();
    } else {
      // otherwise focus on the username field. She still needs to fill that out.
      this.$('#mb-username').focus();
    }



  },

  loginWaiting: function() {
    var loadingSpan = this.$('div.login span.loading');
    if(this.model.get('loginFormWaiting') === true){
      loadingSpan.removeClass('hid');

    } else {
      loadingSpan.addClass('hid');
    }
  },

  renderErrorMessage: function() {
    var errorSpan = this.$('span.error');
    errorSpan.empty();

    var errorTemplate = _.template($('#mb-login-form-error').html());
    errorSpan.html(errorTemplate(this.model.toJSON()));

    if(this.model.get('loginERRmessage') !== ''){
      // flash red then fade to transparent
      errorSpan.addClass('flash');
      setTimeout(function(){
        errorSpan.removeClass('flash');
      }, 50);
    }

  },

  showSignInForm: function(workoutModel){
    // clean slate:
    this.shader.html('');

    switch(workoutModel.get('classStatus')) {
      case 'available':
        workoutModel.set({
          dialogMessage: 'Join ' + workoutModel.get('ClassDescription')['Name'],
          buttonClass: 'signin-button',
          buttonConfirm: 'Confirm',
          buttonEscape: 'Cancel',
        })
        this.shader.html( this.signinTemplate(workoutModel.toJSON()) );
        break;

      case 'enrolled':
        workoutModel.set({
          dialogMessage: 'Do you wish to cancel your appointment for ' + workoutModel.get('ClassDescription')['Name'] + '?',
          buttonClass: 'cancel-class-button',
          buttonConfirm: 'Yes, cancel ' + workoutModel.get('ClassDescription')['Name'],
          buttonEscape: 'No',
        })
        this.shader.html( this.signinTemplate(workoutModel.toJSON()) );
        break;

    }

    // this.shader.html(this.signinTemplate(workoutModel.toJSON()));
  },

  errClassNotAvailable: function(errMessage){
    // remove sign in button:
    this.$('a.signin-button').addClass('hid');
    // adjust state:
    this.model.set({
      loginERRmessage: errMessage,
      loginFormWaiting: false
    });
  }


});
