var myApp = angular.module('myApp');

myApp.controller('ContentController', ['$scope', '$http', '$location', '$routeParams', 'Slug','orderByFilter','$sce',
	function($scope, $http, $location, $routeParams, Slug, orderBy, $sce){
	console.log('Content controller...');

    $scope.paragraph = ""
	$scope.no_of_sentences = ""
    $scope.summary = ""

	$scope.getSummary = function(){
        /*user for testing purpose
        var text = $scope.paragraph;
		$http.get("https://api.aylien.com/api/v1/summarize?title="+title+"&text="+text, { headers: {"X-AYLIEN-TextAPI-Application-Key": "ecd33fd2f98861051956795b5c93f6c2", "X-AYLIEN-TextAPI-Application-ID": "fdcaa6cf"}}).success(function(response){
			$scope.summary  = response;
		});*/
        $scope.summary = "Waiting for response. . ."
		
		/*$http.post("http://127.0.0.1:5000/summarizer?"+text+"").success(function(response){
			$scope.summary = "success"
		})*/
		$http({
			url: "http://127.0.0.1:5000/summarizer?paragraph_text="+$scope.paragraph+"&sentences="+$scope.no_of_sentences,
			method: "POST",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },	
			}).success(function(resp) {
				$scope.summary = resp['status']
		       }).error(function(resp) {
				$scope.summary = "some error occured"
		       })
		
		/*
        Algorithmia.client("simYl48ap8umXO8dPBtyE/7FF3O1")
                   .algo("algo://nlp/Summarizer/0.1.6")
                   .pipe(text)
                   .then(function(output) {
                    $scope.summary = output.result;
                    $scope.$applyAsync();
                     console.log(output.result);
                   });
		*/

	}

}]);









 myApp.directive('loading',   ['$http' ,function ($http)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };
}]);
