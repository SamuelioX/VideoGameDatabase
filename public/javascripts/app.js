var app = angular.module("app", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.controller('loginCtrl', function ($scope, $window, $http) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
    $scope.submit = function () {
//        var username = $scope.username;
//        var password = $scope.password;
        var user = {
            username: $scope.username,
            password: $scope.password
        };
//        if ($scope.username == 'admin' && $scope.password == 'admin') {
//            $window.location.href = '/';
//        }
        $scope.user = user;
        $http.post('/loginAuth', $scope.user).then(function (response) {
            //check if the token is real 
            if(response.data.success == false){
                $window.location.href = '/';
            } else {
                $window.sessionStorage.token = response.data.token;
            }
            
            $scope.message = 'Welcome';
            $window.location.href = '/';
        });
//                .error(function (data, status, headers, config) {
//            // Erase the token if the user fails to log in
//            delete $window.sessionStorage.token;
//            // Handle login errors here
//            $scope.message = 'Error: Invalid user or password';
//        });
    };
});
app.controller('registerCtrl', function ($scope, $window, $http) {
    $scope.checkDuplicateEmail = function () {
        var email = $scope.email;
        var endpoint = "/searchEmail?email=" + email;
//        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
//            console.log(response);
            $scope.emailAvail = response.data.available;
        });
    };
    $scope.checkDuplicateUsername = function () {
        var username = $scope.username;
        var endpoint = "/searchUser?username=" + username;
//        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
//            console.log(response);
            $scope.usernameAvail = response.data.available;
        });
    };
    $scope.register = function () {
//        var username = $scope.username;
//        var password = $scope.password;
        var user = {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email
        };
        $scope.user = user;
        $http.post('/register', $scope.user).then(function (data, status, headers, config) {
//            $window.sessionStorage.token = data.token;
            $scope.message = 'Welcome';
            $window.location.href = '/';
        });
    };
});

app.controller("detailedCtrl", function ($scope, $http, $location) {
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

app.controller("searchCtrl", function ($scope, $http) {
    var name = $scope.gamename;
    $scope.searchGame = function (name) {
        var endpoint = "/searchGame?gamename=" + name;
//        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});