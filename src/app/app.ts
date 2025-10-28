import { Component, signal } from '@angular/core';

import { Home } from './home/home';
import { Fragrances } from './fragrances/fragrances';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Popular } from './components/popular/popular';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Fragrances, Popular, Header, Footer, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fragrance-app');
}
