angular
	.module('myapp')
	.directive('loginForm', function() {
		return {
			restrict: 'E',			
			templateUrl: '/templates/directives/loginForm.html',
			controller: ['$rootScope', '$scope', '$http', 'AUTH_EVENTS', 'AuthService', function($rootScope, $scope, $http, AUTH_EVENTS, AuthService) {


				$rootScope.$on(AUTH_EVENTS.notAuthenticated, function(){
					//user is not authenticated, show login dialog
					$scope.show();
				});
			}],
			link: function($scope, $element, $attrs) {
				$scope.show = function(){
					$element.modal('show');
				};

				$scope.hide = function(){
					$element.modal('hide');
				};
			}
		};
	});