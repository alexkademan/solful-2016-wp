// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');


module.exports = Backbone.View.extend({

  tagName: 'li',

  events: {
    "click hgroup.toggle": 'showInfo',
    "click div.trainerName": 'showTrainer'
  },

  initialize: function() {

    this.model.on({'change:toggleInfo': this.toggleInfo}, this);
    this.model.on({'change:toggleInstructor': this.toggleInstructor}, this);
    this.model.on({'change:IsEnrolled': this.adjustStatus}, this);
    this.model.on({'change:IsAvailable': this.adjustStatus}, this);
    this.model.on({'change:IsCanceled': this.adjustStatus}, this);

    // monitor to see if used is signed in for this class.
    app.mindbodyModel.on({'change:clientSchedule': this.checkSignIn}, this);
    app.mindbodyModel.on({'change:currentTime': this.checkAvailable}, this);
  },

  render: function(pageName){
    // a default:
    var appointmentTemplate = _.template($('#mb-appointment-template').html());
    this.$el.html(appointmentTemplate(this.model.toJSON()));
    this.renderClassInfo(pageName);

    return this; // enable chained calls
  },

  // calling this from the "day" view,
  // renders the class info to the DOM.
  renderClassInfo: function(pageName) {
    // new template for almost all of the info:
    if(pageName === 'schedule'){
      var infoTemplate = _.template($('#mb-appointment-nfo').html());
    } else if(pageName === 'trainers') {
      var infoTemplate = _.template($('#mb-trainer-appointment-template').html());
    }

    this.$el.append(infoTemplate(this.model.toJSON()));
    this.toggleInfo(); // info can default to showing.

    // initiate more about the state of this model:
    this.checkSignIn();
    this.adjustStatus();

    return this;
  },

  // when the hgroup is clicked on,
  // the info about the class needs to show:
  showInfo: function() {
    if(this.model.get('toggleInfo') === false){
      this.model.set({toggleInfo: true});
    } else {
      this.model.set({toggleInfo: false});
    }
  },

  // when the hgroup is clicked on,
  // the info about the class needs to show:
  showTrainer: function() {
    if(this.model.get('toggleInstructor') === false){
      this.model.set({toggleInstructor: true});
    } else {
      this.model.set({toggleInstructor: false});
    }
  },

  // show AND hide info...
  toggleInfo: function() {
    if(this.model.get('toggleInfo') === false){
      this.$el.removeClass('showInfo');
    } else {
      this.$el.addClass('showInfo');
    }
  },

  toggleInstructor: function() {
    if(this.model.get('toggleInstructor') === false){
      this.$el.removeClass('showTrainer');
    } else {
      this.$el.addClass('showTrainer');
    }
  },

  checkSignIn: function() {
    // This function checks to see if the client is logged in,
    // and if they are, it finds out if this class is on their
    // schedule of classes that they are signed up for
    var scheduled = app.mindbodyModel.get('clientSchedule');

    if(scheduled === false){
      // NOT Logged In,
      this.model.set({'IsEnrolled': false});

    } else {
      // Logged In:
      // var enrolled is false until proven otherwise:
      var enrolled = false;

      for(x in scheduled) {
        // looping thru the list of scheduled classes:
        if( scheduled[x]['ClassID'] === this.model.get('ID') ){
          // this class is on the list of scheduled classes:
          enrolled = true;
        }
      }

      // now that we've checked all the enrolled classes,
      // we know if this model is one of 'em:
      if( enrolled === true ) {
        this.model.set({'IsEnrolled': true});
      } else {
        this.model.set({'IsEnrolled': false});
      }
    }
  },


  adjustStatus: function() {
    // manage the sign in button,
    // could be cancel class, could be nothing,
    // based on the state of the view.

    var isAvailable = this.model.get('IsAvailable');
    var isCanceled = this.model.get('IsCanceled');
    var isEnrolled = this.model.get('IsEnrolled');
    var lateCancel = this.model.get('lateCancel');

    // manage the state of the button as it appears on screen.
    if(isEnrolled === true){
      // console.log( app.mindbodyModel.get('client')['FirstName'] +  ' is signed up for: ' + this.model.get('ClassDescription')['Name'] + ' (' + this.model.get('ID') + ')');
      this.$el.addClass('enrolled');
    }else if(isEnrolled === false) {
      this.$el.removeClass('enrolled');

    }

    // console.log( this.model.get('ClassDescription')['Name'] );

    // console.log('IsAvailable: ' + isAvailable);
    // console.log('IsCanceled: ' + isCanceled);
    // console.log('IsEnrolled: ' + isEnrolled);
    // console.log('lateCancel: ' + lateCancel);
    // // console.log(this.model);
    // console.log(' ');

    var theButton = '';

    if(isAvailable === true && isEnrolled === true){
      // show CANCEL button
      // console.log( this.model.get('ClassDescription')['Name'] );
      var signUpButton = _.template($('#mb-appointment-cancel').html());
      theButton = signUpButton(this.model.toJSON());

    } else if(isAvailable === true && isEnrolled === false) {

      // show SIGN UP button
      var signUpButton = _.template($('#mb-appointment-signIn').html());
      theButton = signUpButton(this.model.toJSON());

    } else if(isAvailable === false) {
      // class is cancelled, or has already happened
      // console.log('UNAVAILABLE: ' + this.model.get('ClassDescription')['Name']);
    }


    this.$('div.signUp').html(theButton);


  },

  checkAvailable: function(){
    // see if there is more than 60 minutes before the class. Otherwise close availability.
    // if the client is signed up for the class, go to "late cancel" until the class starts.
    var secondsRemaining = this.model.get('unixStartTime') - app.mindbodyModel.get('currentTime');

    if(secondsRemaining > 0){

      // class still hasn't started:
      if(secondsRemaining <= this.model.get('lateCancelTime')){
      // if(secondsRemaining <= 41452){
        // we're within the late cancel timeframe:
        this.model.set({
          lateCancel: true,
          IsAvailable: false
        });
      } else if (this.model.get('IsAvailable') === true){
        // class should be open:
        // var countdownClock = app.findDayInfo.findClockValue(secondsRemaining);
        // this.$('span.countdown').html(countdownClock);
        this.$('span.countdown').html(secondsRemaining);
        // this.$('span.countdown').html(this.model.get('StartDateTime'));
        // this.$('span.countdown').html(app.mindbodyModel.get('currentTime'));
        // this.$('span.countdown').html('UnixTime: ' + this.model.get('unixStartTime'));
      };
    }

  }

});
