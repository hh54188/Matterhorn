define(function (require, exports, module) {

	function extend(props) {
		var instance = new this(props);
		return instance
	}

	return extend;
})

