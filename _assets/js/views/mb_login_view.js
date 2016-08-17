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
    if(this.model.get('loggedIn') === true){
      app.mindbodyView.makeAJAXcall('login-status.php?leave=true', 'login');
    };
  },

  logInUser: function() {
    this.model.set({loginFormVisible: true});
  },

  logInOut: function(data){

    if(data === 'stranger'){
      // user not logged in and hasn't tried.
      app.mindbodyModel.set({
        GUID: false,
        client: false,
        loggedIn: false
      });
    } else if(data['GUID']) {
      // the user JUST got her login credentials.
      app.mindbodyModel.set({
        GUID: data['GUID'],
        client: data['client'],
        loggedIn: true,
        loginFormWaiting: false,
        loginFormVisible: false
      });

      // now that we're logged in, get info about the client:
      console.log(this.model);

    } else if(data['ValidateLoginResult']){
      // we caught an error message.
      app.mindbodyModel.set({
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
  }

});
