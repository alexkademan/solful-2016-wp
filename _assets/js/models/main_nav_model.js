// app.mainNavModel

var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    mobileMenu: false,
    shaderFadeOutTime: 400,
    menuHeight: 0, // kinda just another way of saying that the menu is not showing ???
    backgroundScroll: '', // when menu is opened this is where the page had been scrolled to.
    mastheadShowing: 'protected', // 'yes', 'no', or 'protected' (to guard against other actions)
    pageTop: true, // when the page is scrolled all the way up there won't be a class to the body to alter the masthead.
    pageTopRunway: true, // keep the large menu showing for a few pixels worth of scrolling.
    pageTopRunwayValue: 300, // keep the large menu showing for a few pixels worth of scrolling.
    mastheadOn: true // boolean
  }

});
