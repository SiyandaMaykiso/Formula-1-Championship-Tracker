var app = angular.module("f1TrackerApp", []);

app.controller("f1TrackerCtrl", function($scope, $http) {
    // API endpoint URLs
    var driversStandingsURL = "https://ergast.com/api/f1/current/driverStandings.json";
    var constructorsStandingsURL = "https://ergast.com/api/f1/current/constructorStandings.json";

    // Initialize standings arrays
    $scope.driversStandings = [];
    $scope.constructorsStandings = [];

    // Get drivers championship standings
    $http.get(driversStandingsURL).then(function(response) {
        var standingsData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        for (var i = 0; i < standingsData.length; i++) {
            var position = standingsData[i].position;
            var driverName = standingsData[i].Driver.givenName + " " + standingsData[i].Driver.familyName;
            var points = standingsData[i].points;
            $scope.driversStandings.push({position: position, driverName: driverName, points: points});
        }
    });
    // Get constructors championship standings
    $http.get(constructorsStandingsURL).then(function(response) {
        var standingsData = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        for (var i = 0; i < standingsData.length; i++) {
            var position = standingsData[i].position;
            var constructorName = standingsData[i].Constructor.name;
            var points = standingsData[i].points;
            $scope.constructorsStandings.push({position: position, constructorName: constructorName, points: points});
        }
    });
});
