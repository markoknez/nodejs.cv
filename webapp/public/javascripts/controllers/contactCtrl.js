angular
	.module('myapp')
	.controller('contactCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns) {
		$scope.viewEditing = false;
		$scope.document = {
			links: [],
			location: {}
		};

		$scope.refresh = function() {
			$http.get('/contacts')
				.then(function(response) {
					$scope.document = response.data;
				}, ns.errorHandler);
		};
		$scope.add = function() {
			$scope.document.links.push({});
		};
		$scope.delete = function(index) {
			$scope.document.links.splice(index, 1);
		};
		$scope.save = function() {
			$http.put('/contacts', $scope.document)
				.then(function(response) {
					ns.pushMessage('Saved successfully.', 'success');
				}, ns.errorHandler);
			$scope.viewEditing = false;
		};
		$scope.cancel = function() {
			ns.pushMessage('Cancelled changes.', 'info');
			$scope.refresh();
			$scope.viewEditing = false;
		};

		$scope.refresh();
	}]);