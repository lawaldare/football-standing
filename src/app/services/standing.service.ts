import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { rxResource } from "@angular/core/rxjs-interop";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StandingService {
  private readonly newAPI = "https://v3.football.api-sports.io/standings";
  private readonly http = inject(HttpClient);

  private selectedLeague = signal<string>("39");
  private selectedYear = signal<string>("2024");

  private standingResource = rxResource({
    request: () => ({
      league: this.selectedLeague(),
      year: this.selectedYear(),
    }),
    loader: ({ request }) => {
      const httpOptions = {
        headers: new HttpHeaders({
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": environment.apiToken,
        }),
      };
      return this.http
        .get(
          `${this.newAPI}?league=${request.league}&season=${request.year}`,
          httpOptions
        )
        .pipe(map((response: any) => response.response[0].league.standings[0]));
    },
  });

  public standings = computed(() => this.standingResource.value());

  public selectLeague(league: string): void {
    this.selectedLeague.set(league);
  }
  public selectYear(year: string): void {
    this.selectedYear.set(year);
  }
}
