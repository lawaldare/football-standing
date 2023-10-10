import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StandingService {
  private readonly newAPI = 'https://v3.football.api-sports.io/standings';

  selectedLeague = signal<string>('39');
  selectedYear = signal<string>('2023');

  constructor(private http: HttpClient) {}

  private standings$ = combineLatest([
    toObservable(this.selectedLeague),
    toObservable(this.selectedYear),
  ]).pipe(
    switchMap(([league, year]) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': environment.apiToken,
        }),
      };
      return this.http.get(
        `${this.newAPI}?league=${league}&season=${year}`,
        httpOptions
      );
    }),
    map((response: any) => {
      return response.response[0].league.standings[0];
    })
  );

  standings = toSignal(this.standings$, { initialValue: [] });

  selectLeague(league: string) {
    this.selectedLeague.set(league);
  }
  selectYear(year: string) {
    this.selectedYear.set(year);
  }
}
