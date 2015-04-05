/*
 * Mantis.js
 * CSS - src/css.js
 */

Mantis.extend({
	css: function (prop, value) {
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
