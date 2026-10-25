import { Component } from '@angular/core';
import { GradesComponent } from './grades.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GradesComponent],
  template: '<app-grades />',
})
export class AppComponent {}
