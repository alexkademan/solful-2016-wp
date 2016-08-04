// app.mindbodyView
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var DaysCollection = require('./../models/mb_days_collection');
var DayInfo = require('./mb_days_info');
var DayView = require('./mb_day_view');

var TrainersCollection = require('./../models/mb_trainers_collection');
var TrainerView = require('./mb_trainer_view');

module.exports = Backbone.View.extend({

  el: '#mb_schedule',

  initialize: function() {

    if(this.$el.length == 1){
      // single method to suss out the info about the date in question:
      app.findDayInfo = new DayInfo();

      // #mb_sched is within the DOM, so lets go to work:
      var mbURL = this.$('a.url');
      if(mbURL.length > 0 && mbURL[0].href !== undefined && mbURL[0].href !== '') {

        // listen for the ajax call to come back to begin the render process:
        this.model.on('change:requestStatus', this.adjustState);
        // this.model.on('change:schedLoaded', this.renderSchedule);

        // empty collections for the days and the classes within each day:
        app.mbDays = new DaysCollection();
        app.mbTrainers = new TrainersCollection();

        // we have found the URL for the AJAX calls:
        this.model.set({ 'mbFeedURL': mbURL[0].href });
        // look with start date defined as right now.
        this.makeAJAXcall('sched-01.php?startTime=' + Math.round(new Date().getTime()/1000), 'schedule');
        this.makeAJAXcall('trainers-01.php', 'trainers');

        // 86400 seconds in a day
        // this.makeAJAXcall('sched-01.php?startTime=' + ((Math.round(new Date().getTime()/1000)) - 86400) );

      };

    };
  },

  makeAJAXcall: function( file, section ) {
    if( file == undefined ){ file = 'sched-01.php'; }
    // console.log(app.mindbodyModel.get('mbFeedURL') + file);
    $.ajax({
      url: app.mindbodyModel.get('mbFeedURL') + file,
      dataType: 'json'

    }).done(function( data ) {
      // console.log(section);

      if(section === 'schedule'){
        // we have the info for the schedule, so build out the models
        app.mindbodyView.weHaveSchedule(data);
      } else if (section === 'trainers') {
        app.mindbodyView.weHaveTrainers(data);
      }

      // add an increment, this will call 'this.adjustState'
      app.mindbodyView.model.set({
        requestStatus: app.mindbodyView.model.get('requestStatus') + 1
      });

    });
  },

  weHaveTrainers: function(data) {
    for(var key in data) {

      if(data[key]['ID'] > 1){
        // negative IDs aren't useful to me, and '1' is something named STAFF STAFF
        app.mbTrainers.add(data[key]);
      }
    }
    // add increment to the main model so we know theres a big state change coming:
    app.mindbodyView.model.set({ trainersLoaded: true });

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

    app.mindbodyView.model.set({ schedLoaded: true });
  },

  adjustState: function() {

    if( app.mindbodyModel.get('schedLoaded') === true && app.mindbodyModel.get('schedRendered') === false ){
      // render the sched as soon as we've got it. Don't wait for trainers info.
      app.mindbodyView.renderSchedule();
      app.mindbodyModel.get({'schedRendered': true})
    }

    if( app.mindbodyModel.get('schedLoaded') === true && app.mindbodyModel.get('trainersLoaded') === true ){
      // co-mingle the 2 collections, (app.mbDays and app.mbTrainers)
      app.mindbodyView.blendModels();
    };
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
        // console.log(workout.get('Staff')['Name']);
      });

      // copy the array of trainer class counts to the day's model.
      app.mbDays.get(day.get('date')).set({
        scheduledTrainers: trainerInfo
      });
    });

  },

  // ************************
  // handle how the schedule gets rendered:
  // ************************
  renderSchedule: function() {
    // first clear out the spot:
    app.mindbodyView.$el.empty();

    app.mbDays.each(function(day){
      var today = new DayView({model: day});
      app.mindbodyView.$el.append(today.render().el);
    });
  }

});
