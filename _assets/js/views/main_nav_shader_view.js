// app.mainNavShader

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({

  initialize: function() {

    var node = document.createElement('span');
    node.className = 'mobile_shader';
    document.body.appendChild(node);

    this.$el = node;

    node.onclick = function() {
      app.mainNavModel.set({ 'mobileMenu': false });
    }

    app.windowStatus.on({
      'change:windowHeight': function(){
        app.mainNavShader.openShader();
      }
    });

  },

  events: {
    'click': function(e) {
      app.mainNav.closeMenus();
      console.log('is this going on now?');
    }
  },

  clickScreen: function(e) {
    console.log(e.target.className);
  },

  openShader: function() {
    if( app.mainNavModel.get('mobileMenu') === true ){
      // this.$el.attr('style', 'height: ' + app.windowStatus.get('documentHeight') + 'px');
      this.$el.setAttribute("style", 'height: ' + app.windowStatus.get('documentHeight') + 'px');
    };
  },

  closeShader: function() {
    setTimeout(function(){
      // if this was called twice (double-click)
      // then the var will be set to true. Otherwise:
      if( app.mainNav.model.get('mobileMenu') === false) {
        app.mainNavShader.removeStyle();
      }

    }, app.mainNav.model.get('shaderFadeOutTime')); // length of countdown set in model
  },

  removeStyle: function() {
    // this.$el.removeAttr('style');
    this.$el.setAttribute("style", 'height: 0');
  }

});
