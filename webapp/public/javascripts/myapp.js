angular
	.module('myapp', ['ui.router', 'myAnimate', 'helpers'])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/home/cv');

		$stateProvider
			.state('home', {				
				url: '/home',				
				views: {
					header: {
						templateUrl: '/templates/home/header.html'
					},
					body:{
						templateUrl: '/templates/home.html',
						controller: 'homeController'						
					}
				}	
			})
			.state('home.cv', {
				url: '/cv',				
				views: {
					'contact': {
						templateUrl: '/templates/home/contact.html',
						controller: 'contactCtrl'
					},
					'education': {
						templateUrl: '/templates/home/education.html',
						controller: 'educationCtrl'
					},
					'experience': {
						templateUrl: '/templates/home/experience.html',
						controller: 'experienceCtrl'
					},
					'language': {
						templateUrl: '/templates/home/languages.html',
						controller: 'languageCtrl'
					},
					'programming': {
						templateUrl: '/templates/home/programming.html',
						controller: 'programmingCtrl'
					},
					'footer': {
						templateUrl: '/templates/home/footer.html',
						controller: 'footerCtrl'
					}
				}
			})
			.state('login', {
				abstract: true,
				url: '/login',
				views: {
					header: {
						templateUrl: '/templates/home/header.html'
					},
					body: {
						template: '<div ui-view></div>'
					}
				}				
			})
			.state('login.signup', {
				url:'/signup',
				templateUrl: '/templates/login/signup.html',
				controller: 'signupCtrl'
			})
			.state('login.signin', {
				url:'/signin',
				templateUrl: '/templates/login/signin.html'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/templates/admin.html',
				controller: 'adminCtrl'
			});
	}])
	.controller('homeController', ['$scope', '$http', '$timeout', 'notificationService', function($scope, $http, $timeout, notificationService) {
		$scope.apiResponse = '';
		$scope.editing = false;
		$scope.canEdit = true;

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
	}])
	.controller('headerCtrl', ['$scope', '$http', 'notificationService', function($scope, $http, ns) {
		$scope.document = {};

		$http.get('/contacts')
			.then(function(response) {
				$scope.document = response.data;
			}, ns.errorHadler);
	}]);