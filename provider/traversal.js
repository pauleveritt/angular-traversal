var traversal = angular.module("traversal", []);

traversal.provider("traverser", function () {

    return {

        // Instance data/methods
        $get: function () {
            // Instance data
            var context = {title: "Default Context Title"};

            // Public interface
            return {
                context: context,
                setContext: function (value) {
                    context.title = value;
                }
            }
        }
    }
});