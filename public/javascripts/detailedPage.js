var searchApp = angular.module("searchApp", []);
searchApp.controller("searchCtrl", function ($scope, $http) {
    var id = $scope.id;

    $scope.detailedPage = function (id) {
        var endpoint = "http://localhost:3000/getGameInfo?gameId=" + id;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});