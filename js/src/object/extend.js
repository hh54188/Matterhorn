define(function (require, exports, module) {
    var isArray = require('helper/isArray');
    var isObject = require('helper/isObject');

    function copyArray(target, Parent) {
        for (var i = 0; i < Parent.length; i++) {
            target[i] = Parent[i];
            // 不能使用 target[i].push(Parent[i]) ，这样也会变成引用
        }
    }

    function extend(target, Parent) {
        // 有考虑过多继承，但无非是把参数做一个轮询，单个继承的方法与以下相同
        // 所以也就不做拓展了

        // 先做判断
        if (arguments.length < 2 || !isObject(target) || !isObject(Parent)) {
            return false;
        }

        // 构造函数之间的继承，暂时不需要
        // var F = function () {}
        // F.prototype = Parent.prototype;
        // target.prototype = new F();

        // deepCopy
        for (var key in Parent) {
            if (isObject(Parent[key])) {
                target[key] = {};
                extend(target[key], Parent[key]);
            } else if (isArray(Parent[key])) {
                target[key] = [];
                // 为什么这里不直接用for in去遍历数组，会产生难以预料的问题:
                // http://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-such-a-bad-idea
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
                copyArray(target[key], Parent[key]);
            } else {
                target[key] = Parent[key];    
            }
        }
        // 没有在子类中保留一个对父类的指针uber
        // 考虑到这个函数继承关系的两个对象不一定是两个类
        // 也有可能是两个同级的对象

        return target;
    }
    return extend;
})