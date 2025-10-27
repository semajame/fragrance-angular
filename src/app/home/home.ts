import { Component, signal, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { FragranceService } from '../service/fragrance';
import { CommonModule } from '@angular/common'; // <-- import CommonModule
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { LucideAngularModule, ChevronRight, Star } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Header,
    Footer,
    CommonModule,
    HlmButtonImports,
    LucideAngularModule,
    HlmInputImports,
    RouterLink,
  ],
  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home implements OnInit {
  readonly Arrow = ChevronRight;
  readonly Star = Star;

  fragrances = signal<any[]>([]); // signal to store API results
  loading = signal(false);
  error = signal('');

  constructor(private fragranceService: FragranceService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.loading.set(true);
    this.error.set('');
    try {
      const data: any = await this.fragranceService.mostPopularFragrances();
      // The hits are in data.results[0].hits
      this.fragrances.set(data.results[0]?.hits || []);
    } catch (err) {
      this.error.set('Failed to load fragrances.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  async getById() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.fragranceService.getById(id);
      this.fragrances.set([data]);

      console.log(data);
    } catch (err) {
      this.error.set('Failed to load fragrance.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  getNotes(f: any): string {
    if (!f.notes || f.notes.length === 0) return 'N/A';
    return f.notes.map((n: any) => n.name).join(', ');
  }

  getPerfumers(f: any): string {
    if (!f.perfumers || f.perfumers.length === 0) return 'Unknown';
    return f.perfumers.map((p: any) => p.name).join(', ');
  }
}
