var app = angular.module("formula1App", []);

app.controller("MainController", function($scope, $http) {
  $http.get("https://ergast.com/api/f1/current/driverStandings.json").then(function(response) {
    $scope.drivers = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
});

app.controller("StandingsController", function($scope, $http) {
  const apiUrl = "http://ergast.com/api/f1/current/constructorStandings";
  $http.get(apiUrl)
    .then(response => {
      $scope.standings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    })
    .catch(error => console.error(error));
});
