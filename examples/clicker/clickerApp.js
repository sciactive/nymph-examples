angular.module('clickerApp', [])
.service('Nymph', function() {
  return NymphClient.Nymph;
})
.controller('ClickerController', ['$scope', 'Nymph', function($scope, Nymph) {
  $scope.uiState = {
    'clicks': null,
    'userCount': null
  };

  Nymph.getUID('clicker').subscribe(function(clicks){
    $scope.uiState.clicks = clicks;
    $scope.$apply();
  }, function(errObj){
    if (errObj.status === 404) {
      $scope.uiState.clicks = 0;
      $scope.$apply();
    }
  }, function(count){
    $scope.uiState.userCount = count;
    $scope.$apply();
  });

  $scope.click = function(){
    $scope.uiState.clicks = null;
    Nymph.newUID('clicker');
  };

  $scope.reset = function(){
    $scope.uiState.clicks = null;
    Nymph.setUID('clicker', 0);
  };
}]);
