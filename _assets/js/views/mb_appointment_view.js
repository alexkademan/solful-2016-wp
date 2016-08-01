// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');


module.exports = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click hgroup.toggle": 'showInfo'
  },

  initialize: function() {
    // have to call for the underscore template here. It's not on every other page...
    // Learning a new templating engine is on my to-do list.
    this.template = _.template($('#mb-appointment-template').html());

    // this.model.on('change:toggleInfo', this.showInfo);
  },

  render: function(){
    // console.log(this.model);
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  },

  // calling this from the "day" view,
  // renders the class info to the DOM.
  renderClassInfo: function() {
    // new template for almost all of the info:
    var infoTemplate = _.template($('#mb-appointment-nfo').html());
    this.$el.append(infoTemplate(this.model.toJSON()));
    this.toggleInfo();
    console.log( this.model );
  },

  // when the hgroup is clicked on,
  // the info about the class needs to show:
  showInfo: function() {
    if(this.model.get('toggleInfo') === false){
      this.model.set({toggleInfo: true});
    } else {
      this.model.set({toggleInfo: false});
    }
  },

  // show AND hide info...
  toggleInfo: function() {
    // console.log(this.model);
    if(this.model.get('toggleInfo') === false){
      this.$el.removeClass('showInfo');
    } else {
      this.$el.addClass('showInfo');
    }
  }

});
