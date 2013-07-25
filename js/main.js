requirejs.config({
    baseUrl: 'js/src',
    paths: {
    	'jquery': '../lib/jquery-1.9.1.min'
    }
});

require(["jquery", "object/extend"], function ($, extend){
	function child() {};
	console.log(child.prototype.constructor);
	// window.Person = function () {}

	extend(child.prototype, {
		say: function () {
			console.log("hello");
		},
		walk: function () {
			console.log("walk");
		}
	})
	console.log(child.prototype.constructor);

	child.prototype = {
		test: function () {
			console.log("test");
		}
	}
	console.log(child.prototype.constructor)

});