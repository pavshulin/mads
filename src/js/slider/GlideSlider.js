var $ = require('../common/mQuery'),
	Slider = require('./index');

class GlideSlider extends Slider {
	constructor (config) {
		super(config);
	}

	_startLeftGlideAnimate (from, to) {

	}

	_endLeftGlideAnimate (from, to) {

	}

	_startRightGlideAnimate (from, to) {

	}

	_endRightGlideAnimate (from, to) {

	}

	left () {
		var next = this._getNextLeft(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		this._startLeftGlideAnimate(from, to);
		
		setTimeout(() => {
			$.prepend(this._$container, to);
			$.removeClass(from, this.ACTIVE_CLASS);
			$.addClass(to, this.ACTIVE_CLASS);	
			this._endLeftGlideAnimate(from, to);

			this._visible = next;
		}, this.config.swipeSpeed);

	}

	right () {
		var next = this._getNextRight(),
			from = this._getItem(this._visible),
			to = this._getItem(next);
		
		this._isAnimate = true;
		this._startRightGlideAnimate(from, to);

		setTimeout(() => {
			$.append(this._$container, from);
			$.removeClass(from, this.ACTIVE_CLASS);
			$.addClass(to, this.ACTIVE_CLASS);	
			this._endRightGlideAnimate(from, to);

			this._visible = next;
			this._isAnimate = false;
		}, this.config.swipeSpeed);

	}

}

module.exports = FadeSlider;