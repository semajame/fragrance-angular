import { Component, signal } from '@angular/core';

import { Home } from './home/home';
import { Fragrances } from './fragrances/fragrances';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Fragrances, Header, Footer, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fragrance-app');
}
