/*
 * Mantis.js
 * Utils - src/utils.js
 */

for (var i = 0; types.length > i; i++) {
	class2type['[object ' + types[i] + ']' ] = types[i].toLowerCase();
}

$.type = function (obj) {
	if (obj == null) {
		return obj + '';
	}

	if (typeof obj === 'object' || typeof obj === 'function') {
		return class2type[class2type.toString.call(obj)] || 'object';
	} else {
		return typeof obj;
	}
};

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

Mantis.extend = Mantis.fn.extend = function (obj) {
	return $.extend(Mantis.fn, obj);
};

Mantis.extend({
	each: function (callback) {
		this.map(callback);
		return this;
	},

	map: function (callback) {
		var results = [],
			i;

		for (i = 0; i < this.length; i++) {
			results.push(callback.call(this[i], i, this[i]));
		}

		return results;
	}
});
