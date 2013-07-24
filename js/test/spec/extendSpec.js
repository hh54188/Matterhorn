define(['object/extend', 'helper/isObject', 'helper/isArray'], function (extend, isObject, isArray) {

    describe("extend", function() {
        var target, obj;

        beforeEach(function() {
            this.addMatchers({
                toBeSameObject: function (expected) {
                    var _isSameArr = function (arr1, arr2) {
                        for (var i = 0; i < arr1.length; i++) {
                            if (arr1[i] !== arr2[i]) {
                                return false;
                            }
                        }
                        return true;
                    };

                    var _isSameObj = function (obj1, obj2) {
                        var result = true;
                        for (var key in obj1) {
                            if (isObject(obj1[key])) {
                                result = _isSameObj(obj1[key], obj2[key])
                                if (!result) {
                                    break;
                                }
                            } else if (isArray(obj1[key])) {
                                result = _isSameArr(obj1[key], obj2[key])
                                if (!result) {
                                    break;
                                }                                
                            } else {
                                if (obj1[key] !== obj2[key]) {
                                    result = false;
                                    break;
                                }                                
                            }
                        }
                        return result;
                    };

                    return _isSameObj(this.actual, expected);             
                }
            })

            target = {};
            obj = {
                name: "lee",
                age: 22,
                arr: [1, 2, 3, 4],
                friends: {
                    "yang": "bao",
                    "xu": "bei"
                }
            }
        });


        it(" didn't allow empty parameter ", function() {
            expect(extend()).toBeFalsy();
        });

        it(" at least have two parameter", function() {
            expect(extend(target)).toBeFalsy();
        });

        it(" did't allow no object parameter", function() {
            target = {}, obj = 12
            expect(extend(target, obj)).toBeFalsy();
        });

        // 如何判断两个对象是相等的
        it(" should copy corrently", function() {
            // 自定义方法
            expect(extend(target, obj)).toBeSameObject(obj);
        });        
    })      
})