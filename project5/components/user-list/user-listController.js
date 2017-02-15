'use strict';


cs142App.controller('UserListController', ['$scope',
    function ($scope) {
        $scope.main.title = 'Users';
        //console.log('window.cs142models.userListModel()', window.cs142models.userListModel());
        $scope.FetchModel("/user/list", function(model){
            $scope.$apply(function(){
                $scope.userList = model;
            });
        });
    }]);

