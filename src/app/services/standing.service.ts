import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StandingService {
  private readonly newAPI = 'https://v3.football.api-sports.io/standings';

  selectedLeague = signal<string>('39');

  constructor(private http: HttpClient) {}

  private standings$ = toObservable(this.selectedLeague).pipe(
    switchMap((league: string) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': environment.apiToken,
        }),
      };
      return this.http.get(
        `${this.newAPI}?league=${league}&season=2023`,
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
}
