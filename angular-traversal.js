var traversal = angular.module('traversal', ['ui.router']);

function Traverser() {
    this._site_data = {};
};


Traverser.prototype.load_data = function (data) {
    this._site_data = data;
};


Traverser.prototype.traverse = function (newUrl, oldUrl) {
    this.new_path = newUrl.split('#')[1];
    this.old_path = oldUrl.split('#')[1];
    console.log('new url', this.new_path, this._site_data);
};

// Register and inject service, then bootstrap it
traversal.service('traversalService', Traverser);
var injector = angular.injector(['traversal', 'ng']);
traversal
    .run(['$rootScope', '$state', 'traversalService',
             function ($rootScope, $state, traversalService) {
                 $rootScope.$on(
                     '$locationChangeStart', function (event, newUrl, oldUrl) {
                         traversalService.traverse(newUrl, oldUrl);
                         $state.go('contacts.detail', { contactId: 42 });
                         event.preventDefault();
                     }
                 );


             }]);

