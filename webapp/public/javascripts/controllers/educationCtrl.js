angular
	.module('myapp')
	.controller('educationCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns) {
		$scope.editing = false;
		$scope.document = {};

		$scope.refresh = function() {
			$http.get('/educations')
				.then(function(response) {
					$scope.document = response.data;
				}, ns.errorHandler);
		}

		$scope.saveChanges = function() {
			$http.put('/educations', $scope.document)
			.then(function (response){
				$scope.editing = false;
			}, ns.errorHandler);
		}

		$scope.cancelChanges = function() {
			$scope.editing = false;
			$scope.refresh();
		}

		$scope.refresh();
	}]);