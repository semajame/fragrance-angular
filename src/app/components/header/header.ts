import { Component, signal, input } from '@angular/core';
import { LucideAngularModule, Github } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly Github = Github;
}
