import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  footerMessage = input.required<string>(); // ✅ typed input signal
}
