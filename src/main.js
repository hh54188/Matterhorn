requirejs.config({
    baseUrl: 'src'
});

require(["object/extend"], function (extend){
    var target = {};
    var obj = {
        'name': 'lee',
        'age': 12
    }
    console.log(typeof extend);
});