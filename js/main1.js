console.clear();

function Class(name) {

};

function object(o) {
    function F() {};
    F.prototype = o;
    return new F();    
}

Class.extend = function () {
    var args  = Array.prototype.slice.call(arguments); 
    return this.prototype.extend.apply(new this(), args);
}

Class.prototype.extend = function (args) {
    
}

var Human = Class.extend({
    say: function () {}
})


// 方法抛弃
// Class.prototype.create = function () {
//     // 没有办法创建实例！
//     // var obj = $.extend({}, this);
//     // console.log(obj);
// }

// Class.prototype.extend = function () {
//     var args = {};
//     for (var i = 0; i < arguments.length; i++) {
//         var extension = arguments[i];
//         for (var key in extension) {
//             if (extension.hasOwnProperty(key)) {
//                 args[key] = extension[key];
//             }
//         }
//     }
    
//     var tmp = Object.create(this);
    
//     for (var key in args) {
//         tmp[key] = args[key];
//     }
    
//     var subclas = Object.create(tmp);
    
//     return subclas;
// }

// Class.extend = function () {
//     var args  = Array.prototype.slice.call(arguments); 
//     return this.prototype.extend.apply(new this(), args);
// }

// var Human = Class.extend({
//     say: function () {}
// })

/*
    Class {say: function, extend: function}
        __proto__: Class
            say: function () {}
                __proto__: Class
                    连续出现两个__proto__的原因在于之前的
                    第一个__proto__指向的对象时空的，
                    然后这个对象也有自己的__proto__

                    正常情况应该是这两个连续__proto__之间还是有一些属性的
                    __proto__: Class
                        constructor: function Class(name) {
                        extend: function () {
                        __proto__: Object

*/





