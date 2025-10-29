import { Component, signal } from '@angular/core';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Popular } from './components/popular/popular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Popular, Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fragrance-app');
}
