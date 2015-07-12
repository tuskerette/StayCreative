angular.module('app.directives', [])
  .directive('navigationbar', [function(){
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      controller: ['$scope', '$http', function($scope, $http){
        $http.get('static_pages/static_pages.json').success(function(data){
          console.log(data);
          $scope.pages = data;
        });
      }],
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'app/partials/navigationbar.html',
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    };
  }]);;
