var $ = require('../common/mQuery'),
	Slider = require('./DefaultSlider');

const ACTIVE_CLASS = 'slider-active-item';

class GlideSlider extends Slider {
	
	constructor (el, config) {
		super(el, config);
	}

	_startLeftGlideAnimate (from, to) {

	}

	_endLeftGlideAnimate (from, to, next) {
		$.prepend(this._$container, to)
			.removeClass(from, this.ACTIVE_CLASS)
			.addClass(to, this.ACTIVE_CLASS);

		this._endLeftGlideAnimate(from, to);
		this._visible = next;
		this._isAnimate = false;
	}

	_startRightGlideAnimate (from, to) {

	}

	_endRightGlideAnimate (from, to) {
		$.append(this._$container, from)
			.removeClass(from, this.ACTIVE_CLASS)
			.addClass(to, this.ACTIVE_CLASS);

		this._endRightGlideAnimate(from, to);
		this._visible = next;
		this._isAnimate = false;
	}

	left () {
		var next = this._getNextLeft(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		this._startLeftGlideAnimate(from, to);
		
		setTimeout(() => {
			this._endLeftGlideAnimate(from, to, next);
		}, this.config.swipeSpeed);

	}

	right () {
		var next = this._getNextRight(),
			from = this._getItem(this._visible),
			to = this._getItem(next);
		
		this._isAnimate = true;
		this._startRightGlideAnimate(from, to);

		setTimeout(() => {
			this._endRightGlideAnimate(from, to, next);
		}, this.config.swipeSpeed);

	}

}

module.exports = GlideSlider;