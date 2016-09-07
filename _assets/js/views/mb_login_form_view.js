// app.mbLogInForm
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var ClientInfo = require('./mb_client_account_view');

module.exports = Backbone.View.extend({

  el: document.body,

  events: {
    'click div.non-mobile-shader': 'clickScreen',
    'touchend div.non-mobile-shader': 'clickScreen',
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

    this.model.on({'change:loginFormVisible': this.removePopOver}, this);
    this.model.on({'change:loginFormWaiting': this.loginWaiting}, this);
    this.model.on({'change:loginERRmessage': this.renderErrorMessage}, this);
    this.model.on({'change:clientInfoVisible': this.toggleAccountInfo}, this);
  },

  killPopOver: function(e) {
    this.model.set({
      loginFormVisible: false,
      clientInfoVisible: false
    });
  },

  clickScreen: function(e) {
    // remove the login form form the page:
    if(
      e.target.className === 'non-mobile-shader'
      || e.target.className === 'schedButton cancel-button'
    ){
      e.preventDefault();
      // this will turn the pop-over off.
      this.killPopOver();
    };

    if( e.target.className === 'schedButton signin-button' ){
      e.preventDefault();
      this.requestSignIn('join');
    };

    if( e.target.className === 'schedButton cancel-class-button' ){
      // cancel appointment button.
      e.preventDefault();
      this.requestSignIn('cancel');
    };

    // submit the form via AJAX:
    if(e.target.className === 'mb-login-button'){
      // the submit input on the form was used:
      e.preventDefault();
      this.model.set({'loginERRmessage': ''});
      this.checkForm();
    };

    // close button on the form. (x in a circle)
    if(e.target.className === 'fa fa-times fa-lg closeForm'){
      this.killPopOver();
    }
  },

  keyAction: function(e) {
    if(e.keyCode === 27 && this.model.get('loginFormVisible') === true){
      // escape key:
      this.model.set({'loginFormVisible': false});
    };
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

  toggleAccountInfo: function() {
    // the button was pushed to show/hide the users account info (if they're logged in)
    if(this.model.get('clientInfoVisible') === true){
      this.showPopOver('accountInfo');

    } else {
      // remove the account info
    }
  },

  renderBackgroundShader: function() {
    console.log('renderbackgroundshader');
    this.$el.html( this.template() );
    this.formFields = this.$('span.fields');
  },

  removePopOver: function(){
    // hide the login form, if the model says it shouldn't be here:
    if (this.model.get('loginFormVisible') === false ){
      console.log('close the pop-over');

      // remove the content of the pop-over...
      this.formFields.empty();

      // remove the close button:
      this.$('.closeForm').addClass('hid');

      // fade out background:
      this.$('div.non-mobile-shader').addClass('non-mobile-shader-fadeOut');


      // this.$el.empty();
      console.log(this.$el);

      setTimeout(function(){
        // give the shader a half-second to fade away,
        // the eliminate it.
        app.mbLogInForm.removeShader();
      }, 125);

    }
  },

  removeShader: function() {
    this.$el.empty();
  },

  showPopOver: function(formType) {
    // show the shader that will contain the form:
    this.renderBackgroundShader();

    if(formType === 'accountInfo') {
      var clientInfo = new ClientInfo({model: this.model});
      this.formFields.append(clientInfo.renderInfo().el);
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
    this.renderBackgroundShader();

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
    this.formFields.html('');

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
    this.formFields.html(this.loginTemplate(this.model.toJSON()));

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
    this.formFields.html('');

    switch(workoutModel.get('classStatus')) {
      case 'available':
        workoutModel.set({
          dialogMessage: 'Join ' + workoutModel.get('ClassDescription')['Name'],
          buttonClass: 'signin-button',
          buttonConfirm: 'Join!',
          buttonEscape: 'Cancel',
        })
        this.formFields.html( this.signinTemplate(workoutModel.toJSON()) );
        break;

      case 'enrolled':
        workoutModel.set({
          dialogMessage: 'Do you wish to cancel your appointment for ' + workoutModel.get('ClassDescription')['Name'] + '?',
          buttonClass: 'cancel-class-button',
          buttonConfirm: 'Yes, cancel ' + workoutModel.get('ClassDescription')['Name'],
          buttonEscape: 'No',
        })
        this.formFields.html( this.signinTemplate(workoutModel.toJSON()) );
        break;

    }

  },

  errClassNotAvailable: function(errMessage, option){

    if(option === 'removeSignUp'){
      // remove sign in button:
      this.$('a.signin-button').addClass('hid');
      this.$('a.cancel-button').html('Okay');
    }

    if(option === 'removeCancel') {
      // remove cancel class appointment button:
      this.$('a.cancel-class-button').addClass('hid');
      this.$('a.cancel-button').html('Okay');

    }

    // adjust state:
    this.model.set({
      loginERRmessage: errMessage,
      loginFormWaiting: false
    });
  }


});
