import { Component, signal, input } from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
@Component({
  selector: 'app-header',
  imports: [HlmInputImports],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
