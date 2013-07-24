// http://stackoverflow.com/questions/16423156/getting-requirejs-to-work-with-jasmine
requirejs.config({
    baseUrl: '../',
    paths: {
    	'jquery': 'lib/jquery-1.9.1.min',
    	'jasmine': 'lib/jasmine-1.3.1/jasmine',
    	'jasmine-html': 'lib/jasmine-1.3.1/jasmine-html'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }    
});

require(["jquery", "jasmine-html"], function ($, jasmine){
	// 摘自jasmine官方教程
    var jasmineEnv = jasmine.getEnv();

    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('test/spec/isArraySpec');

    $(function () {
        require(specs, function (spec) {
            jasmineEnv.execute();
        });
    });
});