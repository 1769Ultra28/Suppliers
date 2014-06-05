angular.module('supplientsApp.inventoryControllers', [])

.controller('ArtsCtrl', function($scope, Arts) {
	$scope.arts = Arts.all();
})

.controller('ArtDetailCtrl', function($scope, $stateParams, Arts) {
	$scope.art = Arts.get($stateParams.artId);
})