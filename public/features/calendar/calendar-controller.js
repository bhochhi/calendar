/**
 * Created by rbhochhibhoya on 11/4/2014.
 */
'use strict';
calenderApp
    .controller('calendarCtrl', ['$scope', function ($scope) {
        var idx = 0;
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
        var currentMonth = _.find($scope.months, {number: today.getMonth()});
        var currentYear = today.getFullYear();
        $scope.selectedYear = currentYear;
        $scope.selectedMonth = currentMonth;


        var startYear = currentYear - 20;
        var endYear = currentYear + 20;
        $scope.years = [];
        for (var i = startYear; i <= endYear; i++) {
            $scope.years.push(i);
        }
        $scope.dates = [];
        $scope.$watchGroup(['selectedYear', 'selectedMonth'], function (newValues) {
        $scope.dates = [];
        idx = 0;
        var year = $scope.selectedYear;// newValues[0];
        var month = $scope.selectedMonth;// newValues[1];
        console.log(year, month);
        var curLastDate = (new Date(year, $scope.selectedMonth.number + 1, 0)).getDate();
        var firstDayOfSelectedMonth = _.find($scope.days, {number: (new Date(year, month.number, 1)).getDay()});
        var lastDayOfSelectedMonth = _.find($scope.days, {number: (new Date(year, month.number + 1, 0)).getDay()});

        if (firstDayOfSelectedMonth && firstDayOfSelectedMonth.number != 0) {
            var needsToFill1 = firstDayOfSelectedMonth.number;
            var preMonthLastDate = (new Date(year, month.number, 0)).getDate();
            var preStartDate = preMonthLastDate - needsToFill1 + 1;
            for (var preDate = preStartDate; preDate <= preMonthLastDate; preDate++) {
                $scope.dates.push(preDate);
            }

        }

        for (var curDate = 1; curDate <= curLastDate; curDate++) {
            $scope.dates.push(curDate)
        }

        if (lastDayOfSelectedMonth && lastDayOfSelectedMonth.number != 6) {
            var needsToFill = 7 - (lastDayOfSelectedMonth.number + 1);
            for (var nextDate = 1; nextDate <= needsToFill; nextDate++) {
                $scope.dates.push(nextDate);
            }
        }
            console.log("dates",$scope.dates);
        },true);


        $scope.getDate = function () {
            console.log('idx', idx);
            if(idx>42) idx=0;
            return $scope.dates[idx++];
        }

    }]);