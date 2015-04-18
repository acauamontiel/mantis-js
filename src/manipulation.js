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
		var length;

		if (typeof value === 'string') {
			return this.each(function () {
				this.insertAdjacentHTML('beforeend', value);
			});
		} else if (value.constructor === Mantis) {
			length = value.length;

			return this.each(function () {
				while (length--) {
					this.appendChild(value[length]);
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
	}
});
