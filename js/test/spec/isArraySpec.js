define(['src/helper/isArray'], function (isArray) {
    describe("isArray", function() {
        it("should be able to play a Song", function() {
            expect(isArray([1, 2, 3])).toEqual(true);
        });
    })    
})