var searchApp = angular.module("searchApp", []);
searchApp.controller("searchCtrl", function ($scope, $http) {
    var name = $scope.gamename;

    $scope.findValue = function (name) {
        var endpoint = "http://localhost:3000/searchGame?gamename=" + name;
        $http.get(endpoint).then(function (response) {
            $scope.response = response.data;
//            $scope.myWelcome = response;
//                        for(var i = 0; i < response.data.length; i++){
//                            $scope.myWelcome += + response.data[i].email;
//                        }
        });
    };
});