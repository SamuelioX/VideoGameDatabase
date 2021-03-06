var app = angular.module("app", ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngRoute', 'ui.bootstrap']);
app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

////function that adds cors
(function () {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();


//factory that allows items to be reused
//mostly designed for SPA, not amazingly effective otherwise
app.factory('userIdFactory', function () {
    var userId = null;
    var gameId = null;
    var signedIn = false;
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

    factory.setSignedInStatus = function (login) {
        signedIn = login;
    };

    factory.getSignedInStatus = function () {
        return signedIn;
    };

    return factory;
});

//login controller, handles logins, token and userId
app.controller('loginCtrl', function ($scope, $window, $http, userIdFactory) {
    //alert array for when user unsuccesfully logs in

    $scope.alerts = [];
    $scope.goToLogin = function () {
        $window.location.href = '/login';
    };
    $scope.login = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var user = {
                username: $scope.username,
                password: $scope.password
            };
            $scope.user = user;
            $http.post($scope.ENDPOINT + '/api/Auth?apikey=' + $scope.APIKEY,
                    $scope.user).then(function (response) {
                //check if the token is real 
                if (response.data.success == false) {
//                $scope.message = 'Error: Invalid username or password';
                    userIdFactory.setSignedInStatus(false);
                    $scope.alerts.length = 0;
                    $scope.alerts.push({type: 'danger', msg: 'Username or password is incorrect'});
//                $window.location.href = '/login.html';
                } else {
                    userIdFactory.setSignedInStatus(true);
                    $window.sessionStorage.token = response.data.token;
                    $window.location.href = '/profile';
                }
            });
        });
    };
    $scope.register = function () {
        $window.location.href = '/register';
    };

    $scope.checkToken = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            if ($window.sessionStorage.length > 0 && $window.sessionStorage.token !== "null") {
                $http.post($scope.ENDPOINT + '/api/Token?apikey=' + $scope.APIKEY, $window.sessionStorage).then(function (response) {
                    $scope.username = response.data.username;
                    userIdFactory.setSignedInStatus(true);
                    $scope.signedIn = userIdFactory.getSignedInStatus();
                    userIdFactory.setUserId(response.data.userid);
                    $scope.userId = userIdFactory.getUserId();
                });
            } else {
                userIdFactory.setSignedInStatus(false);
                $scope.signedIn = userIdFactory.getSignedInStatus();
                $scope.userId = null;
            }
        });
    };
    $scope.logout = function () {
        $window.sessionStorage.token = null;
        userIdFactory.setSignedInStatus(false);
        $window.location.reload();
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});

app.controller('autoCompleteCtrl', function ($scope, $http, $window, $log, userIdFactory) {
    $scope.goToDetailedPage = function (id) {
//        <a ng-href="detailedPage.html?id={{r.id}}" target="_self">{{r.name}}</a>
        $window.location.href = '/games/gameId=' + id;
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
    function querySearch(query, $scope) {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var endpoint = $scope.ENDPOINT + "/api/Search?gamename=" + query +
                    "&apikey=" + $scope.APIKEY;
            return $http.get(endpoint).then(function (response) {
                return response.data;
            });
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

app.controller('registerAcctCtrl', function ($scope, $window, $http, userIdFactory) {

    $scope.checkDuplicateEmail = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var email = $scope.email;
            var endpoint = $scope.ENDPOINT + "/api/EmailAvailability?email=" + email +
                    "&apikey=" + $scope.APIKEY;
            $http.get(endpoint).then(function (response) {
                $scope.emailAvail = response.data.available;
            });
        });
    };
    $scope.checkDuplicateUsername = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var username = $scope.username;
            var endpoint = $scope.ENDPOINT + "/api/UserAvailability?username=" + username
                    + "&apikey=" + $scope.APIKEY;
            $http.get(endpoint).then(function (response) {
                $scope.usernameAvail = response.data.available;
            });
        });
    };
    $scope.registerAcct = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var user = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };
            $scope.user = user;
            $http.post($scope.ENDPOINT + '/api/Register?apikey=' + $scope.APIKEY, $scope.user).then(function (data, status, headers, config) {
                $scope.message = 'Welcome';
                $window.location.href = '/';
            });
        });
    };
});
app.controller("detailedGameCtrl", function ($window, $scope, $http, $location, userIdFactory) {
    $scope.status_options = ["Started", "Completed", "Dropped", "Interested", "Plan to Play", "Not Interested"];
    $scope.score_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.getDetailedPage = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var id = $location.search().gameId;
            userIdFactory.setGameId(id);
            if ($window.sessionStorage.length > 0 && $window.sessionStorage.token !== "null") {
                $http.post($scope.ENDPOINT + '/api/Token?apikey=' + $scope.APIKEY, $window.sessionStorage).then(function (response) {
                    $scope.username = response.data.username;
                    userIdFactory.setUserId(response.data.userid);
                    $scope.userId = userIdFactory.getUserId();
                    var searchInfo = {
                        userId: $scope.userId,
                        gameId: id
                    };
                    //getting game info
                    var endpoint = $scope.ENDPOINT + "/api/Games/" + id
                            + "?apikey=" + $scope.APIKEY;
                    $http.get(endpoint).then(function (response) {
                        $scope.response = response.data;
                        //getting user info on game
                        $http.get($scope.ENDPOINT + '/api/UserGameStatuses/user/' + userIdFactory.getUserId() + '/game/' +
                                id + '?apikey=' + $scope.APIKEY).then(function (response) {
                            $scope.status = response.data.success == false ? {type: "you have not rated"} : response.data;
                            $http.get($scope.ENDPOINT + '/api/UserGameReviews/user/' + userIdFactory.getUserId() + '/game/' +
                                    id + '?apikey=' + $scope.APIKEY).then(function (response) {
                                $scope.signedIn = userIdFactory.getSignedInStatus();
                                $scope.rating = response.data.success == false ? {review_score: "you have not rated"} : response.data;
                            });
                        });

                    });
                });
            } else {
                var endpoint = $scope.ENDPOINT + "/api/Games/" + id
                        + "?apikey=" + $scope.APIKEY;
                $http.get(endpoint).then(function (response) {

                    //getting user info on game
                    $scope.status = {type: "you are not logged in"};
                    $scope.rating = {review_score: "you are not logged in"};
                    $scope.response = response.data;
                    $scope.signedIn = userIdFactory.getSignedInStatus();
                });
            }
        });
    };
    /**
     * Function that submits a user's status
     * @param {type} gameId 
     * @returns {undefined}
     */
    $scope.submitStatus = function (gameId) {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var userId = userIdFactory.getUserId();
            var statusId = $scope.selectedStatus;
            var gameIdEnd = gameId == undefined ? userIdFactory.getGameId() : gameId;
            var searchInfo = {
                statusId: statusId,
                gameId: gameIdEnd,
                userId: userId
            };
            $http.post($scope.ENDPOINT + '/api/UserGameStatuses?apikey=' + $scope.APIKEY, searchInfo).then(function (response) {
                $window.location.reload();
            });
        });
    };
    $scope.submitRating = function (gameId) {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var userId = userIdFactory.getUserId();
            var scoreId = $scope.selectedScore + 1;
            var gameIdEnd = gameId == undefined ? userIdFactory.getGameId() : gameId;
            var searchInfo = {
                gameId: gameIdEnd,
                userId: userId,
                scoreId: scoreId
            };
            $http.post($scope.ENDPOINT + '/api/UserGameReviews?apikey=' + $scope.APIKEY, searchInfo).then(function (response) {
                $window.location.reload();
            });
        });
    };
});
app.controller("detailedCompanyCtrl", function ($scope, $http, $location, userIdFactory) {
    $scope.getDetailedPage = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var id = $location.search().id;
            var endpoint = $scope.ENDPOINT + "/api/Games/" + id
                    + "&apikey=" + $scope.APIKEY;
            $http.get(endpoint).then(function (response) {
                $scope.response = response.data;
            });
        });
    };
});

app.controller("searchCtrl", function ($scope, $http, userIdFactory) {
    var name = $scope.gamename;
    $scope.searchGame = function (name) {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var endpoint = $scope.ENDPOINT + "/api/Search/" + name
                    + "?apikey=" + $scope.APIKEY;
            $http.get(endpoint).then(function (response) {
                $scope.response = response.data;
            });
        });
    };
});
app.controller("detailedProfileCtrl", function ($scope, $window, $http, userIdFactory) {
    $scope.getDetailedProfile = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            if ($window.sessionStorage.length > 0 && $window.sessionStorage.token !== "null") {
                $http.post($scope.ENDPOINT + '/api/Token?apikey=' + $scope.APIKEY, $window.sessionStorage).then(function (response) {
                    userIdFactory.setSignedInStatus(true);
                    $scope.signedIn = userIdFactory.getSignedInStatus();
                    $scope.userId = response.data.userid;
                    getDetails($scope.userId);
                });
            } else {
                $scope.response = "there are no tokens";
                $scope.signedIn = userIdFactory.getSignedInStatus();
            }
        });
    };
    var getDetails = function (userId) {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            var endpoint = $scope.ENDPOINT + "/api/Users/" + userId
                    + "?apikey=" + $scope.APIKEY;
            $http.get(endpoint).then(function (response) {
                $scope.response = response.data;
                var userList = $scope.ENDPOINT + "/api/UserGameList/" + userId
                        + "?apikey=" + $scope.APIKEY;
                $http.get(userList).then(function (response) {
                    $scope.userList = response.data;
                });
            });
        });
    };
    $scope.propertyName = 'name';
    $scope.reverse = false;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
});

app.controller('gameListCtrl', function ($scope, $http, userIdFactory) {
    $scope.getGameList = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            $http.get($scope.ENDPOINT + '/api/Games?apikey=' + $scope.APIKEY).then(function (response) {
                $scope.gameList = response.data;
            });
        });
    };
});

app.controller('systemListCtrl', function ($scope, $http, userIdFactory) {
    $scope.getSystemList = function () {
        $http.get('/apigeekey').then(function (response) {
            $scope.APIKEY = response.data.key;
            $scope.ENDPOINT = response.data.endpoint;
            $http.get($scope.ENDPOINT + '/api/Systems?apikey=' + $scope.APIKEY).then(function (response) {
                $scope.systemList = response.data;
            });
        });
    };
});