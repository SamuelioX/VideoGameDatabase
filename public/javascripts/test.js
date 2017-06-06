var app = angular.module("test", []);
app.controller("test", function ($scope) {
    $scope.checkDate = function () {
        var date = (new Date("January 14, 1992")).toISOString().substring(0, 10);
        console.log(date);
        $scope.test = date;
    };
});
