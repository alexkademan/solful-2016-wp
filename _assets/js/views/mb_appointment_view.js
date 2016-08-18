// view for day on schedule page

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');


module.exports = Backbone.View.extend({

  tagName: 'li',

  events: {
    "click hgroup.toggle": 'showInfo',
    "click div.trainerName": 'showTrainer'
  },

  initialize: function() {
    // console.log(this.model);
    this.model.on({'change:toggleInfo': this.toggleInfo}, this);
    this.model.on({'change:toggleInstructor': this.toggleInstructor}, this);
  },

  render: function(pageName){
    // a default:
    var appointmentTemplate = _.template($('#mb-appointment-template').html());
    this.$el.html(appointmentTemplate(this.model.toJSON()));
    this.renderClassInfo(pageName);

    return this; // enable chained calls
  },

  // calling this from the "day" view,
  // renders the class info to the DOM.
  renderClassInfo: function(pageName) {
    // new template for almost all of the info:
    if(pageName === 'schedule'){
      var infoTemplate = _.template($('#mb-appointment-nfo').html());
    } else if(pageName === 'trainers') {
      var infoTemplate = _.template($('#mb-trainer-appointment-template').html());
    }

    this.$el.append(infoTemplate(this.model.toJSON()));
    this.toggleInfo();

    return this;
  },

  renderTrainerInfo: function() {
    var trainerInfoTemplate = _.template($('#mb-trainer-nfo').html());
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

  // when the hgroup is clicked on,
  // the info about the class needs to show:
  showTrainer: function() {
    if(this.model.get('toggleInstructor') === false){
      this.model.set({toggleInstructor: true});
    } else {
      this.model.set({toggleInstructor: false});
    }
  },

  // show AND hide info...
  toggleInfo: function() {
    if(this.model.get('toggleInfo') === false){
      this.$el.removeClass('showInfo');
    } else {
      this.$el.addClass('showInfo');
    }
  },

  toggleInstructor: function() {
    if(this.model.get('toggleInstructor') === false){
      this.$el.removeClass('showTrainer');
    } else {
      this.$el.addClass('showTrainer');
    }
  }

});
