// app.mindbodyView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

// var MBCookieHandler = require('./mb_cookie_view');

var DaysCollection = require('./../models/mb_days_collection');
var DayInfo = require('./mb_days_info');
var DayView = require('./mb_day_view');

var TrainersCollection = require('./../models/mb_trainers_collection');
var TrainerView = require('./mb_trainer_view');
// var MergeTrainersSchedule = require('./mb_merge_trainers');

// var LoginModel = require('../models/mb_login_model');
var LoginView = require('./mb_login_view');

module.exports = Backbone.View.extend({

  el: '#mb_app',

  initialize: function() {

    // login for the masthead:
    app.mbLogInView = new LoginView({model: app.mindbodyModel});

    // set time frame:
    // adding my start and stop time to the program.
    // from this I can synch the client's scheduled classes
    // with the classes on the calendar, and time out people's log in time.
    var rightNow = Math.round(new Date().getTime()/1000);
    this.model.set({'pageLoadTime': rightNow}); // save the time this page was executed.
    this.keepTime();

    // monitor the time. Used to log people out when they've been here too long.
    this.model.on({'change:currentTime': this.checkStatus}, this);

    // check to see if the user is already logged in:
    this.makeAJAXcall('login-status.php', 'login');


    if(this.$el.length == 1){
      // helper methods for use later:
      app.findDayInfo = new DayInfo();

      // the slug has been printed to the DOM. like its 2013 or something !@#!@
      var wpSlug = this.$('span.slug');

      // IF we have the MINDBODY URL and the page slug:
      if(
        this.model.get('mbFeedURL') !== false
        && (wpSlug.length > 0 && wpSlug[0].innerHTML !== undefined && wpSlug[0].innerHTML !== '')
      ) {

        // we have found the current page slug:
        this.model.set({ wpSlug: wpSlug[0].innerHTML });


        // gather stuff about trainers page from WP:
        if(this.model.get('wpSlug') === 'trainers'){
          // we're on the trainers page, so I left some JSON data there that I need...
          wpTrainers = JSON.parse(this.$('span.wpTrainers')[0].innerHTML);

          // turn wpTrainers into an array of names:
          var i = 1;
          var availableTrainers = [];
          for (var key in wpTrainers) {
            availableTrainers[i] = key;
            ++i;
          }
          // Thow this to the model so that we have the order of available trainers
          // to be displayed on the trainers page.
          this.model.set({'availableTrainers': availableTrainers});
        }

        // listen for the ajax call to come back to begin the render process:
        this.model.on({'change:requestStatus': this.adjustState}, this);

        if(this.model.get('wpSlug') === 'schedule' || this.model.get('wpSlug') === 'trainers') {

          app.mbDays = new DaysCollection();
          app.mbTrainers = new TrainersCollection();

          // look with start date defined as right now.
          var schedArguments = '';
          schedArguments += '?startTime=' + this.model.get('pageLoadTime');
          schedArguments += '&duration=' + this.model.get('scheduleSpan');
          schedArguments += '&sessionLife=' + this.model.get('loginMaxTime');

          this.makeAJAXcall('sched-02.php' + schedArguments, 'schedule');
          this.makeAJAXcall('trainers-01.php' + schedArguments, 'trainers');

        }
      };
    };
  },

  makeAJAXcall: function( file, section ) {
    if( file == undefined ){ return }
    var thisURL = app.mindbodyModel.get('mbFeedURL') + file;

    console.log(thisURL);

    $.ajax({
      url: thisURL,
      dataType: 'json'

    }).done(function( data ) {
      switch(section) {
        case 'schedule':
          app.mindbodyView.weHaveSchedule(data);
          break;

        case 'trainers':
          app.mindbodyView.weHaveTrainers(data);
          break;

        case 'login':
          app.mbLogInView.logInOut(data);
          break;

        case 'clientSchedule':
          app.mbLogInView.addRegisteredClasses(data);
          break;

      }

      // add an increment, this will call 'this.adjustState'
      app.mindbodyView.model.set({
        requestStatus: app.mindbodyView.model.get('requestStatus') + 1
      });

    });
  },

  keepTime: function(){
    // this updates the site's clock EVERY SECOND !!!!
    var rightNow = Math.round(new Date().getTime()/1000);
    this.model.set({'currentTime': rightNow});

    // run this function once per second to keep time.
    setTimeout( function() { app.mindbodyView.keepTime(); }, 1000);
  },

  checkStatus: function() {
    // runs every second to check if the logged in user needs to be logged out. (they get 50 minutes)
    if( this.model.get('loggedIn') === true ){
      var currentTime = Number(this.model.get('currentTime'));
      var loginTime = Number(this.model.get('loginTime'));
      var loginMaxTime = Number(this.model.get('loginMaxTime'));

      if(currentTime >= (loginTime + loginMaxTime)){
        app.mbLogInView.logOutUser();
      } else {

        // console.log('currentTime: ' + currentTime);
        // console.log('loginTime: ' + loginTime);
        // console.log('loginMaxTime: ' + loginMaxTime);
        // console.log(' ');

        var secondsToLogout = (loginTime +loginMaxTime) - currentTime;
        app.mbLogInView.showCountDown(secondsToLogout);
      }
    };
  },

  weHaveTrainers: function(data) {
    for(var key in data) {

      if(data[key]['ID'] > 1){
        // negative IDs aren't useful to me, and '1' is something named STAFF STAFF
        app.mbTrainers.add(data[key]);
      }
    }
    // add increment to the main model so we know theres a big state change coming:
    this.model.set({ trainersLoaded: true });

  },

  weHaveSchedule: function(data) {
    for(var key in data) {
      // var dayInfo = app.mindbodyView.findDayInfo(key);
      var dayInfo = app.findDayInfo.findDayInfo(key);

      // build out the day:
      app.mbDays.add({ date: key, info: dayInfo });

      for( var appointment in data[key] ) {

        if(data[key][appointment]['IsCanceled'] === true && data[key][appointment]['HideCancel'] === true){
          // this class is hidden AND canceled, so skip it
        } else {
          // add each of the workouts to the individual days.
          data[key][appointment] = app.findDayInfo.findClassInfo(
            data[key][appointment], dayInfo, app.mindbodyModel.get('signupURLbase'), app.mindbodyModel.get('studioID')
          );

          app.mbDays.get(key).get('appointments').add(data[key][appointment]);
        }
      }
    }

    this.model.set({ schedLoaded: true });
  },

  blendModels: function() {
    // // co-mingle the 2 collections, (app.mbDays and app.mbTrainers)
    // and tally all the workouts by trainer, and by day.
    // // every day:
    app.mbDays.each(function(day){
      var trainerInfo = [];

      app.mbTrainers.each(function(trainer) {
        trainerInfo[trainer.get('Name')] = 0;
      });

      // every workout:
      day.get('appointments').each(function(workout){
        if(workout.get('IsAvailable') === true){

          // add to an array for the day.
          trainerInfo[workout.get('Staff')['Name']]++;

          // keep running tally of all available workouts (cancelled won't make it in here)
          app.mindbodyModel.set({ totalWorkouts: app.mindbodyModel.get('totalWorkouts') + 1 });

          // add increment to individual trainer in trainers collection:
          var trainerName = workout.get('Staff')['Name'];
          app.mbTrainers.get(trainerName).set({
            workoutCount: app.mbTrainers.get(trainerName).get('workoutCount') + 1
          });

          // add to the day's model. today's total.
          app.mbDays.get(day.get('date')).set({
            totalWorkouts: app.mbDays.get(day.get('date')).get('totalWorkouts') + 1
          });
        }
      });

      // copy the array of trainer class counts to the day's model.
      app.mbDays.get(day.get('date')).set({
        scheduledTrainers: trainerInfo
      });
    });

  },

  adjustState: function() {
    // checks that we have everything we need, then renders the page:
    if(
      this.model.get('schedLoaded') === true
      && this.model.get('trainersLoaded') === true
      && this.model.get('mainColRendered') === false
    ){
      this.blendModels();
      this.renderMainColumn();
      this.model.set({ mainColRendered: true });
    };
  },

  // ************************
  // handle how the main column gets rendered:
  // ************************
  renderMainColumn: function() {
    // clean slate:
    this.$el.empty();

    if(this.model.get('wpSlug') === 'schedule'){
      // render the schedule page:
      app.mbDays.each(function(day){
        var today = new DayView({model: day});
        app.mindbodyView.$el.append(today.renderDay('all', 'schedule').el);
      });

    } else if (this.model.get('wpSlug') === 'trainers'){
      // render the trainers page:
      if(this.model.get('availableTrainers') !== ''){
        // Render the trainers that are in MINDBODY, but
        // also have a place made for thim via WordPress.
        var availableTrainers = this.model.get('availableTrainers');
        // loop thru available trainers, and match them with the
        // MINDBODY trainer, and if there is a match, render to the page:
        for(i=1; i<availableTrainers.length; ++i) {
          app.mbTrainers.each(function(trainer){
            if(availableTrainers[i] === trainer.get('Name')){
              app.mindbodyView.renderAnotherTrainer(trainer);
              return;
            }
          });
        }

      } else {
        // render ALL trainers from MINDBODY,
        // because we don't have the list from WordPress
        app.mbTrainers.each(function(trainer){
          app.mindbodyView.renderAnotherTrainer(trainer);
        });
      }
    }

  },

  renderAnotherTrainer: function(trainer) {
    var trainer = new TrainerView({model: trainer});
    this.$el.append(trainer.renderTrainer().el);

    if( trainer.model.get('workoutCount') > 0 ){
      // this trainer has classes this week:
      var trainerName =  trainer.model.get('Name');

      app.mbDays.each(function(day){
        var classCount =  day.get('scheduledTrainers')[trainerName];
        if(classCount > 0) {
          // today this trainer has at least one class:
          var today = day.get('date');
          // show this day. Because there are workouts with the trainer in question.
          var todayView = new DayView({model: app.mbDays.get( today )});
          trainer.$('ul.workouts').append( todayView.renderDay(trainerName, 'trainers').el );

        }
      });
    };

  }

});
