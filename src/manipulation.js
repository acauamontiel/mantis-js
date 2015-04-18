/*
 * Mantis.js
 * Manipulation - src/manipulation.js
 */

Mantis.extend({
	html: function (value) {
		if (value) {
			return this.each(function () {
				this.innerHTML = value;
			});
		} else {
			return this[0].innerHTML;
		}
	},

	append: function (value) {
		var i;

		if (typeof value === 'string') {
			return this.each(function () {
				this.insertAdjacentHTML('beforeend', value);
			});
		} else if (value.constructor === Mantis) {
			return this.each(function () {
				for (i = 0; i < value.length; i++) {
					this.appendChild(value[i]);
				}
			});
		}
	},

	prepend: function (value) {
		var length;

		if (typeof value === 'string') {
			return this.each(function () {
				this.insertAdjacentHTML('afterbegin', value);
			});
		} else if (value.constructor === Mantis) {
			length = value.length;

			return this.each(function () {
				while (length--) {
					this.insertBefore(value[length], this.firstChild);
				}
			});
		}
	},

	before: function (value) {
		var i;

		if (typeof value === 'string') {
			return this.each(function () {
				this.insertAdjacentHTML('beforebegin', value);
			});
		} else if (value.constructor === Mantis) {
			return this.each(function () {
				for (i = 0; i < value.length; i++) {
					this.parentNode.insertBefore(value[i], this);
				}
			});
		}
	}
});
