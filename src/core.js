/*
 * Mantis.js
 * Core - src/core.js
 */

var $ = function (selector, context) {
	return new Mantis.fn.init(selector, context);
};

$.fn = {};

$.extend = function (target, source) {
	var p;

	for (p in source) {
		try {
			if (source[p].constructor === Object) {
				target[p] = $.extend(target[p], source[p]);
			} else {
				target[p] = source[p];
			}
		} catch(e) {
			target[p] = source[p];
		}
	}

	return target;
};

function Mantis (nodes) {
	var i;

	for (i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}

	this.length = nodes.length;
	this.selector = nodes.selector;
	this.context = nodes.context;
}

Mantis.fn = Mantis.prototype = {
	constructor: Mantis,
	version: '0.0.0',
	selector: '',
	length: 0,
	__proto__: []
};

$.fn = Mantis.fn;

Mantis.fn.init = function (selector, context) {
	var nodes;

	if (!selector) {
		return this;
	}

	context = context || document;

	if (typeof selector === 'string') {
		nodes = context.querySelectorAll(selector);
	} else if (selector.length) {
		nodes = selector;
	} else {
		nodes = [selector];
	}

	nodes.selector = selector;
	nodes.context = context;

	return new Mantis(nodes);
};

Mantis.fn.init.prototype = Mantis.fn;

Mantis.extend = Mantis.fn.extend = function (obj) {
	return $.extend(Mantis.fn, obj);
};
