angular
	.module('myapp')
	.controller('signInCtrl', ['$scope', '$http', 'AuthService', function($scope, $http, $authService) {
		$scope.disableElement = false;

		//login user
		$scope.login = function() {
			//try to login user using authService
			$authService.login($scope.username, $scope.password)
				.then(function() {
					$scope.$root.$broadcast(AUTH_EVENTS.loginSuccess);
				})
				.catch(function() {
					$scope.$root.$broadcast(AUTH_EVENTS.loginFailed);
				});
		};
	}]);