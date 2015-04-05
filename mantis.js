/*!
 * Mantis.js
 * http://mantisjs.com
 *
 * Copyright 2013 - 2015 Acaua Montiel (@acauamontiel)
 * Released under the MIT license (http://acaua.mit-license.org)
 */
(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Mantis = factory();
	}
})(this, function() {
	'use strict';
	/*
	 * Mantis.js
	 * Core - src/core.js
	 */
	var $ = function(selector, context) {
		return new Mantis.fn.init(selector, context);
	};
	$.fn = {};

	function Mantis(nodes) {
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
	Mantis.fn.init = function(selector, context) {
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
	/*
	 * Mantis.js
	 * Utils - src/utils.js
	 */
	$.extend = function(target, source) {
		var p;
		for (p in source) {
			try {
				if (source[p].constructor === Object) {
					target[p] = $.extend(target[p], source[p]);
				} else {
					target[p] = source[p];
				}
			} catch (e) {
				target[p] = source[p];
			}
		}
		return target;
	};
	Mantis.extend = Mantis.fn.extend = function(obj) {
		return $.extend(Mantis.fn, obj);
	};
	Mantis.extend({
		each: function(callback) {
			this.map(callback);
			return this;
		},
		map: function(callback) {
			var results = [],
				i;
			for (i = 0; i < this.length; i++) {
				results.push(callback.call(this[i], i, this[i]));
			}
			return results;
		},
		mapOne: function(callback) {
			var results = this.map(callback);
			return results.length > 1 ? results : results[0];
		}
	});
	return $;
});