angular
	.module('myapp')
	.controller('experienceCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns) {
		$scope.document = {};
		$scope.editing = true;
		$scope.selectedExp = null;

		$scope.technologySetter = function(value) {
			if (angular.isDefined(value) && $scope.selectedExp) {
				$scope.selectedExp.technology = value.split(';');
				return value;				
			}

			if ($scope.selectedExp && $scope.selectedExp.technology)
				return $scope.selectedExp.technology.join(';');
			else
				return '';
		}

		$scope.refresh = function() {
			$http.get('/experiences')
				.then(function(response) {
					$scope.document = response.data;
				}, ns.errorHandler);
		}

		$scope.saveChanges = function() {
			$http.put('/experiences', $scope.document)
				.then(function(response) {
					ns.pushMessage('Changes saved successfully.', 'success');
				}, ns.errorHandler);
			$scope.selectedExp = null;
			$scope.viewEditing = false;
		}

		$scope.addExperience = function() {
			// var newExp = {};
			$scope.document.experiences.push({});
			//$scope.selectedExp = newExp;
		}

		$scope.deleteExperience = function(index) {
			$scope.document.experiences.splice(index, 1);
			$scope.selectedExp = null;
		}

		$scope.cancelChanges = function() {
			$scope.selectedExp = null;
			$scope.refresh();
			$scope.viewEditing = false;
			ns.pushMessage('Changes cancelled.', 'info');
		}

		$scope.selectExperience = function(index) {
			var newSelection = $scope.document.experiences[index];
			$scope.selectedExp = newSelection;
		}

		$scope.$on('experience.modal.close', function() {
			// //if user did not touch the form, remove the added element
			// if($scope.form.$pristine){
			// 	$scope.document.experiences.pop();
			// }
			$scope.selectedExp = null;
		});

		$scope.refresh();
	}]);