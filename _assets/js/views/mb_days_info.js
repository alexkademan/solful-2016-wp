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
  }
});
