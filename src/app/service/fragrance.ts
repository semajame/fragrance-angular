import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FragranceService {
  private apiUrl = environment.fragranceApiUrl;
  private headers = new HttpHeaders({
    'x-rapidapi-key': environment.fragranceApiKey,
    'x-rapidapi-host': environment.fragranceApiHost,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  async allFragrance() {
    const body = {
      queries: [
        {
          indexUid: 'fragrances',
          facets: ['brand.name', 'notes.name', 'perfumers.name', 'releasedAt'],
          limit: 24,
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

  async mostPopularFragrances() {
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

  // 🧠 Get fragrance by ID
  async getById(id: string) {
    const body = {
      queries: [
        {
          indexUid: 'fragrances',
          query: id, // search using the ID as text
          limit: 1,
        },
      ],
    };

    const response: any = await firstValueFrom(
      this.http.post(this.apiUrl, body, { headers: this.headers })
    );

    const fragrance = response.results[0]?.hits[0] || null;

    if (fragrance) {
      // Attach indexUid so getPublicUrl works
      fragrance.indexUid = 'fragrances';
    }

    return fragrance;
  }
}
