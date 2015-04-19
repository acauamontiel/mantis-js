/*!
 * Mantis.js
 * http://mantisjs.com
 *
 * Copyright 2013 - 2015 Acaua Montiel (@acauamontiel)
 * Released under the MIT license (http://acaua.mit-license.org)
 */

(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Mantis = root.$ = factory();
	}
})(this, function () {
	'use strict';

	//= include ./core.js
	//= include ./utils.js
	//= include ./attributes.js
	//= include ./css.js
	//= include ./classes.js
	//= include ./manipulation.js

	$.noConflict = function (deep) {
		if (window.$ === $) {
			window.$ = _$;
		}

		if (deep && window.Mantis === $) {
			window.Mantis = _Mantis;
		}

		return $;
	};

	return $;
});
