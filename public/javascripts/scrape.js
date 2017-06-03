var app = angular.module("scrape", []);

app.controller("scrape", function ($http, $scope) {
    $scope.scrape = function () {
        var endpoint = "/scape";
        $http.get(endpoint).then(function (response) {
            response.data[0].forEach(function (data) {
                var game = {
                    name: data.Title,
                    release_date: data.Release,
                    developer: data.Developer,
                    publisher: data.Publisher,
                    genre: data.Genre
                };
                $scope.game = game;
                $http.post('/addGame', $scope.game).then(function (response) {
                    $scope.message += response.data.success + " " + "\n";
                });
            });

        });
    };
});