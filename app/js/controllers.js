function AbstractView($rootScope, $scope, traversalService) {
    /* "Superclass" state of other states. Put stuff in here needed for
     the layout. No access to resourceTree.request()  */
    $scope.layout_version = 9939;
    $scope.traverser = traversalService;


    // The layout breadcrumbs need to watch something that changes
    // in the service, not the local scope.
    $rootScope.$watch(function () {
        return traversalService.context;
    }, function () {
        $rootScope.context_title = traversalService.context.title;
        $rootScope.breadcrumbs = traversalService.breadcrumbs();
    });
}

function SiteRootView($scope) {
}

function FolderView($scope) {
}

function DocumentView($scope) {
}

function PersonView($scope) {
}
