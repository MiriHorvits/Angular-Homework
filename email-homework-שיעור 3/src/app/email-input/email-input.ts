import { Component } from '@angular/core';

@Component({
  selector: 'app-email-input',
  imports: [],
  templateUrl: './email-input.html',
  styleUrl: './email-input.css',
})
export class EmailInput {
  email = '';
  submittedEmail = '';

  /** מיפוי אותיות עבריות לפריסת מקלדת אנגלית */
  private readonly hebrewKeyboard: Record<string, string> = {
    א: 't', ב: 'c', ג: 'd', ד: 's', ה: 'v', ו: 'u', ז: 'z',
    ח: 'j', ט: 'y', י: 'h', כ: 'f', ך: 'l', ל: 'k', מ: 'n',
    ם: 'o', נ: 'b', ן: 'i', ס: 'x', ע: 'g', פ: 'p', ף: ';',
    צ: 'm', ץ: '.', ק: 'e', ר: 'r', ש: 'a', ת: ',',
  };

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const converted = [...input.value]
      .map((character) => this.hebrewKeyboard[character] ?? character)
      .join('');

    input.value = converted;
    this.email = converted;
  }

  showEmail(): void {
    this.submittedEmail = this.email.trim();
  }

  addGmail(): void {
    const trimmed = this.email.trim();
    const atIndex = trimmed.indexOf('@');

    // החלפת סיומת קיימת ב-@gmail.com, או הוספה אם אין סיומת
    const localPart = atIndex === -1 ? trimmed : trimmed.slice(0, atIndex);
    this.email = `${localPart}@gmail.com`;
    this.submittedEmail = this.email;
  }
}
