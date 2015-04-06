/*
 * Mantis.js
 * Classes - src/classes.js
 */

Mantis.extend({
	addClass: function (value) {
		if (this[0].classList) {
			var v = value.split(' ');

			return this.each(function () {
				var i;

				for (i = 0; i < v.length; i++) {
					this.classList.add(v[i]);
				}
			});
		} else {
			return this.each(function () {
				this.className += (this.className === '') ?
					value : ' ' + value;
			});
		}
	}
});
