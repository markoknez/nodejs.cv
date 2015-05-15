angular
	.module('helpers')
	/**
	 * Service for managing notifications
	 */
	.service('notificationService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
		var self = this;

		self.messages = [];
		self.types = ['success', 'default', 'info', 'warning', 'danger'];

		self.types.forEach(function(type) {
			self[type] = function(msg) {
				self.pushMessage(msg, type);
			};
		});

		self.pushMessage = function(msg, type) {
			var message = {
				message: msg,
				type: type,
				show: true
			};

			self.messages.push(message);
			$timeout(function() {
				self.messages.shift();
			}, 5000);
		};

		self.errorHandler2 = function(scope) {
			return function(errResponse) {
				self.errorHandler(errResponse, scope);
			}
		}

		self.errorHandler = function(errResponse, scope) {
			if (_.isObject(errResponse.data) && errResponse.data.message == 'Validation failed')
				self.handleValidationError(errResponse, scope);
			else
				self.pushMessage(errResponse.data, 'danger');
		}
		self.errorHandler.test = function(scope) {
			return function(errResponse) {
				self.errorHandler(errResponse, scope);
			};
		};

		self.handleValidationError = function(errResponse, scope) {
			_.each(errResponse.data.errors, function(value, key) {
				if (scope && scope.form[key]) {
					scope.form[key].serverError = value.message;
					scope.form[key].$validate();
				}
			});
			self.pushMessage('Error while running operation, server returned validation errors.', 'danger');
		}
	}])
	/**
		<notification-messages> directive for displaying all notification messages
		Message methods are exposed through 'notificationService'
	*/
	.directive('notificationMessages', ['notificationService', function(notificationService) {
		return {
			restrict: 'E',
			templateUrl: '/templates/helpers/notificationMessages.html',
			controller: ['$scope', 'notificationService', function($scope, notificationService) {
				$scope.notificationService = notificationService;
			}]
		};
	}])