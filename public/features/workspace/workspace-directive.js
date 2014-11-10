/**
 * Created by rbhochhibhoya on 10/24/2014.
 */

calenderApp
    .directive('workspace', [function () {
        return {
            restrict: 'EA',
            templateUrl: 'workspace/workspace-partial.html',
            controller: 'workspaceCtrl',
            link: function link($scope, $element, $attrs) {
            }
        }
    }]);