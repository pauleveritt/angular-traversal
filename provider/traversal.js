var traversal = angular.module("traversal", []);

traversal.provider("game", function () {
    var type;
    return {
        setType: function (value) {
            type = value
        },
        $get: function () {
            return {
                title: type + "Craft"
            }
        }
    }
});