// app.mbBackGroundShader
// model: app.mindbodyModel

var Backbone = require ('backbone');
var _ = require ('underscore');
var $ = require ('jquery');

var LogInForm = require('./mb_login_form_2');

module.exports = Backbone.View.extend({
  el: document.body,
  // template: _.template($('#mb-pop-over').html()),
  events: {
    'click .closeForm': 'killPopOver',
    'touchend .closeForm': 'killPopOver',
    'keydown': 'keyAction',

    // popOverMB encapsulates everything, so we have to go the extra step...
    'click .popOverMB': 'clickScreen',
    'touchend .popOverMB': 'clickScreen',

    // from within the forms. I have to call them from here to avoid calls to ghost views.
    'click input.mb-login-button': 'logIntoSite'

  },

  initialize: function() {
    var node = document.createElement('div');
    node.className = 'popOverMB';
    document.body.appendChild(node);

    this.$el = $(node); // cache for all further operation
    this.template = _.template( $('#mb-pop-over').html() );
    this.errorTemplate = _.template($('#mb-login-form-error').html());
    this.$el.append(this.template());
    this.popOverLocation = this.$('span.main');

    app.mbLogInForm2 = new LogInForm({model: this.model});

    app.windowStatus.on({'change:windowHeight': this.setShadeHeight}, this);
    this.model.on({'change:popoverVisible': this.openCloseShader}, this);
    this.model.on({'change:loginFormWaiting': this.progressIcon}, this);
    this.model.on({'change:loginERRmessage': this.renderErrorMessage}, this);
  },

  clickScreen: function(e){
    // console.log(e.target.className);
    if( e.target.className === 'popOverMB fullOpacity' ){
      this.killPopOver();
    }
  },

  killPopOver: function() {
    this.model.set({ popoverVisible: false});
  },

  keyAction: function(e){
    if(e.keyCode === 27 && this.model.get('popoverVisible') === true){
      // escape key === 273
      this.killPopOver();
    };
  },

  setShadeHeight: function() {
    if( this.model.get('popoverVisible') === true ){
      this.$el.attr('style', 'height: ' + app.windowStatus.get('documentHeight') + 'px');
    };
  },

  openCloseShader: function() {
    // console.log('openCloseShader');
    // called by event listener (when loginFormVisible is changed)
    if( this.model.get('popoverVisible') === true ) {
      // reset some state variables:
      this.model.set({
        loginFormWaiting: false
        // loginFormVisible: false,
        // clientInfoVisible: false
      });

      this.fadeInOut('intro');

    } else if( this.model.get('popoverVisible') === false ) {
      // transition effect begins:
      this.fadeInOut('outro');

      // timeout waits for transition, then clears out the height:
      setTimeout(function(){
        app.mbBackGroundShader.zeroHeightHide();

      }, 125);
    }
  },

  zeroHeightHide: function() {
    // hide the shader by setting it to "height: 0"
    // this.$el.setAttribute("style", 'height: 0');
    this.$el.attr('style', 'height: 0');
    this.popOverLocation.empty(); // clear out content.
  },


  fadeInOut: function(inOrOut) {
    if(inOrOut === 'intro') {
      this.setShadeHeight(); // set the height (inline style)
      this.$el.addClass('fullOpacity'); // this calss transitions opacity to 100%

    } else if(inOrOut === 'outro') {
      this.$el.removeClass('fullOpacity'); // this calss transitions opacity to 0%
    }
  },

  progressIcon: function(){
    // shor or hide the progress icon based on state.
    var loadingSpan = this.$('span.loading');
    if(this.model.get('loginFormWaiting') === true){
      loadingSpan.removeClass('hid');

    } else {
      loadingSpan.addClass('hid');
    }
  },

  renderErrorMessage: function(){
    var errorSpan = this.$('span.error');

    if(errorSpan){
      errorSpan.empty();
      errorSpan.html(this.errorTemplate(this.model.toJSON()));

      if(this.model.get('loginERRmessage') !== ''){
        // flash red then fade to transparent
        errorSpan.addClass('flash');
        setTimeout(function(){ errorSpan.removeClass('flash') }, 50);
      }
    }
  },

  openPopUp: function(popUpType, workoutModel) {
    // this will turn on the background:
    this.model.set({popoverVisible: true});
    // reset to template to hold the popover content:
    // this.$el.html('').html( this.mainTemplate() );
    // var popOverLocation = this.$('span.main');


    switch (popUpType) {
      case 'login':
        this.popOverLocation.html(app.mbLogInForm2.render(workoutModel));
        app.mbLogInForm2.adjustFocus();
        break;
      default:

    }
  },
  logIntoSite:function(e) { app.mbLogInForm2.signInButtom(e); }

});
