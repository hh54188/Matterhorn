define(function (require, exports, module) {

	function View() {};

	View.prototype = {
		show: function () {
			console.log("This is view show");
		},
		hide: function () {
			console.log("This is view hide");
		},
		name: {
			li: "guangyi"
		}
	}

	return View;
})