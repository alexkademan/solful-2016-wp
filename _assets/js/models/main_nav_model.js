// app.mainNavModel

var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    mobileMenu: false,
    shaderFadeOutTime: 400,
    menuHeight: 0, // kinda just another way of saying that the menu is not showing ???
    backgroundScroll: '', // when menu is opened this is where the page had been scrolled to.
    mastheadShowing: 'protected', // 'yes', 'no', or 'protected' (to guard against other actions)
    mastheadOn: true // boolean
  }

});
