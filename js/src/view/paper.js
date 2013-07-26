define(function (require, exports, module) {

	var extend = require("object/extend");
	var View = require('view/view');

	function Paper() {};

	extend(Paper.prototype, View.prototype);
	// 其实这句话不一定需要
	Paper.prototype.constructor = Paper;



	var v = new View();
	console.log(View.prototype.name);
})