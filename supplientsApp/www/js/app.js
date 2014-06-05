// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'supplientsApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'supplientsApp.controllers' is found in controllers.js

//Agregar: , 'supplientsApp.services'
angular.module('supplientsApp', ['ionic', 'supplientsApp.globalControllers', 'supplientsApp.salesControllers', 'supplientsApp.purchasesControllers', 'supplientsApp.inventoryControllers', 'supplientsApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('developer', {
    url: "/developer",
    templateUrl: "templates/Info/developer.html"
  })

  .state('arts', {
    url: "/arts",
    templateUrl: "templates/Inventory/arts.html",
    controller: 'ArtsCtrl'
  })

  .state('art-detail', {
    url: "/arts/:artId",
    templateUrl: "templates/Inventory/art.html",
    controller: 'ArtDetailCtrl'
  })

  .state('aboutCompany', {
    url: "/aboutCompany",
    abstract: true,
    templateUrl: "templates/Info/aboutCompany-tabs.html"
  })
  .state('aboutCompany.company', {
    url: "/company",
    views: {
      'information-tab': {
        templateUrl: "templates/Info/company.html",
        controller: 'companyTabController'
      }
    }
  })
  .state('aboutCompany.mission', {
    url: "/mission",
    views: {
      'mission-tab': {
        templateUrl: "templates/Info/mission.html",
        controller: 'missionTabController'
      }
    }
  })

  .state('clients', {
    url: "/clients",
    templateUrl: "templates/Sales/clients.html",
    controller: 'ClientsCtrl'
  })


  .state('setClient', {
    url: "/setClient",
    templateUrl: "templates/Sales/setClient.html",
    controller: 'setClientCtrl'
  })
  
  .state('client-detail', {
    url: "/clients/:clientId",
    templateUrl: "templates/Sales/client.html",
    controller: 'ClientDetailCtrl'
  })

  .state('suppliers', {
    url: "/suppliers",
    templateUrl: "templates/Purchases/suppliers.html",
    controller: 'SuppliersCtrl'
  })


  .state('setSupplier', {
    url: "/setSupplier",
    templateUrl: "templates/Purchases/setSupplier.html",
    controller: 'setSupplierCtrl'
  })
  
  .state('supplier-detail', {
    url: "/suppliers/:supplierId",
    templateUrl: "templates/Purchases/supplier.html",
    controller: 'SupplierDetailCtrl'
  })


  $urlRouterProvider.otherwise('/aboutCompany/company');
})
;

