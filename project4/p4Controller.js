'use strict';

cs142App.controller('p4Controller',function($scope){
   $scope.p4={};
   $scope.p4.page = 'state';
   $scope.changePage = function(){
      $scope.p4.page = ($scope.p4.page === 'example') ? 'state' : 'example'; 
   } ;
});