var app = angular.module("app", ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ui.bootstrap']);

app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.factory('userIdFactory', function(){
    var userId = null;
    var factory = {};
    
    factory.setId = function(id){
        userId = id;
    };
    
    factory.getId = function(){
        return userId;
    };
    return factory;
});

app.controller('loginCtrl', function ($scope, $window, $http, userIdFactory) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
//    console.log($window.sessionStorage);
//    console.log($window.sessionStorage.token.length > 0);
    $scope.goToLogin = function () {
        $window.location.href = '/login.html';
    };
    $scope.login = function () {
        var user = {
            username: $scope.username,
            password: $scope.password
        };
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
    };
    $scope.register = function () {
        $window.location.href = '/register.html';
    };

    $scope.checkToken = function () {
//        console.log($window.sessionStorage);
        if ($window.sessionStorage.token != "null") {
            $http.post('/verifyToken', $window.sessionStorage).then(function (response) {
                $scope.username = response.data.username;
                $scope.signedIn = true;
                userIdFactory.setId($scope.userId);
                $scope.userId = userIdFactory.getId();
            });
        } else {
            $scope.signedIn = false;
            $scope.userId = null;
        }
    };
    $scope.logout = function () {
        $window.sessionStorage.token = null;
        $window.location.href = '/';
    };
});

app.controller('autoCompleteCtrl', function ($scope, $http, $window, $log) {
    $scope.goToDetailedPage = function (id) {
//        <a ng-href="detailedPage.html?id={{r.id}}" target="_self">{{r.name}}</a>
        $window.location.href = '/detailedPage.html?id=' + id;
    };

    var self = this;

//    self.repos = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var endpoint = "/searchGame?gamename=" + query;
        return $http.get(endpoint).then(function (response) {
            return response.data;
        });
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $scope.id = item.id;
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };

    }
});

app.controller('registerAcctCtrl', function ($scope, $window, $http) {
    $scope.checkDuplicateEmail = function () {
        var email = $scope.email;
        var endpoint = "/searchEmail?email=" + email;
        $http.get(endpoint).then(function (response) {
//            console.log(response);
            $scope.emailAvail = response.data.available;
        });
    };
    $scope.checkDuplicateUsername = function () {
        var username = $scope.username;
        var endpoint = "/searchUser?username=" + username;
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
app.controller("detailedGameCtrl", function ($scope, $http, $location, userIdFactory) {
    $scope.getDetailedPage = function () {
        var loc = $location.search();
        var id = $location.search().id;
//        userId = $scope.userId;
        var searchInfo = {
            userId: userIdFactory.getId(),
            gameId: id
        };
        //getting game info
        var endpoint = "/getGameInfo?gameId=" + id;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
        //getting user info on game
        $http.post('/getUserGameStatus', searchInfo).then(function (response) {
            $scope.status = response.data;
        });
    };
});
app.controller("detailedCompanyCtrl", function ($scope, $http, $location) {
    $scope.getDetailedPage = function () {
        var loc = $location.search();
        var id = $location.search().id;
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
app.controller("detailedProfileCtrl", function ($rootScope, $scope, $window, $http, $location) {
    $scope.getDetailedProfile = function () {
        if ($window.sessionStorage.token) {
            $http.post('/verifyToken', $window.sessionStorage).then(function (response) {
                $rootScope.userId = response.data.userid;
                getDetails($rootScope.userId);
            });
        } else {
            $scope.response = "there are no tokens";
        }
    };
    var getDetails = function (userId) {
        var endpoint = "/getUserDetails?userId=" + userId;
        $http.get(endpoint).then(function (response) {
            $scope.username = response.data.username;
            $scope.user_join_date = response.data.user_join_date;
            $scope.email = response.data.email;
        });
    };

});