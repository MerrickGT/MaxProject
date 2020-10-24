 var firebaseConfig = {
    apiKey: "AIzaSyDXByPpSIH7h2MgEL2aSDfhT7CVJ_D05PI",
    authDomain: "maxshoppingproject.firebaseapp.com",
    databaseURL: "https://maxshoppingproject.firebaseio.com",
    projectId: "maxshoppingproject",
    storageBucket: "maxshoppingproject.appspot.com",
    messagingSenderId: "908324668825",
    appId: "1:908324668825:web:3a9328f8bbcbc882be3f08",
    measurementId: "G-Y4W0EQMESY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //Base de Datos
  var database = firebase.database();


angular.module('starter.controllers', [])


//Controlador de la vista Tutorial
.controller("tutorialCtrl",function($scope){

})

//Controlador Vista de Registro
.controller("registerCtrl",function($scope, $state){

	//cerrar sesion del  usuario
	firebase.auth().signOut().then(function(){
	}).catch(function(error){
		var mensaje = error.message;
		console.log(mensaje);
	})
	//variable UID del usuario registrado
	$scope.uid = "";

	$scope.obtener = function(user){
		//Crear usuario con la autenticacion
		firebase.auth().createUserWithEmailAndPassword(user.email, user.contra).then(function a(y){
			// Notificacion que se creo el usuario
			swal("se creo correctamente");
			//obteber uid del ususario registrado
			$scope.uid = y.user.uid;
			//Almacena el ususrio en la base de datos
			firebase.database().ref("/users").child($scope.uid).set({
				correo: user.email,
				nombre: user.nombre,
				uid: $scope.uid
			})
		})

		//cerrar sesion del  usuario
		firebase.auth().signOut().then(function(){
		}).catch(function(error){
			var mensaje = error.message;
			console.log(mensaje);
		})
		//borra el contenido del formulario
		$scope.user = {};
		//re direccion al login
		$state.go("login");
	}	

})

//Controlador Vista de Login
.controller("loginCtrl",function($scope, $state, $rootScope){

	$rootScope.uid;

	//cerrar sesion del  usuario
	firebase.auth().signOut().then(function(){
	}).catch(function(error){
		var mensaje = error.message;
		console.log(mensaje);
	})
	
	$scope.Inicio = function(userL){
		//Inicio de sesion con firebase
		firebase.auth().signInWithEmailAndPassword(userL.email,userL.password).then(function b(x){
			swal("BIENVENIDO");

			firebase.auth().onAuthStateChanged(function(usuario) {

				if (usuario) {
					//Usuario Activo
					$rootScope.uid = usuario.uid;
				} else {
					//usuario no activo
				}
			})

			$state.go(/* Colocar aqui, dentro de comillas el nombre de la vista principal */)
		}).catch(function(error){
			var mensaje = error.message;
			console.log(mensaje);
			swal({
  				title: "Error",
				text: "Usuario o Contraseña Incorrecto",
  				icon: "error"
			});
		})
	}
	
})