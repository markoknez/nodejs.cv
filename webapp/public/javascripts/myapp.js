angular
	.module('myapp', ['ui.router'])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/templates/home.html',
				controller: ['$scope', 'ioService', function($scope, ioService){
					$scope.ioService = ioService;
				}]
			})
	}]);