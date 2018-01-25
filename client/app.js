var myApp = angular.module('myApp', ['ngRoute', 'nvd3', 'slugifier','ui.bootstrap']);


myApp.config(function($routeProvider, $locationProvider){
/*myApp.config(function($routeProvider){*/
	$routeProvider.when('/', {
		controller: 'ContentController',
		templateUrl: 'views/home.html'
	})
	.otherwise({
		redirectTo: '/'
	})

	$locationProvider.html5Mode(true);
});