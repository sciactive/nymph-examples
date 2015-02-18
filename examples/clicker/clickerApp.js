angular.module('clickerApp', []).controller('ClickerController', ['$scope', function($scope) {
	$scope.uiState = {
		'clicks': null
	};

	Nymph.getUID('clicker').subscribe(function(clicks){
		$scope.uiState.clicks = clicks;
		$scope.$apply();
	}, function(errObj){
		if (errObj.status === 404) {
			$scope.uiState.clicks = 0;
			$scope.$apply();
		}
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
