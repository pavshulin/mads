var $ = require('../common/mQuery'),
	Slider = require('./index');

class FadeSlider extends Slider {
	constructor (config) {
		super(config);
	}

	_startFadeAnimate (from, to) {
		$.addClass(from, 'slider-animate-fade');
		$.addClass(to, 'slider-animate-fade-next');
	}

	_endFadeAnimate (from, to) {
		$.removeClass(from, 'slider-animate-fade');
		$.removeClass(to, 'slider-animate-fade-next');
	}

	left () {
		var next = this._getNextLeft(),
			from = this._getItem(this._visible),
			to = this._getItem(next);

		this._startFadeAnimate(from, to);
		
		setTimeout(() => {
			$.prepend(this._$container, to);
			$.removeClass(from, this.ACTIVE_CLASS);
			$.addClass(to, this.ACTIVE_CLASS);	
			this._endFadeAnimate(from, to);

			this._visible = next;
		}, this.config.swipeSpeed);

	}

	right () {
		var next = this._getNextRight(),
			from = this._getItem(this._visible),
			to = this._getItem(next);
		
		this._isAnimate = true;
		this._startFadeAnimate(from, to);

		setTimeout(() => {
			$.append(this._$container, from);
			$.removeClass(from, this.ACTIVE_CLASS);
			$.addClass(to, this.ACTIVE_CLASS);	
			this._endFadeAnimate(from, to);

			this._visible = next;
			this._isAnimate = false;
		}, this.config.swipeSpeed);

	}

}

module.exports = FadeSlider;