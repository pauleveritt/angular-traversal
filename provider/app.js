var app = angular.module("app", ['traversal']);

app.config(function (gameProvider) {
    gameProvider.setType("Peace");
});

app.controller("AppCntrl", function ($scope, game) {
    $scope.title = game.title;
});