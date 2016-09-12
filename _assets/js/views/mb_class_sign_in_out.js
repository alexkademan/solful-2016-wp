// app.mbClassSignInOut
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: $('div.popOverMB'),

  addNewSignIn: function(data) {

    var results = data.AddClientsToClassesResult;
    if(results.Message) {
      // the Message field PROBABLY means that there was an error:

      // drill down to where there IS a message:
      var errorCode = data['AddClientsToClassesResult']['Classes']['Class']['Clients']['Client']['ErrorCode'];
      var errorMessage = data['AddClientsToClassesResult']['Classes']['Class']['Clients']['Client']['Messages']['string'];
      console.log('error code: ' + errorCode);
      console.log(errorMessage);

      var clientMessage = '';

      switch (errorCode) {
        case '601':
          // needs to be paid up before
          clientMessage += 'A problem occured with your account. ';
          clientMessage += 'Please check your <a href="'+ this.model.get('urlMINDBODY') +'" class="MINDBODY-LINK">MINDBODY account</a> ';
          clientMessage += 'for billing information.';
          this.model.set({loginERRmessage: clientMessage});
          app.mbBackGroundShader.removeSignUpButton('Okay');
          break;

        case '602':
          clientMessage = 'This class is no longer available for sign up.';
          this.model.set({loginERRmessage: clientMessage});
          app.mbBackGroundShader.removeSignUpButton('Okay');
          break;

        case '603':
          clientMessage = 'You have already logged into this class!';
          this.model.set({loginERRmessage: clientMessage});
          app.mbBackGroundShader.removeSignUpButton('Okay');
          break;

        default:
          this.model.set({loginERRmessage: errorMessage});
          app.mbBackGroundShader.removeSignUpButton('Okay');

      }


    } else {

      // successful request

      if(data['AddClientsToClassesResult']['Classes']['Class']['ID']) {
        // the client just signed into a single class.
        var newClassID = data['AddClientsToClassesResult']['Classes']['Class']['ID'];
        var wholeSchedule = this.model.get('clientSchedule');

        if(wholeSchedule === false){
          // client hasn't signed up for anything other than this workout:
          wholeSchedule = [newClassID];
        } else {
          wholeSchedule.push(newClassID);
        }
        // send what we've gathered to the model.
        app.mbLogInView.adjustClientSchedule(wholeSchedule);

        // done, so destroy the form:
        this.model.set({popoverVisible: false});
      }
    }
  },

  cancelAppointment: function(data) {
    // came here from an AJAX call after
    // the client cancelled an appointment for a workout.
    var results = data.RemoveClientsFromClassesResult;

    if(results.Message){

      var errorCode = results.ErrorCode;
      var errorMessage = results.Classes.Class.Clients.Client.Messages.string;
      var clientMessage = '';

      console.log('Error Code: ' + errorCode);
      console.log(errorMessage);

      switch (errorCode) {
        case 200:
          clientMessage = 'This is a late cancel (not allowed at this time)';
          this.model.set({loginERRmessage: clientMessage});
          app.mbBackGroundShader.removeSignUpButton('Okay');
          break;
        default:
          this.model.set({loginERRmessage: errorMessage});
          app.mbBackGroundShader.removeSignUpButton('Okay');
      }




    } else if( data.RemoveClientsFromClassesResult.Classes.Class['ID'] ) {
      // we succsessfully removed a class from the schedule. Its id is:
      var removedID = data['RemoveClientsFromClassesResult']['Classes']['Class']['ID'];

      var wholeSchedule = this.model.get('clientSchedule');
      // we know that wholeSchedule is an array with at least one variable, but check anyhow:
      if( wholeSchedule !== false ){
        if(wholeSchedule.length === 1) {
          // there is only one class on the schedule, so re-set the schedule to false:
          app.mbLogInView.adjustClientSchedule(false);

        } else if(wholeSchedule.length > 1) {
          // loop thru the sched and toss out the now cancelled class.
          var newSched = [];

          for(var i=0; i<wholeSchedule.length; i++) {
            if(wholeSchedule[i] !== removedID){
              // each ID that isn't the one we just canned.
              newSched.push(wholeSchedule[i]);

            };
          }

          // Throw to the model:
          app.mbLogInView.adjustClientSchedule(newSched);

        }
        // done, so destroy the form:
        this.model.set({popoverVisible: false});
      }

    }

  },

});
