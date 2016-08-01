// app.mindbodyView

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var DaysCollection = require('./../models/mb_days_collection');
var DayInfo = require('./mb_days_info');
var DayView = require('./mb_day_view');

module.exports = Backbone.View.extend({

  el: '#mb_schedule',

  initialize: function() {


    if(this.$el.length == 1){
      // single method to suss out the info about the date in question:
      app.findDayInfo = new DayInfo();

      // #mb_sched is within the DOM, so lets go to work:
      var mbURL = this.$('a.url');
      if(mbURL.length > 0 && mbURL[0].href !== undefined && mbURL[0].href !== '') {
        // empty collections for the days and the classes within each day:
        app.mbDays = new DaysCollection();

        // we have found the URL for the AJAX calls:
        this.model.set({ 'mbFeedURL': mbURL[0].href });
        this.makeAJAXcall('sched-01.php?startTime=' + Math.round(new Date().getTime()/1000) ); // look with start date defined as right now.

      };

    };
  },

  makeAJAXcall: function( file ) {
    if( file == undefined ){ file = 'sched-01.php'; }

    $.ajax({
      // url: './fb_feed/?postID=IDs',
      url: app.mindbodyModel.get('mbFeedURL') + file,
      dataType: 'json'

    }).done(function( data ) {
      // we have the info for the calendar, so build out the models,
      // and then display the first of our stuff on the page.
      for(var key in data) {
        // var dayInfo = app.mindbodyView.findDayInfo(key);
        var dayInfo = app.findDayInfo.findDayInfo(key);

        // build out the day:
        app.mbDays.add({ date: key, info: dayInfo });

        for( var appointment in data[key] ) {

          var thisAppointment = data[key][appointment];

          if(thisAppointment['IsCanceled'] === true && thisAppointment['HideCancel'] === true){
            // this class is hidden AND canceled, so skip it
          } else {
            // add each of the workouts to the individual days.
            data[key][appointment] = app.findDayInfo.findClassInfo(data[key][appointment], dayInfo);
            // console.log( workout );
            // console.log( data[key][appointment] );
            app.mbDays.get(key).get('appointments').add(data[key][appointment]);

          }
        }

      }
      app.mbDays.each( app.mindbodyView.eachDay, this );

    });
  },
  /*
  ** assign the model to the view, then render:
  */
  eachDay: function(theDay) {
    var view = new DayView({model: theDay});
    app.mindbodyView.$el.append(view.render().el);
  }

});
