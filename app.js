'use strict';
var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.field = {
    min: 400,
    max: 300
  };

});

app.directive('lowerThan', [
  function() {

    var link = function($scope, $element, $attrs, ctrl) {

      var validate = function(viewValue) {
        var comparisonModel = $attrs.lowerThan;
        
        if(!viewValue || !comparisonModel){
          // It's valid because we have nothing to compare against
          ctrl.$setValidity('lowerThan', true);
        }

        // It's valid if model is lower than the model we're comparing against
        ctrl.$setValidity('lowerThan', parseInt(viewValue, 10) < parseInt(comparisonModel, 10) );
        return viewValue;
      };

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('lowerThan', function(comparisonModel){
        return validate(ctrl.$viewValue);
      });
      
    };

    return {
      require: 'ngModel',
      link: link
    };

  }
]);
