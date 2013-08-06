console.clear();
var log = console.log.bind(console);

function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function Class() {}

Class.prototype.create = Class.prototype.extend = function (props) {
    var SubClass = object(this);

    for (var name in props) {
        SubClass[name] = props[name]
    }

    return SubClass;
}

Class.extend = function () {
    var SuperClass = new this();
    return this.prototype.extend.call(SuperClass, arguments[0]);
}

var Human = Class.extend({
    say: function () {}
})

log(Human);

var Man = Human.extend({
    sex: "man"
})

log(Man);

var man = Man.create({
    name: "Lee"
})

log(man);