requirejs.config({
    baseUrl: 'js/src',
    paths: {
    	'jquery': '../lib/jquery-1.9.1.min'
    }
});

require(["object/extend"], function (extend){
	function Class() {};

	Class.prototype.create = function () {}

	Class.prototype.extend = function () {

		// 一个类当然最好是函数，但是不可能生成函数，所以只能生成一个实例
		// 一个实例作为类，它的所有方法和需要继承的东西想必要放在prototype中

		var constr = this.constructor; // 父类（基类）的构造函数

		var proto = this.constructor.prototype; // 父类（基类）的prototype

		function ProtoClas() {};

		var prototype = ProtoClas.prototype = (function (proto) {
			function F() {};
			F.prototype = proto;
			return new F();
		})(proto);

		ProtoClas.prototype.constructor = ProtoClas

		for (var i = 0; i < arguments.length; i++) {
			var props = arguments[i];
			for (var name in props){
				prototype[name] = props[name];
			}
		}	

		var instance = new ProtoClas();

		return instance;

	 //    // Populate our constructed prototype object
	 //    Class.prototype = prototype;

	 //    // Enforce the constructor to be what we expect
	 //    Class.prototype.constructor = Class;								

	 //    var instance = new Class();

	 //    return instance
		

		// console.log("instance.constructor.prototype--->", instance.constructor.prototype);
		// console.log("instance.constructor--->", instance.constructor);

		// console.log("getPrototypeOf--->", Object.getPrototypeOf(instance));
		// console.log("instance--->", instance);
		// console.log("instance.constructor--->", instance.constructor);
		// console.log("instance.constructor.prototype--->", instance.constructor.prototype);
		// console.log("instance.constructor.prototype.constructor--->", instance.constructor.prototype.constructor);




	}

	Class.extend = function () {
	    var args  = Array.prototype.slice.call(arguments);  

		// return this.prototype.extend.apply(this, args); 
		// 第一个参数不能是构造函数，因为它最终返回的是实例
		// 而调用prototype.extend也必须是一个实例
	    return this.prototype.extend.apply(new this(), args);
	}

	var Person = Class.extend({
	    name: "lee",
	    age: 12
	})

	console.log("Person------>", Person);

	var Superman = Person.extend({
	    skill: "fly"
	})

	console.log("Superman------>", Superman);

	var Normal = Person.extend({
		sex: "Woman"
	})

	console.log("Normal------>", Normal);	
});