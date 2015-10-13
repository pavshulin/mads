var $ = require('../common/mQuery'),
	Slider = require('./DefaultSlider');

const ITEM_GLIDE_ANIMATION_RIGHT_CLASS = 'slider-animate-right-glide',
	  NEXT_GLIDE_RIGHT_NEXT_CLASS = 'slider-glide-right-next',
	  ITEM_GLIDE_ANIMATION_LEFT_CLASS = 'slider-animate-left-glide',
  	  NEXT_GLIDE_LEFT_NEXT_CLASS = 'slider-glide-left-next',
	  GLIDE_CONTAINER_CLASS = 'slider-glide-animation';

class GlideSlider extends Slider {
	
	constructor (el, config) {
		super(el, config);

		$.addClass(this._$container, GLIDE_CONTAINER_CLASS);
	}

	_onAfterAnimation (from, to, next) {
		this._unsetActiveClass(from);
		this._setActive(to);	

		this._visible = next;
		this._isAnimate = false;
	}

	_startLeftGlideAnimate (from, to) {
		$.prepend(this._$container, to);

		$.addClass(to, NEXT_GLIDE_LEFT_NEXT_CLASS)
			$.addClass(from, ITEM_GLIDE_ANIMATION_LEFT_CLASS);
			$.css(to, {
				'margin-left': '0'
			});			
	}

	_endLeftGlideAnimate (from, to) {
		$.prepend(this._$container, to);

		$.removeClass(to, NEXT_GLIDE_LEFT_NEXT_CLASS)
			.removeClass(from, ITEM_GLIDE_ANIMATION_LEFT_CLASS);
	}

	_startRightGlideAnimate (from, to) {
		$.addClass(to, NEXT_GLIDE_RIGHT_NEXT_CLASS)
			.addClass(from, ITEM_GLIDE_ANIMATION_RIGHT_CLASS);
	}

	_endRightGlideAnimate (from, to, next) {
		$.append(this._$container, from);

		$.removeClass(to, NEXT_GLIDE_RIGHT_NEXT_CLASS)
			.removeClass(from, ITEM_GLIDE_ANIMATION_RIGHT_CLASS);
	}

	left () {
		var next = this._getNextLeft(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		this._isAnimate = true;
		this._startLeftGlideAnimate(from, to);
		
		setTimeout(() => {
			this._endLeftGlideAnimate(from, to);
			this._onAfterAnimation(from, to, next);	
		}, this.config.swipeSpeed);

	}

	right () {
		var next = this._getNextRight(),
			from = this._getItem(this._visible),
			to = this._getItem(next);
		
		this._isAnimate = true;
		this._startRightGlideAnimate(from, to);

		setTimeout(() => {
			this._endRightGlideAnimate(from, to);
			this._onAfterAnimation(from, to, next);	
		}, this.config.swipeSpeed);

	}

}

module.exports = GlideSlider;