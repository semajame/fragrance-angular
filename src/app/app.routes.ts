import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Fragrances } from './fragrances/fragrances';
import { FragranceDetail } from './fragrance-detail/fragrance-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'fragrances', component: Fragrances },
  { path: 'fragrance/:brand/:name', component: FragranceDetail },
];
