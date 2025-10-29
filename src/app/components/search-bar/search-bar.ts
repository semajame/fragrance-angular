import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FragranceService } from '../../service/fragrance';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBarComponent {
  query = '';
  results: any[] = [];
  loading = false;

  private searchSubject = new Subject<string>();

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  constructor(private fragranceService: FragranceService) {}

  onInputChange() {
    this.searchSubject.next(this.query);
  }

  clearSearch() {
    this.query = '';
    this.results = [];
  }

  async search(query: string) {
    this.loading = true;
    try {
      const data = await this.fragranceService.searchFragrance(query);
      this.results = data || [];
    } catch (error) {
      console.error('Search error:', error);
      this.results = [];
    } finally {
      this.loading = false;
    }
  }
}
