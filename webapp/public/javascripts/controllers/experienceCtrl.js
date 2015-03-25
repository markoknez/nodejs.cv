angular
	.module('myapp')
	.controller('experienceCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns){
		$scope.document = {};
		$scope.editing = false;
		$scope.selectedExp = null;

		$scope.refresh = function(){
			$http.get('/experiences')
				.then(function (response){
					$scope.document = response.data;					
				}, ns.errorHandler);
		}

		$scope.saveChanges = function(){
			$http.put('/experiences', $scope.document)
				.then(function (response){
					ns.pushMessage('Changes saved successfully.', 'success');
				}, ns.errorHandler);
			$scope.selectedExp = null;			
		}

		$scope.addExperience = function(){
			var newExp = {};
			$scope.document.experiences.push(newExp);
			$scope.selectedExp = newExp;
		}

		$scope.deleteExperience = function(selectedExp){
			var index = $scope.document.experiences.indexOf(selectedExp);
			$scope.document.experiences.splice(index, 1);
			$scope.selectedExp = null;
		}

		$scope.cancelChanges = function(){
			$scope.selectedExp = null;
		}

		$scope.selectExperience = function(index){
			$scope.selectedExp = $scope.document.experiences[index];
		}

		$scope.refresh();
	}]);