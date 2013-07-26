requirejs.config({
    baseUrl: 'js/src',
    paths: {
    	'jquery': '../lib/jquery-1.9.1.min'
    }
});

require(["view/view", "view/paper"], function (View, Paper){

});