angular
	.module('myapp')
	.controller('languageCtrl', ['$scope', '$stateParams', '$http', 'notificationService', function($scope, $stateParams, $http, ns) {
		$scope.viewEditing = false;
		$scope.document = {
			languages: []
		};

		//refresh language section from database
		$scope.refresh = function() {
			$http.get('/languages/' + $stateParams.userId)
				.then(function(response) {
					$scope.document = response.data;
				}, ns.errorHandler);
		};

		//add new language to the list
		$scope.add = function() {
			$scope.document.languages.push({});
		};

		//delete lanugage from the list
		$scope.delete = function(index) {
			$scope.document.languages.splice(index, 1);
		};

		//save changes to the database
		$scope.save = function() {
			$http.put('/languages', $scope.document)
				.then(function(response) {
					ns.pushMessage('Saved successfully.', 'success');
				}, ns.errorHandler);
			$scope.viewEditing = false;
		};

		//cancel all made changes, and take data from database
		$scope.cancel = function() {
			$scope.refresh();
			ns.pushMessage('Cancelled changes.', 'info');
			$scope.viewEditing = false;
		};

		//initialize the scope
		$scope.refresh();
	}]);