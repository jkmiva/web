'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }]);

cs142App.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');
});

cs142App.controller('MainController', ['$scope','$routeParams', '$location',
    function ($scope, $routeParams, $location) {
        $scope.main = {}; 
        $scope.main.title = {title: 'Users'};
       
        $scope.$on('$routeChangeSuccess', function(events, current){
           if($routeParams.userId !== undefined) {
                $scope.FetchModel("/user/" + $routeParams.userId, function(model) {
                    $scope.$apply(function() {
                        $scope.main.currentUser = model.first_name + ' ' + model.last_name;
                    });
                });
            }
            $scope.main.info = /photos/.test($location.$$path) ? "Photos of " : ''; 
        });
        
        $scope.FetchModel = function (url, doneCallback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4 || xhr.status !== 200) {
                    return;
                }
                doneCallback(JSON.parse(xhr.responseText));
            };
            xhr.open("GET", url);
            xhr.send(); 
        };


    }]);
