(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('progressBarController', [ProgressBarController]);
    app.component('progressBarComponent', {
        template: require('./progress-bar.html'),
        controller: 'progressBarController',
        controllerAs: 'vm',
        bindings: {
            val: '<'
        }
    });

    function ProgressBarController() {
        var vm = this;
        vm.updateProgress = function (value) {
            var newVal = vm.val + value;
            vm.val = newVal > 0 ? newVal : 0;
        };
    }
    
}());