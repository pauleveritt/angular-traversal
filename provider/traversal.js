var traversal = angular.module("traversal", []);

traversal.provider("traverser", function () {

    return {

        // Instance data/methods
        $get: function () {
            // Instance data
            var root;
            var context;

            function setRoot(value) {
                this.context = value;
                this.root = value;
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