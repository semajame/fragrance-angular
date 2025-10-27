import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FragranceService } from '../service/fragrance';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fragrance-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './fragrance-detail.html',
  styleUrls: ['./fragrance-detail.css'],
})
export class FragranceDetail implements OnInit {
  readonly Star = Star;

  fragrance = signal<any>(null);
  loading = signal(false);
  error = signal('');

  constructor(private route: ActivatedRoute, private fragranceService: FragranceService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.fragranceService.getById(id);
      this.fragrance.set(data);
    } catch (err) {
      this.error.set('Failed to load fragrance.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
