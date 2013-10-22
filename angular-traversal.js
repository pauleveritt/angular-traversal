var traversal = angular.module('traversal', ['ui.router']);

function Traverser() {
    this.color = 'grey';
};

Traverser.prototype.comeBack = function () {
    this.color = 'white';
};

Traverser.prototype.traverse = function () {
    /* Given a new path, find the right state and invoke it*/
};


traversal.service('traversalService', Traverser);

var injector = angular.injector(['traversal', 'ng']);

injector.invoke(function (traversalService) {
    console.log(traversalService.color);
    traversalService.comeBack();
    console.log(traversalService.color);
});

traversal
    .run(['$rootScope', '$state', '$stateParams', 'traversalService',
             function ($rootScope, $state, traversalService) {
                 $rootScope.$on(
                     '$locationChangeStart', function (event, newUrl, oldUrl) {
                         var old_path = oldUrl.split('#')[1];
                         var new_path = newUrl.split('#')[1];
                         console.log('newURL', new_path);
                         $state.go('contacts.detail', { contactId: 42 });


                         event.preventDefault(); // This prevents the navigation from happening
                     }
                 );


             }]);