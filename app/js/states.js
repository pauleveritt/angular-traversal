// Make sure to include the `ui.router` module as a dependency.
var mod = angular.module('traversalSample');

mod.config(['$stateProvider', '$urlRouterProvider',
               function ($stateProvider) {

                   var abstract_state = {
                       // Abstract parent of other states
                       name: 'abstract',
                       abstract: true,
                       templateUrl: 'partials/layout.html',
                       controller: AbstractView
                   };

                   var siteroot_default_state = {
                       name: 'siteroot-default',
                       parent: abstract_state,
                       templateUrl: 'partials/siteroot_view.html',
                       controller: SiteRootView
                   };

                   var folder_default_state = {
                       name: 'folder-default',
                       parent: abstract_state,
                       templateUrl: 'partials/folder_view.html',
                       controller: FolderView
                   };

                   var document_default_state = {
                       name: 'document-default',
                       parent: abstract_state,
                       templateUrl: 'partials/document_view.html',
                       controller: DocumentView
                   };

                   var person_default_state = {
                       name: 'person-default',
                       parent: abstract_state,
                       templateUrl: 'partials/person_view.html',
                       controller: PersonView
                   };

                   $stateProvider
                       .state(traversal_state)
                       .state(abstract_state)
                       .state(siteroot_default_state)
                       .state(document_default_state)
                       .state(folder_default_state)
                       .state(person_default_state);

                   return;

               }]);
