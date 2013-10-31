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
        $get: function ($rootScope, $location) {
            // Instance data
            var root;
            var context;

            // Make these available in templates by stashing them on
            // the $rootScope
            $rootScope.context = context;

            function traverse_to(new_path) {
                var self = $rootScope.traverser;
                var new_name = new_path.slice(1)
                if (new_name == "") {
                    self.context = self.root;
                } else {
                    self.context = findByProp(self.root.items, "name", new_name);
                }
                $rootScope.$broadcast("traverserChanged", self.context);
            }

            $rootScope.$on(
                '$locationChangeSuccess', function (event, newUrl) {
                    event.preventDefault();
                    traverse_to($location.path());
                }
            );


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