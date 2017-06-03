var app = angular.module("app", ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ui.bootstrap']);


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
    $scope.login = function () {
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
            if (response.data.success == false) {
                $scope.message = 'Error: Invalid user or password';
                $window.location.href = '/';
            } else {
                $scope.message = 'Success: Logged in successfully!';
                $window.sessionStorage.token = response.data.token;
                $window.location.href = '/profile.html';
            }
        });
//                .error(function (data, status, headers, config) {
//            // Erase the token if the user fails to log in
//            delete $window.sessionStorage.token;
//            // Handle login errors here
//            $scope.message = 'Error: Invalid user or password';
//        });
    };
    $scope.register = function () {
        $window.location.href = '/register.html';
    };
});
app.controller('registerAcctCtrl', function ($scope, $window, $http) {
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
    $scope.registerAcct = function () {
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
app.controller("detailedGameCtrl", function ($scope, $http, $location) {
    $scope.getDetailedPage = function () {
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
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});
app.controller("detailedProfileCtrl", function ($scope, $window, $http, $location) {
    $scope.getDetailedProfile = function () {
        if ($window.sessionStorage.token) {
            $http.post('/verifyToken', $window.sessionStorage).then(function (response) {
                var userId = response.data.userid;
                getDetails(userId);
            });
        } else {
            $scope.response = "there are no tokens";
        }
        var getDetails = function (userId) {
            var endpoint = "/getUserDetails?userId=" + userId;
            $http.get(endpoint).then(function (response) {
                $scope.username = response.data.username;
                $scope.user_join_date = response.data.user_join_date;
                $scope.email = response.data.email;
            });
        };
    };
});