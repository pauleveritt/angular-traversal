function AbstractView($scope, traversalService) {
    /* "Superclass" state of other states. Put stuff in here needed for
     the layout. No access to resourceTree.request()  */
    $scope.layout_version = 9939;
    $scope.traverser = traversalService;
    $scope.breadcrumbs = traversalService.breadcrumbs();
}

function SiteRootView($scope) {
}

function FolderView($scope) {
}

function PersonView($scope) {
}
