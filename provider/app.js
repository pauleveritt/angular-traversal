var app = angular.module("traversalApp", ['ngRoute', 'traversal']);

app.config(function ($routeProvider, gameProvider) {
    gameProvider.setType("Peaceful");

    $routeProvider.when('/',
                        {
                            templateUrl: "partial1.html",
                            controller: "AppCntrl",
                            resolve: {
                                init: function ($q) {
                                    var defer = $q.defer();
                                    defer.resolve();
                                    return defer.promise;
                                }}
                        })
});


app.controller("AppCntrl", function ($scope, game) {
    $scope.title = game.title;
});