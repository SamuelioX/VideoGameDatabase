var searchApp = angular.module("searchApp", []);
searchApp.controller("searchCtrl", function ($scope, $http) {
    var name = $scope.gamename;

    $scope.searchGame = function (name) {
        var endpoint = "http://sample-env-1.hdvxynmgpf.us-west-2.elasticbeanstalk.com/searchGame?gamename=" + name;
//        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});