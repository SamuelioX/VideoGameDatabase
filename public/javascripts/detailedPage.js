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

detailedApp.controller("searchCtrl", function ($scope, $http) {
    var name = $scope.gamename;
    $scope.searchGame = function (name) {
        var endpoint = "http://sample-env-1.hdvxynmgpf.us-west-2.elasticbeanstalk.com/searchGame?gamename=" + name;
//        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
        });
    };
});

detailedApp.controller('loginCtrl', function ($scope) {
    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
