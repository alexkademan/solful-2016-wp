// app.mindbodyView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var MindBodyButton = require('./mindbody_button');
var MindBodyButtonFooter = require('./mindbody_button_footer');

var DaysCollection = require('./../models/mb_days_collection');
var DayInfo = require('./mb_days_info');
var DayView = require('./mb_day_view');

var MBMethods = require('./mb_state_methods');

var TrainersCollection = require('./../models/mb_trainers_collection');
var TrainerView = require('./mb_trainer_view');

var LoginView = require('./mb_login_view');
var LoginForm = require('./mb_login_form_view');
var SignUpForm = require('./mb_sign_up_view');

var BackgroundShader = require('./mb_shader_view');
var PageBackground = require('./mb_page_bg_adjust');
var MindBodyControls = require('./mb_overall_Control');


var ClassSignInOut = require('./mb_class_sign_in_out');

module.exports = Backbone.View.extend({

  el: '#mb_app',

  initialize: function() {

    // login for the masthead:
    app.mbLogInView = new LoginView({model: this.model});
    // app.mbLogInForm = new LoginForm({model: this.model});
    app.mbSignUpForm = new SignUpForm({model: this.model});
    app.mbClassSignInOut = new ClassSignInOut({model: this.model}); // catch AJAX calls to join or cancel workouts
    app.mbBackGroundShader = new BackgroundShader({model: this.model});
    app.mbBgAdjust = new PageBackground({model: this.model});
    app.mbOverallControl = new MindBodyControls({model: this.model});

    // helper methods for use later:
    app.findDayInfo = new DayInfo();
    app.mbMethods = new MBMethods();

    app.mindBodyButton = new MindBodyButton({model: this.model}); // header banner button for front page
    app.mindBodyButtonFooter = new MindBodyButtonFooter({model: this.model}); // link to MB from footer

    // save the time this page was executed.
    this.model.set({'pageLoadTime': Math.round(new Date().getTime()/1000)});

    // monitor the time. Used to log people out when they've been here too long.
    this.model.on({'change:currentTime': this.checkStatus}, this);
    this.model.on({'change:loggedIn': this.setBaseURL}, this);

    // listen for the ajax call to come back to begin the render process:
    this.model.on({'change:requestStatus': this.adjustState}, this);

    // start some basic features:
    this.setBaseURL();
    this.keepTime();

    if(this.$el.length == 1){

      // check to see if the user is already logged in:
      // this is just looking at the SESSION stored on the server.
      // switch this to cookie????
      app.mbLogInView.checkLoginStatus();

      this.makeAJAXcall('login-status.php', 'login');


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
    if( file === undefined ){ return };

    var thisURL = this.model.get('mbFeedURL') + file;
    var that = this;


    ( this.model.get('mbFeedUseSSL') ?
      console.log(this.model.get('mbFeedURL')) :
      console.log(thisURL)
    );

    $.getJSON(thisURL,function(data){
      that.ajaxDone(data, section);
    });

  },

  ajaxDone: function(data, section) {

    switch(section) {
      case 'schedule':
        this.weHaveSchedule(data);
        break;

      case 'trainers':
        this.weHaveTrainers(data);
        break;

      case 'login':
        app.mbLogInView.logInOut(data);
        break;

      case 'clientSchedule':
        app.mbLogInView.addRegisteredClasses(data['GetClientScheduleResult']['Visits']['Visit']);
        break;

      case 'signup':
        // signed up for a class(?)
        app.mbClassSignInOut.addNewSignIn(data);
        break;

      case 'cancelClass':
        // trying to cancel a class:
        app.mbClassSignInOut.cancelAppointment(data);
        break;
    }

    // add an increment, this will call 'this.adjustState'
    app.mindbodyView.model.set({
      requestStatus: app.mindbodyView.model.get('requestStatus') + 1
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
      // variables
      var currentTime = Number(this.model.get('currentTime'));
      var loginTime = Number(this.model.get('loginTime'));
      var loginMaxTime = Number(this.model.get('loginMaxTime'));

      if(currentTime >= (loginTime + loginMaxTime)){
        // user login is expired:
        app.mbLogInView.logOutUser();
      } else {
        // login isn't expired:
        var secondsToLogout = (loginTime +loginMaxTime) - currentTime;

        // record the countdown to the model
        this.model.set({
          clientCountDown: secondsToLogout,
          clientCountDownR: app.findDayInfo.findClockValue(secondsToLogout)
        });

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
    // co-mingle the 2 collections, (app.mbDays and app.mbTrainers)
    // and tally all the workouts by trainer, and by day.
    // every day:
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

  },

  setBaseURL: function(){
    // sets a base URL for linking to MINDBODY's service at any time.

    var baseMBlink = this.model.get('signupURLbase');
    var studioID = this.model.get('studioID');

    var args = '?studioid=' + studioID;

    if(this.model.get('loggedIn') === true && this.model.get('GUID') !== false){
      args += '&guid=' + this.model.get('GUID');
    }

    this.model.set({'urlMINDBODY': baseMBlink + args});
  },


});
