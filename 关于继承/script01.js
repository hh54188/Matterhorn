/*
    最普通的继承，使用function和new关键字
*/

// Super Class
function Human(name) {
    this.name = name;
}

Human.prototype.say = function () {
    console.log("say")
}

var human = new Human("Lee");
console.log(human);

function object(o) {
    var F = function () {};
    F.prototype = o;
    return new F();
}

// SubClass
function Man(name, age) {
    Human.call(this, name);
    this.age = age;
}

Man.prototype = object(Human.prototype);
Man.prototype.constructor = Man;

var man = new Man("Lee", 22);
console.log(man);

/*
    缺陷：
    http://aaditmshah.github.io/why-prototypal-inheritance-matters/#constructors_vs_prototypes
    new 关键字 存在的合理性
*/



