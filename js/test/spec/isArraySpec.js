define(['src/helper/isArray'], function (isArray) {
    describe("isArray", function() {
        var variable

        var falseMsg = " return false if a ";
        var truemsg = " return true a ";
        var end = " datatype varieble pass in";
        
        it(falseMsg + " Number " + end, function() {
            variable = 10;
            expect(isArray(variable)).toBeFalsy();
        });

        
        it(falseMsg + " String " + end, function() {
            variable = "string";
            expect(isArray(variable)).toBeFalsy();
        });

        
        it(falseMsg + " null " + end, function() {
            variable = null;
            expect(isArray(variable)).toBeFalsy();
        });        

        
        it(falseMsg + " undefined " + end, function() {
            variable = undefined;
            expect(isArray(variable)).toBeFalsy();
        });  
        
        
        it(truemsg + " array " + end, function() {
            variable = [1, 2, 3];
            expect(isArray(variable)).toBeTruthy();
        });
    })  
})