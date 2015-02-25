'use strict';

(function () {
    var images = ['images/image01.jpg',
        'images/image02.jpg',
        'images/image03.jpg',
        'images/image04.jpg'];

    //constructor for class Slider
    function Slider(node, arrayOfImages) {
        this.node = node;
        this.images = arrayOfImages;
        this.createSliderStructure(this.node);
        this.currentSlide = 0;
        this.sliderTimer = null;
        this.slideWidth = 910;
        this.sliderSetEventListeners();
        this.runSlider();
    }

    //create slider DOM nodes
    Slider.prototype.createSliderStructure = function (node) {
        $(node).append(($('<div>').addClass('panel'))
            .append($('<div>').addClass('shortcut gray active').text('Work and welcomes guests in a euyutny studio'))
            .append($('<div>').addClass('shortcut rose').text('Relax in comfortable silence bathroom'))
            .append($('<div>').addClass('shortcut red').text('Enjoy your stay in a cozy bedroom'))
            .append($('<div>').addClass('shortcut pink').text('Spend your time in games with children in the nursery')))
            .append($('<div>').addClass('slides-block')
                .append($('<div>').addClass('slides')
                    .append($('<img>').attr('src', this.images[0]))
                    .append($('<img>').attr('src', this.images[1]))
                    .append($('<img>').attr('src', this.images[2]))
                    .append($('<img>').attr('src', this.images[3]))));
    };

    //run slider with interval 3s
    Slider.prototype.runSlider = function () {
        this.sliderTimer = setInterval(this.nextSlide.bind(this), 3000);
    };

    //goto to slide with mentioned number
    Slider.prototype.nextSlide = function () {
        this.currentSlide += 1;
        if (this.currentSlide === 4) {
            this.currentSlide = 0;
        }
        this.animate(this.currentSlide);
    };

    //animated slides scrolling
    Slider.prototype.animate = function (slideNum) {
        var _this = this;

        this.node.find('.slides').animate({left: -slideNum * this.slideWidth}, 400, function () {
            _this.node.find('.shortcut.active').removeClass('active');
            _this.node.find('.shortcut').eq(slideNum).addClass('active');
        });
    };

    //set event listeners for slider
    Slider.prototype.sliderSetEventListeners = function () {
        var _this = this;

        //stop and go slider after pause at 5s
        this.node.find('.shortcut').on('click', (function () {
            clearTimeout(_this.pause);
            _this.pause = null;
            var goToNum = _this.node.find('.shortcut').index(this);
            _this.currentSlide = goToNum - 1;
            _this.nextSlide();
            clearInterval(_this.sliderTimer);
            _this.pause = setTimeout(function () {
                _this.runSlider();
            }, 2000);
        }));
    };

    //create 2 sliders (for example); it's possible to create more sliders at page
    window.slider1 = new Slider($('.slider-1'), images);
    window.slider2 = new Slider($('.slider-2'), images);
})();