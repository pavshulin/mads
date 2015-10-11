var $ = require('../common/mQuery');

class Slider {
	constructor (config) {

		this._items = new Map();
		this._length = 0;

		this._initializeStaticProperties();
		this.config = config || this.defaultConfig;

		this._initializeElements()
			._createItems();

		this._setActive(this._getItem(0));

		return this;
	}

	_initializeStaticProperties () {
		Object.defineProperty(this, 'defaultConfig', {
			value: {},
			writable: false
		});

		Object.defineProperty(this, 'ACTIVE_CLASS', {
			value: 'slider-active-item',
			writable: false
		});

		Object.defineProperty(this, 'ITEM_CLASS', {
			value: 'slider-item',
			writable: false
		});

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

	_setActive (item) {
		$.prop(item, {
			'class': this.ACTIVE_CLASS
		});
	}

	_getItem (index) {
		return this._items.get(index);
	}
	_setItem (index, item) {
		this._items.set(index, item);
	}
}


module.exports = Slider;