// app.findDayInfo
var Backbone = require ('backbone');

module.exports = Backbone.View.extend({
  findDayInfo: function(key) {
    dayInfo = [];

    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var month = new Array(12);
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "September";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";

    var rearrangeDate = key.split('-');
    dayInfo['date'] = key;
    dayInfo['year'] = rearrangeDate[0];
    dayInfo['month'] = parseInt(rearrangeDate[1], 10); // remove leading zero,
    dayInfo['day'] = parseInt(rearrangeDate[2], 10); // remove leading zero,
    dayInfo['fullMonth'] = month[dayInfo['month']];
    dayInfo['numericDate'] = rearrangeDate[1] + "/" + rearrangeDate[2] + "/" + rearrangeDate[0];
    dayInfo['unixTime'] = new Date(dayInfo['numericDate']).getTime();

    var day = new Date(dayInfo['unixTime']);
    dayInfo['dayOfWeek'] = weekday[day.getDay()];

    // console.log(dayInfo);
    return dayInfo;
  },

  findClassInfo: function( workout, dayInfo ) {
    // find information about the start and end of these classes:
    workout['classStart'] = this.parseTimestamp(workout['StartDateTime'], dayInfo);
    workout['classEnd'] = this.parseTimestamp(workout['EndDateTime'], dayInfo);

    // find length in miliseconds, then divide down:
    workout['duration'] = workout['classEnd']['unixTime'] - workout['classStart']['unixTime']
    workout['duration'] = (workout['duration'] / 1000) / 60;

    if(workout['duration'] === 60) {
      workout['durationReadable'] = '1 hour';
    } else {
      workout['durationReadable'] = workout['duration'] + ' minutes';
    }

    return workout;

  },
  parseTimestamp: function( timestamp, dayInfo ) {
    var time = [];

    timestamp = timestamp.split('T');
    timestamp = timestamp[1].split(':');

    time['hour'] = timestamp[0];
    time['minutes'] = timestamp[1];

    var theDate = new Date(dayInfo['year'], dayInfo['month'], dayInfo['day'], time['hour'], time['minutes']);

    if(time['hour'] >= 12) { time['am_pm'] = 'pm'; } else { time['am_pm'] = 'am'; }
    if(time['hour'] > 12 ) { time['hourCivilian'] = time['hour'] - 12 } else {time['hourCivilian'] = parseInt(time['hour'], 10) }

    time['unixTime'] = theDate.getTime();

    return time;
  }
});
