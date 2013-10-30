var traversal = angular.module("traversal", []);

traversal.provider("traverser", function () {
    var type;
    var context = {title: "Default Context Title"};
    return {
        setType: function (value) {
            type = value
        },
        setContext: function (value) {
            context = value
        },
        $get: function () {
            return {
                title: type + "Craft",
                context: context
            }
        }
    }
});