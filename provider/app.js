var app = angular.module("traversalApp", ['traversal', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, gameProvider) {
    gameProvider.setType("Peaceful");
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('layout', {
                   abstract: true,
                   templateUrl: 'partials/layout.html',
                   controller: "LayoutView"

               })
        .state('state1', {
                   url: "/",
                   parent: "layout",
                   controller: "SiteRootView",
                   templateUrl: "partials/siteroot_view.html",
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

app.controller("LayoutView", function ($scope, game) {
    $scope.title = game.title;
    console.log("SiteRootView");
});

app.controller("SiteRootView", function ($scope, game) {
    $scope.title = game.title;
    console.log("SiteRootView");
});