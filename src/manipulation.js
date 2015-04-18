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
	}
});
