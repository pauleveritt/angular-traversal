var traversal = angular.module('traversal', ['ui.router']);

function Traverser() {
    this.color = 'grey';
};
Traverser.prototype.comeBack = function () {
    this.color = 'white';
};
Traverser.prototype.traverse = function (newUrl, oldUrl) {
    this.new_path = newUrl.split('#')[1];
    this.old_path = oldUrl.split('#')[1];
};

traversal.service('traversalService', Traverser);

var injector = angular.injector(['traversal', 'ng']);

traversal
    .run(['$rootScope', '$state', 'traversalService',
             function ($rootScope, $state, traversalService) {
                 $rootScope.$on(
                     '$locationChangeStart', function (event, newUrl, oldUrl) {
                         traversalService.traverse(newUrl, oldUrl);
                         $state.go('contacts.detail', { contactId: 42 });
                         event.preventDefault(); // This prevents the navigation from happening
                     }
                 );


             }]);