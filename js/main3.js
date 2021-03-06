console.clear();
var log = console.log.bind(console);

function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function Class() {}

Class.prototype.create = function () {
    return new this();
}

Class.prototype.extend = function (props) {
    function F() {};

    F.extend = this.prototype.extend;
    F.create = this.prototype.create;

    obj = object(this.prototype);
    for (var name in props) {
        obj[name] = props[name];
    }
    F.prototype = obj;
    F.prototype.constructor = F;
    return F;
}

Class.extend = function () {
    return this.prototype.extend.call(this, arguments[0]);
}

var Human = Class.extend({
    say: function () {}
})

var human = Human.create();
log("one human", human);


log(Human.prototype);

var Man = Human.extend({
    sex: "man"
})

log(Man.prototype);

var Woman = Human.extend({
    sex: "woman"
})

log(Woman.prototype);