angular
	.module('myapp', ['ui.router', 'myAnimate', 'helpers'])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {				
				url: '/home',				
				views: {
					'': {
						templateUrl: '/templates/home.html',
						controller: 'homeController'
					},
					'contact@home': {
						templateUrl: '/templates/contact.html'
					},
					'education@home': {
						templateUrl: '/templates/education.html'
					},
					'experience@home': {
						templateUrl: '/templates/experience.html',
						controller: 'experienceCtrl'

					}
				}
			});
	}])
	.controller('homeController', ['$scope', '$http', '$timeout', 'notificationService', function($scope, $http, $timeout, notificationService) {
		$scope.apiResponse = '';
		$scope.editing = true;

		function refreshUsers() {
			$http.get('/users').then(function(response) {
				$scope.users = response.data;
			}, notificationService.errorHandler);
		}

		$scope.submit = function() {
			$http.post('/users', {
				name: $scope.name,
				email: $scope.email
			}).then(function(response) {
				$scope.apiResponse = response.data;
				$timeout(function() {
					$scope.apiResponse = '';
					$scope.name = '';
					$scope.email = '';
				}, 2000);
				refreshUsers();
			}, notificationService.errorHandler);
		};

		$scope.hit = function(id) {
			$http.put('/users/' + id)
				.then(function(response) {
					refreshUsers();
				}, notificationService.errorHandler);
		}

		$scope.deleteUser = function(id) {
			$http.delete('/users/' + id)
				.then(function(response) {
					refreshUsers();
				}, notificationService.errorHandler);
		}

		//load all elements for displaying
		$http.get('/contacts').then(function(response) {
			$scope.contact = response.data;
		}, notificationService.errorHandler);
		$http.get('/educations').then(function(response) {
			$scope.education = response.data;
		}, notificationService.errorHandler);
		$http.get('/experiences').then(function(response) {
			$scope.experience = response.data;
		}, notificationService.errorHandler);


		refreshUsers();
	}]);