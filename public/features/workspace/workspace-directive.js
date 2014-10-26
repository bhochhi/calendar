/**
 * Created by rbhochhibhoya on 10/24/2014.
 */

angular.module('calender')
    .directive('workspace', [function () {
        return {
            restrict: 'E',
            replace: true,
            //scope: {
            //    id: '@',
            //    value: '=?',
            //    receivers: '=?'
            //},
            templateUrl: 'workspace/workspace-partial.html',
            controller: 'workspaceCtrl',
            link: function link($scope, $element, $attrs) {
                console.log("We come here");
            }
        }
    }]);