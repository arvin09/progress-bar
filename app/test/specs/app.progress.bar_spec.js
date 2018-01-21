'use strict';
describe('Progress bar component', function(){
    var scope,
        controller,
        compile;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function ($rootScope, $componentController, $compile) {
        scope = $rootScope.$new();
        controller = $componentController('progressBarComponent', { $scope: scope }, { val:10 });
        compile = $compile;
    }));

    function compileTemplate(component){
        var el = angular.element('<'+ component +'></'+ component +'>');
        el = compile(el)(scope);
        scope.$apply();
        return el;
    }

    it('should set the val to the binding data ', function(){
        expect(controller.val).toEqual(10);
    });

    it('should set progress bar value to 0 when it reaches a negative value', function(){
        controller.updateProgress(-20);
        expect(controller.val).not.toEqual(-10);
        expect(controller.val).toEqual(0);
    });

    it('should update the ui when it reached above the give limit', function(){
        var el = compileTemplate('progress-bar-component'),
            isolateScope = angular.element(el).isolateScope();
        isolateScope.vm.val = 120;
        scope.$apply();
        
        var barElem = angular.element(el[0]).find('div')[1];
        expect(angular.element(barElem).hasClass('exceed-limit')).toBe(true);
    });


    it('should have a class within limit when value is below 100%', function(){
        var el = compileTemplate('progress-bar-component'),
            isolateScope = angular.element(el).isolateScope();
        isolateScope.vm.val = 10;
        scope.$apply();
        
        var barElem = angular.element(el[0]).find('div')[1];
        expect(angular.element(barElem).hasClass('with-in-limit')).toBe(true);
    });
});