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

    this.model.on({'change:loginFormVisible': this.loginToggle}, this);
    this.model.on({'change:loginFormWaiting': this.loginWaiting}, this);
    this.model.on({'change:loginERRmessage': this.renderErrorMessage}, this);
  },

  loginToggle: function(){
    // show/hide the login form.
    if(this.model.get('loginFormVisible') === true){
      this.showForm();
    } else if (this.model.get('loginFormVisible') === false ){
      this.$el.empty();
    }
  },
  keyAction: function(e) {
    if(e.keyCode === 27 && this.model.get('loginFormVisible') === true){
      // escape key:
      this.model.set({'loginFormVisible': false});
    };
  },

  clickScreen: function(e) {

    // remove the login form form the page:
    if(e.target.className === 'non-mobile-shader'){
      app.mindbodyModel.set({'lgoinFormVisible': false});
      this.model.set({'loginFormVisible': false});
    };

    // submit the form via AJAX:
    if(e.target.className === 'mb-login-button'){
      // the submit input on the form was used:
      e.preventDefault();
      this.model.set({'loginERRmessage': ''});
      this.checkForm();
    }
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

  showForm: function() {

    // if the user has a cached USER NAME, then add it to the form so they
    // won't have to type it out again.
    var cookieArray = app.mbMethods.mbGetCookieArray( document.cookie );
    if(cookieArray['mb-client-username']){
      // add cached username to the model:
      this.model.set({'cachedUserName': cookieArray['mb-client-username']});
    }

    // show the form:
    this.$el.html(this.template(this.model.toJSON()));

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
      // console.log('loginWaiting');
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

  }

});
