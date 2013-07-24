requirejs.config({
    baseUrl: 'js/src'
});

require(["object/extend"], function (extend){
	function clas(name, age) {
		this.name = name;
		this.age = age;
	}

	clas.prototype = {
		method: "hello"
	}

	var target = {};
	var obj = new clas("lee", 22);

	extend(target, obj);
	console.log(target, obj)
});