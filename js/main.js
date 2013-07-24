requirejs.config({
    baseUrl: 'js/src',
    paths: {
    	'jquery': '../lib/jquery-1.9.1.min'
    }
});

require(["jquery", "object/extend"], function ($, extend){
	function Person(name, age) {
		this.name = name;
		this.age = age;
	}

	Person.prototype = {
		say: function () {
			console.log("hello");
		}
	}

	function Child() {

	}

	var p = new Person("lee", 22);
	var target = {};
	$.extend(Child, Person);
	console.log(Child);



	// console.log(p);
	// extend(target, p);
	// console.log(target, p)



	// extend(Child, Person);
	// console.log(Child, Person);
});