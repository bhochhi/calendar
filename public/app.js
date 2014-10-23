angular.module('calender',[])
.controller(['$scope',function($scope){
        $scope.months  =  [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
    }]);