import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FragranceService {
  private apiUrl = 'https://fragrance-api.p.rapidapi.com/multi-search';
  private headers = new HttpHeaders({
    'x-rapidapi-key': 'c0b5b28673mshb004020dd7fa4b1p121fa0jsneeecc5ed08fa',
    'x-rapidapi-host': 'fragrance-api.p.rapidapi.com',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  async searchFragrance() {
    const body = {
      queries: [
        {
          indexUid: 'fragrances',
          facets: ['brand.name', 'notes.name', 'perfumers.name', 'releasedAt'],
          limit: 6,
          offset: 0,
        },
      ],
    };

    try {
      const response = await firstValueFrom(
        this.http.post(this.apiUrl, body, { headers: this.headers })
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
