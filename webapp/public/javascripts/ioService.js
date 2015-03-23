angular
	.module('myapp')
	.service('ioService', ['$rootScope', function($rootScope) {
			var self = this;
			//connect immediately
			self.socket = io();
			self.socket.connect();

			//state of connection
			self.connected = false;

			//provide $digest wrapped function for save using inside angular
			self.on = function(eventName, callback) {
				self.socket.on(eventName, function(data){
					$rootScope.$apply(function (){
						callback(data);
					});
				});
			};

			//start monitoring connection events
			self.on('connect', function(){
				self.connected = true;
			});
			self.on('disconnect', function(){
				self.connected = false;
			});
		}]);