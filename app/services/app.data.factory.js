(function () {
    'use strict';
    var app = angular.module('app');

    app.factory('apiDataFactory', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {
        var apiDataFactory = {};

        apiDataFactory.fetchConfig = function () {
            var defer = $q.defer();
            $http.get(API_ENDPOINT).then(
                function (response) {
                    apiDataFactory.config = response.data;
                    defer.resolve();
                }
            );
            return defer.promise;
        };
        return apiDataFactory;
    }]);
}());