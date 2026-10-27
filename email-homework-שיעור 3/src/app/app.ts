
import { Component, signal } from '@angular/core';
import { EmailInput } from './email-input/email-input';

@Component({
  selector: 'app-root',
  imports: [EmailInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('email-homework');
}
