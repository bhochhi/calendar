var calenderApp = angular.module('calenderApp', ['ui.router']);


function defaultStateProvider($stateProvider, $urlRouterProvider) {
    var calenderState = {
        url: '/',
        template: '<workspace></workspace>',
        controller: function ($scope) {
            console.log('controller run');
        }
    };

    $stateProvider
        .state('calender', calenderState);
}

calenderApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    defaultStateProvider])
    .run(['$rootScope', function run() {
    }]);

window.calenderApp = calenderApp;

