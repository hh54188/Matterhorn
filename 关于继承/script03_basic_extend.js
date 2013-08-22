/*
    仍然使用new 关键字，但是用extend和create封装起来
    不推荐直接修改Object，用了自定义的Class类

    引入init和super机制
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

    if (instance.__callSuper) {
        instance.__callSuper();
    }

    if (instance.init) {
        /*
            一个子类继承父类的时候默认是会继承父类的所有属性和方法
            方法继承我们放在prototype中实现
            而属性呢

            在调用子类的构造函数的同时也应该调用父类的构造函数
            保证父类的属性子类能够得到继承
        */
        instance.init(opt);
    }
    return instance;
}

Class.prototype.extend = function (props) {
    var SubClass = function () {};
    var _super = this.prototype;
    var self = this;

    SubClass.prototype = object(this.prototype);
    for (var name in props) {
        if (typeof props[name] == "function" && typeof _super[name] == "function") {

            SubClass.prototype[name] = (function (super_fn, fn) {
                return function () {
                    /*
                        callSuper是动态生成的，只有当用户调用同名方法时才会生成
                    */
                    var tmp = this.callSuper;

                    this.callSuper = super_fn;

                    var ret = fn.apply(this, arguments);

                    this.callSuper = tmp;

                    /*
                        如果用户没有callsuper方法，则delete
                    */
                    if (!this.callSuper) {
                        delete this.callSuper;
                    }

                    return ret;
                }
            })(_super[name], props[name])  
        } else {
            SubClass.prototype[name] = props[name];    
        }
    }

    SubClass.prototype.constructor = SubClass; 


    //  折腾好几天才解决
    if (_super.init) {
        /*
            为什么不能直接写
            SubClass.prototype.callSuper = _super.init

            B.init = function(){
                this.callSuper();
            }

            A.init = function (){
                this.callSuper();
            }

            A.callSuper = f(){
                this.init();
            }

            A.init();

            A.init ---> A.callSuper ---> B.init ---> this.callSuper()
            在调用的时候可能会发生一种情况是最后的this指向A

            错误（死循环，栈溢出）：
            子类.init ---> 子类.callSuper ---> 子类init ---> 子类.callSuper

            正确:
            子类.init ---> 子类.callSuper ---> 父类init ---> 父类.callSuper

            这样就会出现死循环
            不信的话，你可以直接使用
            SubClass.prototype.callSuper = _super.init

            下面的解决方法其实是，
            它能保证最后的this确实指向的是B

            首先保证父类_super.init使用的上下文是子类的，
            _super.init.apply(this, arguments);
            再保证父类_super.init中调用的callSuper（如果存在的话）
            if (_super.callSuper) {
                SubClass.prototype.callSuper = _super.callSuper;    
            }
            是父类的callSuper，而不是子类的callSuper

            但这样的话子类的callSuper不是被覆盖了？
            没关系，最后还原就是了
            SubClass.prototype.callSuper = tmp;
        */

        SubClass.prototype.__callSuper = function () {
            var tmp = SubClass.prototype.__callSuper;
            if (_super._callSuper) {
                SubClass.prototype.__callSuper = _super.__callSuper;    
            }
            
            _super.init.apply(this, arguments);
            SubClass.prototype.__callSuper = tmp;
        }
    }

    // 重新赋值extend 和 create
    SubClass.extend = _super.extend;
    SubClass.create = _super.create;

    return SubClass;
}

Class.extend = function (props) {
    return this.prototype.extend.call(this, props);
}

var Human = Class.extend({
    init: function () {
        this.nature = "Human";
    },
    say: function () {
        console.log("I am a human");
    }
})


var Man = Human.extend({
    init: function () {

    },
    say: function () {
        this.callSuper();
        console.log("I am a man");
    }
});

var Person = Man.extend({
    init: function () {
        this.sex = "man";
    },
    say: function () {
        this.callSuper();
        console.log("I am Lee");
    }
})

console.log(typeof Person);
console.log(Person.prototype);


var p = Person.create();
// p.say();
console.log(p.__proto__);
console.log(Object.getPrototypeOf(p));




