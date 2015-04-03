angular
	.module('myapp')
	.controller('signupCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns){
		$scope.document = {};
		$scope.submit = function(){
			$http.post('/admin/register', $scope.document)
			.then(function  (response) {
				ns.pushMessage('ok', 'success');
			}, ns.errorHandler.test($scope));	
		};
	}]);