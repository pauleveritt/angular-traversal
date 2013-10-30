var app = angular.module("traversalApp", ['traversal', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

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
               })
});


app.controller("LayoutView", function ($http, $scope, traverser) {

    $scope.load_data = function () {
        $http.get('site_data.json')
            .success(function (data) {
                         traverser.setRoot(data);
                         $scope.breadcrumbs = [
                             {title: traverser.context.title,
                                 href: "#/"}
                         ]
                     })
            .error(function () {
                       console.log('error loading data');
                   })
    };
    $scope.load_data();
    console.log("LayoutView");
});

app.controller("SiteRootView", function ($scope, traverser) {
    console.log("SiteRootView");
});

app.run(['$rootScope', 'traverser',
            function ($rootScope, traverser) {
                $rootScope.traverser = traverser;
            }]);