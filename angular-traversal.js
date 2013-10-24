var traversal = angular.module('traversal', ['ui.router']);

function Traverser() {
    this._site_data = null;
};


Traverser.prototype.load_data = function (data) {
    // Walk tree and assign __parent__ references
    function walk_tree(parent, child) {
        child.__parent__ = parent;

        if (child.hasOwnProperty('items')) {
            _.each(child.items, function (item) {
                walk_tree(child, item);
            })
        }
        return child;
    }

    walk_tree(null, data);
    this._site_data = data;
};

Traverser.prototype.resource_url = function (resource, view_name) {
    /* Produce a full URL for a resource and optional view */

    var lineage = [];

    function walk(r, lineage) {
        lineage.push(r.__name__);
        if (r.__parent__) {
            walk(r.__parent__, lineage);
        }
    }

    walk(resource, lineage);
    lineage = lineage.reverse();
    if (view_name) {
        lineage.push(view_name);
    }
    return '#' + lineage.join('/');
};

Traverser.prototype.breadcrumbs = function (resource) {
    /* If not given a resource, use context */

    var self = this;

    if (!resource) {
        resource = this.context;
    }
    var breadcrumbs = [];
    this.parents.forEach(function (item) {
        breadcrumbs.push(
            {"title": item.title, "href": self.resource_url(item)}
        )
    });
    breadcrumbs.push(
        {"title": resource.title, "href": self.resource_url(resource)}
    );
    breadcrumbs[0].href = "#/";
    return breadcrumbs;
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
                return i.__name__ == next_name;
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

    this.context = context;
    this.parents = parents;

    console.log('view_state', this.old_path, view_state);
    $state.go(view_state);

};

// Register and inject service, then bootstrap it
traversal.service('traversalService', Traverser);
var injector = angular.injector(['traversal', 'ng']);
traversal
    .run(['$rootScope', '$state', 'traversalService',
             function ($rootScope, $state, traversalService) {
                 $rootScope.$on(
                     '$locationChangeSuccess', function (event, newUrl) {
                         event.preventDefault();
                         if (!traversalService._site_data) {
                             // Data hasn't loaded yet
                             return;
                         }
                         traversalService.traverse($state, newUrl);
                     }
                 );


             }]);

