angular.module('supplientsApp.purchasesControllers', [])

.controller('SuppliersCtrl', function($scope, Suppliers, $http) {
	//$scope.suppliers = Suppliers.all();
	$http.get('http://cssc.mine.nu:15001/Suppliers').success(function(jsonSuppliers){
		$scope.suppliers=jsonSuppliers;
	});
})

.controller('SupplierDetailCtrl', function($scope, $stateParams, Suppliers, $timeout, $q, $ionicPopup, $http) {
	//$scope.supplier = Suppliers.get($stateParams.supplierId); 
	$http.get('http://cssc.mine.nu:15001/Suppliers').success(function(jsonSuppliers){
		$scope.suppliers=jsonSuppliers;
		$scope.supplier=$scope.suppliers[$stateParams.supplierId];
	});	
})

//Roy Controller 4 setSupplier
.controller('setSupplierCtrl', function($scope, $stateParams, Zones, Sellers, $timeout, $q, $ionicPopup, $http) {
	
	$scope.zones = Zones.all();
	$scope.sellers = Sellers.all();

	$scope.zoneSelected=$scope.zones[10];
	$scope.sellerSelected=$scope.sellers[1];

	$scope.supplier = {};

	$scope.reset = function() {
		$scope.supplier = {};
	};

	//Envio del correo
	$scope.showSendEmailConfirm = function() {
		$ionicPopup.confirm({
			title: 'Confirmación Correo',
			content: 'Esta seguro que desea enviar el correo a: '+$scope.supplier.email
		}).then(function(res) {
			if(res) {
				console.log('Felicitaciones :P (Mail Sended)');
				window.plugin.email.open({
					to:      [$scope.supplier.email],
					bcc:     ['informatica.coservica@gmail.com', 'coservica@gmail.com'],
					subject: 'FRIO-TEC-2014: Compresores Servicios C.A.',
					body:    'Buen día amigo '+$scope.supplier.respons+' de: '+$scope.supplier.prov_des+',\n\nLe escribe '+$scope.sellerSelected.ven_des+', de parte de Compresores Servicios C.A. hizo contacto con nosotros en Frío Tecnología 2014, a continuación le suministramos nuestros datos:\n\nEmail: ventasbo.coservica@gmail.com\nSan Cristobal, PRINCIPAL\nCalle 10 entre carreras 13 y 15 - Frente al Cuartel Bolívar.\nTeléfono: 0276 - 3444334\nFax: 0276-3420646\nTáriba, SUCURSAL\nCalle 9 frente a la bomba "El Diamante de Táriba\nTeléfono:0276 - 3940848\nTeléfono:0276 - 3949756\n\nPagina Web: http://www.compresoresservicios.com\n\nSi desea alguna información no dude en contactarnos!\n\n\nDepartamento de Ventas, Informatica de Compresores Servicios.\n\n\nDesarrollador: @Royedc4'});
			} else {
				console.log('Ah Ah Ah (Mail Canceled)');
			}
		});
};

$scope.processForm = function() {

	$http.defaults.headers.post["Content-Type"] = "application/json";
		// console.log($scope.supplier); key sin comillas
		// console.log(JSON.stringify($scope.supplier)); todo comillas
		$http({
			url: 'http://cssc.mine.nu:15001/setSupplier',
			method: "POST",
			data: JSON.stringify($scope.supplier)
		}).
		success(function(postResponse) {
	      // this callback will be called asynchronously
	      // when the response is available
	      console.log(postResponse.statusText);
	      console.log('BIEN PELAO>>>> USTED.... BIEN xD');
	      $scope.showAlert = function() {
	      	$ionicPopup.alert({
	      		title: 'Informatica Compresores Servicios',
	      		content: postResponse.statusText
	      	}).then(function(res) {
	      		console.log(postResponse.statusText);
	      	});
	      };
	      $scope.showAlert();
	      $scope.reset();
	  }).
		error(function(postResponse) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('BIEN mal xD xD\n');
      $scope.showAlert = function() {
      	$ionicPopup.alert({
      		title: 'Informatica Compresores Servicios',
      		content: postResponse.statusText
      	}).then(function(res) {
      		console.log(postResponse.statusText);
      	});
      };
      $scope.showAlert();
  });		
	};
})

