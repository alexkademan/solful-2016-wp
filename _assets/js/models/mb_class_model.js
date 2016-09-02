var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    toggleInfo: false,
    toggleInstructor: false,
    unixStartTime: '',

    signInDeadline: 3600, // can't sign in any more if there is less than one hour before class.
    // signInDeadline: 4500, // for testing...

    lateCancel: false, // if less than TWO HOURS before the class, late cancel is an option.
    lateCancelTime: 7200, // can't sign up for class within 7200 seconds (2 hour) of start of class
    // lateCancelTime: 60, // for testing...
    // lateCancelTime: 89500, // for testing...

    classStatus: '' // canceled, available, enrolled, latecancel, completed
  }

});
