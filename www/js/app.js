// Inicio de la aplicación IONIC

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	//Estado vista Tutorial
	.state("tutorial",{
		url:"/tutorial",
		templateUrl:"templates/tutorial.html",
		controller:"tutorialCtrl"
	})

	//Estado Vista de Registro
	.state("register",{
		url:"/register",
		templateUrl:"templates/register.html",
		controller:"registerCtrl"
	})

	//Estado Vista de Login
	.state("login",{
		url:"/login",
		templateUrl:"templates/login.html",
		controller:"loginCtrl"
	})

	// Url de la vista tutorial
	$urlRouterProvider.otherwise('/tutorial');

});