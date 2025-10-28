import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FragranceService } from '../service/fragrance';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star, Calendar, Milk, Flame, Diamond } from 'lucide-angular';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'app-fragrance-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './fragrance-detail.html',
  styleUrls: ['./fragrance-detail.css'],
})
export class FragranceDetail implements OnInit {
  readonly Star = Star;
  readonly Calendar = Calendar;
  readonly Milk = Milk;
  readonly Flame = Flame;
  readonly Diamond = Diamond;

  skeletons = Array(6); // for notes placeholders

  fragrance = signal<any>(null);
  loading = signal(true);
  error = signal('');

  constructor(private route: ActivatedRoute, private fragranceService: FragranceService) {}

  async ngOnInit() {
    const brand = this.route.snapshot.paramMap.get('brand');
    const name = this.route.snapshot.paramMap.get('name');
    if (!brand || !name) return;

    this.loading.set(true);
    this.error.set('');

    try {
      const data = await this.fragranceService.getByBrandAndName(brand, name);
      this.fragrance.set(data);
    } catch (err) {
      this.error.set('Failed to load fragrance.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  getNoteColor(noteName: string, baseHex: string) {
    const hash = noteName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const hueShift = (hash % 60) - 30;
    return this.adjustHue(baseHex, hueShift);
  }

  adjustHue(hex: string, degree: number): string {
    const hsl = tinycolor(hex).toHsl();
    hsl.h = (hsl.h + degree + 360) % 360;
    return tinycolor(hsl).toHexString();
  }
}
