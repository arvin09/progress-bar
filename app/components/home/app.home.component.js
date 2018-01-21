(function () {
    'use strict';
    var app = angular.module('app');
    app.controller('homeController', ['$scope','$document','apiDataFactory', HomeController]);
    app.component('homeComponent', {
        template: require('./home.html'),
        controller: 'homeController',
        controllerAs: 'vm'
    });

    function HomeController($scope, $document, apiDataFactory) {
        var vm = this;
        vm.progressBarId = 0;

        apiDataFactory.fetchConfig().then(function () {
            vm.config = apiDataFactory.config;
           // console.log('config', vm.config);
        });

        vm.updateBar = function (data) {
            
            var currentProgressBar = angular.element($document).find('progress-bar-component')[vm.progressBarId],
                progressBarScope = angular.element(currentProgressBar).isolateScope(),
                percentage = vm.getPercentageOfLimit(data, vm.config.limit);
               
            progressBarScope.vm.updateProgress(percentage);
        };

        vm.getPercentageOfLimit = function (val, limit) {
            return Math.round(val / limit * 100);
        };
    }
}());