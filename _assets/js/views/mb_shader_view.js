// app.mbBackGroundShader
// model: app.mindbodyModel

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var LogInForm = require('./mb_login_form_2');
var ClientInfo = require('./mb_client_account_view');
var AppointmentPopOver = require('./mb_appointment_pop_over');

module.exports = Backbone.View.extend({
    el: '#popOverMB',

    events: {
        'click .closeForm': 'killPopOver',

        // popOverMB encapsulates everything, so we have to go the extra step...
        'click': 'clickScreen',

        // from within the forms. I have to call them from here to avoid calls to ghost views.
        'click input.mb-login-button': 'logIntoSite',
        'click a.logOut': 'logOutUser',

        'click a.signin-button': 'signUpButton',
        'click a.cancel-class-button': 'cancelButton',
        'click a.exitPopOver': 'killPopOver',
    },

    initialize: function () {
        "use strict";

        this.template = _.template($('#mb-pop-over').html());
        this.errorTemplate = _.template($('#mb-login-form-error').html());
        this.$el.append(this.template());
        this.popOverLocation = this.$('span.main');

        app.mbLogInForm2 = new LogInForm({model: this.model});
        app.mbAccountInfo = new ClientInfo({model: this.model});
        app.mbAppointmentPopOver = new AppointmentPopOver({model: this.model});

        app.windowStatus.on({'change:windowHeight': this.setPopOverStyle}, this);
        this.model.on({'change:popoverVisible': this.openCloseShader}, this);
        this.model.on({'change:loginFormWaiting': this.progressIcon}, this);
        this.model.on({'change:loginERRmessage': this.renderErrorMessage}, this);
        this.model.on({'change:exitMessage': this.removeSignUpButton}, this);
    },

    clickScreen: function (e) {
        "use strict";
        if (e.target.className === 'popOverMB fullOpacity') {
            this.killPopOver();
        }
    },

    killPopOver: function () {
        "use strict";
        this.model.set({
            popoverVisible: false
        });
    },

    openCloseShader: function () {
        "use strict";
        // called by event listener (when loginFormVisible is changed)
        if (this.model.get('popoverVisible') === true) {

            // reset some state variables:
            this.model.set({ loginFormWaiting: false });

            // OPEN the pop-over
            var bgScroll = app.windowStatusView.model.get('vScrollPosition');
            app.mbBgAdjust.popOverBgOpen(bgScroll);

            this.model.set({bgScroll: bgScroll});

            // this.$el.attr('style', 'top: ' + bgScroll + 'px');

            // this.fadeInOut('intro');
            this.setPopOverStyle(); // set the height (inline style)
            this.$el.addClass('fullOpacity'); // this calss transitions opacity to 100%

        } else if (this.model.get('popoverVisible') === false) {

            // CLOSE the pop-over
            if (this.model.get('bgScroll') !== false) {
                // remove the inline style,
                app.mbBgAdjust.popOverBgClose();
                // the immediately move page back to where it was when this pop-over was called for:
                window.scrollTo(0, this.model.get('bgScroll'));

                var inLineStyle = '';
                inLineStyle += 'top: ' + this.model.get('bgScroll') + 'px;';
                inLineStyle += 'height:' + this.model.get('popOverRenderedHeight') + 'px;';

                this.$el.attr('style', inLineStyle);

                // amd reset the model for any other attempts to call a pop-over.
                this.model.set({bgScroll: false});
            }


            // transition effect begins:
            this.$el.removeClass('fullOpacity'); // this calss transitions opacity to 0%

            // timeout waits for transition, then clears out the height:
            setTimeout(function () {
                app.mbBackGroundShader.fadeOut();
            }, 125);

            this.setPopOverStyle(); // set the inline styles
        }
    },

    fadeOut: function () {
        "use strict";
        this.$el.attr('style', 'height: 0');
        this.popOverLocation.empty();
    },

    progressIcon: function () {
        "use strict";
        // show or hide the progress icon based on state.
        var loadingSpan = this.$('span.loading');
        if (this.model.get('loginFormWaiting') === true) {
            loadingSpan.removeClass('hid');
        } else {
            loadingSpan.addClass('hid');
        }
    },

    renderErrorMessage: function () {
        "use strict";
        if (this.model.get('loginERRmessage') !== false) {

            var errorSpan = this.$('span.error');

            if (errorSpan) {
                errorSpan.empty();
                errorSpan.html(this.errorTemplate(this.model.toJSON()));

                if (this.model.get('loginERRmessage') !== '') {
                    // flash red then fade to transparent
                    errorSpan.addClass('flash');
                    setTimeout(function () {
                        errorSpan.removeClass('flash');
                    }, 50);
                }
            }

            this.model.set({
                loginERRmessage: false,// reset in case the next error message is identical to this one
                loginFormWaiting: false // remove progress icon.
            });
        }
    },

    removeSignUpButton: function (exitMessage) {
        "use strict";
        // the API returned an error on their class sign up,
        // so remove the sign up button and change the
        // message in the 'exitPopOver' button:
        this.$('a.actionButton').addClass('hid');
        this.$('a.exitPopOver').html(exitMessage);

    },

    openPopUp: function (popUpType, workoutModel) {
        "use strict";

        // this will turn on the background:
        // this.model.set({popoverVisible: true});
        this.popOverLocation.empty(); // clear out content. Just incase that got skipped somehow.

        if (this.model.get('loggedIn') === false &&
                popUpType === 'workout') {

            // if they clicked on a class, and they're not logged in,
            // prompt them to log in, and then ask about the class
            popUpType = 'login';
            this.model.set({workoutRequested: workoutModel});
        }

        switch (popUpType) {
        case 'login':
            this.popOverLocation.html(app.mbLogInForm2.render(workoutModel));
            app.mbLogInForm2.adjustFocus();
            // setTimeout(function(){ app.mbLogInForm2.adjustFocus(); }, 250);
            break;

        case 'accountInfo':
            this.popOverLocation.html(app.mbAccountInfo.render());
            break;

        case 'workout':
            this.popOverLocation.html(app.mbAppointmentPopOver.render(workoutModel));
            break;

        default:
            // just do nothing...
            // this.killPopOver();

        }
        // this will turn on the background:
        this.model.set({popoverVisible: true});
    },

    setPopOverStyle: function () {
        "use strict";
        if (this.model.get('popoverVisible') === true) {

            var windowHeight = app.windowStatus.get('windowHeight'), // browser page height
                popOverHeight = this.$('div.content').height(),
                calculatedHeight = windowHeight >= popOverHeight ?
                        windowHeight : popOverHeight;

            app.mbOverallControl.setPopOverPageHeight(calculatedHeight);

            this.$el.attr('style',  'height: ' + calculatedHeight + 'px');

            this.model.set({popOverRenderedHeight: calculatedHeight});


        } else if (this.model.get('popoverVisible') === false) {
            app.mbOverallControl.removePopOverPageHeight();
        }
    },


    logIntoSite: function (e) {
        "use strict";
        app.mbLogInForm2.signInButtom(e);
    },
    logOutUser: function () {
        "use strict";
        app.mbLogInView.logOutUser();
    },
    signUpButton: function () {
        "use strict";
        app.mbAppointmentPopOver.requestSignIn('join');
    },
    cancelButton: function () {
        "use strict";
        app.mbAppointmentPopOver.requestSignIn('cancel');
    },
});
