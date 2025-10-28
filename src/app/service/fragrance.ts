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

  // ⏱ cache expiration time (10 minutes)
  private cacheDuration = 60 * 60 * 1000;

  constructor(private http: HttpClient) {}

  /** Utility: Get cached data if valid */
  private getCache(key: string): any | null {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < this.cacheDuration) {
      console.log(`Returning cached data for ${key}`);
      return data;
    }

    // expired → clear cache
    localStorage.removeItem(key);
    return null;
  }

  /** Utility: Set cache */
  private setCache(key: string, data: any): void {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }

  /** 🧴 Get all fragrances (cached for 10 minutes) */
  async allFragrance(offset = 0) {
    const body = {
      queries: [
        {
          indexUid: 'fragrances',
          facets: ['brand.name', 'notes.name', 'perfumers.name', 'releasedAt'],
          limit: 24,
          offset, // 👈 use dynamic offset
        },
      ],
    };

    try {
      const response = await firstValueFrom(
        this.http.post(this.apiUrl, body, { headers: this.headers })
      );
      console.log('Fetched from All Fragrance :', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /** 🌸 Get most popular fragrances (cached for 10 minutes) */
  async mostPopularFragrances() {
    const cacheKey = 'mostPopularFragrances';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

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
      this.setCache(cacheKey, response);
      console.log('Fetched from API :', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /** 🧠 Get fragrance by brand and name (cached separately per combination) */
  async getByBrandAndName(brand: string, name: string) {
    const cacheKey = `fragrance_${brand}_${name}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    const body = {
      queries: [
        {
          indexUid: 'fragrances',
          q: name,
          facets: ['brand.name', 'notes.name', 'perfumers.name', 'releasedAt'],
          filter: [`"brand.name"="${brand}"`],
          limit: 1,
          offset: 0,
        },
      ],
    };

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, body, { headers: this.headers })
      );

      const fragrance = response.results[0]?.hits[0] || null;

      if (fragrance) {
        // normalize arrays
        fragrance.notes = Array.isArray(fragrance.notes)
          ? fragrance.notes
          : fragrance.notes
          ? [fragrance.notes]
          : [];

        fragrance.perfumers = Array.isArray(fragrance.perfumers)
          ? fragrance.perfumers
          : fragrance.perfumers
          ? [fragrance.perfumers]
          : [];
      }

      this.setCache(cacheKey, fragrance);
      console.log('Fetched from API');
      return fragrance;
    } catch (error) {
      console.error('Error fetching fragrance by brand and name:', error);
      throw error;
    }
  }
}
