var $m = require('../common/mQuery');

class Slider {
	constructor (config) {
		this.config = config || Slider.defaultConfig;

		this._initialize();
	}

	_initialize () {
		this._$container = $m.find('#slider');

		
	}
}

Slider.defaultConfig = {

}


module.exports = Slider;