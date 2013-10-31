var app = angular.module("traversalApp", ['traversal', 'ui.router']);

app.config(function ($stateProvider) {

    $stateProvider
        .state('layout', {
                   abstract: true,
                   templateUrl: 'partials/layout.html',
                   controller: "LayoutView"

               })
        .state('siteroot-default', {
                   url: '*path',
                   parent: "layout",
                   controller: "SiteRootView",
                   templateUrl: "partials/siteroot_view.html"
               })
        .state('folder-default', {
                   parent: "layout",
                   controller: "FolderView",
                   templateUrl: "partials/folder_view.html"
               })
        .state('document-default', {
                   parent: "layout",
                   controller: "DocumentView",
                   templateUrl: "partials/document_view.html"
               })
});


app.controller("LayoutView", function ($http, $scope, traverser) {

    $scope.load_data = function () {
        $http.get('site_data.json')
            .success(function (data) {
                         traverser.setRoot(data);
                     })
            .error(function () {
                       console.log('error loading data');
                   })
    };
    $scope.load_data();

    /* When the traverser changes (data loaded, user goes to a
     different location), recalculate the breadcrumbs */
    $scope.$on("traverserChanged", function (event, context) {
        $scope.breadcrumbs = [
            context
        ]
    });
    console.log("LayoutView");
});

app.controller("SiteRootView", function () {
    console.log("SiteRootView");
});

app.controller("FolderView", function () {
    console.log("FolderView");
});

app.controller("DocumentView", function () {
    console.log("DocumentView");
});