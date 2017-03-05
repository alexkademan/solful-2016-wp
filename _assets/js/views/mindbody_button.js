// app.mindBodyButton

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({

    el: '#sign_up_now',

    events: {
        'click': 'openOrClose'
    },

    initialize: function () {
        "use strict";

        if (this.$el.length === 1) {

            // the "sign up now" button is within the DOM
            this.resetBanner();
        }
    },

    resetBanner: function () {
        "use strict";

        this.$el.attr('style', 'height: 0px');

        setTimeout(function () {
            app.mindBodyButton.enlargeBanner();
        }, 750);
    },

    enlargeBanner: function () {
        "use strict";

        var callOutHeight = this.$('.classes').outerHeight();
        this.$el.attr('style', 'height: ' + callOutHeight + 'px');
        // console.log(this.$el);
    },

    openOrClose: function (e) {
        "use strict";

        e.preventDefault();

        if (e.target.className === 'closeBtnTrigger') {
            this.$el.attr('style', 'height: 0px');

        } else {
            // app.mbMethods.launchMINDBODY(this.model.get('urlMINDBODY'));
            // console.log(this.$el[0].href);
            window.location.replace(this.$el[0].href);

        }
    }

});
