angular.module('supplientsApp.salesControllers', [])

.controller('ClientsCtrl', function($scope, Clients) {
	$scope.clients = Clients.all();
})

.controller('ClientDetailCtrl', function($scope, $stateParams, Clients, $timeout, $q, $ionicPopup) {
	$scope.client = Clients.get($stateParams.clientId); 

	//cosas del javascript
	$scope.showAlert = function() {
		$ionicPopup.alert({
			title: 'Don\'t eat that!',
			content: 'That\'s my sandwich'
		}).then(function(res) {
			console.log('Alertita... ');
		});
	};


	//Cosas de mi boton	
	$scope.showSendEmailConfirm = function() {
		$ionicPopup.confirm({
			title: 'Confirmación Correo',
			content: 'Esta seguro que desea enviar el correo a: '+$scope.client.email
		}).then(function(res) {
			if(res) {
				console.log('Felicitaciones :P (Mail Sended)');
				window.plugin.email.open({
					to:      ['informatica.coservica@gmail.com'],
					bcc:     ['informatica.refrigeramosamerica@gmail.com', 'royedc4@gmail.com'],
					subject: 'FRIO-TEC-2014: Compresores Servicios C.A.',
					body:    'Buen día amigos de'+$scope.client.cli_des+',\n\nLe escribe '+$scope.client.email+', hizo contacto con nosotros en Frío Tecnología 2014, a continuación le suministramos nuestros datos:\n\nEmail: ventasbo.coservica@gmail.com\nSan Cristobal, PRINCIPAL\nCalle 10 entre carreras 13 y 15 - Frente al Cuartel Bolívar.\nTeléfono: 0276 - 3444334\nFax: 0276-3420646\nTáriba, SUCURSAL\nCalle 9 frente a la bomba "El Diamante de Táriba\nTeléfono:0276 - 3940848\nTeléfono:0276 - 3949756\n\n<a href="http://www.compresoresservicios.com">www.compresoresservicios.com</a>\nSi desea alguna información no dude en contactarnos!'});
			} else {
				console.log('Ah Ah Ah (Mail Canceled)');
			}
		});
	};
})

//Roy Controller 4 setClient
.controller('setClientCtrl', function($scope, $stateParams, Zones, Sellers) {
	
	$scope.zones = Zones.all();
	$scope.sellers = Sellers.all();

	$scope.zoneSelected=$scope.zones[10];
	$scope.sellerSelected=$scope.sellers[1];
	
	//Cosas para limpiar la plantilla
	// $scope.master = {};

	// $scope.update = function(client) {
	// 	$scope.master = angular.copy(client);
	// };

	// $scope.reset = function() {
	// 	$scope.client = angular.copy($scope.master);
	// };

	// $scope.reset();

	$('#infoForm').submit(function() {
 
    var postTo = 'http://cssc.mine.nu/saveClient';
 
    $.post(postTo,({cli_des: $('[name=cli_des]').val(), telefonos: $('[name=telefonos]').val(), email: $('[name=email]').val()}),
    function(data) {
        alert(data);
        if(data != "") {
            // do something
        } else {
            // couldn't connect
        }
        },'json');
    return false;
 
});
	
});

