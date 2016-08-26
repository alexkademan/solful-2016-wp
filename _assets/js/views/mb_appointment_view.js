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

    this.checkAvailable();
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

    // set some stuff for the next couple-a-steps:
    this.templateCancel = _.template($('#mb-appointment-cancel').html());
    this.templateSignIn = _.template($('#mb-appointment-signIn').html());

    this.signUpNode = this.$('div.signUp');


    // initiate more about the state of this model:
    this.toggleInfo(); // info can default to showing.
    this.checkSignIn();
    this.adjustStatus();
    this.checkAvailable();

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

    var theButton = ''; // this is whats gonna appear as the button


    if(isCanceled === true) {
      this.$el.removeClass().addClass('canceled');

    } else if(isAvailable === true && isEnrolled === false ) {
      this.$el.removeClass().addClass('available');
      console.log(this.templateSignIn(this.model.toJSON()));
      theButton = this.templateSignIn(this.model.toJSON());

    } else if(isAvailable === false && isEnrolled === false) {
      // has happened, and wasn't there.
      this.$el.removeClass().addClass('unavailable');

    } else if(isAvailable === true && isEnrolled === true && lateCancel === false) {
      // on schedule, not too late to CANCEL:
      this.$el.removeClass().addClass('enrolled');
      theButton = this.templateCancel(this.model.toJSON());


    } else if(isAvailable === false && isEnrolled === true && lateCancel === true) {
      // on schedule, but can still LATE CANCEL:
      this.$el.removeClass().addClass('lateCancel');
      theButton = this.templateCancel(this.model.toJSON());



    } else if(isAvailable === false && isEnrolled === true && lateCancel === false) {
      // has happened, but client WAS THERE.
      this.$el.removeClass().addClass('wasThere');
      theButton = 'was there';

    }

    // render the button we chose just above this.
    this.signUpNode.html(theButton);


  },

  checkAvailable: function(){
    // see if there is more than 60 minutes before the class. Otherwise close availability.
    // if the client is signed up for the class, go to "late cancel" until the class starts.
    var secondsRemaining = this.model.get('unixStartTime') - app.mindbodyModel.get('currentTime');

    if(secondsRemaining >= 0){
      // the class hasn't happened yet:
      // var countdownClock = app.findDayInfo.findClockValue(secondsRemaining);
      // this.$('span.countdown').html(countdownClock);
      this.$('span.countdown').html(secondsRemaining);

      // class still hasn't started:
      // if(secondsRemaining <= this.model.get('lateCancelTime')){
      if(secondsRemaining <= 60300){
        // we're within the late cancel timeframe:
        this.model.set({
          lateCancel: true,
          IsAvailable: false
        });

        // console.log('lateCancel');

      } else {
        // still time before "late cancel"
        // this.model.set({
        //   lateCancel: false
        // });
      }
    } else {
      // its past the time that the class has begun:
      this.model.set({
        IsAvailable: false
      });
    }

  }

});
