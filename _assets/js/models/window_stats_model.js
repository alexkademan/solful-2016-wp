// app.windowStatus

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.Model.extend({
  defaults: {

    palmWidth : 720, // mimicking the css breakpoints
    palmSize : false, // true if phone sized screen, will set immediately on page load

    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    documentWidth: $(document).width(),
    documentHeight: $(document).height(),
    vScrollPosition: $(document).scrollTop(),

    vScrollLastPosition: 0,
    vScrollDirection: '', // page scrolled 'up' or 'down'.

    fbFeedReady: false,
    fbFeed: '',
    devMode: false
  }
});
