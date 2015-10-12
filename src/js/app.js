var Slider = require('./slider'),
	FadeSlider = require('./slider/FadeSlider');


var config = {
	// arbitrary number of images
	images: [
		'public/img/shepard.jpg',
		'public/img/ida.png',
		'public/img/garrus.jpg',
		'public/img/mordin.jpg',
		'public/img/joker.png',
		'public/img/liara.jpg'
	],
	// possible values: 'auto', 'manual', 'automanual'
	mode: 'auto',
	// arbitrary interger (miliseconds)
	swipeSpeed: 500,
	// arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
	swipeDelay: 3000
};

window.onload = function () {
	window.slider = new FadeSlider(config);
}