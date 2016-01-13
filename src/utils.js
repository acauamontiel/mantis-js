/*
 * Mantis.js
 * Utils - src/utils.js
 */

function likeArray(obj) {
	return typeof obj.length === 'number';
}

function flatten(array) {
	return array.length > 0 ? [].concat.apply([], array) : array;
}

$.map = function (elements, callback) {
	var results = [],
		result,
		key,
		i;

	if (likeArray(elements)) {
		for (i = 0; i < elements.length; i++) {
			result = callback(elements[i], i);

			if (result != null) {
				results.push(result);
			}
		}
	} else {
		for (key in elements) {
			result = callback(elements[key], key);

			if (result != null) {
				results.push(result);
			}
		}
	}

	return flatten(results);
};

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
		return this.map(callback);
	},

	map: function (callback) {
		return $.map(this, function(element, i) {
			return callback.call(element, i, element);
		});
	}
});
