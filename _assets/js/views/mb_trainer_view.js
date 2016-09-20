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

    // console.log(this.model.get('bioExcerptHeight'));
    var theBio = this.$('div.bio'); // height of full blurb at this moment.
    var theButton = this.$('a.readMore');
    var wholeBlurbHeight = this.$('div.desc').height(); // height of full blurb at this moment.


    if( this.model.get('showFullBio') === true ){


      theButton.html('Show Less');
      theBio.removeClass('showLess');

      this.$el.addClass('showBio');

      console.log(wholeBlurbHeight + 'px');
      theBio.attr('style', 'height: ' + wholeBlurbHeight + 'px')

    } else {

      theButton.html('Show More');
      theBio.attr('style', 'height: ' + this.model.get('bioExcerptHeight') + 'px')
      theBio.addClass('showLess');

      this.$el.removeClass('showBio');
    }
  }

});
