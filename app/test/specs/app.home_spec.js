'use strict';
describe('Home component', function () {

    var scope,
        controller,
        httpBackend,
        apiEndPoint,
        compile,
        apiFixture = require('../fixtures/api-response.json');

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function ($rootScope, $componentController, $httpBackend, $injector, $compile) {
        scope = $rootScope.$new();
        controller = $componentController('homeComponent', { $scope: scope });
        apiEndPoint = $injector.get('API_ENDPOINT');
        httpBackend = $httpBackend;
        compile = $compile;

        httpBackend.when('GET', apiEndPoint).respond(apiFixture);
        httpBackend.flush();
    }));

    function compileTemplate(component){
        var el = angular.element('<'+ component +'></'+ component +'>');
        el = compile(el)(scope);
        scope.$apply();
        return el;
    }

    it('should set the initial value for dropdown', function () {
        expect(controller.progressBarId).toEqual(0);
    });

    it('should have API_ENDPOINT as http://pb-api.herokuapp.com/bars', function () {
        expect(apiEndPoint).toEqual('http://pb-api.herokuapp.com/bars');
    });

    it('should update config with the value from api response', function () {
        expect(controller.config.bars).toEqual([62, 45, 62]);
        expect(controller.config.buttons).toEqual([10, 38, -13, -18]);
        expect(controller.config.limit).toEqual(230);
    });

    it('should set the progressbar value based on the percentage of limit', function () {
        var el = compileTemplate('home-component');
        httpBackend.flush();
        var progressBar1 = angular.element(el).find('progress-bar-component')[0],
            textVal = parseInt(angular.element(progressBar1).text()),
            percent = controller.getPercentageOfLimit(controller.config.bars[0], controller.config.limit);
        expect(percent).toEqual(textVal);
    });

    it('should generate progress bar & buttons depending on number of array items from api data', function(){
        var el = compileTemplate('home-component');
        httpBackend.flush();
        var progressBar = angular.element(el).find('progress-bar-component');
        var buttons = angular.element(el).find('button');

        expect(progressBar.length).toEqual(controller.config.bars.length);
        expect(buttons.length).toEqual(controller.config.buttons.length);
    });

    it('should trigger updateBar when clicked on button', function(){
        var el = compileTemplate('home-component');
        httpBackend.flush();

        var button = angular.element(el).find('button')[0],
        isolateScope = angular.element(el).isolateScope();

        spyOn(isolateScope.vm, 'updateBar');

        button.click(10);

        expect(isolateScope.vm.updateBar).toHaveBeenCalled();
        expect(isolateScope.vm.updateBar).toHaveBeenCalledWith(10);
    });

    it('should highlight the currently selected progress bar with active class', function(){
        var el = compileTemplate('home-component');
        httpBackend.flush();
        var isolateScope = angular.element(el).isolateScope(),
            progressBar = angular.element(el).find('progress-bar-component')[isolateScope.vm.progressBarId];
            
        expect(angular.element(progressBar).hasClass('active')).toBe(true);
    });

});