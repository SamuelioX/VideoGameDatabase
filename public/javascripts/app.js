var app = angular.module("app", ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ui.bootstrap']);

app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.factory('userIdFactory', function () {
    var userId = null;
    var gameId = null;
    var factory = {};

    factory.setUserId = function (id) {
        userId = id;
    };

    factory.getUserId = function () {
        return userId;
    };
    factory.setGameId = function (id) {
        gameId = id;
    };

    factory.getGameId = function () {
        return gameId;
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
        if ($window.sessionStorage.length > 0 && $window.sessionStorage.token !== "null") {
            $http.post('/verifyToken', $window.sessionStorage).then(function (response) {
                $scope.username = response.data.username;
                $scope.signedIn = true;
                userIdFactory.setUserId(response.data.userid);
                $scope.userId = userIdFactory.getUserId();
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

app.controller('autoCompleteCtrl', function ($scope, $http, $window, $log, userIdFactory) {
    $scope.goToDetailedPage = function (id, userId) {
//        <a ng-href="detailedPage.html?id={{r.id}}" target="_self">{{r.name}}</a>
        $window.location.href = '/detailedPage.html?id=' + id;
    };

    var self = this;

//    self.repos = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    $scope.userId = userIdFactory.getUserId();
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
app.controller("detailedGameCtrl", function ($window, $scope, $http, $location, userIdFactory) {
    $scope.status_options = ["Started", "Completed", "Dropped", "Interested", "Plan to Play", "Not Interested"];
    $scope.score_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.submitStatus = function () {
        var gameId = userIdFactory.getGameId();
        var userId = userIdFactory.getUserId();
//        console.log(gameId + " gameId " + userId + " userId");
        var statusId = $scope.selectedStatus;
//        console.log(statusId + " statusId");
        var searchInfo = {
            statusId: statusId,
            gameId: gameId,
            userId: userId
        };
        $http.post('/setUserGameStatus', searchInfo).then(function (response) {
            $window.location.reload();
        });
    };
    $scope.submitRating = function () {
        var gameId = userIdFactory.getGameId();
        var userId = userIdFactory.getUserId();
//        console.log(gameId + " gameId " + userId + " userId");
        var scoreId = $scope.selectedScore + 1;
//        console.log(statusId + " statusId");
        var searchInfo = {
            scoreId: scoreId,
            gameId: gameId,
            userId: userId
        };
        $http.post('/setUserGameRating', searchInfo).then(function (response) {
            $window.location.reload();
        });
    };
    $scope.submitReview = function () {
        var gameId = userIdFactory.getGameId();
        var userId = userIdFactory.getUserId();
        console.log(gameId + " gameId " + userId + " userId");
        var scoreId = $scope.selectedScore;
        var reviewText = $scope.reviewText;
//        console.log(statusId + " statusId");
        var searchInfo = {
            scoreId: scoreId,
            gameId: gameId,
            userId: userId,
            reviewText: reviewText
        };
        $http.post('/setUserGameReview', searchInfo).then(function (response) {
            $window.location.reload();
        });
    };
    $scope.getDetailedPage = function () {
        var id = $location.search().id;
        userIdFactory.setGameId(id);
        if ($window.sessionStorage.length > 0 && $window.sessionStorage.token !== "null") {
            $http.post('/verifyToken', $window.sessionStorage).then(function (response) {
                $scope.username = response.data.username;
                $scope.signedIn = true;
                userIdFactory.setUserId(response.data.userid);
                $scope.userId = userIdFactory.getUserId();
                var searchInfo = {
                    userId: $scope.userId,
                    gameId: id
                };
                //getting game info
                var endpoint = "/getGameInfo?gameId=" + id;
                $http.get(endpoint).then(function (response) {
                    $scope.response = response.data;
                    //getting user info on game
                    $http.post('/getUserGameStatus', searchInfo).then(function (response) {
                        if (response.data.success == false) {
                            $scope.status = "You are not logged in";
                        } else {
//                            console.log(response.data + " response");
                            $scope.status = response.data == "" ? "you have not rated" : response.data;
                        }
                        $http.post('/getUserGameReview', searchInfo).then(function (response) {
                            if (response.data.success == false) {
                                $scope.rating = "You are not logged in";
                            } else {
//                            console.log(response.data + " response");
                                $scope.rating = response.data == "" ? "you have not rated" : response.data;
                            }
                        });
                    });

                });
            });
        } else {
            var endpoint = "/getGameInfo?gameId=" + id;
            $http.get(endpoint).then(function (response) {
                $scope.response = response.data;
                //getting user info on game
                $scope.status = "You are not logged in";

            });
        }

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
app.controller("detailedProfileCtrl", function ($scope, $window, $http, $location) {
    $scope.getDetailedProfile = function () {
        if ($window.sessionStorage.length > 0 && $window.sessionStorage.token !== "null") {
            $scope.signedIn = true;
            $http.post('/verifyToken', $window.sessionStorage).then(function (response) {
                $scope.userId = response.data.userid;
                getDetails($scope.userId);
            });
        } else {
            $scope.signedIn = false;
            $scope.response = "there are no tokens";
        }
    };
    var getDetails = function (userId) {
        var endpoint = "/getUserDetails?userId=" + userId;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
            var userList = "/getUserGameList?userId=" + userId;
            $http.get(userList).then(function (response) {
                $scope.userList = response.data;
            });
        });

    };
});

app.controller('gameListCtrl', function ($scope, $http) {
    $scope.getGameList = function () {
        $http.get('/getGameList').then(function (response) {
            $scope.gameList = response.data;
        });
    };
});

app.controller('systemListCtrl', function ($scope, $http) {
    $scope.getSystemList = function () {
        $http.get('/getSystemList').then(function (response) {
            $scope.systemList = response.data;
        });
    };
});