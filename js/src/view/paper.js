define(function (require, exports, module) {
	var extend = require("object/extend");

	var View = require('view/view');

	function Paper() {};

	extend(Paper.prototype, View.prototype);
	// F.prototype = View.prototype;
	// Paper.prototype = new F();
	console.log(Paper.prototype.constructor);
	console.log((new Paper()) instanceof Paper);
	console.log("---------------------------");
	Paper.prototype.constructor = Paper;
	Paper.prototype.name.li = "yangbao";
	console.log(Paper.prototype.constructor);
	console.log((new Paper()) instanceof Paper);

	var v = new View();
	console.log(View.prototype.name);


})