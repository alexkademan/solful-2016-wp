// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');


module.exports = Backbone.View.extend({

  tagName: 'li',

  events: {
    "click hgroup.toggle": 'showInfo',
    "click div.trainerName": 'showTrainer',
    "click div.signUp": 'signUpButton'
  },

  initialize: function() {

    this.checkAvailable();
    // buttons:
    this.model.on({'change:toggleInfo': this.toggleInfo}, this);
    this.model.on({'change:toggleInstructor': this.toggleInstructor}, this);

    // appointment status
    this.model.on({'change:classStatus': this.adjustStatus}, this);
    this.model.on({'change:IsEnrolled': this.checkAvailable}, this);

    // monitor to see if used is signed in for this class.
    // app.mindbodyModel.on({'change:clientSchedule': this.checkSignIn}, this);
    app.mindbodyModel.on({'change:clientSchedCount': this.checkSignIn}, this);
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

    // console.log('checkSignIn');

    // This function checks to see if the client is logged in,
    // and if they are, it finds out if this class is on their
    // schedule of classes that they are signed up for
    var scheduled = app.mindbodyModel.get('clientSchedule');

    if(scheduled === false){
      // console.log('turn them off');
      // NOT Logged In,
      this.model.set({'IsEnrolled': false});

    } else {
      // Logged In:
      // var enrolled is false until proven otherwise:
      var enrolled = false;

      // scheduled is an array of class IDs that the client is
      // signed up for. Check to see if this appointment is one of 'em
      for(var i=0; i<scheduled.length; i++) {
        if(scheduled[i] === this.model.get('ID')){
          enrolled = true;
        };
      }

      // now that we've checked all the enrolled classes,
      // we know if this model is one of 'em:
      this.model.set({'IsEnrolled': enrolled});
    }

  },


  adjustStatus: function() {
    // console.log('adjustStatus');
    var theButton = ''; // empty unless we decide otherwise in the next step...

    switch (this.model.get('classStatus')) {
      case 'canceled':
        this.$el.removeClass().addClass('canceled');
        break;

      case 'available':
        this.$el.removeClass().addClass('available');
        theButton = this.templateSignIn(this.model.toJSON());
        break;

      case 'enrolled':
        this.$el.removeClass().addClass('enrolled');
        theButton = this.templateCancel(this.model.toJSON());
        break;

      case 'lateCancel':
        this.$el.removeClass().addClass('lateCancel');
        theButton = this.templateCancel(this.model.toJSON());
        break;

      case 'missed':
        this.$el.removeClass().addClass('missed');
        break;

      case 'completed':
        this.$el.removeClass().addClass('completed');
        theButton = this.templateCancel(this.model.toJSON());
        break;

    }
    this.signUpNode.html(theButton);
  },

  checkAvailable: function(){

    // ------ (greater than zero)
    // available
    // enrolled
    // lateCancel
    // ------ (less than zero)
    // missed <--not on sched, and is in less than an hour, or hasn't happened.
    // completed <--client was there, but its over.
    // ------ (both)
    // canceled

    var secondsRemaining = this.model.get('unixStartTime') - app.mindbodyModel.get('currentTime');

    // the site was cancelled by administrator:
    if(this.model.get('IsCanceled') === true ){
      this.model.set({'classStatus': 'canceled'});

    } else if(this.model.get('IsEnrolled') === true) {
      if(secondsRemaining > this.model.get('lateCancelTime')) {
        this.model.set({'classStatus': 'enrolled'});


      } else if(secondsRemaining <= this.model.get('lateCancelTime') &&this.model.get('IsEnrolled') === true){
        if(secondsRemaining > 0){
          // late cancel window:
          this.model.set({'classStatus': 'lateCancel'});
        } else {
          // class has already begun:
          this.model.set({'classStatus': 'completed'});
        }
      }



    } else if(this.model.get('IsEnrolled') === false ){
      if(secondsRemaining > this.model.get('signInDeadline')) {

        if(this.model.get('IsWaitlistAvailable') === true) {
          console.log(this.model.get('ClassDescription')['Name'] + ' is wait list only. Fully booked');
          this.$('h3').html( '*********** WAITING LIST ONLY. ***********' );
        } else {
          this.model.set({'classStatus': 'available'});
        }

      } else {
        this.model.set({'classStatus': 'missed'});
      }
    }

    // overwrite the scheduled time with the current status: (for testing)
    // this.$('h3').html( secondsRemaining );
    // this.$('h3').html( this.model.get('classStatus') );
    // this.$('h3').html( this.model.get('ID') );

  },

  signUpButton: function(e) {
    // console.log(e);
    // sign up button was clicked on:
    e.preventDefault();

    if(
      this.model.get('classStatus') !== 'completed'
      && this.model.get('classStatus') !== 'missed'
    ) {
      // the class is stil available.
      app.mbLogInForm.showForm(this.model);
    }

  }

});
