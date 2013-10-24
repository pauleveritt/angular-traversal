// Make sure to include the `ui.router` module as a dependency
angular.module('traversalSample', ['traversal', 'ui.router'])
    .run(['$rootScope', '$state', '$stateParams',
             function ($rootScope, $state, $stateParams) {
                 $rootScope.$state = $state;
                 $rootScope.$stateParams = $stateParams;
             }]);