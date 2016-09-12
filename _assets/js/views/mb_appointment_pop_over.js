// app.mbAppointmentPopOver
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: 'div',

  events: {
    // 'click a.signin-button': 'workoutSignUp'
  },

  initialize: function(){
    this.template = _.template($('#mb-sign-in-fields').html());
  },

  render: function(workoutModel) {
    // storing this info here so it can be accessed by the buttons...
    this.workoutModel = workoutModel;

    switch(workoutModel.get('classStatus')) {
      case 'available':
        workoutModel.set({
          dialogMessage: 'Join ' + workoutModel.get('ClassDescription')['Name'],
          buttonClass: 'signin-button',
          buttonConfirm: 'Join!',
          buttonEscape: 'Cancel',
        })
        return this.template(workoutModel.toJSON());
        break;

      case 'enrolled':
        workoutModel.set({
          dialogMessage: 'Do you wish to cancel your appointment for ' + workoutModel.get('ClassDescription')['Name'] + '?',
          buttonClass: 'cancel-class-button',
          buttonConfirm: 'Yes, cancel ' + workoutModel.get('ClassDescription')['Name'],
          buttonEscape: 'No',
        })
        return this.template(workoutModel.toJSON());
        break;
    }

  },

  // workoutSignUp: function(e) {
  //   // the join class button was used:
  //   console.log('this stuff here .....');
  //   this.requestSignIn('join');
  // },

  requestSignIn: function(joinOrCancel) {
    // someone pushed the "confirm" button to sign up for a class
    var clientID = this.model.get('client')['ID'];
    var classID = this.workoutModel.get('ID');

    var args = '?clientID=' + clientID + '&classID=' + classID;
    // console.log('class-sign-up-01.php' + args);
    // console.log(this.workoutModel.get('ClassDescription').Name);

    if(joinOrCancel === 'join'){
      // sign the client into the class
      app.mindbodyView.makeAJAXcall('class-sign-up-01.php' + args, 'signup');

    } else if (joinOrCancel === 'cancel') {
      console.log('cancelClass !!!');
      // sign the client out of the class
      args += '&cancel=true';
      app.mindbodyView.makeAJAXcall('class-sign-up-01.php' + args, 'cancelClass');

    }

    this.model.set({'loginFormWaiting': true});
  }


});
