angular.module('app.directives', [])
  .directive('usernav', [function(){

    return {
      controller: 'authController',
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'app/partials/usernav.html',
      replace: true,
      transclude: true
    };
  }]);;
