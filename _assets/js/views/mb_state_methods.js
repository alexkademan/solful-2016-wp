// app.mbMethods
var Backbone = require ('backbone');

module.exports = Backbone.View.extend({

  // this opens a web page in it's own window:
  launchMINDBODY: function(theLink) {

    //window height and width
    var myWidth = 1050;
    var myHeight = screen.height*.80;
    if( myWidth > screen.width ) { myWidth = screen.width; } // keep it from being wider than the user's screen

    //widow height bounds
    if ( myHeight < 550 ) {
      myHeight = 550;
    } else if (myHeight>900) {
      myHeight = 900;
    }

    //get screen size, and caculate center screen positioning
    var height = screen.height;
    var width = screen.width;
    var leftpos = width / 2 - myWidth / 2;
    var toppos = (height / 2 - myHeight / 2) - 40;

     //open window
     msgWindow=window.open(theLink,"ws_window","toolbar=no,location=no,directories=no,resizable=yes,menubar=no,scrollbars=no,status=yes,width=" + myWidth + ",height="+ myHeight + ", left=" + leftpos + ",top=" + toppos);

     //focus window
     setTimeout('msgWindow.focus()',1);
  },

  mbGetCookieArray: function(cookies){
    // this method accepts ALL cookie data and splits everything
    // into an array.
    var allCookies = cookies.split(';');
    var theCookieArray = [];

    for(var i=0; i<allCookies.length; i++) {

      var thisOne = allCookies[i].split('=');
      // remove whitespace from key:
      var keyName = thisOne[0].replace(/^[ ]+|[ ]+$/g,'');
      // remove key from array
      thisOne.splice(0, 1);

      theCookieArray[keyName] = thisOne.join();

    }

    return theCookieArray;
  },

  readableTime: function(unixTime) {

    // convert unix time to readable time for checking various variables in the workout schedule:




    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unixTime*1000);
    // return date;

    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(unixTime);
    // console.log(formattedTime);
    return formattedTime;

  }

});
