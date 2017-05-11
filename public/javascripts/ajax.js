var searchApp = angular.module("searchApp", []);
searchApp.controller("searchCtrl", function ($scope, $http) {
    var name = $scope.gamename;

    $scope.findValue = function (name) {
        $http.get("https://jsonplaceholder.typicode.com/comments").then(function (response) {
            $scope.response = response.data;
            $scope.myWelcome = response;
        });
    };
});