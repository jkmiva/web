'use strict';

cs142App.controller('HeaderController',function($scope){
    $scope.header={};
    $scope.header.title="Single Page APP";
    $scope.pages=[
        {name:"Home",value:"index.html"},
        {name:"Page2",value:"p2.html"},
        {name:"Page4",value:"p4.html"},
        {name:"Page5",value:"p5.html"}
    ];
});