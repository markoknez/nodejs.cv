function errorHandler(errResponse) {
	alert(errResponse.data);
}

function errorClass() {
	debugger;
}

angular
	.module('helpers', ['myAnimate'])
	.service('notificationService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
		var self = this;

		self.messages = [];

		self.pushMessage = function(msg, type) {
			var message = {
				message: msg,
				type: type,
				show: true
			};

			self.messages.push(message);
			$timeout(function() {
				message.show = false;
			}, 5000);
		};

		self.errorHandler = function(errResponse) {
			if (_.isObject(errResponse.data))
				self.pushMessage(errResponse.data.message, 'danger');
			else
				self.pushMessage(errResponse.data, 'danger');
		}
	}])
	.directive('notificationMessages', ['notificationService', function(notificationService) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: ['$scope', 'notificationService', function($scope, notificationService) {
				$scope.notificationService = notificationService;
			}],
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: '/templates/helpers/notificationMessages.html'
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				// link: function($scope, iElm, iAttrs, controller) { }
		};
	}])
	.factory('validationMessagesFactory', function() {
		return {
			required: 'This field is required',
			number: 'This field requires number type',
			pattern: 'You have entered invalid data'
		};
	})
	.directive('myValidationTooltip', ['validationMessagesFactory', function(validationMessagesFactory) {
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
	}]);