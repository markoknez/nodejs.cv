angular
	.module('myapp', ['ui.router', 'myAnimate', 'helpers'])
	.run(['$rootScope', 'AUTH_EVENTS', 'AuthService', function($rootScope, AUTH_EVENTS, AuthService) {
		$rootScope.$on('$stateChangedStart', function(event, next) {
			//user not logged in
			if(!AuthService.isAuthenticated()){
				event.preventDefault();
				$rootScope.$broadcast('AUTH_EVENTS.notAuthenticated');
			}
		});
	}])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/home/cv');

		$stateProvider
			.state('home', {
				url: '/home/:userId',
				views: {
					header: {
						templateUrl: '/templates/home/header.html',
						controller: 'headerCtrl'
					},
					body: {
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
						templateUrl: '/templates/home/header.html',
						controller: 'headerCtrl'
					},
					body: {
						template: '<div ui-view></div>'
					}
				}
			})
			.state('login.signup', {
				url: '/signup',
				templateUrl: '/templates/login/signup.html',
				controller: 'signupCtrl'
			})
			.state('login.signin', {
				url: '/signin',
				templateUrl: '/templates/login/signin.html'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '/templates/admin.html',
				controller: 'adminCtrl'
			});
	}])
	.controller('homeController', ['$scope', '$http', '$timeout', 'notificationService', function($scope, $http, $timeout, $notify) {
		$scope.apiResponse = '';
		$scope.editing = false;
		$scope.canEdit = true;		
	}])
	.controller('headerCtrl', ['$scope', '$stateParams', '$http', 'notificationService', 'AuthService', function($scope, $stateParams, $http, ns, $authService) {
		$scope.document = {};

		$http.get('/contacts/' + $stateParams.userId)
			.then(function(response) {
				$scope.document = response.data;
			}, ns.errorHadler);

		$scope.logout = function(){
			$authService.logoutAsync();
		};
	}]);