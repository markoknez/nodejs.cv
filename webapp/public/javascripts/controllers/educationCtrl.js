angular
	.module('myapp')
	.controller('educationCtrl', ['$scope', '$stateParams', '$http', 'notificationService', function($scope, $stateParams, $http, ns) {
		$scope.editing = false;
		$scope.document = {};

		$scope.refresh = function() {
			$http.get('/educations/' + $stateParams.userId)
				.then(function(response) {
					$scope.document = response.data;
				}, ns.errorHandler2($scope));
		}

		$scope.saveChanges = function() {
			if ($scope.form.$invalid) 
				return ns.pushMessage('Cannot save before validation checks out.', 'danger');

			$http.put('/educations', $scope.document)
				.then(function(response) {
					$scope.editing = false;
					ns.pushMessage('Changes saved successfully.', 'success');
				}, ns.errorHandler2($scope));
		}

		$scope.cancelChanges = function() {
			$scope.editing = false;
			ns.pushMessage('Changes cancelled', 'info');
			$scope.refresh();
		}

		$scope.refresh();
	}]);