angular.module('app.directives', [])
  .directive('customOnChange', [function(){

    return {
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      link: function(scope, element, attrs){
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    };
  }]);;
