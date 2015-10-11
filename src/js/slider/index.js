var $ = require('../common/mQuery');

class Slider {
	constructor (config) {
		this.config = config || Slider.defaultConfig;

		this._initialize();
	}

	_initialize () {
		this._$container = $.find('#slider');

	}
}

Slider.defaultConfig = {

}


module.exports = Slider;