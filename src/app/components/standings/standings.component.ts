import { Component, inject, OnInit } from "@angular/core";
import { StandingService } from "src/app/services/standing.service";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.component.html",
  styleUrls: ["./standings.component.css"],
  imports: [MatTableModule, MatSelectModule, MatFormFieldModule],
})
export class StandingsComponent implements OnInit {
  private readonly standingService = inject(StandingService);
  public columnsToDisplay = [
    "logo",
    "name",
    "playedGames",
    "won",
    "draw",
    "lost",
    "goalsFor",
    "goalsAgainst",
    "goalDifference",
    "points",
  ];

  public years = [];

  public standings = this.standingService.standings;

  ngOnInit(): void {
    for (let index = 2010; index <= new Date().getFullYear(); index++) {
      this.years.push(index);
    }
  }

  public getStandings(league: string) {
    this.standingService.selectLeague(league);
  }

  public selectYear(year: string) {
    this.standingService.selectYear(year);
  }
}
