var $ = require('../common/mQuery');

const CONTAINER_CLASS = 'slider-container',
	  ACTIVE_CLASS = 'slider-active-item',
	  WRAPPER_CLASS = 'slider-wrapper',
	  ITEM_CLASS = 'slider-item',
	  DEFAULT_CONFIG = {
	  	swipeSpeed: 500
	  };

class Slider {
	
	constructor (el, config) {
		this._initializeDefaults();
		
		this.config = config || DEFAULT_CONFIG;

		this._initializeElements(el)
			._createItems()
			.defineSwipeSpeed()
			.initializeListeners();

		this._setActive(this._getItem(0));

		return this;
	}

	_initializeDefaults () {
		this._items = new Map();
		this._length = 0;
		this._userSlideState = {};
		this._visible = 0;
		this._isAnimate = false;

		return this;
	}

	defineSwipeSpeed () {
		if (this.config.swipeSpeed !== DEFAULT_CONFIG.swipeSpeed) {
			$.each($.findAll(this._$container, ['.', ITEM_CLASS].join('')), (el) => {
				$.css(el, {
					'transition-duration': (this.config.swipeSpeed || 0) + 'ms'  
				})
			});
		}

		return this;
	}

	_initializeElements (el) {
		this._$slider = el;
		this._$container = $.createElement('div');

		$.append(this._$slider, this._$container)
			.addClass(this._$slider, WRAPPER_CLASS)
			.addClass(this._$container, CONTAINER_CLASS);

		return this;
	}

	_createItem (src) {
		var div = $.createElement('div'),
			img = $.createElement('img');

		$.prop(div, {
				'class': ITEM_CLASS
			})
			.prop(img, {
				'src': src
			})
			.append(div, img);

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
		return x1 - x2 > 0 && 'right' || 'left';
	} 

	initializeListeners () {
		$.on(this._$container, 'mousedown', (event) => {
			this._onSlideStart(this._getMouseEventX(event));
			event.preventDefault();
		})
			.on(this._$container, 'touchstart', (event) => {
				this._onSlideStart(this._getTouchEventX(event));
				event.preventDefault();
			})
			.on(this._$container, 'mousemove', (event) => {
				this._onSlideMove(this._getMouseEventX(event));
			})
			.on(this._$container, 'touchmove', (event) => {
				this._onSlideMove(this._getTouchEventX(event));
			})
			.on(this._$container, 'mouseup', (event) => {
				this._onSlideEnd(event);
			})
			.on(this._$container, 'touchend', (event) => {
				this._onSlideEnd(event);
			});
	}

	_onSlideStart (x) {
		this._userSlideState.slide = true;
		this._userSlideState.start = x; 
	}

	_onSlideMove (x) {
		if (!this._isAnimate && this._userSlideState.slide) {
			this._userSlideState.slide = false;
			this._direction = this.
				_calculateDirection(this._userSlideState.start, x);

			this[this._direction]();	
		}
	}

	_onSlideEnd (event) {
		this._userSlideState.slide = false;
	}

	_setActive (item) {
		$.addClass(item, ACTIVE_CLASS);
	}

	_unsetActiveClass (item) {
		$.removeClass(item, ACTIVE_CLASS);
	}

	_getItem (index) {
		return this._items.get(index);
	}

	_setItem (index, item) {
		this._items.set(index, item);
	}	

	left () {
		var next = this._getNextLeft(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		$.prepend(this._$container, to);

		this._unsetActiveClass(from);
		this._setActive(to);	

		this._visible = next;
		this._isAnimate = false;
	}

	right () {
		var next = this._getNextRight(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		$.append(this._$container, from);
		
		this._unsetActiveClass(from);
		this._setActive(to);	

		this._visible = next;	
		this._isAnimate = false;
	}

	_getNextLeft () {
		return this._visible !== 0 ? this._visible - 1 : this._length - 1;
	}

	_getNextRight () {
		return this._visible === this._length - 1 ? 0 : this._visible + 1;
	}
}

module.exports = Slider;