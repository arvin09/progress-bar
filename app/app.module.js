(function () {
    'use strict';
    var app = angular.module('app', []);
    app.constant('API_ENDPOINT', 'http://pb-api.herokuapp.com/bars');

    require('./services/app.data.factory.js');
    require('./components/home/app.home.component.js');
    require('./components/progress-bar/app.progress.bar.component.js');
    require('./styles/app.scss');
}());
