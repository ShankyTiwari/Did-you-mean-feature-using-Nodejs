/* 
* @author Shashank Tiwari
* did you mean using Nodejs
*/
const app = angular.module('app',[]);

app.service('appService', ['$http', function($http){
	return {
		'getSuggestion' : function(suggestion,callback){
			$http.post('/getSuggestion', {
				'suggestion': suggestion
			}).success(function (response) {
				callback(response);
			})
			.error(function (data, status, header, config) {
				callback({
					'error': true,
					'message': "Something went wrong."
				});
			});
		}
	}
}]);

app.controller('app', function ($scope,appService) {
	
	$scope.suggestion = null;
	$scope.suggestionCollection = [];

	$scope.$watch('suggestion', function (newValue, oldValue) {
		if (newValue !== null) {
			if (newValue.length > 3) {
				appService.getSuggestion(newValue, function (response) {
					$scope.suggestionCollection = response;
				});
			}else{
				$scope.suggestionCollection = [];
			}
		}else{
			$scope.suggestionCollection = [];
		}
	});

});