// app.clientInfoView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  events:{
    'click a.logOut': 'logOutUser'
  },

  initialize: function(){
    this.accountInfoTemplate = _.template($('#mb-client-account-info').html());
    this.model.on({'change:clientCountDownR': this.showCountDown}, this);
  },

  renderInfo: function() {
    this.$el.html(this.accountInfoTemplate(this.model.toJSON()));
    return this; // enable chained calls
  },

  logOutUser: function() {
    // this call erases the session, and removes session data from model.
    if(this.model.get('loggedIn') === true){
      app.mindbodyView.makeAJAXcall('login-status.php?leave=true', 'login');
    };
  },

  showCountDown: function() {
    // print Client Countdown 'Readable':
    this.$('span.countdown').html(this.model.get('clientCountDownR'));
  }

});
