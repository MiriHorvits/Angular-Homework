import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-card">
      <h1>כניסה להתקנת תוכנות לימודיות על המחשב</h1>

      <label class="field-label" for="idNumber">מספר זהות</label>
      <input
        id="idNumber"
        type="text"
        inputmode="numeric"
        [(ngModel)]="idNumber"
        placeholder="הקלד מספר זהות"
      />

      <div class="checkbox-row">
        <label for="terms">האם קראת ואישרת את התקנון</label>
        <input id="terms" type="checkbox" [(ngModel)]="acceptedTerms" />
      </div>

      <button type="button" [disabled]="!acceptedTerms || !idNumber.trim()">
        הכנס
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .form-card {
        width: min(100%, 460px);
        margin: 0 auto;
        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 16px 32px rgba(31, 71, 136, 0.14);
        padding: 28px 24px;
      }

      h1 {
        margin: 0 0 22px;
        font-size: clamp(1.7rem, 2vw, 2.2rem);
        text-align: center;
        color: #1e2a38;
        line-height: 1.5;
      }

      .field-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 700;
        color: #21324a;
      }

      input[type='text'] {
        width: 100%;
        padding: 14px 12px;
        border: 1px solid #cdd9ee;
        border-radius: 10px;
        background: #f9fbff;
        margin-bottom: 18px;
        font-size: 1rem;
      }

      input[type='text']:focus {
        outline: 2px solid #a9c2ff;
        border-color: #7ea3ff;
      }

      .checkbox-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 12px 0 22px;
        font-weight: 600;
        color: #21324a;
      }

      .checkbox-row input {
        width: 20px;
        height: 20px;
        accent-color: #2c6df2;
      }

      button {
        width: 100%;
        border: none;
        border-radius: 12px;
        padding: 14px 18px;
        font-size: 1.05rem;
        font-weight: 700;
        color: #fff;
        background: linear-gradient(135deg, #2c6df2, #214fd6);
        cursor: pointer;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      button:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      button:disabled {
        background: #b7c4db;
        cursor: not-allowed;
        opacity: 0.8;
      }
    `,
  ],
})
export class AppComponent {
  idNumber = '';
  acceptedTerms = false;
}
