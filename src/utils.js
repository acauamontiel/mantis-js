/*
 * Mantis.js
 * Utils - src/utils.js
 */

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
	},

	mapOne: function (callback) {
		var results = this.map(callback);
		return results.length > 1 ? results : results[0];
	}
});
