/**
 * Created by rbhochhibhoya on 11/4/2014.
 */
'use strict';
calenderApp
    .controller('calendarCtrl', ['$scope', function ($scope) {
        //$scope.days = CalenderService.getDaysInSelectedMonth();
        $scope.months = [
            {name: 'January', number: 0},
            {name: 'February', number: 1},
            {name: 'March', number: 2},
            {name: 'April', number: 3},
            {name: 'May', number: 4},
            {name: 'June', number: 5},
            {name: 'July', number: 6},
            {name: 'August', number: 7},
            {name: 'September', number: 8},
            {name: 'October', number: 9},
            {name: 'November', number: 10},
            {name: 'December', number: 11}
        ];
        $scope.days = [
            {name: "Sunday", number: 0},
            {name: "Monday", number: 1},
            {name: "Tuesday", number: 2},
            {name: "Wednesday", number: 3},
            {name: "Thursday", number: 4},
            {name: "Friday", number: 5},
            {name: "Saturday", number: 6}
        ];

        var today = new Date();
        var currentDay = _.find($scope.days,{number:today.getDay()});
        var currentMonth = _.find($scope.months,{number:today.getMonth()});
        var currentYear = today.getYear()+1900;

        var startYear = currentYear-20;
        var endYear = currentYear+20;
        $scope.years = [];
        for(var i = startYear;i<=endYear;i++){
            $scope.years.push(i);
        }
        $scope.selectedYear = currentYear;
        $scope.selectedMonth = currentMonth;

    }]);