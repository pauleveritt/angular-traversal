var traversal = angular.module("traversal", []);

traversal.provider("traverser", function () {

    return {

        // Instance data/methods
        $get: function ($rootScope) {
            // Instance data
            var root;
            var context;

            // Make these available in templates by stashing them on
            // the $rootScope
            $rootScope.context = context;

            function setRoot(value) {
                this.context = value;
                $rootScope.context = this.context;
                this.root = value;
                $rootScope.traverser = this;

                // Flash a message
                $rootScope.$broadcast("traverserChanged", this.context);
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