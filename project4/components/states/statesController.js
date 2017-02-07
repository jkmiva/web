/**
 * Define StatesController for the states component of CS142 project #4
 * problem #2.  The model data for this view (the states) is available
 * at window.cs142models.statesModel().
 */

cs142App.controller('StatesController', ['$scope','$filter', function($scope,$filter) {

   // Replace this with the code for CS142 Project #4, Problem #2
   //console.log('window.cs142models.statesModel()', window.cs142models.statesModel());
    $scope.p2 = {};
    $scope.p2.filterStr = "";
    $scope.outputInfo = "waiting for input...";
    $scope.states = window.cs142models.statesModel();
    $scope.filterFn = function(){
        $scope.retStr = $filter('filter')($scope.states,$scope.p2.filterStr);
        if ($scope.retStr.length === 0) {
            $scope.outputInfo = "No match found.";
        } else {
            $scope.outputInfo = $scope.retStr.length + " matches found.";
        }
    };

}]);
