import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StandingService {
  private readonly API =
    'https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/';

  // https://cors-anywhere.herokuapp.com/corsdemo - use this link to request temporary access if it returns 403;
  private readonly leagues = {
    bundesliga: 'BL1',
    premierLeague: 'PL',
    serieA: 'SA',
    primeraDivision: 'PD',
  };

  selectedLeague = signal<string>('premierLeague');

  constructor(private http: HttpClient) {}

  private standings$ = toObservable(this.selectedLeague).pipe(
    switchMap((league: string) =>
      this.http.get(`${this.API}${this.leagues[league]}/standings`)
    ),
    map((response: any) => response.standings[0].table)
  );

  standings = toSignal(this.standings$, { initialValue: [] });

  selectLeague(league: string) {
    this.selectedLeague.set(league);
  }
}
