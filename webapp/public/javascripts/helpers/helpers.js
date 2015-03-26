function errorHandler(errResponse) {
	debugger;
}

angular
	.module('helpers', ['myAnimate'])
	.directive('ngModel', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			priority: 1,
			link: function(scope, element, attr, ngModel) {
				ngModel.$validators.server = function(modelValue, viewValue) {
					if (ngModel.serverError) {
						ngModel.serverErrorMessage = ngModel.serverError;
						ngModel.serverError = '';
						return false;
					}
					return true;
				}
			}
		};
	})
	.service('notificationService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
		var self = this;

		self.messages = [];

		self.handleValidationError = function(errResponse, scope) {
			_.each(errResponse.data.errors, function(value, key) {
				debugger;
				scope.form[key].serverError = value.message;
				scope.form[key].$validate();
			});
		}

		self.pushMessage = function(msg, type) {
			var message = {
				message: msg,
				type: type,
				show: true
			};

			self.messages.push(message);
			$timeout(function() {
				self.messages.pop();
			}, 5000);
		};

		self.errorHandler2 = function(scope) {
			return function(errResponse) {
				self.handleValidationError(errResponse, scope);
			}
		}

		self.errorHandler = function(errResponse) {
			if (_.isObject(errResponse.data) && errResponse.data.message == 'Validation failed')
				self.handleValidationError(errResponse);
			else
				self.pushMessage(errResponse.data, 'danger');
		}
	}])
	.directive('notificationMessages', ['notificationService', function(notificationService) {
		/*
			<notification-messages> directive for displaying all notification messages
			Message methods are exposed through 'notificationService'
		*/
		return {
			restrict: 'E',
			templateUrl: '/templates/helpers/notificationMessages.html',
			controller: ['$scope', 'notificationService', function($scope, notificationService) {
				$scope.notificationService = notificationService;
			}]
		};
	}])


/*
	VISIBLE VALIDATION ERROR FUNCTIONS
*/
.factory('validationMessagesFactory', function() {
		/*
			Set of validation messages that are defined for respective Angular validator names
		*/
		return {
			required: 'This field is required',
			number: 'This field requires number type',
			pattern: 'You have entered invalid data',
			server: 'server validation error'
		};
	})
	.directive('myValidationTooltip', ['validationMessagesFactory', function(validationMessagesFactory) {
		/*
			Directive my-validation-tooltip that can be used in bootstrap environment when form-group and form-control classes			are used. When put on element, this directive monitors $valid state of element and displays all errors on tooltip,
			as well as 
		*/
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attr, ctrl) {
				//start watching error changes
				scope.$watch(function() {
					return ctrl.$error;
				}, function(newVal, oldVal) {
					//if field is invalid
					if (ctrl.$invalid) {
						//concatenate all error messages
						var errorMessage = '';
						_.each(ctrl.$error, function(value, key) {
							if (key == 'server')
								errorMessage += '\n' + ctrl.serverErrorMessage;
							else
								errorMessage += '\n' + validationMessagesFactory[key];
						});
						//show error messages in tooltip
						$(element).attr('data-original-title', errorMessage)
							.tooltip('fixTitle');

						//bootstrap error class on parent form-group element
						$(element).closest('[class*=form-group]').addClass('has-error');
					} else {
						//field is valid, hide the tooltip and remove any message
						$(element).attr('data-original-title', '')
							.tooltip('fixTitle')
							.tooltip('hide');

						//remove bootstrap error class
						$(element).closest('[class*=form-group]').removeClass('has-error');
					}
				}, true);
			}
		};
	}])



.directive('myModalShow', function() {
	return {
		restring: 'A',
		scope: {
			'myModalShow': '=',
			'myModalEvent': '@'
		},
		link: function(scope, element) {
			scope.$watch('myModalShow', function(newValue) {
				if (newValue) {
					$(element).modal({
						keyboard: true
					});
				} else {
					if ($(element).is(':visible')) {
						$(element).modal('hide');
					}
				}
			});

			$(element).on('hide.bs.modal', function() {
				scope.$evalAsync(function() {
					scope.$emit(scope.myModalEvent);
				})
			});
		}
	};
});