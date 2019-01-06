(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.input_text = "";
  $scope.message = "";

  $scope.sayMessage = function () {
    return "Yaakov likes to eat healthy snacks at night!";
  };

  $scope.checkifTooMuch = function () {
    if ($scope.input_text  === "") {
        $scope.message = "Please enter data first";
    }
    else if ($scope.input_text.split(',').length <= 3 && $scope.input_text.split(',').length > 0) {
        $scope.message = "Enjoy!";
    }
    else {
      $scope.message = "Too much!";
    }
  };
}

})();
