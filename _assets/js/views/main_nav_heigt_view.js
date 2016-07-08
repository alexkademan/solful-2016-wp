// app.mainMenuHeight

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: '#site-nav',

  events: {
    'click': 'clickOutsideMenu'
  },

  openUp: function() {
    // keep the masthead from disappearning:
    app.mainNavModel.set({'mastheadShowing': 'protected'});

    // take note of scroll position, and lock the masthead to that spot:
    var backgroundScroll = app.windowStatusView.model.get('vScrollPosition');
    this.model.set({ 'backgroundScroll': backgroundScroll });
    this.model.set({ 'menuHeight': this.$('span').height() });

    var navStyle = '';
        navStyle += 'height: ' + this.model.get('menuHeight') + 'px;';
        navStyle += 'top: ' + 0 + 'px;';

    this.$el.attr('style', navStyle);
    window.scrollTo(0, 0); // make sure that the top of the nav is visible!!!!

    // lock the page ( position:static )
    app.mainNavBackground.lockBackground( backgroundScroll );

  },

  closeDown: function() {
    this.model.set({'menuHeight': 0});
    // Don't bother running this on page load:
    if(this.model.get('backgroundScroll') !== ''){

      // keep the masthead from disappearning:
      app.mainNavModel.set({'mastheadShowing': 'protected'});

      var bgScroll = this.model.get('backgroundScroll');
      var scrollPosition = $(window).scrollTop();
          scrollPosition = bgScroll - scrollPosition;

      app.mainNavBackground.unlockBackground();
      window.scrollTo( 0, this.model.get('backgroundScroll') );

      var navStyle = '';
          navStyle += 'height: ' + 0 + 'px;';
          navStyle += ' margin-top: ' + scrollPosition + 'px';

      this.$el.attr('style', navStyle);

    }
  },

  switchToLarger: function() {
    this.$el.removeAttr('style');
  },

  closeMenu: function() {
    app.mainNav.model.set({'mobileMenu': false})
  },

  clickOutsideMenu: function(e) {
    // this method will fire if the padding at the
    // bottom of the navigation is clicked on.
    if(e.target.className === 'sn'){
      this.closeMenu();
    }
  }

});
