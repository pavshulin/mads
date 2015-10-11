class mQuery {
	constructor () {

	}

	_isNodeListArray (obj) {
		var length = "length" in obj && obj.length,
			type = typeof obj;

		return type === "object" && length && obj.item 
			&& typeof obj.item === 'function';
	}

	_isNodeElement (el) {
		return el && 'nodeType' in el && el.nodeType === 1;
	}

	findAll (parent, selector) {
		var result = [],
			element;

		if (typeof parent === 'string') {
			selector = parent;
			parent = window.document;
		}		

		return parent.querySelectorAll(selector);
	}

	find (parent, selector) {
		return this.get(this.findAll(parent, selector), 0);
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
		} else if (this._isNodeElement(el)) {
			this._cssForElement(el, properties);
		}
	}

	append (parent, el) {
		parent.appendChild(el);
	}

	prepend (parent, el) {
		parent.insertBefore(el, parent.firstChild);
	}

	html (el, content) {
		if (content && outerHTML in content 
			&& typeof content.outerHTML === 'string') {
			content = content.outerHTML;
		}

		el.innerHTML = content;
	}

	_propForElement (e, properties) {
		var prop;

		if (typeof properties !== 'object') {
			return null;
		}

		for (prop in properties) {
			if (properties.hasOwnProperty(prop)) {
				e.setAttribute(prop, properties[prop]);
			}
		}
	}

	prop (elements, properties) {
		if(this._isNodeListArray(elements)) {
			this.each(elements, (e) => {
				this._propForElement(e, properties);
			})
		} else if (this._isNodeElement(elements)) {
			this._propForElement(elements, properties);
		}
	}

	createElement (elementName) {
		return document.createElement(elementName);
	}
	
	get (set, index) {
		if (!this._isNodeListArray(set) || set.length < index) {
			return null;
		}

		return set[index];
	}

}

module.exports = new mQuery();