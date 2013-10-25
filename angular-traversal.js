var traversal = angular.module('traversal', ['ui.router']);

function Traverser() {
    this._site_data = null;
};

// Utility function
function findByName(a, name) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].__name__ == name) return a[i];
    }
    return null;
};


var traversal_state = {
    // This is the "matchall" state that catches all URLs
    name: 'traverser',
    url: '*path',
    resolve: {
        init: ['$http', '$window', '$state', 'traversalService',
            function ($http, $window, $state, traversalService) {
                if (!traversalService._site_data) {
                    // Don't have data yet
                    var json_url = 'site_data.json';
                    var path = $window.location.href;
                    return $http.get(json_url)
                        .then(function (resp) {
                                  traversalService.load_data(resp.data);
                                  traversalService.traverse($state, path);
                              });
                }
            }]
    }
};

Traverser.prototype.load_data = function (data) {
    // Walk tree and assign __parent__ references
    function walk_tree(parent, child) {
        child.__parent__ = parent;

        if (child.hasOwnProperty('items')) {
            child.items.forEach(function (item) {
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

    /* Walking the ancestors can be expensive. Cache this by storing
    the base part of the resource_url on the resource as
    __base_resource_url__  */
    var base_url = '';
    if (resource.hasOwnProperty('__base_url__')) {
        base_url =  resource.__base_url__;
    } else {
        walk(resource, lineage);
        lineage = lineage.reverse();
        base_url = '#' + lineage.join('/')
        resource.__base_url__ = base_url;
    };


    if (view_name) {
        base_url = base_url + '/' + view_name;
    }

    return base_url;
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

            next = findByName(context.items, next_name);

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

                 // Make the traverer available on the root scope
                 $rootScope.traverser = traversalService;

                 // Register a handler that watches for any changes to
                 // URL and then runs the traverser
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

