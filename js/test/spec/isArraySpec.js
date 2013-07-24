define(['src/helper/isArray'], function (isArray) {

    describe("isArray", function() {
        var variable
        it("Number返回false", function() {
            variable = 10;
            expect(isArray(variable)).toBeFalsy();
        });

        
        it("String返回false", function() {
            variable = "string";
            expect(isArray(variable)).toBeFalsy();
        });        

        
        it("Null返回false", function() {
            variable = null;
            expect(isArray(variable)).toBeFalsy();
        });        

        
        it("Null返回false", function() {
            variable = undefined;
            expect(isArray(variable)).toBeFalsy();
        });  
        
        
        it("Array返回true", function() {
            variable = [1, 2, 3];
            expect(isArray(variable)).toBeTruthy();
        });
    })

    // describe("isArray", function() {
    //     var variable = "string";
    //     it("String返回false", function() {
    //         expect(isArray(variable)).toEqual(false);
    //     });
    // })

    // describe("isArray", function() {
    //     var variable = null;
    //     it("Null返回false", function() {
    //         expect(isArray(variable)).toEqual(false);
    //     });
    // })

    // describe("isArray", function() {
    //     var variable = undefined;
    //     it("Null返回false", function() {
    //         expect(isArray(variable)).toEqual(false);
    //     });
    // })    

    // describe("isArray", function() {
    //     var variable = [1, 2, 3];
    //     it("Null返回false", function() {
    //         expect(isArray(variable)).toEqual(true);
    //     });
    // })    
})