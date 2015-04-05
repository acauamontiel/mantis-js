/*
 * Mantis.js
 * Attributes - src/attributes.js
 */

Mantis.extend({
	attr: function (attr, value) {
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

	removeAttr: function (value) {
		var v = value.split(' ');

		return this.each(function() {
			var i;

			for (i = 0; i < v.length; i++) {
				this.removeAttribute(v[i]);
			}
		});
	},

	hasAttr: function (value) {
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
