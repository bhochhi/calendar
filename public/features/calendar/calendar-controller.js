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
                    var previousMonthDate = new Date(year, month.number - 1, preDate);
                    var day = previousMonthDate.getDay();
                    $scope.dates.push({
                        date: preDate,
                        year: previousMonthDate.getFullYear(),
                        month: previousMonthDate.getMonth(),
                        day: day,
                        weekends: day == 0 || day == 6,
                        state:'previous'
                    });
                }

            }

            for (var curDate = 1; curDate <= curLastDate; curDate++) {
                var curMonthDate = new Date(year, month.number, curDate);
                var day = curMonthDate.getDay();
                $scope.dates.push({
                    date: curDate,
                    year: curMonthDate.getFullYear(),
                    month: curMonthDate.getMonth(),
                    day: day,
                    weekends: day == 0 || day == 6,
                    state:'current'
                });
            }

            if (lastDayOfSelectedMonth && lastDayOfSelectedMonth.number != 6) {
                var needsToFill = 7 - (lastDayOfSelectedMonth.number + 1);
                for (var nextDate = 1; nextDate <= needsToFill; nextDate++) {
                    var nextMonthDate = new Date(year, month.number + 1, nextDate);
                    var day = nextMonthDate.getDay();
                    $scope.dates.push({
                        date: nextDate,
                        year: nextMonthDate.getFullYear(),
                        month: nextMonthDate.getMonth(),
                        day: day,
                        weekends: day == 0 || day == 6,
                        state:'next'
                    });
                }
            }
            $scope.dates = formatDate($scope.dates);
            console.log("dates", $scope.dates);
        }, true);

        function formatDate(dates) {
            var formattedDates = [];
            var week = [];
            for (var i = 0; i < dates.length; i++) {
                if (week.length > 6) {
                    formattedDates.push(week);
                    week = [];
                }
                week.push(dates[i]);
            }
            formattedDates.push(week);
            return formattedDates;
        }
    }]);