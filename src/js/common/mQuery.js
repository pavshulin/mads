class mQuery {
	constructor () {

	}

	_isNodeListArray (obj) {
		var length = "length" in obj && obj.length,
			type = typeof obj;

		return type === "object" && length && obj.item 
			&& typeof obj.item === 'function';
	}

	find (parent, selector) {
		var result = [],
			element;

		if (typeof parent === 'string') {
			selector = parent;
			parent = window.document;
		}		

		return parent.querySelectorAll(selector);
	}

	each (el, callback) {
		if (!this._isNodeListArray(el)) {
			return null;
		}

		Array.prototype.forEach.call(el, (e) => {
			callback(e);
		})
	}

	_cssForElement (e, properties) {
		var prop;

		if (typeof properties !== 'object') {
			return null;
		}

		for (prop in properties) {
			if (properties.hasOwnProperty(prop)) {
				e.style[prop] = properties[prop];
			}
		}
	}

	css (el, properties) {
		if(this._isNodeListArray(el)) {
			this.each(el, (e) => {
				this._cssForElement(e, properties);
			})
		}
	}

	append () {

	}

	prepend () {

	}

	html () {

	}

	prop () {
		
	}
}

module.exports = new mQuery();