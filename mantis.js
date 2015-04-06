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
		length: 0
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
	/*
	 * Mantis.js
	 * Attributes - src/attributes.js
	 */
	Mantis.extend({
		attr: function(attr, value) {
			if (typeof attr === 'object') {
				return this.each(function() {
					var a;
					for (a in attr) {
						this.setAttribute(a, attr[a]);
					}
				});
			} else {
				if (value) {
					return this.each(function() {
						this.setAttribute(attr, value);
					});
				} else {
					return this[0].getAttribute(attr);
				}
			}
		},
		removeAttr: function(value) {
			var v = value.split(' ');
			return this.each(function() {
				var i;
				for (i = 0; i < v.length; i++) {
					this.removeAttribute(v[i]);
				}
			});
		},
		hasAttr: function(value) {
			var v = value.split(' '),
				r = false;
			this.each(function() {
				for (var i = 0; i < v.length; i++) {
					if (this.hasAttribute(v[i])) {
						r = true;
					}
				}
			});
			return r;
		}
	});
	/*
	 * Mantis.js
	 * CSS - src/css.js
	 */
	Mantis.extend({
		css: function(prop, value) {
			if (typeof prop === 'object') {
				return this.each(function() {
					var key;
					for (key in prop) {
						this.style[key] = prop[key];
					}
				});
			} else if (value) {
				return this.each(function() {
					this.style[prop] = value;
				});
			} else {
				return getComputedStyle(this[0], null).getPropertyValue(prop);
			}
		}
	});
	/*
	 * Mantis.js
	 * Classes - src/classes.js
	 */
	Mantis.extend({
		addClass: function(value) {
			if (this[0].classList) {
				var v = value.split(' ');
				return this.each(function() {
					var i;
					for (i = 0; i < v.length; i++) {
						this.classList.add(v[i]);
					}
				});
			} else {
				return this.each(function() {
					this.className += (this.className === '') ? value : ' ' + value;
				});
			}
		},
		removeClass: function(value) {
			var v = value.split(' ');
			if (this[0].classList) {
				return this.each(function() {
					var i;
					for (i = 0; i < v.length; i++) {
						this.classList.remove(v[i]);
					}
				});
			} else {
				return this.each(function() {
					var c = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ',
						i;
					for (i = 0; i < v.length; i++) {
						while (c.indexOf(' ' + v[i] + ' ') >= 0) {
							c = c.replace(' ' + v[i] + ' ', ' ');
						}
					}
					this.className = c.replace(/^\s+|\s+$/g, '');
				});
			}
		},
		hasClass: function(value) {
			var v = value.split(' '),
				contains,
				i;
			if (this[0].classList) {
				contains = function(v) {
					return this.classList.contains(v);
				};
			} else {
				contains = function(v) {
					var c = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
					return (c.indexOf(' ' + v + ' ') >= 0);
				};
			}
			for (i = 0; i < v.length; i++) {
				if (contains.call(this[0], v[i])) {
					return true;
				}
			}
			return false;
		}
	});
	return $;
});