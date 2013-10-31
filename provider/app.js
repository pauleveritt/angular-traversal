var app = angular.module("traversalApp", ['traversal', 'ui.router']);

app.config(function ($stateProvider) {

    $stateProvider
        .state('layout', {
                   abstract: true,
                   templateUrl: 'partials/layout.html',
                   controller: LayoutView

               })
        .state('siteroot-default', {
                   url: '*path',
                   parent: "layout",
                   controller: SiteRootView,
                   templateUrl: "partials/siteroot_view.html"
               })
        .state('folder-default', {
                   parent: "layout",
                   controller: FolderView,
                   templateUrl: "partials/folder_view.html"
               })
        .state('document-default', {
                   parent: "layout",
                   controller: DocumentView,
                   templateUrl: "partials/document_view.html"
               })
        .state('notfound', {
                   parent: "layout",
                   template: "<h2>Not Found</h2>"
               })

});