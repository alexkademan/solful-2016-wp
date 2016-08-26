var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    toggleInfo: false,
    toggleInstructor: false,
    unixStartTime: '',
    lateCancel: false, // if less than an hour before the class, late cancel is an option.
    lateCancelTime: 3600, // can't sign up for class within 3600 seconds (1 hour) of start of class
    classStatus: 0 // this number means different things. See mb_appointment_view.js - adjustStatus()
  }

});
