var detailedApp = angular.module("detailedApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

detailedApp.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

detailedApp.controller('loginCtrl', function ($scope, $window, $http) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
    $scope.submit = function () {
        var username = $scope.username;
        var password = $scope.password;
        if ($scope.username == 'admin' && $scope.password == 'admin') {
            $window.location.href = '/';
        }
        $http.post('/authenticate', $scope.user).success(function (data, status, headers, config) {
            $window.sessionStorage.token = data.token;
            $scope.message = 'Welcome';
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete $window.sessionStorage.token;
            // Handle login errors here
            $scope.message = 'Error: Invalid user or password';
        });
    };
});

detailedApp.controller("detailedCtrl", function ($scope, $http, $location) {
    $scope.detailedPage = function () {
        var loc = $location.search();
        var id = $location.search().id;
        console.log(id + "id = ");
        var endpoint = "/getGameInfo?gameId=" + id;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});

detailedApp.controller("searchCtrl", function ($scope, $http) {
    var name = $scope.gamename;
    $scope.searchGame = function (name) {
        var endpoint = "/searchGame?gamename=" + name;
//        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});

//app.factory('LoginService', function () {
//    var admin = 'admin';
//    var pass = 'pass';
//    var isAuthenticated = false;
//
//    return {
//        login: function (username, password) {
//            isAuthenticated = username === admin && password === pass;
//            return isAuthenticated;
//        },
//        isAuthenticated: function () {
//            return isAuthenticated;
//        }
//    };
//
//});