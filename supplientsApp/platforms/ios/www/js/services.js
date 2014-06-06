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


.factory('Arts',function(){

  var arts;
  $.getJSON( "http://cssc.mine.nu:15001/Arts", function( json ) {
    arts = (json);
  });

  return {
    all: function() {
      return arts;
    },
    get: function(artId) {
      return arts[artId];
    }
  }
})

.factory('Clients', function() {
  var clients;
  $.getJSON( "http://cssc.mine.nu:15001/Clients", function( json ) {
    clients = (json);
  });
  return {
    all: function() {
      return clients;
    },
    get: function(clientId) {
      // Simple index lookup
      return clients[clientId];
    }
  }
});
