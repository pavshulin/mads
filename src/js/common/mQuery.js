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
		});

		return this;
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

		return this;
	}

	css (el, properties) {
		if(this._isNodeListArray(el)) {
			this.each(el, (e) => {
				this._cssForElement(e, properties);
			})
		} else if (this._isNodeElement(el)) {
			this._cssForElement(el, properties);
		}

		return this;
	}

	append (parent, el) {
		parent.appendChild(el);
		return this;
	}

	prepend (parent, el) {
		parent.insertBefore(el, parent.firstChild);
		return this;
	}

	html (el, content) {
		if (content && outerHTML in content 
			&& typeof content.outerHTML === 'string') {
			content = content.outerHTML;
		}

		el.innerHTML = content;
		return this;
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
		return this;
	}

	getProp (el, property) {
		if (!this._isNodeElement(el)) {
			return null;
		}

		return el.getAttribute(property);
	}

	prop (elements, properties) {
		if(this._isNodeListArray(elements)) {
			this.each(elements, (e) => {
				this._propForElement(e, properties);
			})
		} else if (this._isNodeElement(elements)) {
			this._propForElement(elements, properties);
		}
		return this;
	}

	createElement (elementName) {
		return document.createElement(elementName);
		return this;
	}
	
	get (set, index) {
		if (!this._isNodeListArray(set) || set.length < index) {
			return null;
		}

		return set[index];
	}

	addClass (el, className) {
	   	if (this._isNodeElement(el)) {
        	el.className = [el.className, className].join(' ');
    	}
    	return this;
	}

	removeClass (el, className) {
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

	on (el, event, callback) {
		el.addEventListener(event, callback);
		return this;
	}

	off (el, event, callback) {
		el.removeEventListener(event, callback);
		return this;
	}
}

module.exports = new mQuery();