var detailedApp = angular.module("detailedApp", []);
//app.config(function ($routeProvider){
//    $routeProvider.when("/")
//})
detailedApp.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
detailedApp.controller("detailedCtrl", function ($scope, $http, $location) {
    $scope.detailedPage = function () {
        var loc = $location.search();
        var id = $location.search().id;
        var endpoint = "http://sample-env-1.hdvxynmgpf.us-west-2.elasticbeanstalk.com/getGameInfo?gameId=" + id;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});