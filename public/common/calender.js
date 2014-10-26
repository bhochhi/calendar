angular.module('calender', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        defaultStateProvider])
    .run();


function defaultStateProvider($stateProvider) {

    var calenderState = {
        url: '',
        template: '<workspace></workspace>',
        abstract: true
    };
    $stateProvider
        .state('calender', calenderState);
}

