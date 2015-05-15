angular
	.module('myapp')
	.controller('programmingCtrl', ['$scope', '$stateParams', '$http', 'notificationService', function($scope, $stateParams, $http, ns) {
		$scope.viewEditing = false;
		$scope.document = {};

		$scope.refresh = function() {
			$http.get('/programmings/prog/' + $stateParams.userId)
				.then(function(response) {
					$scope.document.languages = response.data;
				}, ns.errorHandler);
		};
		$scope.save = function() {
			$http.put('/programmings/prog', $scope.document)
				.then(function(response) {
					$scope.viewEditing = false;
					ns.pushMessage('Saved successfully.', 'success');
				}, ns.errorHandler);
		};
		$scope.cancel = function() {
			$scope.refresh();
			$scope.viewEditing = false;
			ns.pushMessage('Changes cancelled.', 'info');
		};

		$scope.refresh();
	}]);