var traversal = angular.module('traversal', ['ui.router']);

function Traverser() {
    this._site_data = null;
};


Traverser.prototype.load_data = function (data) {
    this._site_data = data;
};


Traverser.prototype.traverse = function ($state, newUrl) {
    this.old_path = this.new_path;
    this.new_path = newUrl.split('#')[1];

    var view_name = 'default';
    var next;
    var context = this._site_data; // Use as root for starting loop
    var parents = [];
    var path_items = this.new_path.split('/').filter(function (next_segment) {
        return next_segment;
    });
    path_items.forEach(function (next_name) {

        if (context.items) {
            next = _.find(context.items, function (i) {
                return i.name == next_name;
            });
        } else {
            next = null;
        }
        if (next) {
            parents.push(context);
            context = next;
        } else {
            if (next_name) {
                view_name = next_name == '' ? 'default' : next_name;
            }
        }
    });
    var type_name = context.type.toLowerCase();
    var view_state = type_name + '-' + view_name;
    console.log('view_state', view_state);

};

// Register and inject service, then bootstrap it
traversal.service('traversalService', Traverser);
var injector = angular.injector(['traversal', 'ng']);
traversal
    .run(['$rootScope', '$state', 'traversalService',
             function ($rootScope, $state, traversalService) {
                 $rootScope.$on(
                     '$locationChangeSuccess', function (event, newUrl) {
                         if (!traversalService._site_data) {
                             // Data hasn't loaded yet
                             return;
                         }
                         traversalService.traverse($state, newUrl);
                         $state.go('contacts.detail', { contactId: 42 });
                         event.preventDefault();
                     }
                 );


             }]);

