var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    id: '',

    headline: '',
    message: '',
    description: '',
    caption: '', // need a default empty string.

    loaded: false,
    prevRendered: false,
    wireframe: false
  }

});
