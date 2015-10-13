(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = require('./common/mQuery'),
    Slider = require('./slider/DefaultSlider'),
    FadeSlider = require('./slider/FadeSlider'),
    GlideSlider = require('./slider/GlideSlider');

window.GlideSlider = GlideSlider;
window.FadeSlider = FadeSlider;
window.Slider = Slider;

},{"./common/mQuery":2,"./slider/DefaultSlider":3,"./slider/FadeSlider":4,"./slider/GlideSlider":5}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mQuery = (function () {
	function mQuery() {
		_classCallCheck(this, mQuery);
	}

	_createClass(mQuery, [{
		key: "_isNodeListArray",
		value: function _isNodeListArray(obj) {
			var length = "length" in obj && obj.length,
			    type = typeof obj;

			return type === "object" && length && obj.item && typeof obj.item === 'function';
		}
	}, {
		key: "_isNodeElement",
		value: function _isNodeElement(el) {
			return el && 'nodeType' in el && el.nodeType === 1;
		}
	}, {
		key: "findAll",
		value: function findAll(parent, selector) {
			var result = [],
			    element;

			if (typeof parent === 'string') {
				selector = parent;
				parent = window.document;
			}

			return parent.querySelectorAll(selector);
		}
	}, {
		key: "find",
		value: function find(parent, selector) {
			return this.get(this.findAll(parent, selector), 0);
		}
	}, {
		key: "each",
		value: function each(el, callback) {
			if (!this._isNodeListArray(el)) {
				return null;
			}

			Array.prototype.forEach.call(el, function (e) {
				callback(e);
			});

			return this;
		}
	}, {
		key: "_cssForElement",
		value: function _cssForElement(e, properties) {
			var prop;

			if (typeof properties !== 'object') {
				return null;
			}

			for (prop in properties) {
				if (properties.hasOwnProperty(prop)) {
					e.style[prop] = properties[prop];
				}
			}

			return this;
		}
	}, {
		key: "css",
		value: function css(el, properties) {
			var _this = this;

			if (this._isNodeListArray(el)) {
				this.each(el, function (e) {
					_this._cssForElement(e, properties);
				});
			} else if (this._isNodeElement(el)) {
				this._cssForElement(el, properties);
			}

			return this;
		}
	}, {
		key: "append",
		value: function append(parent, el) {
			parent.appendChild(el);
			return this;
		}
	}, {
		key: "prepend",
		value: function prepend(parent, el) {
			parent.insertBefore(el, parent.firstChild);
			return this;
		}
	}, {
		key: "html",
		value: function html(el, content) {
			if (content && outerHTML in content && typeof content.outerHTML === 'string') {
				content = content.outerHTML;
			}

			el.innerHTML = content;
			return this;
		}
	}, {
		key: "_propForElement",
		value: function _propForElement(e, properties) {
			var prop;

			if (typeof properties !== 'object') {
				return null;
			}

			for (prop in properties) {
				if (properties.hasOwnProperty(prop)) {
					e.setAttribute(prop, properties[prop]);
				}
			}
			return this;
		}
	}, {
		key: "getProp",
		value: function getProp(el, property) {
			if (!this._isNodeElement(el)) {
				return null;
			}

			return el.getAttribute(property);
		}
	}, {
		key: "prop",
		value: function prop(elements, properties) {
			var _this2 = this;

			if (this._isNodeListArray(elements)) {
				this.each(elements, function (e) {
					_this2._propForElement(e, properties);
				});
			} else if (this._isNodeElement(elements)) {
				this._propForElement(elements, properties);
			}
			return this;
		}
	}, {
		key: "createElement",
		value: function createElement(elementName) {
			return document.createElement(elementName);
			return this;
		}
	}, {
		key: "get",
		value: function get(set, index) {
			if (!this._isNodeListArray(set) || set.length < index) {
				return null;
			}

			return set[index];
		}
	}, {
		key: "addClass",
		value: function addClass(el, className) {
			if (this._isNodeElement(el)) {
				el.className = [el.className, className].join(' ');
			}
			return this;
		}
	}, {
		key: "removeClass",
		value: function removeClass(el, className) {
			var classes, i;

			if (this._isNodeElement(el)) {
				classes = el.className.split(' ');
				i = classes.indexOf(className);

				if (i >= 0) {
					classes.splice(i, 1);
					el.className = classes.join(' ');
				}
			}
			return this;
		}
	}, {
		key: "on",
		value: function on(el, event, callback) {
			el.addEventListener(event, callback);
			return this;
		}
	}, {
		key: "off",
		value: function off(el, event, callback) {
			el.removeEventListener(event, callback);
			return this;
		}
	}]);

	return mQuery;
})();

module.exports = new mQuery();

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = require('../common/mQuery');

var CONTAINER_CLASS = 'slider-container',
    ACTIVE_CLASS = 'slider-active-item',
    WRAPPER_CLASS = 'slider-wrapper',
    ITEM_CLASS = 'slider-item',
    MODES = {
	AUTOMANUAL: 'automanual',
	MANUAL: 'manual',
	AUTO: 'auto'
},
    DEFAULT_CONFIG = {
	swipeSpeed: 500,
	mode: MODES.MANUAL
};

var Slider = (function () {
	function Slider(el, config) {
		_classCallCheck(this, Slider);

		this.config = config || DEFAULT_CONFIG;

		this._initializeDefaults()._initializeElements(el)._createItems()._defineSwipeSpeed()._initializeListeners()._checkMode();

		this._setActive(this._getItem(0));

		return this;
	}

	_createClass(Slider, [{
		key: '_initializeDefaults',
		value: function _initializeDefaults() {
			this._mode = this.config.mode;
			this._userSlideState = {};
			this._autoSwipeID = null;
			this._items = new Map();
			this._isAnimate = false;
			this._visible = 0;
			this._length = 0;

			return this;
		}
	}, {
		key: '_defineSwipeSpeed',
		value: function _defineSwipeSpeed() {
			var _this = this;

			var items;

			if (this.config.swipeSpeed !== DEFAULT_CONFIG.swipeSpeed) {
				items = $.findAll(this._$container, ['.', ITEM_CLASS].join(''));

				$.each(items, function (el) {
					$.css(el, {
						'transition-duration': (_this.config.swipeSpeed || 0) + 'ms'
					});
				});
			}

			return this;
		}
	}, {
		key: '_checkMode',
		value: function _checkMode() {
			var _this2 = this;

			if (this.config.mode === MODES.AUTO || this.config.mode === MODES.AUTOMANUAL) {
				this._autoSwipeID = setInterval(function () {
					_this2._autoSwipe();
				}, this.config.swipeDelay);
			}
		}
	}, {
		key: '_autoSwipe',
		value: function _autoSwipe() {
			this.right();
		}
	}, {
		key: '_switchToManual',
		value: function _switchToManual() {
			this._mode = MODES.MANUAL;
			clearInterval(this._autoSwipeID);
		}
	}, {
		key: '_initializeElements',
		value: function _initializeElements(el) {
			this._$slider = el;
			this._$container = $.createElement('div');

			$.append(this._$slider, this._$container).addClass(this._$slider, WRAPPER_CLASS).addClass(this._$container, CONTAINER_CLASS);

			return this;
		}
	}, {
		key: '_createItem',
		value: function _createItem(src) {
			var div = $.createElement('div'),
			    img = $.createElement('img');

			$.prop(div, {
				'class': ITEM_CLASS
			}).prop(img, {
				'src': src
			}).append(div, img);

			return div;
		}
	}, {
		key: '_createItems',
		value: function _createItems() {
			var _this3 = this;

			var imgs = this.config.images;

			imgs.forEach(function (src) {
				var item = _this3._createItem(src);
				_this3._setItem(_this3._length++, item);

				$.append(_this3._$container, item);
			});

			return this;
		}
	}, {
		key: '_getMouseEventX',
		value: function _getMouseEventX(event) {
			return event.clientX;
		}
	}, {
		key: '_getTouchEventX',
		value: function _getTouchEventX(event) {
			var touch = event.touches[0];

			return touch && touch.pageX;
		}
	}, {
		key: '_calculateDirection',
		value: function _calculateDirection(x1, x2) {
			return x1 - x2 > 0 && 'right' || 'left';
		}
	}, {
		key: '_initializeListeners',
		value: function _initializeListeners() {
			var _this4 = this;

			$.on(this._$container, 'mousedown', function (event) {
				_this4._onSlideStart(_this4._getMouseEventX(event));
				event.preventDefault();
			}).on(this._$container, 'touchstart', function (event) {
				_this4._onSlideStart(_this4._getTouchEventX(event));
				event.preventDefault();
			}).on(this._$container, 'mousemove', function (event) {
				_this4._onSlideMove(_this4._getMouseEventX(event));
			}).on(this._$container, 'touchmove', function (event) {
				_this4._onSlideMove(_this4._getTouchEventX(event));
			}).on(this._$container, 'mouseup', function (event) {
				_this4._onSlideEnd(event);
			}).on(this._$container, 'touchend', function (event) {
				_this4._onSlideEnd(event);
			});

			return this;
		}
	}, {
		key: '_onSlideStart',
		value: function _onSlideStart(x) {
			this._userSlideState.slide = true;
			this._userSlideState.start = x;
		}
	}, {
		key: '_onSlideMove',
		value: function _onSlideMove(x) {
			var direction;

			if (!this._isAnimate && this._userSlideState.slide) {
				this._userSlideState.slide = false;
				direction = this._calculateDirection(this._userSlideState.start, x);

				this.slideRuler(direction);
			}
		}
	}, {
		key: '_onSlideEnd',
		value: function _onSlideEnd(event) {
			this._userSlideState.slide = false;
		}
	}, {
		key: 'getSwipeMethod',
		value: function getSwipeMethod(direction) {
			return direction in this && this[direction] || this.right;
		}
	}, {
		key: 'slideRuler',
		value: function slideRuler(direction) {

			if (this._mode === MODES.AUTO) {
				return false;
			}

			if (this._mode === MODES.AUTOMANUAL) {
				this._switchToManual();
			}

			// should return left or right method and call them;
			this.getSwipeMethod(direction).call(this);
		}
	}, {
		key: '_setActive',
		value: function _setActive(item) {
			$.addClass(item, ACTIVE_CLASS);
		}
	}, {
		key: '_unsetActiveClass',
		value: function _unsetActiveClass(item) {
			$.removeClass(item, ACTIVE_CLASS);
		}
	}, {
		key: '_getItem',
		value: function _getItem(index) {
			return this._items.get(index);
		}
	}, {
		key: '_setItem',
		value: function _setItem(index, item) {
			this._items.set(index, item);
		}
	}, {
		key: 'left',
		value: function left() {
			var next = this._getNextLeft(),
			    from = this._getItem(this._visible),
			    to = this._getItem(next);

			$.prepend(this._$container, to);

			this._unsetActiveClass(from);
			this._setActive(to);

			this._visible = next;
			this._isAnimate = false;
		}
	}, {
		key: 'right',
		value: function right() {
			var next = this._getNextRight(),
			    from = this._getItem(this._visible),
			    to = this._getItem(next);

			$.append(this._$container, from);

			this._unsetActiveClass(from);
			this._setActive(to);

			this._visible = next;
			this._isAnimate = false;
		}
	}, {
		key: '_getNextLeft',
		value: function _getNextLeft() {
			return this._visible !== 0 ? this._visible - 1 : this._length - 1;
		}
	}, {
		key: '_getNextRight',
		value: function _getNextRight() {
			return this._visible === this._length - 1 ? 0 : this._visible + 1;
		}
	}]);

	return Slider;
})();

module.exports = Slider;

},{"../common/mQuery":2}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('../common/mQuery'),
    Slider = require('./DefaultSlider');

var NEXT_FADE_ANIMATION_CLASS = 'slider-animate-fade-next',
    ITEM_FADE_ANIMATION_CLASS = 'slider-animate-fade',
    FADE_CONTAINER_CLASS = 'slider-fade-animation';

var FadeSlider = (function (_Slider) {
	_inherits(FadeSlider, _Slider);

	function FadeSlider(el, config) {
		_classCallCheck(this, FadeSlider);

		_get(Object.getPrototypeOf(FadeSlider.prototype), 'constructor', this).call(this, el, config);

		$.addClass(this._$container, FADE_CONTAINER_CLASS);
	}

	_createClass(FadeSlider, [{
		key: '_startFadeAnimate',
		value: function _startFadeAnimate(from, to) {
			$.addClass(from, ITEM_FADE_ANIMATION_CLASS).addClass(to, NEXT_FADE_ANIMATION_CLASS);
		}
	}, {
		key: '_endFadeAnimate',
		value: function _endFadeAnimate(from, to) {
			$.removeClass(from, ITEM_FADE_ANIMATION_CLASS).removeClass(to, NEXT_FADE_ANIMATION_CLASS);
		}
	}, {
		key: '_onAfterFadeAnimate',
		value: function _onAfterFadeAnimate(from, to, next) {
			$.prepend(this._$container, to);

			this._unsetActiveClass(from);
			this._setActive(to);

			this._visible = next;
			this._isAnimate = false;
		}
	}, {
		key: 'left',
		value: function left() {
			var _this = this;

			var next = this._getNextLeft(),
			    from = this._getItem(this._visible),
			    to = this._getItem(next);

			this._startFadeAnimate(from, to);

			setTimeout(function () {
				_this._onAfterFadeAnimate(from, to, next);
			}, this.config.swipeSpeed);
		}
	}, {
		key: 'right',
		value: function right() {
			var _this2 = this;

			var next = this._getNextRight(),
			    from = this._getItem(this._visible),
			    to = this._getItem(next);

			this._isAnimate = true;
			this._startFadeAnimate(from, to);

			setTimeout(function () {
				_this2._endFadeAnimate(from, to);
				_this2._onAfterFadeAnimate(from, to, next);
			}, this.config.swipeSpeed);
		}
	}]);

	return FadeSlider;
})(Slider);

module.exports = FadeSlider;

},{"../common/mQuery":2,"./DefaultSlider":3}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('../common/mQuery'),
    Slider = require('./DefaultSlider');

var ITEM_GLIDE_ANIMATION_RIGHT_CLASS = 'slider-animate-right-glide',
    NEXT_GLIDE_RIGHT_NEXT_CLASS = 'slider-glide-right-next',
    ITEM_GLIDE_ANIMATION_LEFT_CLASS = 'slider-animate-left-glide',
    NEXT_GLIDE_LEFT_NEXT_CLASS = 'slider-glide-left-next',
    GLIDE_CONTAINER_CLASS = 'slider-glide-animation';

var GlideSlider = (function (_Slider) {
	_inherits(GlideSlider, _Slider);

	function GlideSlider(el, config) {
		_classCallCheck(this, GlideSlider);

		_get(Object.getPrototypeOf(GlideSlider.prototype), 'constructor', this).call(this, el, config);

		$.addClass(this._$container, GLIDE_CONTAINER_CLASS);
	}

	_createClass(GlideSlider, [{
		key: '_onAfterAnimation',
		value: function _onAfterAnimation(from, to, next) {
			this._unsetActiveClass(from);
			this._setActive(to);

			this._visible = next;
			this._isAnimate = false;
		}
	}, {
		key: '_startLeftGlideAnimate',
		value: function _startLeftGlideAnimate(from, to) {
			$.prepend(this._$container, to);

			$.addClass(to, NEXT_GLIDE_LEFT_NEXT_CLASS);
			$.addClass(from, ITEM_GLIDE_ANIMATION_LEFT_CLASS);
			$.css(to, {
				'margin-left': '0'
			});
		}
	}, {
		key: '_endLeftGlideAnimate',
		value: function _endLeftGlideAnimate(from, to) {
			$.prepend(this._$container, to);

			$.removeClass(to, NEXT_GLIDE_LEFT_NEXT_CLASS).removeClass(from, ITEM_GLIDE_ANIMATION_LEFT_CLASS);
		}
	}, {
		key: '_startRightGlideAnimate',
		value: function _startRightGlideAnimate(from, to) {
			$.addClass(to, NEXT_GLIDE_RIGHT_NEXT_CLASS).addClass(from, ITEM_GLIDE_ANIMATION_RIGHT_CLASS);
		}
	}, {
		key: '_endRightGlideAnimate',
		value: function _endRightGlideAnimate(from, to, next) {
			$.append(this._$container, from);

			$.removeClass(to, NEXT_GLIDE_RIGHT_NEXT_CLASS).removeClass(from, ITEM_GLIDE_ANIMATION_RIGHT_CLASS);
		}
	}, {
		key: 'left',
		value: function left() {
			var _this = this;

			var next = this._getNextLeft(),
			    from = this._getItem(this._visible),
			    to = this._getItem(next);

			this._isAnimate = true;
			this._startLeftGlideAnimate(from, to);

			setTimeout(function () {
				_this._endLeftGlideAnimate(from, to);
				_this._onAfterAnimation(from, to, next);
			}, this.config.swipeSpeed);
		}
	}, {
		key: 'right',
		value: function right() {
			var _this2 = this;

			var next = this._getNextRight(),
			    from = this._getItem(this._visible),
			    to = this._getItem(next);

			this._isAnimate = true;
			this._startRightGlideAnimate(from, to);

			setTimeout(function () {
				_this2._endRightGlideAnimate(from, to);
				_this2._onAfterAnimation(from, to, next);
			}, this.config.swipeSpeed);
		}
	}]);

	return GlideSlider;
})(Slider);

module.exports = GlideSlider;

},{"../common/mQuery":2,"./DefaultSlider":3}]},{},[1,2,3,4,5]);
