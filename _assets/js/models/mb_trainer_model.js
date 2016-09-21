var Backbone = require ('backbone');
var WorkoutsCollection = require('./mb_trainer_workouts_collection');

module.exports = Backbone.Model.extend({

  defaults: {
    workoutCount: 0,
    Bio: false,
    showFullBio: false, // status of showMore and showLess link.
    bioTransition: false, // while the bio is animated, you can't click it (prevent double click)
    bioExcerptHeight: 200,
    ImageURL: '',

    showMoreButton: '<i class="fa fa-angle-double-down" aria-hidden="true"></i> Read More',
    showLessButton: '<i class="fa fa-angle-double-up" aria-hidden="true"></i> Show Less',
  }

});
