angular.module('supplientsApp.salesControllers', [])

.controller('ClientsCtrl', function($scope, Clients) {
	$scope.clients = Clients.all();
})

.controller('ClientDetailCtrl', function($scope, $stateParams, Clients, $timeout, $q, $ionicPopup) {
	$scope.client = Clients.get($stateParams.clientId); 

	//Envio del correo
	$scope.showSendEmailConfirm = function() {
		$ionicPopup.confirm({
			title: 'Confirmación Correo',
			content: 'Esta seguro que desea enviar el correo a: '+$scope.client.email
		}).then(function(res) {
			if(res) {
				console.log('Felicitaciones :P (Mail Sended)');
				window.plugin.email.open({
					to:      [$scope.client.email],
					bcc:     ['informatica.coservica@gmail.com', 'coservica@gmail.com'],
					subject: 'FRIO-TEC-2014: Compresores Servicios C.A.',
					body:    'Buen día amigo '+$scope.client.respons+' de: '+$scope.client.cli_des+',\n\nLe escribe '+$scope.sellerSelected.ven_des+', de parte de Compresores Servicios C.A. hizo contacto con nosotros en Frío Tecnología 2014, a continuación le suministramos nuestros datos:\n\nEmail: ventasbo.coservica@gmail.com\nSan Cristobal, PRINCIPAL\nCalle 10 entre carreras 13 y 15 - Frente al Cuartel Bolívar.\nTeléfono: 0276 - 3444334\nFax: 0276-3420646\nTáriba, SUCURSAL\nCalle 9 frente a la bomba "El Diamante de Táriba\nTeléfono:0276 - 3940848\nTeléfono:0276 - 3949756\n\nPagina Web: http://www.compresoresservicios.com\n\nSi desea alguna información no dude en contactarnos!\n\n\nDepartamento de Ventas, Informatica de Compresores Servicios.\n\n\nDesarrollador: @Royedc4'});
			} else {
				console.log('Ah Ah Ah (Mail Canceled)');
			}
		});
};



})

//Roy Controller 4 setClient
.controller('setClientCtrl', function($scope, $stateParams, Zones, Sellers, $timeout, $q, $ionicPopup, $http) {
	
	$scope.zones = Zones.all();
	$scope.sellers = Sellers.all();

	$scope.zoneSelected=$scope.zones[10];
	$scope.sellerSelected=$scope.sellers[1];

	$scope.client = {};

	$scope.reset = function() {
		$scope.client = {};
	};

	//Envio del correo
	$scope.showSendEmailConfirm = function() {
		$ionicPopup.confirm({
			title: 'Confirmación Correo',
			content: 'Esta seguro que desea enviar el correo a: '+$scope.client.email
		}).then(function(res) {
			if(res) {
				console.log('Felicitaciones :P (Mail Sended)');
				window.plugin.email.open({
					to:      [$scope.client.email],
					bcc:     ['informatica.coservica@gmail.com', 'coservica@gmail.com'],
					subject: 'FRIO-TEC-2014: Compresores Servicios C.A.',
					body:    'Buen día amigo '+$scope.client.respons+' de: '+$scope.client.cli_des+',\n\nLe escribe '+$scope.sellerSelected.ven_des+', de parte de Compresores Servicios C.A. hizo contacto con nosotros en Frío Tecnología 2014, a continuación le suministramos nuestros datos:\n\nEmail: ventasbo.coservica@gmail.com\nSan Cristobal, PRINCIPAL\nCalle 10 entre carreras 13 y 15 - Frente al Cuartel Bolívar.\nTeléfono: 0276 - 3444334\nFax: 0276-3420646\nTáriba, SUCURSAL\nCalle 9 frente a la bomba "El Diamante de Táriba\nTeléfono:0276 - 3940848\nTeléfono:0276 - 3949756\n\nPagina Web: http://www.compresoresservicios.com\n\nSi desea alguna información no dude en contactarnos!\n\n\nDepartamento de Ventas, Informatica de Compresores Servicios.\n\n\nDesarrollador: @Royedc4'});
			} else {
				console.log('Ah Ah Ah (Mail Canceled)');
			}
		});
};

$scope.processForm = function() {

	$http.defaults.headers.post["Content-Type"] = "application/json";
		// console.log($scope.client); key sin comillas
		// console.log(JSON.stringify($scope.client)); todo comillas

		$http({
			url: 'http://cssc.mine.nu:15001/setClient',
			method: "POST",
			data: JSON.stringify($scope.client)
		})
		.then(function(response) {
			console.log('BIEN PELAO>>>> USTED.... BIEN xD');
			$scope.showAlert = function() {
				$ionicPopup.alert({
					title: 'Informatica Compresores Servicios',
					content: $scope.client.cli_des+' Guardado exitosamente! ^_^'
				}).then(function(res) {
					console.log('Mostrando Alerta ');
				});
			};
		}, 
    function(response) { // optional
    	console.log('bien mal xD');
    }
    );		
		$scope.reset();
	};

})

