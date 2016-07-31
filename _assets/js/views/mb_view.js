// app.mindbodyView

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var DaysCollection = require('./../models/mb_days_collection');
var ClassesCollection = require('./../models/mb_classes_collection');

module.exports = Backbone.View.extend({

  el: '#mb_schedule',

  initialize: function() {
    if(this.$el.length == 1){
      // #mb_sched is within the DOM, so lets go to work:

      var mbURL = this.$('a.url');

      if(mbURL.length > 0 && mbURL[0].href !== undefined && mbURL[0].href !== '') {

        // empty collections for the days and the classes within each day:
        app.mbDays = new DaysCollection();
        // app.mbClasses = new ClassesCollection();

        // we have found the URL for the AJAX calls:
        this.model.set({ 'mbFeedURL': mbURL[0].href });
        this.makeAJAXcall('sched-01.php?startTime=' + Math.round(new Date().getTime()/1000) ); // look with start date defined as right now.

      };

    };
  },

  findWeekDayName: function(unixTime) {

    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = new Date(unixTime);
    return weekday[day.getDay()];

  },

  makeAJAXcall: function( file ) {
    if( file == undefined ){ file = 'sched-01.php'; }

    $.ajax({
      // url: './fb_feed/?postID=IDs',
      url: app.mindbodyModel.get('mbFeedURL') + file,
      dataType: 'json'

    }).done(function( data ) {
      // console.log( data );
      for(var key in data) {

        var rearrangeDate = key.split('-');
        var year = rearrangeDate[0];
        rearrangeDate = rearrangeDate[1] + "/" + rearrangeDate[2] + "/" + rearrangeDate[0];

        var unixTime = new Date(rearrangeDate).getTime();
        var dayOfWeek = app.mindbodyView.findWeekDayName(unixTime);


        app.mbDays.add({
            date: key,
            numericDate: rearrangeDate,
            unixTime: unixTime,
            dayOfWeek: dayOfWeek,
            year: year
        });

        // console.log(app.mbDays.get(key).get('dayOfWeek'));
        // console.log(data[key]);

        for( var appointment in data[key] ) {
          // populate today's collection:
          // console.log(data[key][appointment]);

          app.mbDays.get(key).get('appointments').add(data[key][appointment]);
          // app.mbDays.get(key).appointments.add(data[key][appointment]);

        }

      }
      // console.log( app.mbDays.get('2016-07-31').get('dayOfWeek') );
      console.log( app.mbDays );

    });
  }

});



// var Library = Backbone.Collection.extend({
//   modelId: function(attrs) {
//     return attrs.type + attrs.id;
//   }
// });
//
// var library = new Library([
//   {type: 'dvd', id: 1},
//   {type: 'vhs', id: 1}
// ]);
//
// var dvdId = library.get('dvd1').id;
// var vhsId = library.get('vhs1').id;
// console.log('dvd: ' + dvdId + ', vhs: ' + vhsId);
