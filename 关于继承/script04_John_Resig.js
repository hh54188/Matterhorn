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
    var _super = this.prototype;

    for (var name in props) {
        if (typeof props[name] == "function " && typeof _super[name] == "function") {
            prototype[name] = (function (super_fn, fn) {
                return function () {
                    var tmp = this.callSuper;

                    this.callSuper = super_fn;

                    var ret = fn.apply(this, arguments);

                    this.callSuper = tmp;

                    return ret;
                }
            })(_super[name], props[name])
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
    init: function () {
        this.say = function () {
            console.log("I am a human");
        }
    }
});

var human = Human.create();
human.say();

var Man = Human.extend({
    init: function () {
        this.say = function () {
            console.log("I am a man");
        }        
    }
})

var man = Man.create();
man.say();






