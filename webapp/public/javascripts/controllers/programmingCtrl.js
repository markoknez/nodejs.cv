angular
	.module('myapp')
	.controller('programmingCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns) {
		$scope.viewEditing = false;
		$scope.document = {};

		$scope.refresh = function() {
			$http.get('/programmings')
				.then(function(response) {
					$scope.document = response.data;
				}, ns.errorHandler);
		};
		$scope.save = function() {
			$http.put('/programmings', $scope.document)
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