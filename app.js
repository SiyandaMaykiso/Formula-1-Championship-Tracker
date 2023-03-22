
var app = angular.module("formula1App", []);

app.controller("MainController", function($scope, $http) {
  $http.get("https://ergast.com/api/f1/current/driverStandings.json").then(function(response) {
    $scope.drivers = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
});

const apiUrl = "https://ergast.com/api/f1/current/constructorStandings.json";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    
    const table = document.querySelector("#constructor-standings tbody");
    for (let i = 0; i < standings.length; i++) {
      const row = table.insertRow(i);
      const position = row.insertCell(0);
      const constructor = row.insertCell(1);
      const points = row.insertCell(2);
      
      position.textContent = standings[i].position;
      constructor.textContent = standings[i].Constructor.name;
      points.textContent = standings[i].points;
    }
  })
  .catch(error => console.error(error));
