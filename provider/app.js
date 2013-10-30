var app = angular.module("traversalApp", ['traversal', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, traverserProvider) {
    traverserProvider.setType("Peaceful");

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
                   templateUrl: "partials/siteroot_view.html"
//                   resolve: {
//                       init: function ($q) {
//                           var defer = $q.defer();
//                           defer.resolve();
//                           return defer.promise;
//                       }}
               })
});


app.controller("LayoutView", function ($scope, traverser) {
    console.log("LayoutView");
});

app.controller("SiteRootView", function ($scope, traverser) {
    $scope.change_breadcrumbs = function () {
        traverser.context = {title: "Updated Context Title"};
    };
    console.log("SiteRootView");
});

app.run(['$rootScope', 'traverser',
            function ($rootScope, traverser) {
                $rootScope.traverser = traverser;
            }]);