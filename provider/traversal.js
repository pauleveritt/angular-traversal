var traversal = angular.module("traversal", []);

traversal.provider("traverser", function () {

    var findByProp = function (a, prop, value) {
        /* Given array, find  first with property matching the value */
        for (var i = 0; i < a.length; i++) {
            if (a[i][prop] == value) return a[i];
        }
        return null;
    };

    return {

        // Instance data/methods
        $get: function ($rootScope, $location, $state) {
            // Instance data
            var root;
            var context;

            // Make these available in templates by stashing them on
            // the $rootScope
            $rootScope.context = context;


            /*   ###  The traverser  ###  */
            function traverse_to(new_path) {
                var self = $rootScope.traverser;

                // xxxx

                var view_name = 'default';
                var next;
                var resource = self.root; // Use as root for starting loop
                var parents = [];
                var path_items = new_path.split('/').filter(function (next_segment) {
                    return next_segment;
                });

                path_items.forEach(function (next_name) {

                    if (resource.items) {
                        next = findByProp(resource.items, "name",
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
                '$locationChangeSuccess', function (event, newUrl) {
                    event.preventDefault();
                    traverse_to($location.path());
                }
            );

            // Called from the app, typically in the abstract view
            function setRoot(value) {
                // Assign root and make traverser available globally
                this.root = value;
                $rootScope.traverser = this;

                // Traverse to where the browser says to go
                traverse_to($location.path());
            }

            // Public interface
            return {
                root: root,
                context: context,
                setRoot: setRoot
            }
        }
    }
});