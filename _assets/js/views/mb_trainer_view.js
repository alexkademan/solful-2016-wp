// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click a.readMore': 'showMoreOrLess'
  },

  initialize: function() {
    this.model.on({'change:showFullBio': this.adjustBio}, this);
  },

  renderTrainer: function() {
    var template = _.template($('#mb-trainer-template').html());
    this.$el.html(template(this.model.toJSON()));
    this.adjustBio(); // set up the show more/less button.

    return this; // enable chained calls

  },

  showMoreOrLess: function() {
    // adjust the model, and we'll watch for that in order to run 'adjustBio'
    if( this.model.get('showFullBio') === false ){
      this.model.set({'showFullBio':true});
    } else {
      this.model.set({'showFullBio':false});
    };
  },

  adjustBio: function() {

    var shrunkenHeight = this.model.get('bioExcerptHeight');
    var theBio = this.$('div.bio'); // height of full blurb at this moment.
    var theButton = this.$('a.readMore');
    var wholeBlurbHeight = this.$('div.desc').height(); // height of full blurb at this moment.
    var that = this; // push this to the timer functions:

    if( this.model.get('showFullBio') === true && this.model.get('bioTransition') === false ){

      // OPEN THE BIO ********************************************************

      this.model.set({bioTransition: true}); // to prevent double-click
      theButton.html(this.model.get('showLessButton'));
      this.$el.addClass('showBio');

      // we know that the blurb is set to a static height, but we want to animate it to
      // the current full height, and then remove the inline style incase the end user
      // re-sizes their window.
      theBio.addClass('transition');
      theBio.attr('style', 'height: ' + wholeBlurbHeight + 'px');
      setTimeout( function(){
        theBio.removeAttr('style');
        that.model.set({bioTransition : false});
        theBio.removeClass('transition');
      }, 500);


    } else if( this.model.get('showFullBio') === false  && this.model.get('bioTransition') === false) {

      // CLOSE THE BIO ********************************************************

      this.model.set({bioTransition: true}); // to prevent double-click
      theButton.html( this.model.get('showMoreButton'));
      this.$el.removeClass('showBio');

      // set the bio back to full height then:
      theBio.attr('style', 'height: ' + wholeBlurbHeight + 'px');
      // theBio.addClass('transition');

      // out it back to appreviated height almost immediately for animation.
      setTimeout( function(){
        theBio.attr('style', 'height: ' + shrunkenHeight + 'px');
        theBio.addClass('transition');
      }, 10);

      setTimeout( function(){
        theBio.removeClass('transition');
        that.model.set({bioTransition : false});
      }, 500);

    }
  },

  removeHeight: function(theElement) {
    console.log('hi there....');
    theElement.removeAttr('style');
    setTimeout(function(theElement){
      console.log(this);
    }, 1000);
  }

});
