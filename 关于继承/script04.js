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

    for (var name in props) {
        prototype[name] = props[name];
    }

    function Class() {}

    Class.prototype = prototype;
    Class.prototype.constructor = prototype;

    // 尽量避免使用arguments.callee
    Class.extend =  extend;

    return Class;
}

var Human = Class.extend({
    init: function (opt) {
        this.nature = opt.nature || "Human";
        this.say = function () {
            console.log("I am a human");
        }
    },
    walk: function () {
        console.log(this.nature + " is walking");
    }
});

var Man = Human.extend({
    init: function (opt) {
        this.sex = opt.sex;
        this.say = function () {
            console.log("I am a man");
        }
    }
});

console.log(new Man());
// console.log(Man);
// var man = Man.create(); console.log(man);




