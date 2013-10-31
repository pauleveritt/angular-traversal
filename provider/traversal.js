var traversal = angular.module("traversal", []);

Array.prototype.findByProp = function (prop, value) {
    /* Given array, find  first with property matching the value */
    for (var i = 0; i < this.length; i++) {
        if (this[i][prop] == value) return this[i];
    }
    return null;
};

traversal.provider("traverser", function () {

    // A helper that assigns __parent__ and __resource_url__
    var inbound_cleanup = function (_parent, _child) {
        _child.__parent__ = _parent;

        if (_parent == null) {
            // We are on the root
            _child.__resource_url__ = "/";
        } else {
            var pru = _parent.__resource_url__;
            _child.__resource_url__ = pru + _child.name + '/';
        }
    };

    // A helper that walks the tree
    var walk_tree = function (parent, child, callbacks) {
        // Run our built-in helper for __parent__ / __resource_url__
        inbound_cleanup(parent, child);

        // Process any custom callbacks to cleanup resource
        if (callbacks) {
            callbacks.forEach(function (i) {
                i(child);
            })
        }

        // Recurse into children at child.items
        if (child.hasOwnProperty('items')) {
            child.items.forEach(function (item) {
                walk_tree(child, item, callbacks);
            })
        }
        return child;
    };

    return {

        // Instance data/methods
        $get: function ($rootScope, $location, $state) {
            // Instance data
            var root = null;
            var context = null;

            // Make these available in templates by stashing them on
            // the $rootScope
            $rootScope.context = context;


            /*   ###  The traverser  ###  */
            function traverseTo(new_path) {
                var self = $rootScope.traverser;

                var view_name = 'default';
                var next;
                var resource = self.root; // Use as root for starting loop
                var parents = [];
                var path_items = new_path.split('/').filter(function (next_segment) {
                    return next_segment;
                });

                path_items.forEach(function (next_name) {

                    if (resource.items) {
                        next = resource.items.findByProp("name",
                                                         next_name);
                    } else {
                        next = null;
                    }
                    if (next) {
                        parents.push(resource);
                        resource = next;
                    } else {
                        if (next_name) {
                            view_name = next_name == '' ? 'default' : next_name;
                        }
                    }
                });
                var type_name = resource.type.toLowerCase();
                var view_state = type_name + '-' + view_name;

                self.context = resource;
                self.parents = parents;

                console.log('view_state', view_state);
                $rootScope.$broadcast("traverserChanged", self.context);
                $state.go(view_state);
            }

            /*   ###  /The traverser  ###  */


            // Register a listener on URL change
            $rootScope.$on(
                '$locationChangeSuccess', function (event) {
                    event.preventDefault();
                    traverseTo($location.path());
                }
            );

            // Called from the app, typically in the abstract view
            function setRoot(data, callbacks) {
                // Walk tree assigning __parent__ and __resource_url__
                // while also processing any of the per-resource
                // callbacks

                walk_tree(null, data, callbacks);

                // Assign root and make traverser available globally
                this.root = data;
                $rootScope.traverser = this;

                // Traverse to where the browser says to go
                traverseTo($location.path());
            }

            // Public interface
            return {
                root: root,
                context: context,
                setRoot: setRoot,
                traverseTo: traverseTo
            }
        }
    }
});