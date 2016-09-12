// // app.mbLogInForm
// // model: app.mindbodyModel
//
// var Backbone = require ('backbone');
// var _ = require ('underscore');
// var $ = require ('jquery');
//
// var ClientInfo = require('./mb_client_account_view');
//
// module.exports = Backbone.View.extend({
//   el: document.body,
//   events: {
//     // 'click div.non-mobile-shader': 'clickScreen',
//     // 'touchend div.non-mobile-shader': 'clickScreen'
//   },
//   initialize: function(){
//     // var node = document.createElement('div');
//     // node.className = 'loginForm';
//     // document.body.appendChild(node);
//     // this.$el = $(node); // cache for ... THE FUTURE!!!
//
//     this.template = _.template($('#mb-login-form').html());
//     this.loginTemplate = _.template($('#mb-log-in-fields').html());
//     this.signinTemplate = _.template($('#mb-sign-in-fields').html());
//
//     this.model.on({'change:loginFormVisible': this.removePopOver}, this);
//     this.model.on({'change:loginFormWaiting': this.loginWaiting}, this);
//     this.model.on({'change:clientInfoVisible': this.toggleAccountInfo}, this);
//   },
//
//   clickScreen: function(e) {
//     // if( e.target.className === 'schedButton signin-button' ){
//     //   e.preventDefault();
//     //   this.requestSignIn('join');
//     // };
//     //
//     // if( e.target.className === 'schedButton cancel-class-button' ){
//     //   // cancel appointment button.
//     //   e.preventDefault();
//     //   this.requestSignIn('cancel');
//     // };
//     //
//     // // submit the form via AJAX:
//     // if(e.target.className === 'mb-login-button'){
//     //   // the submit input on the form was used:
//     //   e.preventDefault();
//     //   this.model.set({'loginERRmessage': ''});
//     //   this.checkForm();
//     // };
//   },
//
//   requestSignIn: function(joinOrCancel) {
//     // someone pushed the "confirm" button to sign up for a class
//     var clientID = this.model.get('client')['ID'];
//     var classID = this.model.get('workoutRequestedID');
//
//     var args = '?clientID=' + clientID + '&classID=' + classID;
//
//     if(joinOrCancel === 'join'){
//       // sign the client into the class
//       app.mindbodyView.makeAJAXcall('class-sign-up-01.php' + args, 'signup');
//
//     } else if (joinOrCancel === 'cancel') {
//       // sign the client out of the class
//       args += '&cancel=true';
//       app.mindbodyView.makeAJAXcall('class-sign-up-01.php' + args, 'cancelClass');
//
//     }
//
//     this.model.set({'loginFormWaiting': true});
//   },
//
//   checkForm: function(){
//   },
//
//   toggleAccountInfo: function() {
//   },
//
//   renderBackgroundShader: function() {
//   },
//
//   showForm: function(workoutModel) {
//     // store the class ID if there is one for use on the login screen:
//     if(workoutModel !== undefined){
//       this.model.set({'workoutRequestedID': workoutModel.get('ID')});
//     };
//
//     // login form has been requested, put it's status into the model
//     // this can't be false if you want the form to be displayed:
//     if(this.model.get('popoverVisible') !== true){
//       this.model.set({
//         popoverVisible: true,
//         loginFormVisible: true,
//         loginFormWaiting: false // reset just incase
//       });
//     }
//
//     // show the shader that will contain the form:
//     // this.renderBackgroundShader();
//
//     if(this.model.get('loggedIn') === false){
//       // either the user clicked "log in" in the masthead,
//       // or they are clicking "sign in" for a class while logged out.
//       // they need to either:
//       // A. log in and then sign into the class, or
//       // B. log in and be back to the website.
//       this.showLogInForm(workoutModel);
//
//     } else if(this.model.get('loggedIn') === true) {
//       // skip the login form, the user is already signed in.
//       this.showSignInForm(workoutModel);
//     }
//
//   },
//
//   showSignInForm: function(workoutModel){
//
//   },
//
//   errClassNotAvailable: function(errMessage, option){
//
//     if(option === 'removeSignUp'){
//       // remove sign in button:
//       this.$('a.signin-button').addClass('hid');
//       this.$('a.cancel-button').html('Okay');
//     }
//
//     if(option === 'removeCancel') {
//       // remove cancel class appointment button:
//       this.$('a.cancel-class-button').addClass('hid');
//       this.$('a.cancel-button').html('Okay');
//
//     }
//
//     // adjust state:
//     this.model.set({
//       loginERRmessage: errMessage,
//       loginFormWaiting: false
//     });
//   }
//
//
// });
