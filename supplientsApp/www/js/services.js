angular.module('supplientsApp.services', [])

/**
 * A simple example service that returns some data.
 */
 .factory('Sellers', function(){
  var sellers = $.getJSON("http://cssc.mine.nu:15001/Sellers", function(jsonObject){
    sellers = jsonObject;
  });

  return {
    all: function(){
      return sellers;
    },
    get: function(sellerId){
      return sellers[sellerId];
    }
  }
})

 .factory('Zones', function(){
  var zones=$.getJSON("http://cssc.mine.nu:15001/Zones", function(jsonObject){
    zones = jsonObject;
  });
  return {
    all: function(){
      return zones;
    },
    get: function(zoneId){
      return zones[zoneId];
    }
  }
})


 .factory('ArtImagen', function(){
  var artImagen = $.getJSON("http://cssc.mine.nu:15001/ArtImagen", function(json){
    artImagen = json;
  });
  return {
    all: function(){
      return artImagen;
    }
  }
})

 .factory('Suppliers', function() {
  // Might use a resource here that returns a JSON array
  var suppliers;
  $.getJSON( "http://cssc.mine.nu:15001/Suppliers", function( json ) {
    suppliers = (json);
  });

  return {
    all: function() {
      return suppliers;
    },
    get: function(supplierId) {
      // Simple index lookup
      return suppliers[supplierId];
    }
  }
})


 .factory('Arts',function($http){
var arts;
  $http.get('http://cssc.mine.nu:15001/Arts').success(function(jsonArts){ 
    arts = (jsonArts);
  });
  // var arts;
  // $.getJSON( "http://cssc.mine.nu:15001/Arts", function( json ) {
  //   arts = (json);
  // });
  return {
    all: function() {
      return arts;
    },
    get: function(artId) {
      return arts[artId];
    }
  }
})

 .service('clientsService', function($http, $q, $timeout) {
  // alert('clientService');
  var clients;
      $http.get('http://cssc.mine.nu:15001/Clients').success(function(jsonClients){ 
        clients = (jsonClients);
      });
    return {
      all: function() {
        return clients;
      },
      get: function(clientId) {
      return clients[clientId];
    }
  }
})

 .factory('Clients', function($http) {
  var clients;
      $http.get('http://cssc.mine.nu:15001/Clients').success(function(jsonClients){ 
        clients = (jsonClients);
      });
    return {
      all: function() {
        return clients;
      },
      get: function(clientId) {
      return clients[clientId];
    }
  }
});

// .factory('Clients', function($q, $timeout) {
//   alert('Into Factory Clients');
//   var deferred = $q.defer();
//   var clients;

//   $timeout(function() {

//         // Simulated slow fetch from an HTTP server
//         $.getJSON( "http://cssc.mine.nu:15001/Clients", function( json ) {
//           clients = (json);
//         });
//         return {
//           all: function() {
//             return deferred.resolve(clients);
//           },
//           get: function(clientId) {
//       // Simple index lookup
//       return deferred.resolve(clients[clientId]);
//     }
//   }


// }, 3000);
//   return deferred.promise;
// });
