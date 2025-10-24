import { Component, signal, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { FragranceService } from '../service/fragrance';
import { CommonModule } from '@angular/common'; // <-- import CommonModule

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { LucideAngularModule, ChevronRight, Star } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Footer, CommonModule, HlmButtonImports, LucideAngularModule, HlmInputImports],
  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home implements OnInit {
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
      const data: any = await this.fragranceService.searchFragrance();
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
