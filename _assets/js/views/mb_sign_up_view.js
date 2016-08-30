// app.mbSignUpForm
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  initialize: function() {
    this.template = _.template($('#mb-login-form').html());
  },


  showSignIn: function(workoutModel) {
    // this can't be false if you want the form to be displayed:
    this.model.set({loginFormVisible: true});
  }

});
