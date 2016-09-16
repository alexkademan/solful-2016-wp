// app.mainNavMasthead

var Backbone = require ('backbone');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  // el: '#mh-stripe',
  el: '#mastheadLogin', // login is currently the only element that stays the height of the masthead in all size'd windows.

  initialize: function() {
    // console.log('mainNavMasthead');
    app.windowStatus.on({'change:vScrollPosition': this.manageMasthead}, this);
    this.model.on({'change:mastheadOn': this.showHideMasthead}, this);
    this.model.on({'change:pageTopRunway': this.showHideMasthead}, this);
    this.model.on({'change:pageTop': this.pageTopOrNot}, this);
  },

  checkOnHeight: function() {
    return this.$el.height();
  },

  manageMasthead: function() {
    // call the whole thing off if the mobileMenu is open:
    if(this.model.get('mobileMenu') === false){
      app.mainNavMasthead.checkStatus();
    }

  },

  checkStatus: function() {

    var mastheadTotalHeight = this.$el.height();
    var vScrollPosition = app.windowStatus.get('vScrollPosition');

    if( (mastheadTotalHeight * 0.75) >= vScrollPosition ){
      // we're scrolled down less than 3/4 the height of the masthead:
      this.model.set({
        mastheadShowing: 'protected', // this will immediately be changed to "yes"
        pageTop: true
      });

    } else {
      this.model.set({ pageTop: false });
    }

    if(vScrollPosition <= this.model.get('pageTopRunwayValue')) {
      //we're above the top runway, so keep the menu showing.
      this.model.set({pageTopRunway: true});

    } else {

      if(this.model.get('mastheadShowing') !== 'protected'){
        // we are below the runway but not protected (page load time)
        this.model.set({pageTopRunway: false});
      }
    }



    if(
      this.model.get('mastheadShowing') === 'protected'
      ||
      ( app.windowStatus.get('vScrollDirection') === 'up'
      && this.model.get('mastheadShowing') === 'no' )
    ) {
        // we're moving up, or we're overridden.
        this.model.set({ 'mastheadShowing': 'yes' });
        if(this.model.get('mastheadOn') !== true ) {
          this.model.set({ 'mastheadOn': true });
        }

    } else if (
      app.windowStatus.get('vScrollDirection') === 'down'
      && this.model.get('mastheadShowing') === 'yes'
    ) {
        // moving down, so hide the masthead.
        this.model.set({ 'mastheadShowing': 'no' });
        if(this.model.get('mastheadOn') !== false ) {
          this.model.set({ 'mastheadOn': false });
        }

    }
  },

  showHideMasthead: function() {
    // console.log('showHideMasthead');
    if(this.model.get('mastheadOn') === false) {
      // hide
      $(document.body).addClass('hiddenMasthead');

      // hide the large menu masthead:
      if(this.model.get('pageTopRunway') === false) {
        $(document.body).addClass('hiddenLargeMasthead');
      }

    } else if (this.model.get('mastheadOn') === true) {
      // show
      $(document.body).removeClass('hiddenMasthead');

      // show the large menu masthead:
      if(this.model.get('pageTopRunway') === false) {
        $(document.body).removeClass('hiddenLargeMasthead');
      }
    }
  },


  pageTopOrNot: function() {
    // protected from altering on pageload:
    if(this.model.get('mastheadShowing') !== false ){

      if(this.model.get('pageTop') === false) {
        // alter the menu with a class in the body tag
        $(document.body).addClass('notPageTop');
      } else if (this.model.get('pageTop') === true) {
        // show
        $(document.body).removeClass('notPageTop');
      }
    }

  }

});
