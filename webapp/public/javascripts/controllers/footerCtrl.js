angular
	.module('myapp')
	.controller('footerCtrl', ['$scope', '$stateParams', '$http', 'notificationService', function($scope, $stateParams, $http, ns) {
		$scope.themes = [];
		$scope.viewEditing = [];

		$scope.addTheme = function() {
			$scope.themes.push({});
			$scope.viewEditing[$scope.themes.length - 1] = true;
		};
		$scope.removeTheme = function(index) {
			var theme = $scope.themes[index];
			if(!theme._id){
				$scope.themes.splice(index,1);
				$scope.viewEditing[index] = false;
			}else{
				$http.delete('/programmings/themes/' + theme._id)
					.then(function(response) {
						$scope.themes.splice(index, 1);
						$scope.viewEditing[index] = false;
						ns.pushMessage('Removed', 'success');
					}, ns.errorHandler);
			}
		};

		$scope.refreshAll = function() {
			$http.get('/programmings/themes/' + $stateParams.userId)
				.then(function(response) {
					if (response.data)
						$scope.themes = response.data;
				}, ns.errorHandler);
		};
		$scope.refresh = function(index) {
			var theme = $scope.themes[index];
			$http.get('/programmings/themes/' + $stateParams.userId + '/' + theme._id)
				.then(function(response) {
					$scope.themes[index] = response.data;
				}, ns.errorHandler);
		};
		$scope.save = function(index) {
			var theme = $scope.themes[index];
			$http.put('/programmings/themes', theme)
				.then(function(response) {
					$scope.viewEditing[index] = false;
					ns.pushMessage('Saved successfully.', 'success');
				}, ns.errorHandler);
		};
		$scope.cancel = function(index) {
			$scope.viewEditing[index] = false;
			ns.pushMessage('Cancel changes.', 'info');
			var theme = $scope.themes[index];
			if (!theme._id)
				$scope.themes.splice(index, 1);
			else
				$scope.refresh(index);
		};

		$scope.refreshAll();
	}]);