// app.mbLogInView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: '#MB-login',

  events:{
    'click a.logIn': 'logInUser',
    'click a.logOut': 'logOutUser'
  },

  initialize: function() {
    // this function is basically an init.
    // this is necessary to the whole program, because I'm able to
    // more efficiently get the full URL to the program out of
    // WP than I can out of JS. This is just to keep things portable.
    // (but its not the nicest solution...)
    var mbURL = this.$('#mb-login-mbFeedURL')[0].href;
    if( mbURL ){
      // set the needed var for the whole application,
      this.model.set({mbFeedURL: mbURL});
      // then get rolling:
      this.checkSession('login-status.php', 'login');
      // this.renderStatus();
    };
  },

  logOutUser: function() {
    if(this.model.get('loggedIn') === true){
      this.checkSession('login-status.php?leave=true', 'login')
    };
  },

  logInUser: function() {
    console.log('logInUser');
  },

  checkSession: function(file, section) {
    // ask PHP to check and see if we are logged into MINDBODY:
    console.log(app.mindbodyModel.get('mbFeedURL') + file);
    $.ajax({
      url: app.mindbodyModel.get('mbFeedURL') + file,
      dataType: 'json'

    }).done(function( data ) {
      if(data === 'stranger'){
        // NOT logged in whatsoever:
        app.mindbodyModel.set({
          GUID: false,
          client: false,
          loggedIn: false
        });
      } else {
        console.log(data);
        app.mindbodyModel.set({
          GUID: data['GUID'],
          client: data['client'],
          loggedIn: true
        });
      };
      app.mbLogInView.renderStatus();
    });
  },

  renderStatus: function() {
    if(this.model.get('loggedIn') === false){
      // client is NOT logged into MINDBODY:
      console.log(this.model);
      this.renderStranger();
    }else if (this.model.get('loggedIn') === true){
      // client IS logged into MINDBODY:
      this.renderUser();
    };

  },

  renderStranger: function() {
    // console.log(this.model);
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
