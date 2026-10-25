import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  idNumber = '';
  isApproved = false;

  onLogin(): void {
    if (!this.idNumber.trim()) {
      alert('נא להזין מספר זהות');
      return;
    }
    this.isApproved = true;
    alert('התחברת בהצלחה!');
  }
}