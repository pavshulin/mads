var $ = require('../common/mQuery'),
	Slider = require('./DefaultSlider');

const NEXT_FADE_ANIMATION_CLASS = 'slider-animate-fade-next',
	  ITEM_FADE_ANIMATION_CLASS = 'slider-animate-fade',
	  FADE_CONTAINER_CLASS = 'slider-fade-animation';

class FadeSlider extends Slider {
	constructor (el, config) {
		super(el, config);

		$.addClass(this._$container, FADE_CONTAINER_CLASS);
	}

	_startFadeAnimate (from, to) {
		$.addClass(from, ITEM_FADE_ANIMATION_CLASS)
			.addClass(to, NEXT_FADE_ANIMATION_CLASS);
	}

	_endFadeAnimate (from, to) {
		$.removeClass(from, ITEM_FADE_ANIMATION_CLASS)
			.removeClass(to, NEXT_FADE_ANIMATION_CLASS);
	}

	_onAfterFadeAnimate (from, to, next) {
			$.prepend(this._$container, to);

			this._unsetActiveClass(from);
			this._setActive(to);

			this._visible = next;	
			this._isAnimate = false;
	}

	left () {
		var next = this._getNextLeft(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		this._startFadeAnimate(from, to);
		
		setTimeout(() => {
			this._onAfterFadeAnimate(from, to, next);
		}, this.config.swipeSpeed);

	}

	right () {
		var next = this._getNextRight(),
			from = this._getItem(this._visible),
			to = this._getItem(next);
		
		this._isAnimate = true;
		this._startFadeAnimate(from, to);

		setTimeout(() => {
			this._endFadeAnimate(from, to);
			this._onAfterFadeAnimate(from, to, next);
		}, this.config.swipeSpeed);

	}

}

module.exports = FadeSlider;