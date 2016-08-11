// app.mbLogInForm
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  // el: 'html',
  el: document.body,

  events: {
    'click div.non-mobile-shader': 'clickScreen'
  },

  initialize: function(){
    var node = document.createElement('div');
    node.className = 'loginForm';
    document.body.appendChild(node);

    this.$el = $(node); // cache for ... THE FUTURE!!!
    this.template = _.template($('#mb-login-form').html());

    // this.model.on('change:loginFormVisible', this.loginToggle);
  },

  loginToggle: function(){
    if(app.mindbodyModel.get('loginFormVisible') === true){
      app.mbLogInForm.showForm();
    } else if (app.mindbodyModel.get('lgoinFormVisible') === false ){
      app.mbLogInForm.$el.empty();
    }
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
      this.checkForm();
    }
  },

  checkForm: function(){
    // console.log('checking form...');
    var username = this.$('#mb-username').val();
    var password = this.$('#mb-password').val();

    var argString = '?un=' + username + '&pw=' + password;

    app.mindbodyView.makeAJAXcall('login-03.php' + argString, 'login');

  },

  showForm: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$('#mb-username').focus();
  }

});
