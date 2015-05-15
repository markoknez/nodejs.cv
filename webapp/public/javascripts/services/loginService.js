angular
	.module('myapp')
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})
	.service('AuthService', ['$http', '$q', 'notificationService', 'AUTH_EVENTS', function($http, $q, $notify, $auth_events) {
		var self = this;

		self.user = null;

		/**
		 * Logs the user through POST to users/login page
		 * @param  {String} username Username
		 * @param  {String} password Password
		 * @return {Promise}         Promise for authentication
		 */
		self.loginAsync = function(username, password) {
			return $http.post('/users/login', {
					username: username,
					password: password
				})
				.then(function(res) {
					self.user = res.data;
				});
		};

		/**
		 * Logout
		 * @return {Promise}          Promise for logout request
		 */
		self.logoutAsync = function() {
			self.user = null;
			return $http.get('/users/logout');
		};

		/**
		 * Check if user is authenticated
		 * @return {Boolean} Is user authenticated
		 */
		self.isAuthenticated = function() {
			return (!!user);
		};

		//when instantiating the service, check if user is already logged in by sessionId...
		$http.post('/users/login', {
				checkSession: true
			})
			.then(function(res) {
				self.user = res.user;
			});
	}]);