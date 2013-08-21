/*
    仍然使用new 关键字，但是用extend和create封装起来
    不推荐直接修改Object，用了自定义的Class类

    这个版本中暂时未引入._super 和 init() 机制
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

Class.prototype.create = function (props) {
    var instance = new this();
    for (var name in props) {
        instance[name] = props[name];
    }
    return instance;
}

Class.prototype.extend = function (props) {
    var SubClass = function () {};

    SubClass.prototype = object(this.prototype);
    for (var name in props) {
        SubClass.prototype[name] = props[name];
    }
    SubClass.prototype.constructor = SubClass;

    // 重新赋值extend 和 create
    SubClass.extend = SubClass.prototype.extend;
    SubClass.create = SubClass.prototype.create;

    return SubClass;
}

Class.extend = function (props) {
    return this.prototype.extend.call(this, props);
}

var Human = Class.extend({
    say: function () {
        console.log("Hello");
    }
});

console.log(Human.create());

var Man = Human.extend({
    walk: function () {
        console.log("walk");
    }
})

console.log(Man.create({
    name: "Lee",
    age: 22
}));


