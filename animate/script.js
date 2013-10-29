angular.module('ngViewExample', ['ngRoute', 'ngAnimate', 'ui.router'],
               function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

                   // For any unmatched url, redirect to /state1
//                   $urlRouterProvider.otherwise("/state1");
                   //
                   // Now set up the states
                   $stateProvider
                       .state('state1', {
                                  url: "/state1",
                                  templateUrl: "state1.html"
                              })
                       .state('state1.list', {
                                  url: "/list",
                                  templateUrl: "state1.list.html",
                                  controller: function ($scope) {
                                      $scope.items = ["A", "List", "Of", "Items"];
                                  }
                              })
                       .state('state2', {
                                  url: "/state2",
                                  templateUrl: "state2.html"
                              })
                       .state('state2.list', {
                                  url: "/list",
                                  templateUrl: "state2.list.html",
                                  controller: function ($scope) {
                                      $scope.things = ["A", "Set", "Of", "Things"];
                                  }
                              });

                   $routeProvider.when('/Book/:bookId', {
                       templateUrl: 'book.html',
                       controller: BookCntl,
                       controllerAs: 'book'
                   });
                   $routeProvider.when('/Book/:bookId/ch/:chapterId', {
                       templateUrl: 'chapter.html',
                       controller: ChapterCntl,
                       controllerAs: 'chapter'
                   });

                   // configure html5 to get links working on jsfiddle
//                   $locationProvider.html5Mode(true);
               });

function MainCntl($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}

function BookCntl($routeParams) {
    this.name = "BookCntl";
    this.params = $routeParams;
}

function ChapterCntl($routeParams) {
    this.name = "ChapterCntl";
    this.params = $routeParams;
}
