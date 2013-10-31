var app = angular.module("traversalApp", []);

function LayoutView($http, $scope, traverser) {

    function assign_label(this_resource) {
        this_resource.label = "xyz";
    }

    $scope.load_data = function () {
        $http.get('site_data.json')
            .success(function (data) {
                         traverser.setRoot(data, [assign_label]);
                     })
            .error(function () {
                       console.log('error loading data');
                   })
    };
    $scope.load_data();

    /* When the traverser changes (data loaded, user goes to a
     different location), recalculate the breadcrumbs */
    $scope.$on("traverserChanged", function (event, context) {

        // Calculate breadcrumbs
        var breadcrumbs = [];
        traverser.parents.forEach(function (item) {
            breadcrumbs.push(item)
        });
        breadcrumbs.push(context);
        $scope.breadcrumbs = breadcrumbs;

    });
};

function SiteRootView($scope, traverser) {
    $scope.goto_doca = function () {
        {
            traverser.traverseTo("/docA");
        }
    }
    console.log("SiteRootView");
};

function FolderView() {
    console.log("FolderView");
};

function DocumentView() {
    console.log("DocumentView");
};