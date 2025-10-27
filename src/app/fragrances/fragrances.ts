import { Component, OnInit, signal } from '@angular/core';
import { FragranceService } from '../service/fragrance';
import { ChevronRight, Star, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-fragrances',
  standalone: true,
  imports: [LucideAngularModule, HlmButtonImports, HlmInputImports, CommonModule],
  templateUrl: './fragrances.html',
  styleUrl: './fragrances.css',
})
export class Fragrances implements OnInit {
  readonly Arrow = ChevronRight;
  readonly Star = Star;

  fragrances = signal<any[]>([]); // signal to store API results
  loading = signal(false);
  error = signal('');

  constructor(private fragranceService: FragranceService) {}

  async ngOnInit() {
    this.loading.set(true);
    this.error.set('');
    try {
      const data: any = await this.fragranceService.allFragrance();
      // The hits are in data.results[0].hits
      this.fragrances.set(data.results[0]?.hits || []);
    } catch (err) {
      this.error.set('Failed to load fragrances.');
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
