/*
  之前的方法我们始终把“类”定义为函数，当执行extend时返回的始终是一个function

  让我们换一个思路了：一个类，返回的可不可以是object，而不是function
  当然可以！

  如何生成一个对象？
  1.var obj = {};
  2.var obj = new F();
  3.var obj = Object.create(null)

  第一个方法可拓展性太小，第二个我们决定不用，重点就在第三个上面做文章
*/


// var Rectangle = {
//     area: function () {
//         console.log(this.width * this.height);
//     }
// };

//  var rect = Object.create(Rectangle);
//  rect.width = 5;
//  rect.height = 9;
//  rect.area();

 /*
  把设置width 和height 自动化，
  1.能自动返回一个实例
  2.能给这个实例设置宽和高
 */

// var Rectangle = {
//     create: function (width, height) {
//       var self = Object.create(this);
//       self.width = width;
//       self.height = height;
//       return self;
//     },
//     area: function () {
//         console.log(this.width * this.height);
//     }
// };

// var rect = Rectangle.create(5, 9);
// rect.area();

 /*
    用之前的思路来理解，有一个类为Rectangle，
    有两个方法create和area
    通过Object.create，创建了一个新的对象，
    方法都放在这个对象的prototype属性中，
    create相当于之前的init方法，在刚刚创建的新对象中
    设置实例的宽和长

    上面的例子告诉我们：一个类可以是一个对象
 */

 /*
    假设我们要另一个正方形类，应该怎么办
    我们要至少要重新它的构造函数，但是可以矩形的area方法
 */

// var Square = Object.create(Rectangle);

// Square.create = function (side) {
//   return Rectangle.create.call(this, side, side);
// }

/*
  这种做法其实和我们第一种最基本的类似
  function Man(name, age) {
    Human.call(this, name);
    this.age = age;
  } 
*/

// var sq = Square.create(5);
// sq.area();

/*
  上面的做法还是太复杂了
  我们希望和前面一样，用一个extend方法封装起来
*/

function extend(extension) {
    var hasOwnProperty = Object.hasOwnProperty;
    var object = Object.create(this);

    for (var property in extension) {
      if (hasOwnProperty.call(extension, property) || typeof object[property] === "undefined") {
        object[property] = extension[property];
      }
    }
}

var Rectangle = {
    extend: extend,
    create: function (width, height) {
      var self = Object.create(this);
      self.width = width;
      self.height = height;
      return self;
    },
    area: function () {
        console.log(this.width * this.height);
    }
};

var rect = Rectangle.create(5, 9);
rect.area();

var Square = Rectangle.extend({
    create: function () {
         return rectangle.create.call(this, side, side);
    }
})
