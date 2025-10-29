import { Component, input, signal } from '@angular/core';
import { LucideAngularModule, Github } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly Github = Github;
}
