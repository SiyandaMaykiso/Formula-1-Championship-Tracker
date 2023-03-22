import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DriverStandings {
  driver: string;
  team: string;
  points: number;
}

interface ConstructorStandings {
  team: string;
  points: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  driverStandings: DriverStandings[];
  constructorStandings: ConstructorStandings[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<DriverStandings[]>('http://ergast.com/api/f1/current/driverStandings')
      .subscribe(data => {
        this.driverStandings = data;
      });

    this.http.get<ConstructorStandings[]>('http://ergast.com/api/f1/current/constructorStandings')
      .subscribe(data => {
        this.constructorStandings = data;
      });
  }
}
