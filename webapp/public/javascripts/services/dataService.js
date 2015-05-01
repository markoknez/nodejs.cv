var dataDict = {
	contact : '/contacts',
	education: '/educations',
	experience: '/experiences',	
};

angular
	.module('myapp')
	.service('dataService', ['$http', function($http) {
		var self = this;

		self.getData = function(dataType){

		}
	}]);