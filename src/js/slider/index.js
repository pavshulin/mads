var $ = require('../common/mQuery');

var staticProperties = {
	'defaultConfig': {},
	'ACTIVE_CLASS': 'slider-active-item',
	'ITEM_CLASS': 'slider-item'
}
class Slider {
	constructor (config) {
		this._initializeStaticProperties()
			._initializeDefaults();
		
		this.config = config || this.defaultConfig;

		this._initializeElements()
			._createItems()
			.initializeListeners();

		this._setActive(this._getItem(0));

		return this;
	}

	_initializeDefaults () {
		this._items = new Map();
		this._length = 0;
		this._userSlideState = {};

		return this;
	}

	_initializeStaticProperties () {
		var property;

		for (property in staticProperties) {
			// hate this crap
			if (staticProperties.hasOwnProperty(property)) {
				Object.defineProperty(this, property, {
					value: staticProperties[property],
					writable: false
				});
			}
		}

		return this;
	}

	_initializeElements () {
		this._$slider = $.find('#slider');
		this._$container = $.find('#slider-container');

		return this;
	}

	_createItem (src) {
		var div = $.createElement('div'),
			img = $.createElement('img');

		$.prop(div, {
			'class': this.ITEM_CLASS
		});

		$.prop(img, {
			'src': src
		});

		$.append(div, img);

		return div;
	}

	_createItems () {
		var imgs = this.config.images;

		imgs.forEach((src) => {
			var item = this._createItem(src);
			this._setItem(this._length++, item);

			$.append(this._$container, item);
		});

		return this;
	}

	_getMouseEventX (event) {
		return event.clientX;
	}

	_getTouchEventX (event) {
		var touch = event.touches[0];

		return touch && touch.pageX;
	}

	_calculateDirection (x1, x2) {
		return x1 - x2 > 0 && 'left' || 'right';
	} 

	initializeListeners () {
		$.on(this._$container, 'mousedown', (event) => {
			this._onSlideStart(this._getMouseEventX(event));
		});
		$.on(this._$container, 'touchstart', (event) => {
			this._onSlideStart(this._getTouchEventX(event));
		});

		$.on(this._$container, 'mousemove', (event) => {
			this._onSlideMove(this._getMouseEventX(event));
		});
		$.on(this._$container, 'touchmove', (event) => {
			this._onSlideMove(this._getTouchEventX(event));
		});

		$.on(this._$container, 'mouseup', (event) => {
			this._onSlideEnd(event);
		});
		$.on(this._$container, 'touchend', (event) => {
			this._onSlideEnd(event);
		});
	}

	_onSlideStart (x) {
		this._userSlideState.slide = true;
		this._userSlideState.start = x; 
	}

	_onSlideMove (x) {
		if (this._userSlideState.slide) {
			this._userSlideState.slide = false;
			this._direction = this.
				_calculateDirection(this._userSlideState.start, x);
		}
	}

	_onSlideEnd (event) {
		this._userSlideState.slide = false;
	}

	_setActive (item) {
		$.addClass(item, this.ACTIVE_CLASS);
	}

	_getItem (index) {
		return this._items.get(index);
	}

	_setItem (index, item) {
		this._items.set(index, item);
	}	
}


module.exports = Slider;