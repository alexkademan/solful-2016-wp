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
    this.model.on({'change:classStatus': this.adjustStatus}, this);

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
    console.log('adjustStatus');
    var theButton = '';

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
    // this.$('span.countdown').html(secondsRemaining);

    if(this.model.get('IsCanceled') === true ){
      if(this.model.get('classStatus') !== 'canceled'){
        this.model.set({'classStatus': 'canceled'});
      }

    } else if(secondsRemaining >= this.model.get('lateCancelTime')) {
      // more than an hour before class starts
      if(this.model.get('IsEnrolled') === false){
        if(this.model.get('classStatus') !== 'available'){
          this.model.set({'classStatus': 'available'});
        }

      } else if(this.model.get('IsEnrolled') === true){
        if(this.model.get('classStatus') !== 'enrolled'){
          this.model.set({'classStatus': 'enrolled'});
        }

      }

    } else if(secondsRemaining < this.model.get('lateCancelTime')) {
      // we're within the late cancel time:
      if(this.model.get('IsEnrolled') === false){
        if(this.model.get('classStatus') !== 'missed'){
          this.model.set({'classStatus': 'missed'});
        }

      } else if(this.model.get('IsEnrolled') === true){
        if(this.model.get('classStatus') !== 'lateCancel'){
          this.model.set({'classStatus': 'lateCancel'});
        }

      }

    } else if(secondsRemaining <= 0){
      // class has already begun:
      if(this.model.get('IsEnrolled') === true){
        if(this.model.get('classStatus') !== 'completed'){
          this.model.set({'classStatus': 'completed'});
        }

      }
    }

  }

});
