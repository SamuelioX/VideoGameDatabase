var detailedApp = angular.module("detailedApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']).service('authentication', authentication);
;

authentication.$inject = ['$http', '$window'];
function authentication($http, $window) {

    var saveToken = function (token) {
        $window.localStorage['token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['token'];
    };

    logout = function () {
        $window.localStorage.removeItem('token');
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout
    };
}

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

detailedApp.controller('CollapseDemoCtrl', function ($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
});

detailedApp.controller('loginCtrl', function ($scope) {
    var username = $scope.username;
    var password = $scope.password;

    $scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
});

detailedApp.run(function ($rootScope, $location, $state, Loginrvice) {
    $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                console.log('Changed state to: ' + toState);
            });

    if (!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
    }
});

detailedApp.controller('LoginController', function ($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";

    $scope.formSubmit = function () {
        if (LoginService.login($scope.username, $scope.password)) {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $state.transitionTo('home');
        } else {
            $scope.error = "Incorrect username/password !";
        }
    };

});

app.factory('LoginService', function () {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;

    return {
        login: function (username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    };

});