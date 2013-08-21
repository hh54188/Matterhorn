/*
    仍然使用new 关键字，但是用extend和create封装起来
    不推荐直接修改Object，用了自定义的Class类

    这个版本中暂时未引入._super 机制
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

Class.prototype.create = function (opt) {
    var instance = new this();
    if (instance.init) {
        instance.init(opt); //调用自定义的构造函数
    }
    return instance;
}

Class.prototype.extend = function (props) {
    var SubClass = function () {};
    var _super = this.prototype;

    SubClass.prototype = object(this.prototype);
    for (var name in props) {
        SubClass.prototype[name] = props[name];
    }
    SubClass.prototype.constructor = SubClass;

    // Reset callSuper method:
    if (_super.init) {
        (function (init) {
            SubClass.prototype.callSuper = init;
        })(_super.init)
    }

    // 重新赋值extend 和 create
    SubClass.extend = _super.extend;
    SubClass.create = _super.create;

    return SubClass;
}

Class.extend = function (props) {
    return this.prototype.extend.call(this, props);
}


// 定义Human类
// 实例的say方法可以覆盖class中的say方法
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

// 实例化一个Human
var human = Human.create({
    nature: "human"
});

// 测试Human
console.log(human);
human.say();
human.walk();


// 定义Man类，为Human的子类
var Man = Human.extend({
    init: function (opt) {
        this.callSuper(opt);
        this.sex = opt.sex;
        this.say = function () {
            console.log("I am a man");
        }
    }
})

var man = Man.create({
    sex: "man"
});

console.log(man);
man.say();
man.walk();

// 定义中国人
// var ChineseMan = Man.extend({
//     init: function (opt) {
//         opt = opt || {};
//         this.callSuper(opt);
//         this.city = "Beijing";
//         this.say = function () {
//             console.log("I am Chinese");
//         }
//     }
// })

// var chinese = ChineseMan.create();
// console.log(chinese);
// chinese.say();
// chinese.walk();




