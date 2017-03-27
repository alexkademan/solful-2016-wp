// app.photoGrid

var Backbone = require("backbone");
// var _ = require("underscore");
var $ = require("jquery");

var ImageGridFuncs = require("./photo_grid_functions");
var ImageCollection = require("../models/photo_grid_image_collection");
var ImageView = require("./photo_grid_image");

module.exports = Backbone.View.extend({

    el: '#photo-grid',

    initialize: function () {
        "use strict";
        if (this.$el.length === 1) {

            var gridJSON = this.$(".hid");

            if (gridJSON.length === 1) {

                this.funcs = new ImageGridFuncs();
                this.template = this.funcs.slideTemplate();

                // there is only one allowed div.hid
                gridJSON = JSON.parse(gridJSON[0].innerHTML);

                if (gridJSON.spacer_URL && gridJSON.image_URL) {

                    this.model.set({
                        parentModel: this.model, // pass as reference
                        spacerURL: gridJSON.spacer_URL,
                        imageURL: gridJSON.image_URL,
                        spacers: gridJSON.spacers,
                        images: gridJSON.images,
                        // shuffle image order:
                        imagesShuffled: this.funcs.shuffleArray(gridJSON.images),
                    });

                    this.setupGrid();

                }

                this.model.on({
                    'change:currentSlide': this.modelChange
                }, this);

                app.mindbodyModel.on({
                    'change:popoverVisible': this.killSlides
                }, this);
            }
        }
    },

    setupGrid: function () {
        "use strict";

        var that = this,
            spacers = this.model.get("spacers"),
            randomInt,
            imageCollection = new ImageCollection(),
            i;

        for (i = 0; i < this.model.get("images").length; i += 1) {

            randomInt = that.funcs.getRandomInt(0, spacers.length);
            imageCollection.add({
                // push some info to individual views:
                parentModel: this.model,
                order: i,
                spacerURL: this.model.get("spacerURL"),
                spacer: spacers[randomInt],
                imageURL: this.model.get("imageURL"),
                image: this.model.get("imagesShuffled")[i],
            });
        }

        imageCollection.each(this.imageView, this);

    },

    imageView: function (imageModel) {
        "use strict";

        var imageView = new ImageView({model: imageModel});

        this.$el.append(imageView.render().el);

    },

    modelChange: function () {
        "use strict";

        var currSlide = this.model.get("currentSlide"),
            allImages = this.model.get("imageURL"),
            imageInfo,
            imageViewer,
            imgWidth,
            slideDiv;

        if (currSlide !== false) {

            if (app.mindbodyModel.get("popoverVisible") !== true) {
                app.mindbodyModel.set({popoverVisible : true});
            }





            // retrieve cached DOM object:
            imageViewer = app.mbBackGroundShader.openPopUp("imageViewer");

            // set the stage:
            imageViewer.html(this.template(this.model.toJSON()));

            // select div.slide, the ugly way:
            slideDiv = imageViewer[0].getElementsByClassName("slide")[0];

            // pull the array of info about the image:
            imageInfo = this.model.get("images")[currSlide];

            // calculate the size of the image when it fits the slideshow:
            imgWidth = this.funcs.findSlideSize(imageInfo,
                slideDiv.offsetWidth,
                slideDiv.offsetHeight);

            slideDiv.innerHTML = '<img src="' + allImages + imageInfo.filename +
                    '" style="width: ' + imgWidth + 'px;" />';

        }
    },

    killSlides: function () {
        "use strict";

        if (app.mindbodyModel.get("popoverVisible") === false) {

            // popover is gone. No more slideshow.
            this.model.set({currentSlide : false});
        }
    },

});
