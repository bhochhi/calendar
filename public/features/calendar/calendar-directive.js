/**
 * Created by rbhochhibhoya on 11/4/2014.
 */

calenderApp
    .directive('calendar', [function () {
        return {
            restrict: 'E',
            templateUrl: 'calendar/calendar-partial.html',
            controller: 'calendarCtrl',
            link: function link($scope, $element, $attrs) {

            }
        }
    }]);