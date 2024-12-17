import { Component } from "@angular/core";
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
export class StandingsComponent {
  columnsToDisplay = [
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

  public standings = this.standingService.standings;

  constructor(private standingService: StandingService) {}

  public getStandings(league: string) {
    this.standingService.selectLeague(league);
  }

  public selectYear(year: string) {
    this.standingService.selectYear(year);
  }
}
