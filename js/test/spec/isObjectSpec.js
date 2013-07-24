define(['src/helper/isObject'], function (isObject) {
    describe("isObject", function() {
        var variable

        var falseMsg = " return false if a ";
        var truemsg = " return true a ";
        var end = " datatype varieble pass in";
        
        it(falseMsg + " Number " + end, function() {
            variable = 10;
            expect(isObject(variable)).toBeFalsy();
        });

        
        it(falseMsg + " String " + end, function() {
            variable = "string";
            expect(isObject(variable)).toBeFalsy();
        });

        
        it(falseMsg + " null " + end, function() {
            variable = null;
            expect(isObject(variable)).toBeFalsy();
        });        

        
        it(falseMsg + " undefined " + end, function() {
            variable = undefined;
            expect(isObject(variable)).toBeFalsy();
        });  
        
        
        it(falseMsg + " array " + end, function() {
            variable = [1, 2, 3];
            expect(isObject(variable)).toBeFalsy();
        });

        it(truemsg + " object " + end, function() {
            variable = {
                name: 'lee',
                age: 12
            };
            expect(isObject(variable)).toBeTruthy();
        });

        it(truemsg + "empty object " + end, function() {
            variable = {};
            expect(isObject(variable)).toBeTruthy();
        });        
    })  
})