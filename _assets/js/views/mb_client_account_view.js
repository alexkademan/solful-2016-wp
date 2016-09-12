// app.mbAccountInfo
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  el: 'div',

  initialize: function(){
    this.accountInfoTemplate = _.template($('#mb-client-account-info').html());
  },

  render: function() {
    return this.accountInfoTemplate(this.model.toJSON());
  }
});
