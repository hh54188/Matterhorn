/*
    之前的方法默认吧extend 分开为 Class.extend Class.prototype.extend
    可以再优雅一点，合并为一个extend
*/

// Super Class
function Class() {}

/*
    常规做法，把方法放在prototype中，
    属性放在构造函数中，自定义的init函数
*/
function object(o) {
    var F = function () {};
    F.prototype = o;
    return new F();
}

Class.extend = function extend(props) {

    var prototype = new this();
    var super = this.prototype;

    for (var name in props) {
        if (typeof props[name] == "function " && typeof super[name] == "function") {
            prototype[name] = (function (name, fn) {
                return function () {
                    this.callSuper = super[name]; // ?
                    var ret = fn.apply(this, arguments);
                    return ret;
                }
            })(name, props[name])
            // })(super[name], props[name])
        } else {
            prototype[name] = props[name];    
        }
    }

    function Class() {}

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    // 尽量避免使用arguments.callee 详见MDN
    Class.extend =  extend;
    Class.create = function () {
        var instance = new this();
        instance.init();
        return instance;
    }

    return Class;
}

var Human = Class.extend({
    init: function (opt) {
        opt = opt || {};
        this.nature = opt.nature || "Human";
        this.say = function () {
            console.log("I am a human");
        }
    },
    walk: function () {
        console.log(this.nature + " is walking");
    }
});

var human = Human.create();
human.walk();

// 定义Man

var Man = Human.extend({
    init: function (opt) {
        opt = opt || {};
        this.sex = opt.sex || "Man";
        this.say = function () {
            console.log("I am a man");
        }
    }
});

var man = Man.create();
console.log(man);
man.say();

var Person = Man.extend({
    init: function () {
        this.say = function () {
            console.log("I am a programer");
        }
    }
})

var person = Person.create();
console.log(person);
person.say();






