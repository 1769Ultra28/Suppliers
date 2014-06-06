angular.module('supplientsApp.globalControllers', [])

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate, Zones, Sellers, Arts) {
  $scope.showLeftMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('missionTabController', function($scope) {
})
.controller('companyTabController', function($scope) {
})

