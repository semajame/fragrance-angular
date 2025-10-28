import { Component, OnInit, signal, computed } from '@angular/core';
import { FragranceService } from '../service/fragrance';
import { ChevronRight, Star, LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import {
  HlmPaginationContent,
  HlmPagination,
  HlmPaginationEllipsis,
  HlmPaginationItem,
  HlmPaginationLink,
  HlmPaginationNext,
  HlmPaginationPrevious,
} from '@spartan-ng/helm/pagination';

@Component({
  selector: 'app-fragrances',
  standalone: true,
  imports: [
    LucideAngularModule,
    HlmButtonImports,
    HlmInputImports,
    CommonModule,

    RouterLink,
    HlmPagination,
    HlmPaginationContent,
    HlmPaginationItem,
    HlmPaginationPrevious,
    HlmPaginationNext,
    HlmPaginationLink,
    HlmPaginationEllipsis,
  ],
  templateUrl: './fragrances.html',
  styleUrl: './fragrances.css',
})
export class Fragrances implements OnInit {
  readonly Arrow = ChevronRight;
  readonly Star = Star;

  readonly LeftArrow = ChevronLeft;

  fragrances = signal<any[]>([]);
  loading = signal(false);
  error = signal('');
  skeletons = Array(12); // array with 12 undefined elements

  currentPage = signal(1);
  totalPages = 3949; // can come from API response later
  maxVisiblePages = 5;

  // ✅ Dynamic visible pages (computed signal)
  visiblePages = computed(() => {
    const total = this.totalPages;
    const current = this.currentPage();
    const max = this.maxVisiblePages;
    const half = Math.floor(max / 2);

    let start = Math.max(1, current - half);
    let end = Math.min(total, start + max - 1);

    // adjust when near the end
    if (end - start + 1 < max) {
      start = Math.max(1, end - max + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  });

  constructor(private fragranceService: FragranceService) {}

  async ngOnInit() {
    await this.loadPage(1);
  }

  /** Load a specific page */
  async loadPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.loading.set(true);
    this.error.set('');
    this.currentPage.set(page);

    const offset = (page - 1) * 24;

    try {
      const data: any = await this.fragranceService.allFragrance(offset);
      this.fragrances.set(data.results[0]?.hits || []);
      // optionally: update totalPages = data.totalPages;
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
