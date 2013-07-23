define(function (require, exports, module) {
	var isArray = require('helper/isArray');
	var isObject = require('helper/isObject');

	function copyArray(target, Parent) {
		for (var i = 0; i < Parent.length; i++) {
			target.push(Parent[i]);
		}
	}

	function extend(target, Parent) {
		for (var key in Parent) {
			if (isObject(Parent[key])) {
				if (isArray(Parent[key])) {
					target[key] = [];
					// 为什么这里不直接用for in去遍历数组，会产生难以预料的问题:
					// http://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-such-a-bad-idea
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
					copyArray(target[key], Parent[key]);
				} else {
					target[key] = {};
					extend(target[key], Parent[key]);
				}
			}

			target[key] = Parent[key];
		}

		return target;
	}

	exports.extend = extend;
})