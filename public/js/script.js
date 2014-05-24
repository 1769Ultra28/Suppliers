
//Add new module profitRC

var profit_RC = angular.module('profitRC', []);

//Add controller to module

profit_RC.controller('mainController', function ($scope, $http) {

  //Variable for all data of suppliers

  $scope.suppliers = "";

  //Get data

  $http.get('/loadData')
    .success(function(data) {

      $scope.suppliers = data;
      console.log(data);

    })
    .error(function(data) {

      console.log('Error: ' + data);

    });

}

);