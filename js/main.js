requirejs.config({
    baseUrl: 'js/src',
    paths: {
    	'jquery': '../lib/jquery-1.9.1.min'
    }
});

require(["object/extend","helper/log"], function (extend, log){
	function Class() {};

	Class.prototype.instanceof = function (instance, compareConstr) {
		var originConstr = instance.constructor;

		if (originConstr === compareConstr) return true;
		else return false;
	}

	Class.prototype.create = function () {
		var constr = this.constructor;
		var obj = new constr();
		for (var i = 0; i < arguments.length; i++) {
			var props = arguments[i];
			for (var name in props) {
				obj[name] = props[name];
			}
		}
		return obj;
	}

	Class.prototype.extend = function () {

/*		一个类当然最好是函数，但是不可能生成函数，所以只能生成一个实例
		一个实例作为类，它的所有方法和需要继承的东西想必要放在prototype中*/
		var constr = this.constructor; // 父类（基类）的构造函数

		var proto = this.constructor.prototype; // 父类（基类）的prototype

		function ProtoClas() {}; //当前继承（生成）的类（临时构造函数）

		var prototype = ProtoClas.prototype = (function (proto) {
			function F() {};
			F.prototype = proto;
			return new F();
		})(proto); 
/*		当前类的prototype是一个新的对象，这个对象的构造函数是基类
		注意到当前这样的prototype其实是空的对象，这样便可以把传进来参数作为当前类的参数赋值
		这样当前类（和其实例）便能继承父类方法（在prototype chain链上向上查找）

		这个匿名函数实际上是道格拉斯的object方法，另一个好处是可以避免修改子类的方法时父类方法也被影响*/

		ProtoClas.prototype.constructor = ProtoClas;
/*		重置当前类prototype的构造函数，非常重要！
		如果缺少，当前类的实例的构造函数会变成父类*/

		for (var i = 0; i < arguments.length; i++) {
			var props = arguments[i];
			for (var name in props){
				prototype[name] = props[name];
			}
		}	

		return new ProtoClas();
	}

	Class.instanceof = function () {
		return this.prototype.instanceof.call(this, arguments[0], arguments[1]);
	}

	Class.extend = function () {
	    var args  = Array.prototype.slice.call(arguments);  

/*		return this.prototype.extend.apply(this, args); 
		第一个参数不能是构造函数，因为它最终返回的是实例
		而调用prototype.extend也必须是一个实例*/
	    return this.prototype.extend.apply(new this(), args);
	}

	/*有一个模棱两可的问题
	1.实例也保留了extend和create方法，是不是应该屏蔽掉，或者如何屏蔽掉？
	2.私有变量 和 公有变量*/

	// TEST:
	var Person = Class.extend({
		say: function () {
			console.log("Hello");
		},
		walk: function () {
			console.log("walk");
		}
	});

	var person = Person.create({
		name: "Lee",
		age: 22
	})

	console.log(person);
	
});