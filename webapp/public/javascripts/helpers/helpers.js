function errorHandler(errResponse) {
	alert(errResponse.data);
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
			if(_.isObject(errResponse.data))
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
	}]);