import { Component, OnInit } from '@angular/core';
import { StandingService } from 'src/app/services/standing.service';
import { Team } from 'src/app/models/team.model';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
  standalone: true,
  imports: [MatTableModule, MatSelectModule, MatFormFieldModule],
})
export class StandingsComponent {
  columnsToDisplay = [
    'position',
    'name',
    'points',
    'playedGames',
    'won',
    'draw',
    'lost',
    'goalsFor',
    'goalsAgainst',
    'goalDifference',
  ];

  league = this.standingService.selectedLeague;
  standings = this.standingService.standings;

  constructor(private standingService: StandingService) {}

  getStandings(league: string) {
    this.standingService.selectLeague(league);
  }
}
