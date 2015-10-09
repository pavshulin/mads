var Slider = require('./slider');


var config = {
	// arbitrary number of images
	images: [
		'http://example.com/image-1.jpg',
		'http://example.com/image-2.jpg',
		'http://example.com/image-3.jpg',
		'http://example.com/image-4.jpg'
	],
	// possible values: 'auto', 'manual', 'automanual'
	mode: 'auto',
	// arbitrary interger (miliseconds)
	swipeSpeed: 500,
	// arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
	swipeDelay: 3000
};

window.onload = function () {
	window.slider = new Slider(config);
}