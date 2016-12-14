// calendarButton
// model: app.mindbodyModel

var Backbone = require ("backbone");
var _ = require ("underscore");
var $ = require ("jquery");

module.exports = Backbone.View.extend({

  tagName: 'li',

  events: {
    "click": "gotoMINDBODY",
  },

  render: function() {
    this.template = _.template($('#mb-full-calendar-link').html());
    this.$el.html(this.template(this.model.toJSON()));

    this.$el.addClass("mbCalendarLink");

    return this;
  },

  gotoMINDBODY: function() {
    // when clicked on, send them to MINDBODY calendar either as a logged in
    // customer, or as a NOT logged in customer
    var schedLink = this.model.get("urlMBschedule");

    if(this.model.get("GUID")) {
      schedLink = schedLink + "&GUID=" + this.model.get("GUID");
    }
    app.mbMethods.launchMINDBODY(schedLink);
  },
});
