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
    if( this.model.get('showFullBio') === true ){
      var theBio = this.$('div.bio');
      var theButton = this.$('a.readMore');

      theButton.html('Show Less');
      theBio.removeClass('showLess');
    } else {
      var theBio = this.$('div.bio');
      var theButton = this.$('a.readMore');

      theButton.html('Show More');
      theBio.addClass('showLess');
    }
    // console.log('adjustBio');
  }

});
