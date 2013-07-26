define(function (require, exports, module) {

	var deepCopy = require('object/extend');
	var extend = require('object/inherit');


	function View(props) {
		for (var key in props) {
			this[key] = props[key];
		}
	};


	View.prototype = {
		show: function () {
			console.log("This is view show");
		}
	}


	View.prototype.constructor = View;

	deepCopy(View, {
		extend: extend
	});

	var v = View.extend({
		'name': 'lee',
		"age": 12
	});

	console.log(v instanceof View);
	console.log(Object.getPrototypeOf(v) === View.prototype);

	return View;
})