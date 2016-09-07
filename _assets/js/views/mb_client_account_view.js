var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

module.exports = Backbone.View.extend({
  initialize: function(){
    console.log('mbClientInfoView');
    this.model.on({'change:clientInfoVisible': this.showHideAccountInfo}, this);
  },

  showHideAccountInfo: function() {
    if(this.model.get('clientInfoVisible') === true) {
      console.log('account information is showing now...');
      app.mbLogInForm.showShader('accountInfo');


    } else if(this.model.get('clientInfoVisible') === false) {
      console.log('account information is now hidden');

    }
  }

});
