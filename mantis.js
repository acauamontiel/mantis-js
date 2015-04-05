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
	return $;
});